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
    onClick: () => {
      dispatch({
        type: 'ADD',
        payload: 1
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
  switch (action.type) {
    case 'ADD':
      return action.payload;
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