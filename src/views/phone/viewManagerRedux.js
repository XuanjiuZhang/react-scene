
const viewManagerReducer = (state = {}, action) => {
  let {currentPageIndex} = state;
  switch (action.type) {
    case 'PAN_START':
      return state;
    case 'PAN_END':
      return state;
    case 'PAN_LEFT':
      return state;
    case 'PAN_RIGHT':
      return state;
    case 'PAN_UP':
      return state;
    case 'PAN_DOWN':
      return state;
    default :
      return state;
  }
};

export { viewManagerReducer };