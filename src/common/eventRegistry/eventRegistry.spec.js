
di.module("testEvents", ["eventRegistry"])
	.config(function(registerEvents) {
		console.log("woot");
		registerEvents("test", "foo");
	});


ngTest({"eventRegistry tests": [
	"eventRegistry:",
	"registerEvents",
	"testEvents:",
	"test",
	"onTest",
	"testCbCalls=",
	function testCb() {
		testCbCalls = _.isNumber(testCbCalls) ? ++testCbCalls : 1;
		console.log("test cb", testCbCalls, arguments, this);
	},
	{
		'should create service functions for registered events': function() {
			expect(test).toBeOfType("function");
			expect(onTest).toBeOfType("function");
		},

		"should emit and listen to events": function() {
			onTest(testCb);
			test("foo");
			expect(testCbCalls).toBe(1);
		},

		"should cancel listener": function() {
			var x = 0;
			var y = function() {x++;};
			var off = onTest(y);
			onTest(testCb);
			test("foo");
			expect(x).toBe(1);
			expect(testCbCalls).toBe(2);
			off(x);
			test("foo");
			expect(x).toBe(1);
			expect(testCbCalls).toBe(3);
			test.off();
			test("foo");
			expect(testCbCalls).toBe(3);
			expect(x).toBe(1);

		}
	}
]});

