define('tag', ['doc'], function($) {
	'use strict';

	var COMMA = 188,
		ENTER = 13,
		TAB = 9,
		BACKSPACE = 8;

	var Tag = function($element) {
		var tags = [];

		$element.on('keydown', function(e) {
			if (e.which === COMMA || e.keyCode === COMMA ||
				e.which === ENTER || e.keyCode === ENTER ||
				e.which === TAB || e.keyCode === TAB) {
				e.preventDefault();
				addTags();
			} else if (e.which === BACKSPACE || e.keyCode === BACKSPACE) {
				var currentTag = $element.val().replace(/(.*),\s/, '');
				if(currentTag === '' || tags.indexOf(currentTag) > 0) {
					e.preventDefault();
					removeLastTag();
				}
			}
		});

		var filterUniques = function(previousArray, currentElement) {
			if (previousArray.indexOf(currentElement) < 0) {
				previousArray.push(currentElement);
			}
			return previousArray;
		};

		var addTags = function() {
			var tagsToAdd = $element.val().split(/\s*,\s*/).filter(function(tag) {
				return tag.length > 0 && tags.indexOf(tag) < 0;
			}).reduce(filterUniques, []);
			tags = tags.concat(tagsToAdd);
			$element.val('');
		};

		var removeLastTag = function() {
			tags.pop();
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
