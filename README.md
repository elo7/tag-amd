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

In the download package, there will be a JavaScript file (`dist/tag.min.js`) and a CSS file (`dist/tag.min.css`). The CSS file is optional; you may use it as a reference for your own styling.

## Usage

In your HTML file, import the library and its dependencies (assuming you are using *async-define*):

```html
<script src='async-define.js'></script>
<script src='events-amd.js' async></script>
<script src='doc.js' async></script>
<script src='tag.js' async></script>
```

**Important:** `events-amd` its a `doc-amd` [dependency](https://github.com/elo7/doc-amd/#dependencies).

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

- `added(addedTags)`: called when one or more tags are added to the list of tags; receives an array with the new tags as argument
- `removed(removedTag)`: called when a tag is removed from the list; receives the removed tag as argument
- `errorAlreadyExists(tagInput)`: called when the user tries to add a tag that already exists in the list; receives the input as argument
- `errorCleared(tagInput)`: called when the user edits the tag field after an error; receives the input as argument
- `maxlengthExceeded()`: called when the input's maxlength is reached after adding a tag, **not** when the user is typing the tags; receives no arguments

## E2E Tests

For run the end-to-end tests, you can choose one of strategies below:

### dev mode
```bash
$ npm run test:dev
```
Load one instance with the server and open the browser for run the tests.

### cli mode
```bash
$ npm run test
```
Load one instance with the server and run the tests in bash.

## License

tag-amd is released under the [BSD license](https://github.com/elo7/tag-amd/blob/master/LICENSE). Have at it.

---

Copyright ©️ 2017 Elo7# tag-amd
