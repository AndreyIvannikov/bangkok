"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createElement = _interopRequireDefault(require("../../assets/lib/create-element.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CartIcon =
/*#__PURE__*/
function () {
  function CartIcon() {
    _classCallCheck(this, CartIcon);

    this.elem = null;

    this._render();

    this.addEventListeners();
    this._initialTopCoord = null;
    this.container = this.elem;
  }

  _createClass(CartIcon, [{
    key: "_render",
    value: function _render() {
      this.elem = (0, _createElement["default"])('<div class="cart-icon"></div>');
    }
  }, {
    key: "update",
    value: function update(cart) {
      var _this = this;

      if (!cart.isEmpty()) {
        this.elem.classList.add('cart-icon_visible');
        this.elem.innerHTML = "\n        <div class=\"cart-icon__inner\">\n          <span class=\"cart-icon__count\">".concat(cart.getTotalCount(), "</span>\n          <span class=\"cart-icon__price\">\u20AC").concat(cart.getTotalPrice().toFixed(2), "</span>\n        </div>");
        this.updatePosition();
        this.elem.classList.add('shake');
        this.elem.addEventListener('transitionend', function () {
          _this.elem.classList.remove('shake');
        }, {
          once: true
        });
      } else {
        this.elem.classList.remove('cart-icon_visible');
      }
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this2 = this;

      document.addEventListener('scroll', function () {
        return _this2.updatePosition();
      });
      window.addEventListener('resize', function () {
        return _this2.updatePosition();
      });
    }
  }, {
    key: "updatePosition",
    value: function updatePosition() {
      if (!this._initialTopCoord) {
        this._initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset;
      }

      this.leftIndent = Math.min(document.querySelector('.container').getBoundingClientRect().right + 20, document.documentElement.clientWidth - this.elem.offsetWidth - 10) + 'px';

      if (window.pageYOffset > this._initialTopCoord) {
        this._fixedPosition();
      } else {
        this._resetPosition();
      }

      if (document.documentElement.clientWidth <= 768) {
        this._resetPosition();
      }
    }
  }, {
    key: "_fixedPosition",
    value: function _fixedPosition() {
      Object.assign(this.elem.style, {
        position: 'fixed',
        top: "50px",
        left: this.leftIndent,
        zIndex: '1000'
      });
    }
  }, {
    key: "_resetPosition",
    value: function _resetPosition() {
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        left: '',
        zIndex: ''
      });
    }
  }]);

  return CartIcon;
}();

exports["default"] = CartIcon;