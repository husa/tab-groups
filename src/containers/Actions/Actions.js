// @flow

import {connect} from 'react-redux';

import {selectGroups} from '../../selectors';
import {createNewGroup, addTabToGroup} from '../../actions/groups';

import Actions from '../../components/Actions/Actions';

import type {Group, UnknownGroup, Tab} from '../../types';

const mapStateToProps = state => ({
  groups: selectGroups(state)
});

const mapDispatchToProps = dispatch => ({
  createNewGroup(group: UnknownGroup): Promise<Group> {
    return dispatch(createNewGroup(group));
  },

  addTabToGroup(groupId: string, tab: Tab): Promise<Group> {
    return dispatch(addTabToGroup(groupId, tab));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Actions);
