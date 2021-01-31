
export default function _createSlider(steps) {
  return `
  <div class = 'slider'>
  <div class="slider__thumb" style="left: 0;">
    <span class="slider__value">0</span>
  </div>

  <div class="slider__progress" style="width: 0;"></div>
  <div class="slider__steps">
    ${_stepsSlider(steps)}
  </div>
  </div>
  `

}

const _stepsSlider = (steps) => {
  let arr = [];
  for (let i = 0; i < steps; i++) {
    arr.push(` <span></span>`);
  }
  return arr.join('');
}
