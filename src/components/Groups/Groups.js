// @flow

import './Groups.scss';

import * as React from 'react';
import autobind from 'autobindr';

import lang from '../../services/lang';
import analytics from '../../services/analytics';
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
  };

  constructor() {
    super();
    autobind(this);
  }

  onGroupEditClick(group: GroupT) {
    this.setState(state => ({
      editGroups: state.editGroups.concat([group])
    }));
  }

  onGroupEditCancel(group: GroupT) {
    this.setState(state => ({
      editGroups: state.editGroups.filter(({id}) => id !== group.id)
    }));
  }

  onGroupUpdate(group: GroupT, name: string) {
    this.onGroupEditCancel(group);
    this.props.renameGroup(group.id, name);
    analytics.groupRenamed();
  }

  onGroupDelete(group: GroupT) {
    this.onGroupEditCancel(group);
    this.props.deleteGroup(group.id);
    analytics.groupDeleted();
  }

  render() {
    const {groups, ...rest} = this.props;

    const list = groups.map(group => {
      if (this.state.editGroups.find(({id}) => id === group.id)) {
        return (
          <GroupEdit
            key={group.id}
            group={group}
            onSave={this.onGroupUpdate.bind(this, group)}
            onCancel={this.onGroupEditCancel.bind(this, group)}
            onDelete={this.onGroupDelete.bind(this, group)}
          />
        );
      }
      return (
        <Group
          key={group.id}
          group={group}
          showTabCountBadge={false}
          onGroupEdit={this.onGroupEditClick.bind(this, group)}
          onTabRemove={this.props.deleteTab}
          {...rest}
        />
      );
    });

    if (!list.length) {
      return (
        <div className="groups groups--empty">
          {lang
            .t('groupsNoGroups')
            .split('\n')
            .map((str, i) => (
              <span key={`${str}-${i}`}>
                {str}
                <br />
              </span>
            ))}
        </div>
      );
    }

    return <div className="groups">{list}</div>;
  }
}

export default Groups;
