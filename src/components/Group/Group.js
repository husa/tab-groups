import './Group.scss';

import React from 'react';
import classNames from 'classnames';
import autobind from 'autobindr';

import tabsService from '../../services/tabs';
import Tabs from '../Tabs/Tabs';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';


class Group extends React.Component {
  constructor () {
    super();
    this.state = {
      showTabs: false
    };
    autobind(this);
    this.tabsContent = null;
  }

  onHeaderClick () {
    this.setState(state => ({showTabs: !state.showTabs}));
  }

  onOpenClick (e) {
    e.preventDefault();
    e.stopPropagation();
    const {tabs} = this.props.group;
    tabsService.open(tabs);
  }

  onOpenInNewWindowClick (e) {
    e.preventDefault();
    e.stopPropagation();
    const {tabs} = this.props.group;
    tabsService.open(tabs, {
      newWindow: true
    });
  }

  onTabRemove (tab) {
    const {group} = this.props;
    this.props.onTabRemove(group.id, tab.id);
  }

  getTabs () {
    const {tabs} = this.props.group;

    const tabsClassName = classNames('group__tabs', {
      'group__tabs--open': this.state.showTabs,
      'group__tabs--empty': tabs.length === 0
    });

    const tabsStyle = {
      maxHeight: this.state.showTabs ? this.tabsContent.scrollHeight : 0
    };
    let content;
    if (!tabs.length) {
      content = (
        <div className="group__tabs__empty-label">
          Group does not have any tabs
        </div>
      );
    } else {
      content = (
        <Tabs tabs={tabs} onRemove={this.onTabRemove} showActions={true} />
      );
    }

    return (
      <div
        className={tabsClassName}
        style={tabsStyle}
        ref={el => {
          if (el) {
            this.tabsContent = el;
          }
        }}>
        {content}
      </div>
    );
  }

  render () {
    const {group} = this.props;
    return (
      <div className={classNames('group', {
        'group--open': this.state.showTabs
      })}>
        <div className="group__header" onClick={this.onHeaderClick}>
          <div className="group__expand-icon">
            <Icon name="chevron-down" />
          </div>
          <div className="group__name">{group.name}</div>
          <div className={classNames('group__actions', {
            'group__actions--disabled': group.tabs.length === 0
          })}>
            <Button onClick={this.onOpenClick}>Open</Button>
            <Button onClick={this.onOpenInNewWindowClick}>Open in New Window</Button>
          </div>
        </div>

        {this.getTabs()}
      </div>
    );
  }
}

export default Group;
