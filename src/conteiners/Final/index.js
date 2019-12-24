import React, {useContext} from 'react';
import {Button} from "@material-ui/core";
import style from './final.module.css'
import {Link} from "react-router-dom";
import {Store} from '../../store/supStore';
import {observer} from "mobx-react";


const Sums = observer(()=>{
    const store = useContext(Store);
    const num = store.settings.options.sumsNum;
    const wrightSums = store.sums.rightAnswers.counter;
    const score = store.sums.rightAnswers.score;
    const wrongSums = store.sums.wrongAnswers;

    let percent = (wrightSums / num) * 100;
    let result = (percent >= 90) ? 5 : (percent > 80) ? 4 : (percent > 50) ? 3 : 2;

    let wrongs = wrongSums.map((item, index) => {
        return <div key={index}
                    className={style.wrongDescription}
        >
            <h3>пример: {item.key}</h3>
            <h3>ваш ответ: {item.wrongAnswer}</h3>
            <h3>верный ответ:{item.answer}</h3>
        </div>
    });

    let summary = (result != 5) ?
        (<>
            <h3 className={style.result}>Оценка: <span>{result}</span></h3>
            <details>
                <summary
                    className={style.summary}
                    >
                    Ошибки:
                </summary>
                {wrongs}
            </details>
        </>) :
        (<>
            <h3 className={style.result}>Оценка: <span>{result}</span></h3>
        </>);

    return (<section
        className={style.final}
    >
        <h2>Final</h2>
        <h3>Решено <span>{num}</span> примеров</h3>
        <h3>Из них верно: <span>{wrightSums}</span></h3>
        <h3 className={style.score}>Вы набрали <span>{score}</span> баллов</h3>
        {summary}
        <Button
            variant={"outlined"}
            to={'/'}
            component={Link}
            onClick={store.sums.reset}
        >
            Повторить
        </Button>
    </section>)

})

export default Sums


