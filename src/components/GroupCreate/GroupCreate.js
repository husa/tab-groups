import './GroupCreate.scss';

import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobindr';
import classNames from 'classnames';

import tabsService from '../../services/tabs';

import Button from '../Button/Button';
import Input from '../Input/Input';
import Checkbox from '../Checkbox/Checkbox';
import Icon from '../Icon/Icon';
import Tab from '../Tab/Tab';


class GroupCreate extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: props.name || '',
      includeOpened: true,
      tabs: [],
      checkedTabs: []
    };
    autobind(this);
  }

  componentWillMount () {
    tabsService.getAll().then(tabs => {
      const checkedTabs = tabs.map(tab => tab.id);
      this.setState({tabs, checkedTabs});
    });
  }

  onChange (e) {
    this.setState({name: e.target.value});
  }

  onOpenedTabsChange (e) {
    this.setState({includeOpened: e.target.checked});
  }

  onSaveClick () {
    if (!this.state.name) return null;
    let tabs = [];
    if (this.state.includeOpened) {
      tabs = this.state.tabs
        .filter(({id}) => this.state.checkedTabs.includes(id))
        .map(({title, url, favIconUrl, pinned}) => ({
          title,
          url,
          favIconUrl,
          pinned
        }));
    }
    return this.props.onSave({
      name: this.state.name,
      tabs
    });
  }

  onCancelClick () {
    this.props.onCancel();
  }

  onTabChecked (tab) {
    const {id} = tab;
    const {checkedTabs} = this.state;
    if (checkedTabs.includes(id)) {
      this.setState({checkedTabs: checkedTabs.filter(tabId => tabId !== id)});
    } else {
      this.setState({checkedTabs: checkedTabs.concat([id])});
    }
  }

  getTabs () {
    const {tabs} = this.state;
    if (!tabs.length) return null;
    return tabs.map(tab => (
      <Tab
        key={tab.id}
        tab={tab}
        showCheckbox={true}
        checked={this.state.checkedTabs.includes(tab.id)}
        onCheck={this.onTabChecked.bind(this, tab)} />
    ));
  }

  render () {
    return (
      <div className="group-create">
        <div className="group-create__actions">
          <Input
            className="group-create__input"
            placeholder="Group Name"
            value={this.state.name}
            onChange={this.onChange} />
          <Button
            type="primary"
            disabled={this.state.name === ''}
            onClick={this.onSaveClick}>
            <Icon name="checkmark" />
            Save
          </Button>
          <Button
            type="secondary"
            outline
            onClick={this.onCancelClick}>
            <Icon name="close" />
            Cancel
          </Button>
        </div>

        <div className="group-create__tabs-check">
          <Checkbox
            checked={this.state.includeOpened}
            onChange={this.onOpenedTabsChange}>
            Include open tabs
          </Checkbox>
        </div>

        <div className={classNames('group-create__tabs', {
          'group-create__tabs--disabled': !this.state.includeOpened
        })}>
          {this.getTabs()}
        </div>
      </div>
    );
  }
}


// GroupCreate.propTypes = {
//   name: PropTypes.string,
//   onChange: PropTypes.func.isRequired,
//   onSave: PropTypes.func.isRequired
// };

// GroupCreate.defaultProps = {
//   name: ''
// };

export default GroupCreate;
