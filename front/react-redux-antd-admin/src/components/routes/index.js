import React from 'react';
import {
    Route,
} from 'react-router-dom'
import UserComponent from '../user'


const P2 = ()=>{
    return (<h1>p2</h1>)
}





class MyRouter extends React.Component {

    constructor(props){
        super(props);
        this.state = {isAuthenticated: false};
    }

    componentWillMount = () => {

    }

    render() {
        const { match } = this.props;
        console.log(match);
        return (
            <div>
                <Route  path={`/user`} component={UserComponent}></Route>
                <Route path={`/animation/exampleAnimations`} component={P2}></Route>
                {/*<Route exact path="*" component={P3}></Route>*/}
            </div>
        );
    }
}

export default MyRouter;
