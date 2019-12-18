import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import routes from "../routs";
import Notifications from "../conteiners/notifications";
// import Header from "../conteiners/components/header";


export default class App extends React.Component{
    render(){
        let routsComponents = routes.map((rout)=>{

            return <Route key = {rout.url}
                          path ={rout.url}
                          component = {rout.component}
                          exact={rout.exact}/>
        });

        return (
            <Router>
                <Notifications/>
                <div className="container">
                    {/*<Header/>*/}
                    <Switch>
                        {routsComponents}
                    </Switch>
                </div>
            </Router>
        )
    }
}

