/** @jsx React.DOM */
ngTest({"Label Component": [
	"Label:+",
	{
		"Should Check Text Assignment": function() {
			var label = <Label>Some Text We Need for Test</Label>;
			ReactTestUtils.renderIntoDocument(label);
			expect(label.refs.p).toBeDefined();
			expect(label.refs.p.props.children).toBe("Some Text We Need for Test");
		},

		"Should be clickable": function() {
			var label = <Label>Some Text We Need to Test</Label>;
			ReactTestUtils.renderIntoDocument(label);

			ReactTestUtils.Simulate.click(label.refs.p);
			expect(label.refs.p.props.children).toBe("Text After Click");
		}
	}

]});