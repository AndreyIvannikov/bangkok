import createElement from '../../assets/lib/create-element.js';
import _createSlider from './slider-create.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this._container = null;
    this._steps = steps;
    this._value = value;
    this.sliderValue = null;
    this.sliderThumb = null;
    this.sliderProgress = null;
    this._render();
  }

  _render() {
    this._container = createElement(_createSlider(this._steps));
    this.listener();
  }

  listener() {
    this.sliderValue = this._container.querySelector('.slider__value');
    this.sliderThumb = this._container.querySelector('.slider__thumb');
    this.sliderProgress = this._container.querySelector('.slider__progress');
    this.span = this._container.querySelectorAll('.slider__steps span')
    this._container.addEventListener('click', this._calculateClickPosition);

    this.span[Number(this.sliderValue.innerHTML)].classList.add('slider__step-active');
  }

  _calculateClickPosition = (event) => {
    const segments = this._steps - 1;
    const left = event.clientX - this._container.getBoundingClientRect().left;
    const approximateValue = left / this._container.offsetWidth * segments;
    this._value = Math.round(approximateValue);
    let valuePercents = this._value / segments * 100;

    this._settingSliderStyles(valuePercents);
    this._addedCustomEvents(this._value);
  }

  _settingSliderStyles = (valuePercents) => {

    this.span.forEach((span) => {
      span.classList.remove("slider__step-active");
    });
    
    this.span[Number(this._value)].classList.add("slider__step-active")
    this.sliderThumb.style.left = `${valuePercents}%`;
    this.sliderProgress.style.width = `${valuePercents}%`;
    this.sliderValue.innerHTML = this._value;
  }

  _addedCustomEvents = (value) => {
    const customEvents = new CustomEvent('slider-change', {
      detail: value,
      bubbles: true
    });
    this._container.dispatchEvent(customEvents);
  }

  get elem() {
    return this._container;
  }

}

