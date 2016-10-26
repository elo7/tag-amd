
Feature('Tags');

Scenario('should show styled tags only on inputs with the attribute data-tags', (I) => {
	I.amOnPage('/index.html');
	I.waitForElement('.tag-container', 5);
	I.seeElement('.tag-container input[data-tags]');
	I.dontSeeElement('.tag-container input:not([data-tags])');
});

Scenario('should fill field and generate tags', (I) => {
	I.amOnPage('/index.html');
	I.waitForElement('.tag-container', 5);
	I.fillField('.tag-container input[data-tags]', "test");
	I.sendPressKeyEvent('.tag-container input[data-tags]', 'Comma');

	I.waitForElement('.tag-container .tag', 5);
	I.seeElement('.tag-container .tag');
});

Scenario('should remove a tag', (I) => {
	I.amOnPage('/index.html');
	I.waitForElement('.tag-container', 5);

	I.fillField('.tag-container input[data-tags]', "test");
	I.sendPressKeyEvent('.tag-container input[data-tags]', 'Comma');

	I.seeElement('.tag .close');
	I.click('.tag .close');
	I.dontSeeElement('.tag');
});
