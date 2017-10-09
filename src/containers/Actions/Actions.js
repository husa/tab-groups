import {connect} from 'react-redux';

import {selectGroups} from '../../selectors';
import {
  createNewGroup,
  addTabToGroup
} from '../../actions/groups';

import Actions from '../../components/Actions/Actions';


const mapStateToProps = state => ({
  groups: selectGroups(state)
});

const mapDispatchToProps = dispatch => ({
  createNewGroup (name) {
    return dispatch(createNewGroup(name));
  },

  addTabToGroup (groupId, tab) {
    return dispatch(addTabToGroup(groupId, tab));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Actions);
