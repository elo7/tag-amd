define('tag', ['doc'], function($) {
	'use strict';

	var COMMA = 188,
		ENTER = 13,
		TAB = 9,
		BACKSPACE = 8,
		DELETE = 46,
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
			selectedTag = null,
			$container = $(document.createElement('fieldset')),
			$tagList = $(document.createElement('ul')),
			$inputContainer = $(document.createElement('li'));
			$tagList.addClass('tags');

		$container.addClass('tags-container').append($tagList.first());
		$element.parent().first().insertBefore($container.first(), $element.first());
		$tagList.append($inputContainer.first());
		$inputContainer.addClass('input-tag').append($element.first());
		$container.on('click', function() {
			$element.focus();
		});

		$element.on('keydown', function(e) {
			$element.removeClass('error');
			$container.find('.selected').removeClass('selected');
			if (isAnyOfTheseKeysPressed(e, [ENTER, COMMA, TAB])) {
				e.preventDefault();
				addTags();
			} else if (selectedTag !== null && isAnyOfTheseKeysPressed(e, [BACKSPACE, DELETE])) {
				removeTag(selectedTag);
			} else if (isKeyPressed(e, BACKSPACE)) {
				var currentTag = $element.val().replace(/\s/g, '');
				if(currentTag === '') {
					e.preventDefault();
					removeTag(tags.length - 1);
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
			} else {
				selectedTag = null;
			}

			if(selectedTag != null) {
				focusTag(selectedTag);
			}
		});

		var focusTag = function(selectedTag) {
			var tagValue = tags[selectedTag];
			$container.find('input[value="' + tagValue +'"]').parent().addClass('selected');
		};

		var filterUniques = function(previousArray, currentElement) {
			if (previousArray.indexOf(currentElement) < 0) {
				previousArray.push(currentElement.trim());
			}
			return previousArray;
		};

		var addTags = function() {
			var tagsToAdd = $element.val().split(/\s*,\s*/).filter(function(tag) {
				return tag.length > 0 && tags.indexOf(tag.trim()) < 0;
			}).reduce(filterUniques, []);
			if(tagsToAdd.length > 0) {
				for(var i = 0; i < tagsToAdd.length; i++) {
					addTag(tagsToAdd[i]);
				}
				$element.val('');
			} else {
				$element.addClass('error');
			}
		};

		var addTag = function(tag) {
			var $li = $(document.createElement('li')),
				$input = $(document.createElement('input'));
			$input.attr('type', 'hidden').attr('name', $element.attr('name')).val(tag);
			$li.text(tag);
			$li.addClass('tag').append($input.first());
			$tagList.first().insertBefore($li.first(), $inputContainer.first());

			tags.push(tag);
		};

		var removeTag = function(index) {
			if(tags.splice(index, 1).length > 0) {
				var tag = $tagList.find('.tag').els[index];
				$(tag).removeItem();
			}
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
