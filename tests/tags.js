
Feature('Tags');

Scenario('should show styled tags only on inputs with the attribute data-tags', (I) => {
	I.amOnPage('/index.html');
	I.waitForElement('.tag-container', 5);
	I.seeElement('.tag-container input[data-tags]');
	I.dontSeeElement('.tag-container input:not([data-tags])');
});

Scenario('should fill field and generate tags', function*(I) {
	let assert = require('assert');

	I.amOnPage('/index.html');
	I.waitForElement('.tag-container', 5);
	I.fillField('.tag-container input[data-tags]', "test");
	I.sendKeypressEvent('.tag-container input[data-tags]', 'Comma');

	I.waitForElement('.tag-container .tag', 5);
	I.seeNumberOfElements('.tag-container .tag', 1);

	let tag1 = yield I.grabTextFrom('.tag-container .tag');
	assert.equal(tag1, 'test');

	I.fillField('.tag-container input[data-tags]', "test two");
	I.sendKeypressEvent('.tag-container input[data-tags]', 'Enter');

	I.waitForElement('.tag-container .tag', 5);
	I.seeNumberOfElements('.tag-container .tag', 2);

	let tag2 = yield I.grabTextFrom('.tag-container .tag-wrapper:nth-child(2) .tag');
	assert.equal(tag2, 'test two');
});

Scenario('should remove a tag when clicked or backspace is pressed and input empty', (I) => {
	I.amOnPage('/index.html');
	I.waitForElement('.tag-container', 5);

	I.fillField('.tag-container input[data-tags]', "test");
	I.sendKeypressEvent('.tag-container input[data-tags]', 'Comma');

	I.seeElement('.tag-wrapper .close');
	I.click('.tag-wrapper .close');
	I.dontSeeElement('.tag-wrapper');

	I.fillField('.tag-container input[data-tags]', "test");
	I.sendKeypressEvent('.tag-container input[data-tags]', 'Comma');
	I.sendKeydownEvent('.tag-container input[data-tags]', 'Backspace');
	I.dontSeeElement('.tag-wrapper');

	I.fillField('.tag-container input[data-tags]', "test");
	I.sendKeypressEvent('.tag-container input[data-tags]', 'Comma');

	I.fillField('.tag-container input[data-tags]', "aa");
	I.sendKeydownEvent('.tag-container input[data-tags]', 'Backspace');
	I.seeInField('.tag-container input[data-tags]', "a");
	I.seeElement('.tag-wrapper');

	I.sendKeydownEvent('.tag-container input[data-tags]', 'Backspace');
	I.seeInField('.tag-container input[data-tags]', "");
	I.seeElement('.tag-wrapper');

	I.sendKeydownEvent('.tag-container input[data-tags]', 'Backspace');
	I.dontSeeElement('.tag-wrapper');
});


