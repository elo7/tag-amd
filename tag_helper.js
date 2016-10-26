
'use strict';

class Tag extends Helper {

  // before/after hooks
  _before() {
    // remove if not used
  }

  _after() {
    // remove if not used
  }

  // add custom methods here
  // If you need to access other helpers
  // use: this.helpers['helperName']

  sendPressKeyEvent(selector, code) {
    return this.helpers['WebDriverIO'].executeScript(function(selector, code) {
      var input = document.querySelector(selector);
      var event = new Event("keypress");
      event.code = code;
      input.dispatchEvent(event);
    }, selector, code);
  }
}

module.exports = Tag;
