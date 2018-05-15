import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))
console.log(store.getState())
// const mapStateToProps = (state) => {
//     return state;
// }
// const Container = connect(mapStateToProps)(App)
ReactDOM.render(
    <Provider store={store}><App /></Provider>
    , document.getElementById('root'));

// {user:{}, tab:{activityKey: '/',collapsed:false, tabs: [{title: '首页', content: '', key: '/'}]}}


registerServiceWorker();