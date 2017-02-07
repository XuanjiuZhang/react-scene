/**
 * Created by Administrator on 2017/1/21.
 */
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import ViewManager from './views/phone/ViewManager';
import { connect, Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { viewManagerReducer } from './views/phone/viewManagerRedux';
import scenedata from './scenedata2';

const mapStateToProps = (state) => {
  return {
    scenedata: state.scenedata,
    currentPageIndex: state.currentPageIndex,
    viewHeight: state.viewHeight,
    viewWidth: state.viewWidth
  }
};

const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    goPrePage: () => {
      dispatch({
        type: 'GO_PRE_PAGE',
        payload: 1
      });
    },
    goNextPage: () => {
      dispatch({
        type: 'GO_NEXT_PAGE',
        payload: 2
      });
    }
  };
};

const VisibleViewManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewManager);

const defaultState = {
	scenedata,
  currentPageIndex: 0,
  viewHeight: 486,
  viewWidth: 320
};

const pageReducer = (state = defaultState, action) => {
  let {currentPageIndex, deltaX, deltaY} = state;
  switch (action.type) {
    case 'GO_PRE_PAGE':
      return Object.assign({}, state, {
          currentPageIndex: currentPageIndex === 0 ? currentPageIndex : --currentPageIndex
        });
    case 'GO_NEXT_PAGE':
      return Object.assign({}, state, {
          currentPageIndex: currentPageIndex === state.scenedata.pages.length - 1 ? currentPageIndex : ++currentPageIndex
        });
    default: 
      return state;
  }
};

/*const reducer = combineReducers({pageReducer, viewManagerReducer});*/

let store = createStore(pageReducer);

/*const ProviderElement = React.createElement(Provider, {store}, React.createElement(VisibleViewManager));*/

ReactDOM.render(
	<Provider store={store}>
    <VisibleViewManager />
  </Provider>,
   document.getElementById('root'));