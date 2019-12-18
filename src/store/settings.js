import {observable, computed, action} from 'mobx';
import {delay} from "../helpers/helpers";

export default class {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable options = {
        sumsNum:5,
        sumsVal:5,
        multiply:false,
        division:false,

        timeBase:30,
        time:'',
        stopper:false
    };

    @action change = async (name, cnt)=> {
        this.options[name] = cnt;
    };

    @action timer = async (time,counter=0)=>{
        if(time>=0&&!this.options.stopper){
            this.change('time',time);
            await delay(100);
            counter++;
            if(counter===10){
                time--;
                counter=0
            }
            this.timer(time,counter);
        }else {
            if(time===-1){
                this.rootStore.notifications.add('Время вышло');
            }
        }
    }

}

