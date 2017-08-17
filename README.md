# tag-amd

Transform an input into a tag container.

## Dependencies

tag-amd depends on an AMD loader (we recommend [async-define](http://elo7.github.io/async-define/)) and on [doc-amd](http://elo7.github.io/doc-amd/).

## Installation

You can use either `bower` or `npm` (preferred) to install it into your project:

```
bower install tag-amd
npm install elo7-tag-amd
```

In the download package, there will be a JavaScript file (`tag.js`) and a CSS file (`tag.css`). The JavaScript file is not minified, but we strongly recommend minifying it before production usage. The CSS file is optional; you may use it as a reference for your own styling.

## Usage

In your HTML file, import the library and its dependencies (assuming you are using *async-define*):

```html
<script src='async-define.js'></script>
<script src='events-amd.js' async></script>
<script src='doc.js' async></script>
<script src='tag.js' async></script>
```

Create a form control for your user to type the tags using either `<input>` or `<textarea>`:

```html
<label for='my-tag-field'>Type your tags here</label>
<input id='my-tag-field'>
```

**Important:** do **not** put the tag field inside a `<label>` element!

Then, in your own JavaScript files, transform the input into a tag field:

```javascript
define(['tag'], function(tag) {
	tag.tagify('#my-tag-field');
});
```

You may optionally specify callbacks by passing an object as second argument:

```javascript
define(['tag'], function(tag) {
	tag.tagify('#my-tag-field', {
		added: function(addedTags) {
			console.log('Hey! Here is an array of new tags for you', addedTags);
		}
	});
});
```

## API

```javascript
tag.tagify(cssSelector, options)
```

where `options` is an object that may contain the following callbacks:

- `added`
- `removed`
- `error`
- `errorCleared`
- `maxlengthExceeded`

## License

tag-amd is released under the [BSD license](https://github.com/elo7/tag-amd/blob/master/LICENSE). Have at it.

---

Copyright ©️ 2017 Elo7# tag-amd