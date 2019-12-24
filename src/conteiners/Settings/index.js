import React, {useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import style from './settings.module.css'
import {Button} from "@material-ui/core";
import {Link} from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {Store} from '../../store/supStore';
import {observer} from "mobx-react";

const  settings = observer(()=>{

    const store = useContext(Store);
    const settings = store.settings;
    function changeSettings(name,val) {
        if(settings.options[name]!==val){
            settings.change(name,val);
        }
    }

    return(
            <section className={style.sectSlyde}>
                <h2>Настройки:</h2>
                <div className={style.slider}>
                    <Typography id="discrete-slider" gutterBottom>
                        Количество примеров:
                    </Typography>
                    <Slider
                        defaultValue={settings.options.sumsNum}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="on"
                        getAriaValueText={(value)=>{
                            changeSettings('sumsNum',value)
                        }}
                        step={1}
                        marks
                        min={5}
                        max={30}
                    />
                </div>
                <div className={style.slider}>
                    <Typography id="discrete-slider" gutterBottom>
                        Величина слогаемых:
                    </Typography>
                    <Slider
                        defaultValue={settings.options.sumsVal}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="on"
                        getAriaValueText={(value)=>{
                            changeSettings('sumsVal',value)
                        }}
                        step={1}
                        marks
                        min={5}
                        max={100}
                    />
                </div>
                <div className={style.slider}>
                    <Typography id="discrete-slider" gutterBottom>
                        Время на один пример:
                    </Typography>
                    <Slider
                        defaultValue={settings.options.timeBase}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="on"
                        getAriaValueText={(value)=>{
                            changeSettings('timeBase',value)
                        }}
                        step={1}
                        marks
                        min={10}
                        max={30}
                    />
                </div>
                <FormControlLabel
                    control={
                        <Switch
                            checked={settings.options['multiply']}
                            onChange={()=>{
                                changeSettings('multiply',!settings.options['multiply'])
                            }}
                            color="primary"
                        />
                    }
                    label="Таблица умножения"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={settings.options['division']}
                            onChange={()=>{
                                changeSettings('division',!settings.options['division'])
                            }}
                            color="primary"
                        />
                    }
                    label="Таблица деления"
                />
                <br/>
                <Button
                    variant={"contained"}
                    color={"primary"}
                    to={'/sums'}
                    component={Link}
                >
                    Дальше
                </Button>
            </section>
        )

})

export default settings

