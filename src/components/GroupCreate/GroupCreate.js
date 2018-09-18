// @flow

import './GroupCreate.scss';

import * as React from 'react';
import autobind from 'autobindr';
import classNames from 'classnames';

import lang from '../../services/lang';
import tabsService from '../../services/tabs';
import Checkbox from '../Checkbox/Checkbox';
import Tab from '../Tab/Tab';
import GroupEditor from '../GroupEditor/GroupEditor';

import type {Tab as TabT} from '../../types';

type Props = {
  onSave: ({name: string, tabs: Array<TabT>}) => void,
  onCancel: () => void
};

type State = {
  includeOpened: boolean,
  tabs: Array<TabT>,
  checkedTabs: Array<string>
};

class GroupCreate extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      includeOpened: true,
      tabs: [],
      checkedTabs: []
    };
    autobind(this);
  }

  componentDidMount() {
    tabsService.getAll().then(tabs => {
      const checkedTabs = tabs.map(tab => tab.id);
      this.setState({tabs, checkedTabs});
    });
  }

  onOpenedTabsChange(e: SyntheticInputEvent<>) {
    this.setState({includeOpened: e.target.checked});
  }

  onSave(name: ?string) {
    if (!name) return null;
    let tabs = [];
    if (this.state.includeOpened) {
      tabs = this.state.tabs.filter(({id}) => this.state.checkedTabs.includes(id));
    }
    return this.props.onSave({name, tabs});
  }

  onCancel() {
    this.props.onCancel();
  }

  onTabChecked(tab: TabT) {
    const {id} = tab;
    const {checkedTabs} = this.state;
    if (checkedTabs.includes(id)) {
      this.setState({checkedTabs: checkedTabs.filter(tabId => tabId !== id)});
    } else {
      this.setState({checkedTabs: checkedTabs.concat([id])});
    }
  }

  getTabs() {
    const {tabs} = this.state;
    if (!tabs.length) return null;
    return tabs.map(tab => (
      <Tab
        key={tab.id}
        tab={tab}
        showCheckbox={true}
        checked={this.state.checkedTabs.includes(tab.id)}
        onCheck={() => this.onTabChecked(tab)}
      />
    ));
  }

  render() {
    return (
      <div className="group-create">
        <GroupEditor name="" onSave={this.onSave} onCancel={this.onCancel} />

        <div className="group-create__tabs-check">
          <Checkbox checked={this.state.includeOpened} onChange={this.onOpenedTabsChange}>
            {lang.t('groupsIncludeOpenTabs')}
          </Checkbox>
        </div>

        <div
          className={classNames('group-create__tabs', {
            'group-create__tabs--disabled': !this.state.includeOpened
          })}>
          {this.getTabs()}
        </div>
      </div>
    );
  }
}

export default GroupCreate;
