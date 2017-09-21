import React from 'react';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <header>
        <input type="checkbox" id="menu-toggle" className="hidden"/>
        <nav className="container">
          <div className="header-menu">
            <ul className="list-unstyled">
              <li className="logo"><a href="/"><img src="/assets/images/hikester_logo.png" className="logo-image"/></a></li>
              <ul className="menu-items">
                <li><a href="/">Search Events<i className="fa fa-chevron-left" aria-hidden="true"></i></a></li>

              </ul>
            </ul>
          </div>
          <div className="header-menu header-menu-right">
            <ul className="menu-items">
              <li className="button-menu"><a id="create-event-button" href="/create">Создать событие<i className="fa fa-chevron-left" aria-hidden="true"></i></a></li>
              <li className="button-menu"><a id="create-event-button" href="/profile">Профиль<i className="fa fa-chevron-left" aria-hidden="true"></i></a></li>
              <li className="button-menu"><a id="create-event-button" href="/login">Авторизация<i className="fa fa-chevron-left" aria-hidden="true"></i></a></li>
            </ul>
          </div>
          <div className="header-menu-right hidden-sm hidden-md hidden-lg">
            <ul>
              <li>
                <label htmlFor="menu-toggle">
                  <i className="fa fa-bars fa-2x menu-toggle-button" aria-hidden="true"></i>
                </label>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }

}

export default Navbar;
