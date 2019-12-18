import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import {Provider} from 'mobx-react'
import Store from './store/supStore'


ReactDom.render (<Provider stores={Store}>
                    <App/>
                </Provider>,
document.querySelector('#app'));



