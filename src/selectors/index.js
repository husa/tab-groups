export const selectGroupIds = state => state.groups.ids;
export const selectGroups = state => selectGroupIds(state).map(id => state.groups[id]);
export const selectGroup = (state, groupId) => selectGroups(state).find(({id}) => id === groupId);
