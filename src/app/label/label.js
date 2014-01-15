/** @jsx React.DOM */
di.module("Label", [
		"vendor"
	])
	.factory("Label", function($, React) {
		return React.createClass({
			handleClick: function(){
				console.log("Click label");
				this.props.children = "Text After Click";
				this.setState({liked: false});
			},

			render: function () {
				return (
					<p ref="p" onClick={this.handleClick}>{this.props.children}</p>
				);
			}
	});
});