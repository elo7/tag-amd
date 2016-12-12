(function() {
	'use strict';

	function FieldToSendValues(name) {
		var inputHidden = document.createElement('input');
		inputHidden.name = name;
		inputHidden.type = 'hidden';

		this.addTag = function(tag) {
			if (inputHidden.value != '') {
				inputHidden.value += ',';
			}
			inputHidden.value += tag;
		};

		this.appendTo = function(el) {
			el.appendChild(inputHidden);
		};
	}

	function Tag(value) {
		var span = document.createElement('span'),
			close = document.createElement('a');

		span.innerHTML = value;
		span.className = 'tag';
		span.tabIndex = 0;

		close.className = "close";
		close.innerHTML = "&times;";
		close.href = "#";

		this.closeOnClick = function() {
			close.addEventListener('click', this.close);
		};

		this.close = function() {
			close.parentNode.remove();
		};

		this.appendTo = function(el) {
			el.appendChild(span);
			el.appendChild(close);
		};
	}

	function setTags(e, inputHidden) {
		if(e.code === 'Comma' || e.code === 'Enter') {
			var tagWrapper = document.createElement('div'),
				value = e.target.value,
				tag = new Tag(value);

			tagWrapper.className = 'tag-wrapper';
			inputHidden.addTag(value);

			div.insertBefore(tagWrapper, e.target);

			e.target.value = "";

			tag.appendTo(tagWrapper);
			tag.closeOnClick();

			e.preventDefault();

		}
	}

	var input = document.querySelectorAll("input[data-tags]");

	for (var i=0, length=input.length; i < length; i++) {

		var div = document.createElement('div');
		div.className = 'tag-container';

		var name = input[i].name,
			parent = input[i].parentNode,
			inputHidden = new FieldToSendValues(name);

		input[i].name = "";

		parent.insertBefore(div, input[i]);

		div.appendChild(input[i]);
		inputHidden.appendTo(div);

		input[i].addEventListener('keypress', function(e) {
			setTags(e, inputHidden);
		});

		var filled;

		input[i].addEventListener('keydown', function(e) {
			var value = this.value;

			if(e.code === 'Backspace') {

				if(value !== '' || filled) {
					filled = true;
					return;
				}

				var tag = this.parentNode.querySelector('.tag-wrapper:last-of-type');

				if(tag !== null) {
					tag.remove();
				}
			}
		});

		input[i].addEventListener('keyup', function(e){
			filled = undefined;
		});
	}
})();
