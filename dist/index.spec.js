"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var verifyComponent = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(WrappedPage) {
        var props, component, tree;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return WrappedPage.getInitialProps();

                    case 2:
                        props = _context.sent;


                        expect(props.initialProps.custom).toBe('custom');
                        expect(props.initialState.reduxStatus).toBe('foo');

                        // this is called by Next.js
                        component = _reactTestRenderer2.default.create(_react2.default.createElement(WrappedPage, props));
                        tree = component.toJSON();

                        expect(tree).toMatchSnapshot();

                    case 8:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function verifyComponent(_x2) {
        return _ref3.apply(this, arguments);
    };
}();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _redux = require("redux");

var _reduxPromiseMiddleware = require("redux-promise-middleware");

var _reduxPromiseMiddleware2 = _interopRequireDefault(_reduxPromiseMiddleware);

var _reactTestRenderer = require("react-test-renderer");

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { reduxStatus: 'init' };
    var action = arguments[1];

    switch (action.type) {
        case 'FOO': // sync
        case 'FOO_FULFILLED':
            // async
            return { reduxStatus: action.payload };
        default:
            return state;
    }
};

var makeStore = function makeStore(initialState) {
    return (0, _redux.createStore)(reducer, initialState, (0, _redux.applyMiddleware)((0, _reduxPromiseMiddleware2.default)()));
};

var SyncPage = function (_React$Component) {
    (0, _inherits3.default)(SyncPage, _React$Component);

    function SyncPage() {
        (0, _classCallCheck3.default)(this, SyncPage);
        return (0, _possibleConstructorReturn3.default)(this, (SyncPage.__proto__ || (0, _getPrototypeOf2.default)(SyncPage)).apply(this, arguments));
    }

    (0, _createClass3.default)(SyncPage, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "div",
                    { className: "redux" },
                    this.props.reduxStatus
                ),
                _react2.default.createElement(
                    "div",
                    { className: "custom" },
                    this.props.custom
                )
            );
        }
    }], [{
        key: "getInitialProps",
        value: function getInitialProps(_ref) {
            var store = _ref.store;

            store.dispatch({ type: 'FOO', payload: 'foo' });
            return { custom: 'custom' };
        }
    }]);
    return SyncPage;
}(_react2.default.Component);

function someAsyncAction() {
    return {
        type: 'FOO',
        payload: new _promise2.default(function (res) {
            res('foo');
        })
    };
}

var AsyncPage = function (_SyncPage) {
    (0, _inherits3.default)(AsyncPage, _SyncPage);

    function AsyncPage() {
        (0, _classCallCheck3.default)(this, AsyncPage);
        return (0, _possibleConstructorReturn3.default)(this, (AsyncPage.__proto__ || (0, _getPrototypeOf2.default)(AsyncPage)).apply(this, arguments));
    }

    (0, _createClass3.default)(AsyncPage, null, [{
        key: "getInitialProps",
        value: function getInitialProps(_ref2) {
            var store = _ref2.store;

            var action = someAsyncAction();
            store.dispatch(action);
            return action.payload.then(function (payload) {
                return { custom: 'custom' };
            });
        }
    }]);
    return AsyncPage;
}(SyncPage);

test('simple store integration', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var WrappedPage;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    WrappedPage = (0, _index2.default)(makeStore, function (state) {
                        return state;
                    })(SyncPage);
                    _context2.next = 3;
                    return verifyComponent(WrappedPage);

                case 3:
                case "end":
                    return _context2.stop();
            }
        }
    }, _callee2, undefined);
})));

test('async store integration', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var WrappedPage;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    WrappedPage = (0, _index2.default)(makeStore, function (state) {
                        return state;
                    })(AsyncPage);
                    _context3.next = 3;
                    return verifyComponent(WrappedPage);

                case 3:
                case "end":
                    return _context3.stop();
            }
        }
    }, _callee3, undefined);
})));

var spyLog = jest.spyOn(global.console, 'log');

describe('createStore', function () {
    beforeEach(function () {
        spyLog.mockReset();
    });

    afterEach(function () {
        delete window.__NEXT_REDUX_STORE__;
    });

    test('simple props', function () {
        var App = function App(_ref6) {
            var foo = _ref6.foo;
            return _react2.default.createElement(
                "div",
                null,
                foo
            );
        };
        var WrappedApp = (0, _index2.default)(makeStore, function (state) {
            return state;
        })(App);
        var component = _reactTestRenderer2.default.create(_react2.default.createElement(WrappedApp, { foo: "foo" }));
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('advanced props', function () {
        var App = function App(_ref7) {
            var foo = _ref7.foo;
            return _react2.default.createElement(
                "div",
                null,
                foo
            );
        };
        var WrappedApp = (0, _index2.default)({ createStore: makeStore, mapStateToProps: function mapStateToProps(state) {
                return state;
            } })(App);
        var component = _reactTestRenderer2.default.create(_react2.default.createElement(WrappedApp, { foo: "foo" }));
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('debug mode from options', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var App, WrappedApp, component;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        App = function App(_ref9) {
                            var foo = _ref9.foo;
                            return _react2.default.createElement(
                                "div",
                                null,
                                foo
                            );
                        };

                        WrappedApp = (0, _index2.default)({
                            createStore: function createStore(initialState, options) {
                                expect(options.debug).toBe(true);
                                return (0, _redux.createStore)(reducer, initialState, (0, _redux.applyMiddleware)((0, _reduxPromiseMiddleware2.default)()));
                            },
                            debug: true
                        })(App);
                        component = _reactTestRenderer2.default.create(_react2.default.createElement(WrappedApp, null));
                        _context4.next = 5;
                        return WrappedApp.getInitialProps();

                    case 5:
                        expect(spyLog).toHaveBeenCalledTimes(3);
                        expect(component.toJSON()).toMatchSnapshot();

                    case 7:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    })));

    test('debug mode with setDebug method', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        var App, WrappedApp, component;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        App = function App(_ref11) {
                            var foo = _ref11.foo;
                            return _react2.default.createElement(
                                "div",
                                null,
                                foo
                            );
                        };

                        _index2.default.setDebug(true);
                        WrappedApp = (0, _index2.default)(function (initialState, options) {
                            expect(options.debug).toBe(true);
                            return (0, _redux.createStore)(reducer, initialState, (0, _redux.applyMiddleware)((0, _reduxPromiseMiddleware2.default)()));
                        })(App);
                        component = _reactTestRenderer2.default.create(_react2.default.createElement(WrappedApp, null));
                        _context5.next = 6;
                        return WrappedApp.getInitialProps();

                    case 6:
                        expect(spyLog).toHaveBeenCalledTimes(3);
                        expect(component.toJSON()).toMatchSnapshot();

                    case 8:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    })));

    test('should throw if no createStore method', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        var App;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        App = function App(_ref13) {
                            var foo = _ref13.foo;
                            return _react2.default.createElement(
                                "div",
                                null,
                                foo
                            );
                        };

                        expect(function () {
                            return (0, _index2.default)({
                                debug: true
                            })(App);
                        }).toThrow();

                    case 2:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    })));

    test('should be able to configure store key on window', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
        var App, WrappedApp, component;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        App = function App(_ref15) {
                            var foo = _ref15.foo;
                            return _react2.default.createElement(
                                "div",
                                null,
                                foo
                            );
                        };

                        WrappedApp = (0, _index2.default)({
                            createStore: makeStore,
                            storeKey: 'TESTKEY'
                        })(App);
                        component = _reactTestRenderer2.default.create(_react2.default.createElement(WrappedApp, null));
                        _context7.next = 5;
                        return WrappedApp.getInitialProps();

                    case 5:
                        expect(window.__NEXT_REDUX_STORE__).not.toBeDefined();
                        expect(window.TESTKEY).toBeDefined();
                        expect(component.toJSON()).toMatchSnapshot();
                        delete window.TESTKEY;

                    case 9:
                    case "end":
                        return _context7.stop();
                }
            }
        }, _callee7, undefined);
    })));

    test('should memoize store on client in window', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
        var App, App1, App2;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        App = function App(_ref17) {
                            var foo = _ref17.foo;
                            return _react2.default.createElement(
                                "div",
                                null,
                                foo
                            );
                        };

                        App1 = (0, _index2.default)(makeStore, function (state) {
                            return state;
                        })(App);

                        _reactTestRenderer2.default.create(_react2.default.createElement(App1, null));
                        expect(window.__NEXT_REDUX_STORE__).toBeDefined();
                        App2 = (0, _index2.default)(function (initialState, options) {
                            throw new Error('New store should not be created!');
                        }, function (state) {
                            return state;
                        })(App);

                        _reactTestRenderer2.default.create(_react2.default.createElement(App2, { foo: "foo" }));
                        expect(window.__NEXT_REDUX_STORE__).toBeDefined();

                    case 7:
                    case "end":
                        return _context8.stop();
                }
            }
        }, _callee8, undefined);
    })));
});