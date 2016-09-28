
Feature('Tags');

Scenario('should show styled tag on input', (I) => {
	I.amOnPage('/index.html');
	I.seeElement('input');
});
