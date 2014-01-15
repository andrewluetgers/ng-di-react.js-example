if (!Function.prototype.bind) {

	Function.prototype.bind = function (oThis) {
		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5 internal IsCallable function
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		}

		var aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP = function fNOP() {},
			fBound = function () {
				var thisObj;
				try {
					thisObj = (oThis && this instanceof fNOP) ? this : oThis;
				} catch(e) {
					thisObj = oThis || this;
				}
				return fToBind.apply(thisObj, aArgs.concat(Array.prototype.slice.call(arguments)));
			};

		fNOP.prototype = fToBind.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
}