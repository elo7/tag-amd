define('tag', ['doc'], function($) {
	'use strict';

	var COMMA = 188,
		ENTER = 13,
		TAB = 9,
		BACKSPACE = 8,
		LEFT_KEY = 37,
		RIGHT_KEY = 39;

	var isKeyPressed = function(event, key) {
		return event.which === key || event.keyCode === key;
	};

	var isAnyOfTheseKeysPressed = function(event, keys) {
		return keys.some(function(key) {
			return isKeyPressed(event, key);
		});
	};

	var Tag = function($element) {
		var tags = [],
			selectedTag = null;

		$element.on('keydown', function(e) {
			if (isAnyOfTheseKeysPressed(e, [ENTER, COMMA, TAB])) {
				e.preventDefault();
				addTags();
			} else if (isKeyPressed(e, BACKSPACE)) {
				var currentTag = $element.val().replace(/(.*),\s/, '');
				if(currentTag === '' || tags.indexOf(currentTag) > 0) {
					e.preventDefault();
					removeLastTag();
				}
			} else if (isKeyPressed(e, LEFT_KEY)) {
				if ($element.val() === '') {
					if (selectedTag === null) {
						selectedTag = tags.length - 1;
					} else if (selectedTag > 0) {
						selectedTag--;
					}
				}
			} else if (isKeyPressed(e, RIGHT_KEY)) {
				if (selectedTag === tags.length - 1) {
					selectedTag = null;
				} else if (selectedTag !== null) {
					selectedTag++;
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

		this.selected = function() {
			if (selectedTag !== null) {
				return tags[selectedTag];
			}
			return null;
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
