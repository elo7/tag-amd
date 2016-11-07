var input = document.querySelectorAll("input[data-tags]");

for (var i=0, length=input.length; i < length; i++) {
	var div = document.createElement('div');
	div.className = 'tag-container';

	var parent = input[i].parentNode;
	parent.insertBefore(div, input[i]);
	div.appendChild(input[i]);

	input[i].addEventListener('keypress', function(e){
		if(e.code === 'Comma' || e.code === 'Enter'){
			var tagWrapper = document.createElement('div');
			tagWrapper.className = 'tag-wrapper';

			var span = document.createElement('span');
			span.innerHTML = this.value;
			span.className = 'tag';
			span.tabIndex = 0;
			div.insertBefore(tagWrapper, this);
			this.value = "";
			e.preventDefault();

			var close = document.createElement('a');
			close.className = "close";
			close.innerHTML = "&times;";
			close.href = "#";

			close.addEventListener("click", function(){
				 close.parentNode.remove();
			});

			tagWrapper.appendChild(span);
			tagWrapper.appendChild(close);
		}
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
