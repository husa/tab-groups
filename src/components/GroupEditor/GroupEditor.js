import './GroupEditor.scss';

import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobindr';
import classNames from 'classnames';

import tabsService from '../../services/tabs';
import Tab from '../Tab/Tab';
import Button from '../Button/Button';


class GroupEditor extends React.Component {
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

  onSave () {
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
      <div className="group-editor">
        <div className="group-editor__actions">
          <input
            className="group-editor__input"
            type="text"
            value={this.state.name}
            onChange={this.onChange} />
          <Button
            disabled={this.state.name === ''}
            onClick={this.onSave}>
              Save
          </Button>
          <label>
            <input
              type="checkbox"
              checked={this.state.includeOpened}
              onChange={this.onOpenedTabsChange} />
            <span>Include open tabs</span>
          </label>
        </div>
        <div className={classNames('group-editor__tabs', {
          'group-editor__tabs--disabled': !this.state.includeOpened
        })}>
          {this.getTabs()}
        </div>
      </div>
    );
  }
}


// GroupEditor.propTypes = {
//   name: PropTypes.string,
//   onChange: PropTypes.func.isRequired,
//   onSave: PropTypes.func.isRequired
// };

// GroupEditor.defaultProps = {
//   name: ''
// };

export default GroupEditor;
