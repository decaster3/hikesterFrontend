import React from 'react';
import style from './form.scss';

class Create extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="flex-40 content-form events-create">
        <div className="form-group">
          <h4>Название события</h4>
          <input type="text" placeholder="Название"/>
        </div>
        <div className="form-group">
          <h4>Описание</h4>
          <textarea placeholder="Описание.."></textarea>
        </div>
        <div className="filters">
          <div className="tag-filter">
            <h4>Выберите тэг</h4>
            <button className="button tag">Спорт</button>
            <button className="button tag">Развлечение</button>
            <button className="button tag">Туризм</button>
            <button className="button tag">Название</button>
            <button className="button tag">Название</button>
          </div>
          <div className="tag-history">
            <h4>Выбранные тэги</h4>
            <div className="button tag">Название</div>
          </div>
          <h4 className="warning">Поставьте метку события на карте</h4>
          <button className="button submit">Создать событие</button>
        </div>
      </div>
    );
  }

}

export default Create;
