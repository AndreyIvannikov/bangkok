import createElement from '../../assets/lib/create-element.js';
import createCarouselElement from './create-card.js';

export default class Carousel {
  constructor(slides) {
    this._DEFAULT_WIDTH = 980;
    this._slides = slides;
    this._container = null;
    this._containerTransition = null;
    this._position = 0;
    this._widthCarouselTransition = null;
    this._containerWidth = null;
    this._carouselContainer = null;
    this._carouselLength = null;
    this._buttonNext = null;
    this._buttonPrev = null;

    this.render();
    this._getElementCarousel();
  }

  render() {
    this._container = createElement(createCarouselElement(this._slides));
    this._containerTransition = this._container.querySelector('.carousel__inner');
  }

  get elem() {
    return this._container || createElement(`<h2>Неизвестная ошибка</h2>`);
  }

  carouselTransition() {
    this._containerTransition.style.transform = `translateX(${this._position}px)`;
  }

  checkPosition() {
    if (this._position >= 0) {
      this._buttonPrev.style.display = 'none';
    } else {
      this._buttonPrev.style.display = 'flex';
    }

    if (Math.abs(this._position) >= this._containerWidth) {
      this._buttonNext.style.display = 'none';
    } else {
      this._buttonNext.style.display = 'flex';
    }
  }

  _getElementCarousel = () => {
    this._buttonNext = this._container.querySelector('.carousel__arrow_right');
    this._buttonPrev = this._container.querySelector('.carousel__arrow_left');
    this._buttonAddToCart = this._container.querySelectorAll('.carousel__button');
    this._carouselLength = this._container.querySelectorAll('.carousel__slide').length ;

    this._buttonPrev.style.display = 'none';

    this._buttonNext.addEventListener('click', this._onCarouselButtonNext);
    this._buttonPrev.addEventListener('click', this._onCarouselButtonPrev);

    this._buttonAddToCart.forEach(btn => {
      btn.addEventListener('click', this._onCarouselButtonClickAdd);
    });
  }

  _onCarouselButtonNext = () => {
    if (!this._widthCarouselTransition) {
      this._widthCarouselTransition = document.querySelector('.carousel__inner').clientWidth;
      this._containerWidth = (this._carouselLength - 1) * this._widthCarouselTransition;
    }

    this._position -= this._widthCarouselTransition || this._DEFAULT_WIDTH;
    this.carouselTransition();
    this.checkPosition();
  }

  _onCarouselButtonPrev = () => {
    this._position += this._widthCarouselTransition || this._DEFAULT_WIDTH;
    this.carouselTransition();
    this.checkPosition();
  }

  _onCarouselButtonClickAdd = (event) => {
    const events = new CustomEvent("product-add", {
      bubbles: true,
      detail: event.currentTarget.dataset.id,
    });
    this.elem.dispatchEvent(events);
  }

}
