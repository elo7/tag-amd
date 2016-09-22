define('tag', ['doc'], function($) {
	'use strict';

	var Tag = function(element) {
		this.tags = function() {
			return [element.val()];
		};
	};

	var tagify = function(selector) {
		var element = $(selector);
		return new Tag(element)
	};

	return {
		tagify: tagify
	};
});
