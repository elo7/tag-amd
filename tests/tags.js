
Feature('Tags');

Scenario('should show styled tag on input', (I) => {
	I.amOnPage('/index.html');
	I.waitForElement('.tag-container', 5);
	I.seeElement('.tag-container input[data-tags]');
});
