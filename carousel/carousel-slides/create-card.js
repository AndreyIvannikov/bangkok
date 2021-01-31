
export default function (data) {
  return `
  <div class="carousel">

  <div class="carousel__arrow carousel__arrow_right">
    <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
  </div>
  <div class="carousel__arrow carousel__arrow_left">
    <img src="../../assets/images/icons/angle-left-icon.svg" alt="icon">
  </div>

  <div class="carousel__inner">
    ${
      data.map((elem) => {
        return `
        <div class="carousel__slide" >
        <img src="../../assets/images/carousel/${elem.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${elem.price.toFixed(2)}</span>
          <div class="carousel__title">${elem.name}</div>
          <button type="button" class="carousel__button" data-id="${elem.id}">
            <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
        </div>
        `
      }).join('')
    }

  </div>
  `
}
