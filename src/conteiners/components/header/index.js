import React from 'react';
import Style from "./header.module.css";
import {NavLink} from 'react-router-dom'
import routes, {routesMap} from "../../../routs";

class Header extends React.Component {
    render() {
        let link = routes.map((rout) => {
            if (rout.nav) {
                return (
                    <li key={rout.url}>
                        <NavLink
                            to={routesMap[rout.name]}
                            exact={true}
                            activeClassName={Style.selected}
                        >
                            {rout.name}
                        </NavLink>
                    </li>
                )
            }
        });

        return (
            <div className={Style.header}>
                <hr/>
                <nav className={Style.nav}>
                    <ul>
                        {link}
                    </ul>
                </nav>
                <hr/>
            </div>
        );
    }
}

export default Header