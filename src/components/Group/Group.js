// @flow

import './Group.scss';

import * as React from 'react';
import classNames from 'classnames';
import autobind from 'autobindr';

import lang from '../../services/lang';
import tabsService from '../../services/tabs';
import analytics from '../../services/analytics';
import Tabs from '../Tabs/Tabs';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import type {Group as GroupT, Tab} from '../../types';


type Props = {
  group: GroupT,
  showTabCountBadge: boolean,
  onTabRemove: (groupId: string, tabId: string) => void,
  onGroupEdit: (group: GroupT) => void
};

type State = {
  showTabs: boolean
};

class Group extends React.Component<Props, State> {
  state = {
    showTabs: false
  };
  tabsContent: ?HTMLElement = null;

  constructor () {
    super();
    autobind(this);
  }

  onHeaderClick () {
    this.setState(state => ({showTabs: !state.showTabs}));
  }

  onOpenClick (e: SyntheticMouseEvent<>) {
    e.preventDefault();
    e.stopPropagation();
    const {tabs} = this.props.group;
    tabsService.open(tabs);
    analytics.groupOpened();
  }

  onOpenInNewWindowClick (e: SyntheticMouseEvent<>) {
    e.preventDefault();
    e.stopPropagation();
    const {tabs} = this.props.group;
    tabsService.open(tabs, {
      newWindow: true
    });
    analytics.groupOpened(true);
  }

  onTabRemove (tab: Tab) {
    const {group} = this.props;
    this.props.onTabRemove(group.id, tab.id);
    analytics.tabDeleted();
  }

  onEditClick (e: SyntheticMouseEvent<>) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onGroupEdit(this.props.group);
  }

  getTabs () {
    const {tabs} = this.props.group;

    const tabsClassName = classNames('group__tabs', {
      'group__tabs--open': this.state.showTabs,
      'group__tabs--empty': tabs.length === 0
    });

    const tabsStyle = {
      maxHeight:
        this.state.showTabs && this.tabsContent
          ? this.tabsContent.scrollHeight
          : 0
    };
    let content;
    if (!tabs.length) {
      content = (
        <div className="group__tabs__empty-label">{lang.t('groupNoTabs')}</div>
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

  getBadge () {
    if (!this.props.showTabCountBadge) return null;
    const {group} = this.props;
    return <div className="group__name__tab-count">{group.tabs.length}</div>;
  }

  getEditButton () {
    return (
      <Button
        compact
        flat
        rounded
        className="group__name__edit"
        onClick={this.onEditClick}>
        <Icon name="pencil" />
      </Button>
    );
  }

  render () {
    const {group} = this.props;
    return (
      <div
        className={classNames('group', {
          'group--open': this.state.showTabs
        })}>
        <div className="group__header" onClick={this.onHeaderClick}>
          <div className="group__expand-icon">
            <Icon name="chevron-down" />
          </div>
          <div className="group__name">
            <div className="group__name__label">{group.name}</div>
            {this.getBadge()}
            {this.getEditButton()}
          </div>
          <div
            className={classNames('group__actions', {
              'group__actions--disabled': group.tabs.length === 0
            })}>
            <Button
              type="primary"
              flat
              disabled={!this.props.group.tabs.length}
              onClick={this.onOpenClick}>
              {lang.t('groupOpen')}
            </Button>
            <Button
              type="primary"
              flat
              disabled={!this.props.group.tabs.length}
              onClick={this.onOpenInNewWindowClick}>
              {lang.t('groupOpenInNewWindow')}
            </Button>
          </div>
        </div>

        {this.getTabs()}
      </div>
    );
  }
}

export default Group;
