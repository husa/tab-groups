// @flow

import './Header.scss';

import lang from '../../services/lang';

import React from 'react';

const Header = () => (
  <div className="header">
    <img
      className="header__title"
      src="/assets/title.svg "
      alt={lang.t('headerTitle')} />
  </div>
);

export default Header;
