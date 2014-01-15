/** @jsx React.DOM */
di.module("App", [
		"vendor",
		"Label",
		"clickComponent",
		"eventRegistry"
	])

	.factory("app", function($, React, Label, clickComponent) {
		return React.createClass({
			render: function () {
				return (
					<div>
						<Label>Some Text We Need for Test</Label>
						<clickComponent></clickComponent>
					</div>
				);
			}
		});
	})

	.run(function(React, app) {
		var appRoot = $("#appRoot")[0];
		if (appRoot) {
			React.renderComponent(app(), appRoot);
		}
	});

$(function() {
	di.injector(['App']);
});