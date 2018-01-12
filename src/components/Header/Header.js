// @flow

import './Header.scss';
import React from 'react';

import lang from '../../services/lang';


const Header = () => (
  <div className="header">
    <img
      className="header__title"
      src="/assets/title.svg "
      alt={lang.t('headerTitle')} />
    {ENV === 'development' ? <span className="header__dev">dev</span> : null}
  </div>
);

export default Header;
