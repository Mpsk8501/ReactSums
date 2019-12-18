import React, {useState} from 'react';
import withStore from "../../hocs/withStore";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import style from './sums.module.css'
import {delay} from './../../helpers/helpers'

function Sums(props) {
    // const [state,changeState] = useState( {
    //         answer: 'h',
    //         oneSum: '',
    //         sumsCounter: 0,
    //         begin: true
    //     });
    const [oneSum, changeSum] = useState('');
    const [answer, changeAnswer] = useState('');
    const [sumsCounter, changeCounter] = useState(0);
    const [begin, changeBegin] = useState(true);
    // const [time,changeTime] = useState(30);
    // const [timerStopper,timerReset] = useState(false);

    let addSums = props.stores.sums.addSums;
    let sums = props.stores.sums.sums;

    let baseTime = props.stores.settings.options.timeBase;
    let time = props.stores.settings.options.time;
    let timer = props.stores.settings.timer;


    // let timer = async (time=30) =>{
    //     if(!timerStoper){
    //         await delay(1000);
    //         let z =time-1;
    //         changeTime(z);
    //         timer(z)
    //     }
    //
    // };


    let writeSums = (value, key = false) => {
        let val;
        if (key) {
            if (parseInt(value) || value === '0') {
                val = answer + value;
            } else if (value === 'Backspace') {
                val = answer.substring(0, answer.length - 1);
            } else {
                val = answer
            }
        } else {
            if (value !== 'Backspace') {
                val = answer + value;
            } else {
                val = answer.substring(0, answer.length - 1);
            }
        }

        changeAnswer(val)
    };


    let start = async () => {
        addSums();
        changeSum(sums[0].key);
        changeBegin(false);
        await props.stores.settings.change('stopper', true);
        await delay(100);
        await props.stores.settings.change('stopper', false);
        timer(baseTime)

    };

    let next = async () => {
        if(sums.length > sumsCounter+1){
            await props.stores.settings.change('stopper', true);
            await delay(100);
            await props.stores.settings.change('stopper', false);
            timer(baseTime);
        }else {
            await props.stores.settings.change('stopper', true);
        }

        if(time>0){
            let answ = (answer) ? answer : 'нет ответа';
            if (answer === '') {
                props.stores.sums.addAnswer(sumsCounter, answ);
                props.stores.notifications.add('Нет ответа');
            } else if (answer == sums[sumsCounter]['answer']) {
                props.stores.sums.addAnswer(sumsCounter, false);
                props.stores.notifications.add(`Верный ответ. Вы получили 
                ${sums[sumsCounter].difficult}балл(ов)`,'success');
            } else {
                props.stores.sums.addAnswer(sumsCounter, answ);
                props.stores.notifications.add('Неверный ответ');
            }
        }else {
            props.stores.sums.addAnswer(sumsCounter, 'время вышло');

        }

        if (sums.length > sumsCounter + 1) {
            changeSum(sums[sumsCounter + 1].key);
            changeCounter(sumsCounter + 1)
        } else {
            changeSum('');
        }
        changeAnswer('');
        changeCounter(sumsCounter + 1);


    };


    let addButtons = () => {
        let buttons = [];
        for (let i = 0; i < 10; i++) {
            buttons.push(
                <Button
                    className={style.btn}
                    variant={"outlined"}
                    color={"primary"}
                    key={`btnBlock${i}`}
                    onClick={() => {
                        writeSums(i)
                    }}
                >
                    {i}
                </Button>
            )
        }
        buttons.push(
            <Button
                className={style.btn}
                color={"secondary"}
                key={`btnBlockX`}
                variant={"outlined"}
                onClick={() => {
                    writeSums('Backspace')
                }}
            >
                X
            </Button>
        );
        return buttons
    };


    let changeVisible = (begin) ? (style.inVisible) : (style.visible)

    let btn = (begin) ?
        <Button
            className={style.btnBegin}
            variant={"contained"}
            color={"primary"}
            onClick={start}
        >
            Начать решение
        </Button>
        : (sums.length > sumsCounter) ?
            <Button
                className={style.btnNext}
                variant={"contained"}
                color={"primary"}
                onClick={next}
            >
                Ответить
            </Button> :
            <Button
                className={style.btnNext}
                variant={"contained"}
                color={"secondary"}
                to={'/final'}
                component={Link}
            >
                Завершить
            </Button>;

    let buttons = addButtons();
    return (<section
        className={style.sums}
        onKeyUp={(e) => writeSums(e.key, true)}
    >
        <h2 className={changeVisible}>Пример:{oneSum}={answer} </h2><br/>
        <div className={changeVisible}>
            <div className={style.timer}>
               <h2>Оставшееся время: <span> {time}</span> </h2>
            </div>
            <div className={style.btnBlock}
            >
                {buttons}
            </div>
        </div>
        {btn}
    </section>)
}

export default withStore(Sums)



