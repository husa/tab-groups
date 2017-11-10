// @flow

import './Actions.scss';

import * as React from 'react';
import autobind from 'autobindr';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import GroupCreate from '../GroupCreate/GroupCreate';
import GroupSelector from '../GroupSelector/GroupSelector';
import tabs from '../../services/tabs';
import type {Group, UnknownGroup, Tab} from '../../types';


type Props = {
  groups: Array<Group>,
  createNewGroup (group: UnknownGroup): void,
  addTabToGroup (groupId: string, tab: Tab): void
};

type State = {
  showNewGroupForm: boolean,
  showAddTabForm: boolean,

  newGroupName: string,
  newGroupSaveOpenTabs: boolean,

  addTabGroup: ?Group
};

class Actions extends React.Component<Props, State> {
  state = {
    showNewGroupForm: false,
    showAddTabForm: false,

    newGroupName: '',
    newGroupSaveOpenTabs: false,

    addTabGroup: null
  }

  constructor () {
    super();
    autobind(this);
  }

  onCreateNewGroupClick () {
    this.setState({showNewGroupForm: true, showAddTabForm: false});
  }

  onAddTabClick () {
    this.setState({showAddTabForm: true, showNewGroupForm: false});
  }

  onAddTabSaveClick () {
    const {addTabGroup} = this.state;
    if (!addTabGroup) return;
    tabs.getCurrent().then(tab => {
      this.props.addTabToGroup(addTabGroup.id, tab);
    });
    this.setState({showAddTabForm: false, addTabGroup: null});
  }

  onAddTabCancelClick () {
    this.setState({showAddTabForm: false});
  }

  onAddTabGroupSelect (group: Group) {
    this.setState({addTabGroup: group});
  }

  onNewGroupChange (e: SyntheticInputEvent<HTMLInputElement>) {
    const {value} = e.target;
    this.setState({newGroupName: value});
  }

  onNewGroupSave (group: UnknownGroup) {
    this.props.createNewGroup(group);
    this.setState({
      newGroupName: '',
      showNewGroupForm: false
    });
  }

  onNewGroupCancel () {
    this.setState({
      newGroupName: '',
      showNewGroupForm: false
    });
  }

  getNewGroupForm () {
    if (!this.state.showNewGroupForm) return null;
    return (
      <GroupCreate
        name={this.state.newGroupName}
        onChange={this.onNewGroupChange}
        onSave={this.onNewGroupSave}
        onCancel={this.onNewGroupCancel} />
    );
  }

  getAddTabForm () {
    if (!this.state.showAddTabForm) return null;
    return (
      <div className="actions__add-tab">
        <GroupSelector
          groups={this.props.groups}
          onSelect={this.onAddTabGroupSelect} />
        <Button
          type="primary"
          disabled={this.state.addTabGroup === null}
          onClick={this.onAddTabSaveClick}>
          <Icon name="checkmark" />
          Save
        </Button>
        <Button
          type="secondary"
          outline
          onClick={this.onAddTabCancelClick}>
          <Icon name="close" />
          Cancel
        </Button>
      </div>
    );
  }

  render () {
    return (
      <div className="actions">
        <div className="actions__bar">
          <Button
            type="primary"
            onClick={this.onCreateNewGroupClick}>
            <Icon name="plus-box-multiple-outline" />
            New Group
          </Button>
          <Button
            type="primary"
            onClick={this.onAddTabClick}>
            <Icon name="plus-box-outline" />
            Add Tab to Group
          </Button>
        </div>
        <div className="actions__content">
          {this.getNewGroupForm()}
          {this.getAddTabForm()}
        </div>
      </div>
    );
  }
}

export default Actions;
