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
			div.insertBefore(tagWrapper, this);
			this.value = "";
			e.preventDefault();

			var close = document.createElement('a');
			close.className = "close";
			close.innerHTML = "&times;";

			close.addEventListener("click", function(){
				 close.parentNode.remove();
			});

			tagWrapper.appendChild(span);
			tagWrapper.appendChild(close);
		}
	});

	input[i].addEventListener('keydown', function(e){
		if(e.code === 'Backspace') {

			var tag = this.parentNode.querySelector('.tag-wrapper:last-of-type');

			if(tag !== null && this.value === '') {
				e.preventDefault();
				tag.remove();
			}
		}
	});
}
