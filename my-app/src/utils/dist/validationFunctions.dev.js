"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emailValidation = void 0;

var emailValidation = function emailValidation(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!email || re.test(email) === false) {
    return false;
  }

  return true;
};

exports.emailValidation = emailValidation;