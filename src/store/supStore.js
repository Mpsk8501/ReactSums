import Settings from './settings';
import Sums from './sums';
import Notifications from './notifications';



class RootStore {
    constructor(){
        this.settings = new Settings(this);
        this.sums = new Sums(this);
        this.notifications = new Notifications(this)
    }


}

export  default new RootStore()