// requires lodash!

/* this eventRegistry module defines all the events that can be used in the app
* it is pre-configured for all the Angular events. For app specific events
* you should create a separate module that uses the registerEvents service.
*
* The idea here is that events are actually protocols[1] yet they are not
* defined anywhere. It's hard to document and adhere to an undefined
* protocol. Generally in event systems this protocol looks like arbitrary
* event name strings scattered throughout the codebase and various argument
* values passed along ot the listener from the emitter/broadcaster. This can
* quickly become confusing and unmanageable.
*
* [1] = The concept can be described as "protocol" or "interface" depending on
* the language you're thinking of. I'll stick with protocol. See link below:
* http://stackoverflow.com/questions/1679145/interface-and-protocol-explanation
*
* So lets declare our events as injectable services that each serve
* as an even-specific api enforcing a pre-defined protocol.
* This is achieved by defining all our event names in a module and
* registering them with the registerEvents service. See usage at bottom of file.
* This will create two injectable services per event that serve as
* a new event specific api for emitting, broadcasting and listening for events.
*
* When the practice of injecting these event apis is adhered to,
* hard coded strings for event names are eliminated throughout the app and
* argument constructor functions (argSpecs) guarantee any required argument
* values are provided correctly. This approach also provides a single
* touch-point for defining, documenting  and refactoring this protocol.
*
* whenever you listen for or emit an event you first inject
* the required event interface and use it's emit, broadcast and on
* methods instead of the standard $scope methods
*
* the benefit of this approach is that it is much more self documenting
* and tools can determine what events are used where
* it also enables val
*
* argSpec:
* function(argIn, i) {
*   // validate argIn, maybe generate a new value
*   return argOut;
* }
*
* or array of such functions where location in the array (+1) matches
* location in the arguments list for the event listener
*
* as described in http://docs.angularjs.org/api/ng.$rootScope.Scope
* the the n+1 arguments of the "on" and "broadcast" scope methods
* are optional arguments to be passed to the event listeners along with
* an event object
*
* an argSpec is a constructor
* that validates its input and returns a valid arg that will be provided
* to the event handler. Arrays of argSpec functions are supported if
* different functions are needed per arg, otherwise you can use the i arg
* provided to the argSpec function to determine what argument is being provided
* this function should throw an error if the provided value is unexpected
*/
(function(root) {
	var di = root.di || root.angular;

	di.module("eventRegistry", [], function($provide) {

		console.log("$provide", $provide);

		// based on minivents
		// https://github.com/allouis/minivents
		function eventChannel() {
			return {
				events: {},

				// register handler for event type
				on: function(type, fn, ctx) {
					this.events[type] = this.events[type] || [];
					this.events[type].push({f:fn, c:ctx});
				},

				// stop listening to event (no func provided) or event-specific callback
				off: function(type, fn) {
					var list = this.events[type] || [];

					if (!fn && list.length > 0) {
						this.events[type] = [];
					} else {
						for (var i=0; i < list.length; i++) {
							if (fn === list[i].f) {
								list.splice(i, 1);
								i--;
							}
						}
					}
				},

				// send event, callbacks will be triggered
				emit: function(type) {
					var args = Array.apply([], arguments),
						list = this.events[type] || [],
						len = list.length;

					args.unshift(name);

					for (var i=0; i<len; i++) {
						list[i].f.apply(list[i].c, args);
					}
				}
			};
		}



		function evFn(name, argSpec, channel, inputArgs) {
			// the inputArgs are passed through any argSpec function/s
			var args = _.map(inputArgs, function(arg, i) {
				if (_.isFunction(argSpec)) {
					return argSpec(arg, i);

				} else if (_.isArray(argSpec)) {
					return argSpec[i](arg, i);

				} else {
					throw new Error("No Arg-Spec defined for event " + name + ". Expected a function or array of functions but saw " + typeof argSpec);
				}
			});

			args.unshift(name);
			return channel.emit.apply(channel, args);
		}


		function getEvMethod(name, argSpec, channel) {
			// this is the event broadcast function
			// all args passed to this function get run through the
			// argspc function/s, those returned values are then passed
			// in the same order to the event listener functions
			function fn() {
				return evFn.call({name: name}, name, argSpec, channel, _.values(arguments));
			}

			fn.off = function() {
				channel.off(name);
			};

			return fn;
		}

		/**
		 * for a given argSpec + name produces two injectable services the
		 * first service is set as the event name given and will have emit and
		 * broadcast methods with similar signatures to the Angular scope
		 * methods but in this case the first argument is the scope object
		 * instead of the event name. In this case the event name is intrinsic
		 * to the service so is not needed but the scope is unknown.
		 *
		 * The second service produced is a function for registering listeners
		 * for the given event. Given any "eventName" the injectable will
		 * be set as "onEventName" Again the event name is intrinsic to the
		 * injectable service but the scope must be provided as the first arg.
		 *
		 * @param argSpec function or array of functions that validate input
		 * and return an argument that will be passed to an event handler
		 * @param name string name of the event
		 *
		 */
		function registerEvent(argSpec, name) {

			var channel = eventChannel();

			$provide.factory(name, function() {
				/**
				 * @param ...* any remaining arguments will be passed into the argSpec constructor/s
				 * event handlers receive argSpc return vals as as arguments.
				 * @returns Event object, see http://docs.angularjs.org/api/ng.$rootScope.Scope#$on
				 */
				return getEvMethod(name, argSpec, channel);
			});

			var onName = "on" + name.substr(0, 1).toUpperCase() + name.substr(1, name.length);

			$provide.factory(onName, function() {
				/**
				 * @param fn event handler that accepts the arguments (validated by argspec)
				 * that were provided to the event's broadcast function
				 * @returns function a de-registration function for this listener.
				 */
				console.log("building instance of " + onName);
				function handler(fn) {
					var x = function() {
						var args = _.values(arguments);
						args.shift();
						fn.apply(this, args);
						handler.count++;
					};

					channel.on(name, x);

					return function() {
						channel.off(name, x);
					};
				}

				handler.name = onName;
				handler.count = 0;
				return handler;
			});
		}


		// allow any or no value
		function passThrough(arg) {
			return arg;
		}

		function registerPassThroughEvent(event) {
			registerEvent(passThrough, event);
		}

		function registerEvents(events) {
			if (_.isString(events)) {
				_.each(_.values(arguments), registerPassThroughEvent);
			} else if (_.isArray(events)) {
				_.each(events, registerPassThroughEvent);
			} else if (_.isObject(events)) {
				_.each(events, registerEvent);
			} else {
				throw new Error("Expected event name string/s (implied pass through validation) or an object with keys as eventNames and values as arg spec function/array of functions");
			}
		}

		// register all Angular events as passThrough (no validation)
		if (root.angular) {
			registerEvents([
				"$locationChangeStart",
				"$locationChangeSuccess",
				"$routeUpdate",
				"$routeChangeStart",
				"$routeChangeSuccess",
				"$routeChangeError",
				"$destroy",
				"$includeContentLoaded",
				"$viewContentLoaded"
			]);
		}

		registerEvents.passThrough = passThrough;

		// make the registerEvents function a service
		$provide.constant("registerEvents", registerEvents);
	});
}(window || root));

/* usage: register app events

angular.module("appEvents", ["eventRegistry"])
	.config(function(registerEvents) {

		// allow any or no value
		// an event
		function passThrough(arg, i) {
			return arg;
		}

		// define all app events here
		registerEvents({
			testEvent:		someValidationFunction,
			anotherEvent:	passThrough
		});

		// if all events are pass-through you need only provide names as arguments
		registerEvents("testEvent", "anotherEvent");
	});
*/





