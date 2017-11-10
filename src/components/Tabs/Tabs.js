// @flow

import React from 'react';

import Tab from '../Tab/Tab';
import type {Tab as TabT} from '../../types';

type Props = {
  tabs: Array<TabT>
};

const Tabs = ({tabs, ...rest}: Props) => {
  const list = tabs.map((tab, i) => (
    <Tab key={i} tab={tab} {...rest} />
  ));

  return (
    <div className="tabs">
      {list}
    </div>
  );
};

export default Tabs;
