"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _httpCommon = _interopRequireDefault(require("../http-common"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAll = function getAll() {
  return _httpCommon["default"].get('/employees');
};

var create = function create(data) {
  return _httpCommon["default"].post("/employees", data);
};

var get = function get(id) {
  return _httpCommon["default"].get("/employees/".concat(id));
};

var update = function update(data) {
  return _httpCommon["default"].put('/employees', data);
};
/*
Just replace field name of object employee by the value +1-555-56
*/


var patch = function patch(id) {
  return _axios["default"].patch("http://localhost:8080/api/v1/".concat(id), [{
    "op": "replace",
    "path": "/name",
    "value": "+1-555-56"
  }], {
    headers: {
      "Content-Type": "application/json-patch+json"
    }
  });
};
/* other examples add  in list favourites value bread in start of list

    [{"op":"add",
    "path":"/favorites/0",
    "value":"Bread"}]

The modified customer details after the add operation would be:

{
    "id":"1",
    "telephone":"001-555-1234",
    "favorites":["Bread","Milk","Eggs"],
    "communicationPreferences": {"post":true, "email":true}
}
remove/empty value 
[{
    "op":"remove",
    "path":"/name"
}] gives path:null

can do several operations:
[
    {"op":"replace","path":"/telephone","value":"+1-555-56"},
    {"op":"add","path":"/favorites/0","value":"Bread"}
]
replace value telephone by +1-555-56
and add value bread to list favorites in start of list (position)

[{
    "op":"copy",
    "from":"/favorites/0",
    "path":"/favorites/-"
}]
copy first value at position 0 to last position of list

Tutorial: https://www.baeldung.com/spring-rest-json-patch
*/


var remove = function remove(id) {
  return _httpCommon["default"]["delete"]("/employees/".concat(id));
};

var _default = {
  getAll: getAll,
  create: create,
  get: get,
  update: update,
  remove: remove,
  patch: patch
};
exports["default"] = _default;