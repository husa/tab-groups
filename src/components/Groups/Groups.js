// @flow

import './Groups.scss';

import React from 'react';

import Group from '../Group/Group';
import type {Group as GroupT} from '../../types';

type Props = {|
  groups: Array<GroupT>,
  onTabRemove: (groupId: string, tabId: string) => void
|};

const Groups = ({groups, ...rest}: Props) => {
  const list = groups.map(group => (
    <Group key={group.id} group={group} {...rest} />
  ));

  if (!list.length) {
    return (
      <div className="groups groups--empty">
        You don&#39;t have any groups yet. <br />
        Go ahead, and create your first group.
      </div>
    );
  }

  return (
    <div className="groups">
      {list}
    </div>
  );
};

export default Groups;
