import React ,{Component} from 'react'
import {BrowserRouter,Route, Redirect, Switch } from 'react-router-dom';

import Login from './pages/login/login'
import Admin from  './pages/admin/admin'


export default class App extends Component{

    render(){
        return <BrowserRouter>
                <Switch>
                    <Route path="/" component={Login}/>
                    <Route path="/home" component={Admin}/>
                    <Redirect to="/"/>
                </Switch>
            </BrowserRouter>
    }
}


// import React ,{Component} from 'react'
//
//
// export default class App extends Component{
//     render () {
//         return
//     }
// }
// export default class App extends Component{
//
//     render(){
//
//     }
//
// }