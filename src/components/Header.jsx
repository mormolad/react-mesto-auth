import React from 'react';

import logoHeader from '../images/logo-header.svg';
function Header({ element }) {
  return (
    <header className="header">
      <img src={logoHeader} className="header__logo" alt="логотип сайта" />
      {element}
    </header>
  );
}

export default Header;
