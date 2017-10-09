import './Actions.scss';

import React from 'react';
import autobind from 'autobindr';

import Button from '../Button/Button';
import GroupEditor from '../GroupEditor/GroupEditor';
import GroupSelector from '../GroupSelector/GroupSelector';

class Actions extends React.Component {
  constructor () {
    super();
    this.state = {
      showNewGroupForm: false,
      showAddTabForm: true,

      newGroupName: '',
      newGroupSaveOpenTabs: false,

      addTabGroup: null
    };
    autobind(this);
  }

  onCreateNewGroupClick () {
    this.setState({showNewGroupForm: true, showAddTabForm: false});
  }

  onAddTabClick () {
    this.setState({showAddTabForm: true, showNewGroupForm: false});
  }

  onAddTabSaveClick () {
    console.log('shit');
  }

  onAddTabCancelClick () {
    this.setState({showAddTabForm: false});
  }

  onAddTabGroupSelect (group) {
    this.setState({addTabGroup: group});
  }

  onNewGroupChange (e) {
    const {value} = e.target;
    this.setState({newGroupName: value});
  }

  onNewGroupSave (group) {
    this.props.createNewGroup(group);
    this.setState({
      newGroupName: '',
      showNewGroupForm: false
    });
  }

  getNewGroupForm () {
    if (!this.state.showNewGroupForm) return null;
    return (
      <GroupEditor
        name={this.state.newGroupName}
        onChange={this.onNewGroupChange}
        onSave={this.onNewGroupSave} />
    );
  }

  getAddTabForm () {
    if (!this.state.showAddTabForm) return null;
    return (
      <div className="actions__add-tab">
        <GroupSelector
          groups={Object.values(this.props.groups)}
          onSelect={this.onAddTabGroupSelect} />
        <Button
          disabled={this.state.addTabGroup === null}
          onClick={this.onAddTabSaveClick}>
          Save
        </Button>
        <Button onClick={this.onAddTabCancelClick}>Cancel</Button>
      </div>
    );
  }

  render () {
    return (
      <div className="actions">
        <div className="actions__bar">
          <Button onClick={this.onCreateNewGroupClick}>
            + New Group
          </Button>
          <Button onClick={this.onAddTabClick}>
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
