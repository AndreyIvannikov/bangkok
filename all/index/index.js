import Carousel from '../../carousel/carousel-slides/index.js';
import slides from '../../carousel/carousel-slides/slides.js';

import RibbonMenu from '../../ribbon-menu/ribbon-menu/index.js';
import categories from '../../ribbon-menu/ribbon-menu/categories.js';

import StepSlider from '../../ribbon-menu/step-slider/index.js';
import ProductsGrid from '../../cart/product-grid/index.js';

import CartIcon from '../../cart/cart-icon/index.js';
import Cart from '../../cart/cart-position/index.js';

export default class Main {

  constructor() {
    this._carousel = new Carousel(slides);
    this._ribbonMenu = new RibbonMenu(categories);
    this._stepSlider = new StepSlider({steps: 5, value: 3});
    this._cartIcon = new CartIcon();
    this._cart = new Cart(this._cartIcon);
    this.products = null;
    this.render();
    this._customEvent();
  }

  async render() {
    this._select('[data-carousel-holder]').append(this._carousel.elem);
    this._select('[data-ribbon-holder]').append(this._ribbonMenu.elem);
    this._select('[data-slider-holder]').append(this._stepSlider.elem);
    this._select('[data-cart-icon-holder]').append(this._cartIcon.container);

    try {
      const url = './products.json';
      let response = await fetch(url);
      if (response.ok) {
        this.products = await response.json();
        this._select('[data-products-grid-holder]').innerHTML = '';
        this._productGrid = new ProductsGrid(this.products);
        this._select('[data-products-grid-holder]').append(this._productGrid.elem);
      } else {
        throw new Error('Ошибка получения данных с сервера повтроите попытку позже')
      }
    } catch (e) {
      this._select('[data-products-grid-holder]').innerHTML = e.message;
    }
  }

  _customEvent = () => {
    document.body.addEventListener('product-add', (event) => {
      const productFilter = this.products.find(item => {
        return item.id === event.detail;
      })
      this._cart.addProduct(productFilter);
    })

    this._stepSlider.elem.addEventListener('slider-change', (event) => {
      this._productGrid.updateFilter({
        maxSpiciness: event.detail
      })
    })

    this._ribbonMenu.elem.addEventListener('ribbon-select', (event) => {
      this._productGrid.updateFilter({
        category: event.detail
      })
    })

    document.querySelector('#nuts-checkbox').onchange = (event) => {
      this._productGrid.updateFilter({
        noNuts: event.target.checked
      })
    }

    document.querySelector('#vegeterian-checkbox').onchange = (event) => {
      this._productGrid.updateFilter({
        vegeterianOnly: event.target.checked
      })
    }
  }

  _select(selector) {
    return document.querySelector(selector);
  }

}
