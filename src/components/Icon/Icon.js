// @flow

import './Icon.scss';

import React from 'react';
import classNames from 'classnames';

type Props = {
  name: string,
  className?: string
};

const Icon = ({name, className}: Props) => (
  <svg className={classNames(className, 'icon')} viewBox="0 0 24 24" widht="24" height="24">
    <use xlinkHref={`#${name}`} />
  </svg>
);

export default Icon;
