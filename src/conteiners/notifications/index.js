import React, {useContext} from 'react';
import styles from './index.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {Store} from '../../store/supStore'
import {observer} from "mobx-react";

const Notifications = observer(()=>{
        const store = useContext(Store);
        let model = store.notifications;
        let messages = model.list.map((note) => {
            let additionalClass='none';
            if(note.type ==='error'){
                additionalClass=styles.error
            }else if(note.type ==='success'){
                additionalClass=styles.success
            }
            return (
            <CSSTransition key={note.id} 
                           classNames={{
                             enter: styles.itemEnter,
                             enterActive: styles.itemEnterActive,
                             exitActive: styles.itemLeaveActive
                           }}
                           timeout={500}
            >
                <div className={`${styles.item} ${additionalClass}`} onDoubleClick={() => {model.remove(note.id)}}>
                    {note.message}
                </div>
            </CSSTransition>
            );
        });

        return (
            <TransitionGroup className={styles.box}>
                {messages}
            </TransitionGroup>
        );

})

export default Notifications;