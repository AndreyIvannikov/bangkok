/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },
 *
 * @constructor
 */

export default class UserTable {

  constructor(rows) {
    this._rows = rows;
    this._container = null;
    this.btnRemove = null;
    this._render()
  }

  get elem () {
    return this._container;
  }

  _createTable(elem) {
    const table = document.createElement('table');

    table.innerHTML = `
      <thead>
          <tr>
              <th>Имя</th>
              <th>Возраст</th>
              <th>Зарплата</th>
              <th>Город</th>
              <th></th>
          </tr>
      </thead>
      <tbody>
        ${elem}
      </tbody>
    `

    return table;
  }

  _createBodyTable() {
    return this._rows.map(({age, name, salary, city}) => {
      return `<tr>
                <td>${name}</td>
                <td>${age}</td>
                <td>${salary}</td>
                <td>${city}</td>
                <td><button class = 'remove'>X</button></td>
               </tr>
             `;
    }).join('');
  }

  _render() {
    this._container = this._createTable(this._createBodyTable())
    this._addListener();
  }

  _addListener() {
    this.btnRemove = this._container.querySelectorAll('button');

    this.btnRemove.forEach(btn => {
      btn.addEventListener('click', this.destroy);
    });
  }

  destroy = (event) => {
    event.target.removeEventListener('click', this.destroy);
    event.target.closest('tr').remove();
  }

}

