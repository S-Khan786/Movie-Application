import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';


import './index.css';
import App from './components/App';
import rootReducer from './reducers';


///Function logger(obj, next, action)
//logger(obj)(next)(action)
// const logger = function({ dispatch, getState }) {
//   return function(next) {
//     return function(action) {
//       //Middleware Code 
//       console.log('ACTION_TYPE =', action.type);
//       next(action);
//     }
//   }
// }

const logger = ({ dispatch, getState }) => (next) => (action) => {
  //logger code
  if(typeof action !== 'function') {
    console.log('ACTION_TYPE =', action.type);
  }

  next(action);
}

// const thunk = ({ dispatch, getState }) => (next) => (action) => {
//   //logger code
//   if(typeof action === 'function') {
//     action(dispatch);
//     return;
//   }
//   next(action);
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
// console.log('store', store);
// console.log('Before STATE', store.getState());

// export const StoreContext = createContext();

// console.log('Store Context', StoreContext);

// class Provider extends React.Component {
//   render() {
//     const { store } = this.props;
//     return (
//       <StoreContext.Provider value={store}>
//         {this.props.children}
//       </StoreContext.Provider>
//     )
//   }
// }

//const connectedAppComponent = connect(callback)(App)
// export function connect (callback) {
//   return function (Component) {
//     class ConnectedComponent extends React.Component {
//       constructor(props) {
//         super(props);
//         this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
//       }

//       componentWillUnmount() {
//         this.unsubscribe();
//       }

//       render() {
//         const { store } = this.props;
//         const state = store.getState();
//         const dataToBePassedAsProps = callback(state);
//         return (
//           <Component 
//             {...dataToBePassedAsProps} 
//             dispatch={store.dispatch}
//           />
//         )
//       }
//     }

//     class ConnectedComponentWrapper extends React.Component {
//       render() {
//         return (
//           <StoreContext.Consumer>
//             {store => <ConnectedComponent store={store}/>}
//           </StoreContext.Consumer>
//         )
//       }
//     }

//     return ConnectedComponentWrapper;
//   }
// }

//Update store by dispatching actions
// store.dispatch({
//   type: 'ADD_MOVIES',
//   movies: [{name: "Superman"}]
// })

// console.log('After STATE', store.getState());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <App />
  </Provider>

  // <React.StrictMode>
  // </React.StrictMode>
);