
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
	I.pressKey(',');
	I.waitForElement('.tag-container .tag', 5);
	I.seeElement('.tag-container .tag');
});
