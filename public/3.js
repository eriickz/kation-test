(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./resources/js/components/User.js":
/*!*****************************************!*\
  !*** ./resources/js/components/User.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../database */ "./resources/js/database.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






function User() {
  var isLogged = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(function (state) {
    return state.isLogged;
  }); //URL PARAM

  var _useParams = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useParams"])(),
      _useParams$id = _useParams.id,
      id = _useParams$id === void 0 ? undefined : _useParams$id;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
      _useState2 = _slicedToArray(_useState, 2),
      name = _useState2[0],
      setName = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
      _useState4 = _slicedToArray(_useState3, 2),
      lastname = _useState4[0],
      setLastname = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
      _useState6 = _slicedToArray(_useState5, 2),
      email = _useState6[0],
      setEmail = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
      _useState8 = _slicedToArray(_useState7, 2),
      password = _useState8[0],
      setPassword = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0),
      _useState10 = _slicedToArray(_useState9, 2),
      userId = _useState10[0],
      setUserId = _useState10[1];

  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState12 = _slicedToArray(_useState11, 2),
      isCompleted = _useState12[0],
      setCompleted = _useState12[1];

  var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState14 = _slicedToArray(_useState13, 2),
      isUpdate = _useState14[0],
      setIsUpdate = _useState14[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (id !== undefined) {
      _database__WEBPACK_IMPORTED_MODULE_3__["getUser"](id).then(function (user) {
        setName(user.name);
        setLastname(user.lastname);
        setEmail(user.email);
        setUserId(id);
        setIsUpdate(true);
      });
    }
  }, []);

  var updateUser = function updateUser(event) {
    event.preventDefault();
    var data = {
      name: name,
      lastname: lastname,
      email: email,
      password: password
    };
    _database__WEBPACK_IMPORTED_MODULE_3__["updateUser"](userId, data).then(function (res) {
      if (res) {
        setCompleted(true);
      }
    });
  };

  var newUser = function newUser(event) {
    event.preventDefault();
    _database__WEBPACK_IMPORTED_MODULE_3__["register"](email, password, name, lastname).then(function (res) {
      if (res) {
        setCompleted(true);
      }
    });
  };

  var deleteUser = function deleteUser(event) {
    event.preventDefault();
    _database__WEBPACK_IMPORTED_MODULE_3__["deleteUser"](userId).then(function (res) {
      if (res) {
        setCompleted(true);
      }
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "container"
  }, (!isLogged || isCompleted) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Redirect"], {
    to: "/usuarios"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row justify-content-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "text-center mb-5 mt-5"
  }, isUpdate ? 'Editar Usuario' : 'Nuevo Usuario'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: function onSubmit(e) {
      return isUpdate ? updateUser(e) : newUser(e);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "name"
  }, "Nombre:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    className: "form-control",
    id: "name",
    value: name,
    onChange: function onChange(e) {
      return setName(e.target.value);
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "name"
  }, "Apellido:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    className: "form-control",
    id: "name",
    value: lastname,
    onChange: function onChange(e) {
      return setLastname(e.target.value);
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "email"
  }, "Email:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "email",
    className: "form-control",
    id: "email",
    value: email,
    onChange: function onChange(e) {
      return setEmail(e.target.value);
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "password"
  }, "Contrase\xF1a:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "password",
    min: "4",
    className: "form-control",
    id: "password",
    onChange: function onChange(e) {
      return setPassword(e.target.value);
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, isUpdate ? "Actualizar Datos" : 'Crear Usuario'), isUpdate && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "btn btn-danger ml-2",
    onClick: function onClick(e) {
      return deleteUser(e);
    }
  }, "Borrar Usuario")))));
}

/* harmony default export */ __webpack_exports__["default"] = (User);

/***/ })

}]);