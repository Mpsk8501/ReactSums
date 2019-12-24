import Settings from './settings';
import Sums from './sums';
import Notifications from './notifications';
import {createContext} from "react";




class RootStore {
    constructor(){
        this.settings = new Settings(this);
        this.sums = new Sums(this);
        this.notifications = new Notifications(this)
    }


}

export  const Store = createContext(new RootStore());