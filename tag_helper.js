
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

  sendKeypressEvent(selector, code) {
    return this.helpers['WebDriverIO'].executeScript(function(selector, code) {
      var input = document.querySelector(selector);
      var event = new Event("keypress");
      event.code = code;
      input.dispatchEvent(event);
    }, selector, code);
  }

  sendKeydownEvent(selector, code) {
    return this.helpers['WebDriverIO'].executeScript(function(selector, code) {
      var input = document.querySelector(selector);
      var event = new Event("keydown");
      event.code = code;
      input.dispatchEvent(event);
      if(code === 'Backspace') {
        input.value = input.value.substr(0, input.value.length -1);
      }
    }, selector, code);
  }

  sendKeyupEvent(selector, code) {
    return this.helpers['WebDriverIO'].executeScript(function(selector, code) {
      var input = document.querySelector(selector);
      var event = new Event("keyup");
      event.code = code;
      input.dispatchEvent(event);
    }, selector, code);
  }

}

module.exports = Tag;
