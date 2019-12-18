import React, {useEffect, useRef, useState} from 'react';
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import style from './home.module.css'
import withStore from "../../hocs/withStore";
import {delay,fadeIn} from '../../helpers/helpers'

function Home(props) {
    const btnVis = useRef();
    const [hello, change] = useState('');
    const [info, changeInfo] = useState('');

    let changeStr = async (text,time,outVar,f) => {
        let arrText= text.split('');
        let textChange = '';
        for (let item of arrText) {
            textChange += item;
            await delay(time/text.length);
            f(outVar + textChange)
        }
    };

    let paragr = 'Это генератор примеров. Он может генерировать ' +
        'примеры на сложение,вычитание умножение, деление.' +
        ' Нажмите "Приступить" для начала ';


    useEffect(()=>{
        fadeIn(1000,btnVis);
        changeStr('Привет',1000,hello,change).then(()=>{
            changeStr(paragr,2000,info,changeInfo)
        })
    },[]);

    return (
        <section className={style.home}>
            <h2>{hello}</h2>
            <p>{info}</p>
            <Button
                ref={btnVis}
                className={style.btn}
                to={'/settings'}
                component={Link}
                variant={"outlined"}
            >
                Приступить
            </Button>

        </section>
    )
}

export default withStore(Home)
