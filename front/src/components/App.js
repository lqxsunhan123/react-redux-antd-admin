import React, {Component} from 'react';
import '../css/App.css'
import Index from './index'



class App extends React.Component {

    constructor(props){
        super(props);
    }
    render() {
        console.log(this.props)
        return (
            <Index/>
        );
    }
}

export default App;
