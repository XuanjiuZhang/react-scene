/**
 * Created by Administrator on 2017/1/21.
 */
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import ViewManager from './views/phone/ViewManager';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import scenedata from './scenedata2';

const mapStateToProps = (state) => {
  return {
    scenedata: state.scenedata,
    currentPageIndex: state.currentPageIndex
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
  currentPageIndex: 0
};

const reducer = (state = defaultState, action) => {
  let {currentPageIndex} = state;
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

let store = createStore(reducer);

/*const ProviderElement = React.createElement(Provider, {store}, React.createElement(VisibleViewManager));*/

ReactDOM.render(
	<Provider store={store}>
    <VisibleViewManager />
  </Provider>,
   document.getElementById('root'));