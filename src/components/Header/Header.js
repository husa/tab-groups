// @flow

import './Header.scss';

import lang from '../../services/lang';

import React from 'react';

const Header = () => (
  <div className="header">
    <div className="header__title">
      {lang.t('headerTitle')}
    </div>
  </div>
);

export default Header;
