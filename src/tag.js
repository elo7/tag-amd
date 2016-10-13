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
			isRequired = !$element.filter('required').isEmpty(),
			$container = $(document.createElement('fieldset')),
			$tagList = $(document.createElement('ul')),
			$inputContainer = $(document.createElement('li'));

		$tagList.addClass('tags');
		$container.addClass('tags-container').append($tagList.first());
		$element.parent().first().insertBefore($container.first(), $element.first());
		$tagList.append($inputContainer.first());
		$inputContainer.addClass('input-tag').append($element.first());

		$container.on('input', function(e) {
			if (e.target.value.indexOf(',') >= 0) {
				addTags();
			}
		});

		$container.on('keydown', function(e) {
			$element.removeClass('error');
			if (isAnyOfTheseKeysPressed(e, [ENTER, COMMA, TAB])) {
				e.preventDefault();
				addTags();
			} else if (selectedTag !== null && isAnyOfTheseKeysPressed(e, [BACKSPACE, DELETE])) {
				removeTag(selectedTag);
				selectedTag = null;
			} else if (isAnyOfTheseKeysPressed(e, [BACKSPACE, LEFT_KEY])) {
				if ($element.val() === '') {
					if (selectedTag === null && tags.length > 0) {
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

			focusTag(selectedTag);
		});

		var focusTag = function(selectedTag) {
			if (selectedTag !== null) {
				var tagValue = tags[selectedTag];
				$container.find('input[value="' + tagValue +'"]').parent().focus();
			} else {
				$element.focus();
			}
		};

		var filterUniques = function(previousArray, currentElement) {
			if (previousArray.indexOf(currentElement) < 0) {
				previousArray.push(currentElement.trim());
			}
			return previousArray;
		};

		var addTags = function() {
			var tagsToAdd = $element.val().trim().split(/\s*,\s*/).filter(function(tag) {
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
				$input = $(document.createElement('input')),
				$closeButton = $(document.createElement('button'));
			$closeButton.addClass('close').html('&times;');
			$input.attr('type', 'hidden').attr('name', $element.attr('name')).val(tag);
			$li.text(tag);
			$li.attr('tabindex', '1');
			$li.addClass('tag').append($input.first());
			$li.append($closeButton.first());
			$tagList.first().insertBefore($li.first(), $inputContainer.first());
			$element.removeAttr('required');

			$closeButton.on('click', function(e) {
				e.stopImmediatePropagation();
				var index = tags.indexOf($input.val());
				removeTag(index);
				selectedTag = null;
				focusTag(selectedTag);
				$element.focus();
			});

			$li.on('click', function() {
				var index = tags.indexOf($input.val());
				selectedTag = index;
				focusTag(selectedTag);
			});

			tags.push(tag);
		};

		var removeTag = function(index) {
			if(tags.splice(index, 1).length > 0) {
				var tag = $tagList.find('.tag').els[index];
				$(tag).removeItem();
			}
			if (isRequired && tags.length === 0) {
				$element.attr('required', '');
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
		if ($element.isEmpty()) {
			return null;
		}
		return new Tag($element);
	};

	return {
		tagify: tagify
	};
});
