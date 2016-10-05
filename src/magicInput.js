var input = document.querySelectorAll("input[data-tags]");

for (var i=0, length=input.length; i < length; i++) {
	var div = document.createElement('div');
	div.className = 'tag-container';

	var parent = input[i].parentNode;
	parent.insertBefore(div, input[i]);
	div.appendChild(input[i]);
}
