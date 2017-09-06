"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var makeStore = function makeStore(initialState) {
    return (0, _redux.createStore)(function (s) {
        return s;
    }, initialState, (0, _redux.applyMiddleware)((0, _reduxPromiseMiddleware2.default)()));
}; /**
    * @jest-environment node
    */

describe('createStore', function () {
    describe('On the server', function () {
        test('should create new store for server each time', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var mock, App, WrappedApp, component;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            mock = jest.fn().mockReturnValue(makeStore({}));

                            App = function App(_ref2) {
                                var foo = _ref2.foo;
                                return _react2.default.createElement(
                                    "div",
                                    null,
                                    foo
                                );
                            };

                            WrappedApp = (0, _index2.default)(mock)(App);
                            component = _reactTestRenderer2.default.create(_react2.default.createElement(WrappedApp, { store: makeStore({}) }));
                            _context.next = 6;
                            return WrappedApp.getInitialProps({
                                req: {}
                            });

                        case 6:
                            expect(component.toJSON()).toMatchSnapshot();
                            _context.next = 9;
                            return WrappedApp.getInitialProps({
                                req: {}
                            });

                        case 9:
                            expect(mock).toHaveBeenCalledTimes(2);

                        case 10:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        })));

        test('setup store on server and use next.js page context params', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            var App, WrappedApp, component;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            App = function App(_ref4) {
                                var foo = _ref4.foo;
                                return _react2.default.createElement(
                                    "div",
                                    null,
                                    foo
                                );
                            };

                            WrappedApp = (0, _index2.default)({
                                createStore: function createStore(initialState, options) {
                                    expect(options.isServer).toBe(true);
                                    expect(options.query).toBeDefined();
                                    expect(options.req).toBeDefined();
                                    return (0, _redux.createStore)(function (s) {
                                        return s;
                                    }, initialState, (0, _redux.applyMiddleware)((0, _reduxPromiseMiddleware2.default)()));
                                }
                            })(App);
                            component = _reactTestRenderer2.default.create(_react2.default.createElement(WrappedApp, { store: makeStore({}) }));
                            _context2.next = 5;
                            return WrappedApp.getInitialProps({
                                req: {},
                                query: {}
                            });

                        case 5:
                            expect(component.toJSON()).toMatchSnapshot();

                        case 6:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        })));
    });
});