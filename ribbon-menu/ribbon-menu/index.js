import createElement from '../../assets/lib/create-element.js';
import _createMenu from './create-menu.js';


export default class RibbonMenu {
  constructor(categories) {
    this._categories = categories;
    this._container = null;
    this._ribbonInner = null;
    this._btnPrev = null;
    this._btnNext = null;
    this._clientWidth = null;
    this._linkMenuActive = null;

    this._scrollRight = null;
    this._scrollLeft = 0;
    this._render();
  }

  get elem() {
    return this._container;
  }

  _render() {
    const template = createElement(_createMenu(this._categories));
    this._container = template;
    this._listener();
  }

  _listener() {
    this._btnPrev = this._container.querySelector('.ribbon__arrow_left');
    this._btnNext = this._container.querySelector('.ribbon__arrow_right');
    this._linkMenuActive = this._container.querySelectorAll('.ribbon__item');
    this._container.addEventListener('click', this._checkItemActiveMenu);

    this._btnNext.addEventListener('click', this._scrollPositionRight);
    this._btnPrev.addEventListener('click', this._scrollPositionLeft);
  }

  _scrollPositionRight = () => {
    if (!this._ribbonInner) {
      this._ribbonInner = document.querySelector('.ribbon__inner');
    }

    this._ribbonInner.scrollBy(350, 0);
    this._checkScrollPosition();
  }

  _scrollPositionLeft = () => {
    this._ribbonInner.scrollBy(-350, 0);
    this._checkScrollPosition();
  }

  _checkScrollPosition() {
    this._ribbonInner.addEventListener('scroll', (event) => {
      this._checkScrollPositionLeft();
      this._checkScrollPositionRight();
    });
  }

  _checkScrollPositionLeft = () => {
    if (this._ribbonInner.scrollLeft === 0) {
      this._btnPrev.classList.remove('ribbon__arrow_visible');
    } else {
      this._btnPrev.classList.add('ribbon__arrow_visible');
    }
  }

  _checkScrollPositionRight = () => {
    this._scrollRight = this._ribbonInner.scrollWidth - this._ribbonInner.scrollLeft - this._ribbonInner.clientWidth;
    if (this._scrollRight < 1) {
      this._btnNext.classList.remove('ribbon__arrow_visible');
    } else {
      this._btnNext.classList.add('ribbon__arrow_visible');
    }
  }

  _checkItemActiveMenu = (event) => {

    this._linkMenuActive.forEach(link => {
      link.classList.remove('ribbon__item_active');
    });

    if (event.target.classList.contains('ribbon__item')) {
      event.preventDefault();
      event.target.classList.add('ribbon__item_active');
      this._addedCustomEvent(event);
    }
  }

  _addedCustomEvent = (event) => {
    const customEvent = new CustomEvent('ribbon-select', {
      detail: event.target.dataset.id,
      bubbles: true
    });
    this._container.dispatchEvent(customEvent);
  }

}


