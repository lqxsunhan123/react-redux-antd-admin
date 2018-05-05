import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, {activityKey: 'index',collapsed:true, tabs: [{title: '首页', content: '', key: 'index'}]}, applyMiddleware(thunk))
// console.log(store.getState())
// const mapStateToProps = (state) => {
//     return state;
// }
// const Container = connect(mapStateToProps)(App)
ReactDOM.render(
    <Provider store={store}><App /></Provider>
    , document.getElementById('root'));




registerServiceWorker();