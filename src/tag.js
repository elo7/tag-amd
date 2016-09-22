define('tag', ['doc'], function($) {
	'use strict';

	var COMMA = 188,
		ENTER = 13;

	var Tag = function($element) {
		var tags = [];

		$element.on('keydown', function(e) {
			if (e.which === COMMA || e.keyCode === COMMA ||
				e.which === ENTER || e.keyCode === ENTER) {
				e.preventDefault();
				addTags();
			}
		});

		var addTags = function() {
			var tagsToAdd = $element.val().split(/\s*,\s*/).filter(function(tag) {
				return tag.length > 0;
			});
			tags = tags.concat(tagsToAdd);
		};

		addTags();
		this.tags = function() {
			return tags;
		};
	};

	var tagify = function(selector) {
		var $element = $(selector);
		return new Tag($element);
	};

	return {
		tagify: tagify
	};
});
