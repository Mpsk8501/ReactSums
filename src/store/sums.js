import {observable, computed, action} from 'mobx';


export default class {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.options = this.rootStore.settings.options;
    }

    sums =[];
    rightAnswers = {
        counter:0,
        score:0
    };
    wrongAnswers=[];

    addSums=()=>{
        let baseDifficult =(this.options.timeBase>20)?1:(this.options.timeBase>15)?2:3;
        for (let i=0;i<this.options.sumsNum;i++){
            let key;
            let answer;
            let difficult;
            if(!this.options.multiply&&!this.options.division) {
                let a = Math.ceil(Math.random() * this.options.sumsVal);
                let b = Math.ceil(Math.random() * this.options.sumsVal);
                if (a < b) {
                    let c = a;
                    a = b;
                    b = c
                }
                let mod = Math.ceil(this.options.sumsVal/20);
                key = (i % 2 === 0) ? (a + '+' + b) : (a + '-' + b);
                answer = (i % 2 === 0) ? (a + b) : (a - b);
                difficult = baseDifficult*mod
            }else if (this.options.multiply&&!this.options.division) {
                let a = Math.ceil(Math.random() * 10);
                let b = Math.ceil(Math.random() * 10);
                key =  (a + '*' + b);
                answer = a*b;
                difficult = 2*baseDifficult
            }else if(!this.options.multiply&&this.options.division){
                let a = Math.ceil(Math.random() * 10);
                let b = Math.ceil(Math.random() * 10);
                let c = a*b;
                key =  (c + '/' + b);
                answer = a;
                difficult = 3*baseDifficult
            }else if(this.options.multiply&&this.options.division){
                let a = Math.ceil(Math.random() * 10);
                let b = Math.ceil(Math.random() * 10);
                let c = a*b;
                key = (i % 2 === 0)?(c + '/' + b):(a + '*' + b);
                answer = (i % 2 === 0)?a:(a*b);
                difficult = 3*baseDifficult
            }
            this.sums.push({key, answer,difficult})
        }
    };
    addAnswer=(index,wrongAnswer)=>{
        if(!wrongAnswer){
            this.rightAnswers.counter +=1;
            this.rightAnswers.score +=this.sums[index].difficult
        }else {
            let wrong = {...this.sums[index],wrongAnswer};
            this.wrongAnswers.push(wrong)
        }
    };
    reset = ()=>{
        this.sums =[];
        this.rightAnswers = 0;
        this.wrongAnswers=[];
    }




        // @action change(name, cnt) {
    //     this.options[name] = cnt;
    // }

}

