import {connect} from 'react-redux';

import {createNewGroup} from '../../actions/groups';
import {selectGroups} from '../../selectors';

import Actions from '../../components/Actions/Actions';


const mapStateToProps = state => ({
  groups: selectGroups(state)
});

const mapDispatchToProps = dispatch => ({
  createNewGroup (name) {
    return dispatch(createNewGroup(name));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Actions);
