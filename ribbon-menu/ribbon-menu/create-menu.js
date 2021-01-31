export default function(categories) {
  return `
  <div class="ribbon">
  <!--Кнопка прокрутки влево-->
  <button class="ribbon__arrow ribbon__arrow_left">
    <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
  </button>

  <!--Ссылки на категории-->
  <nav class="ribbon__inner">
    ${
      categories.map((elem) => {
        return `
        <a href="#" class="ribbon__item" data-id="${elem.id}">${elem.name}</a>
        `
      }).join('')
    }
  </nav>

  <!--Кнопка прокрутки вправо-->
  <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
    <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
  </button>
</div>
  `
}
