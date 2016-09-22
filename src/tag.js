define('tag', ['doc'], function($) {
	'use strict';

	var Tag = function(element) {
		this.tags = function() {
			return element.val().split(/\s*,\s*/).filter(function(tag) {
				return tag.length > 0;
			});
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
