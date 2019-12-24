import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import routes from "../routs";
import Notifications from "../conteiners/notifications";
import {observer} from "mobx-react";
import {Store} from '../store/supStore'
// import Header from "../conteiners/components/header";


export const App =()=>{
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

// export  const App = observer(()=>{
//     const store = useContext(Store);
//     const change=()=>{
//         store.settings.change('sumsNum',store.settings.options.sumsNum+1)
//     };
//     return(
//         <div>
//             {store.settings.options.sumsNum}
//             <button onClick={change}>
//                 +1
//             </button>
//         </div>
//     )
// })

