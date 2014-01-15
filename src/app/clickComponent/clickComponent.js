/** @jsx React.DOM */
di.module("clickComponent", [])
	.value("clickComponent", React.createClass({
		handleClick: function() {
			// Explicitly focus the text input using the raw DOM API.
			this.refs.myTextInput.getDOMNode().focus();
		},
		render: function() {
			// The ref attribute adds a reference to the component to
			// this.refs when the component is mounted.
			return (
				<div>
					<input type="text" ref="myTextInput" />
					<input type="button" value="Focus the text input" onClick={this.handleClick} />
				</div>
			);
		}
	}));