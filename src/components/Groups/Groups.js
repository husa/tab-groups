// @flow

import './Groups.scss';

import * as React from 'react';
import autobind from 'autobindr';

import Group from '../Group/Group';
import GroupEdit from '../GroupEdit/GroupEdit';
import type {Group as GroupT} from '../../types';


type Props = {|
  groups: Array<GroupT>,
  renameGroup: (id: string, name: string) => void,
  deleteGroup: (id: string) => void,
  deleteTab: (groupId: string, tabId: string) => void
|};

type State = {
  editGroups: Array<GroupT>
};

class Groups extends React.Component<Props, State> {
  state = {
    editGroups: []
  }

  constructor () {
    super();
    autobind(this);
  }

  onGroupEditClick (group: GroupT) {
    this.setState(state => ({
      editGroups: state.editGroups.concat([group])
    }));
  }

  onGroupEditCancel (group: GroupT) {
    this.setState(state => ({
      editGroups: state.editGroups.filter(({id}) => id !== group.id)
    }));
  }

  onGroupUpdate (group: GroupT, name: string) {
    this.onGroupEditCancel(group);
    this.props.renameGroup(group.id, name);
  }

  onGroupDelete (group: GroupT) {
    this.onGroupEditCancel(group);
    this.props.deleteGroup(group.id);
  }

  render () {
    const {groups, ...rest} = this.props;

    const list = groups.map(group => {
      if (this.state.editGroups.find(({id}) => id === group.id)) {
        return (
          <GroupEdit
            key={group.id}
            group={group}
            onSave={this.onGroupUpdate.bind(this, group)}
            onCancel={this.onGroupEditCancel.bind(this, group)}
            onDelete={this.onGroupDelete.bind(this, group)} />
        );
      }
      return (
        <Group
          key={group.id}
          group={group}
          onGroupEdit={this.onGroupEditClick.bind(this, group)}
          onTabRemove={this.props.deleteTab}
          {...rest} />
      );
    });

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
  }
}

export default Groups;
