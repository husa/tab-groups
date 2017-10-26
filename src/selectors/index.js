export const selectGroupIds = state => state.groups.ids;
export const selectGroups = state => selectGroupIds(state).map(id => state.groups[id]);
