
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './container/App';



//============================================================
function start() {

    render((
        <BrowserRouter>

            <App />

        </BrowserRouter>
    ), document.getElementById('header'));
    /* render((

         <BrowserRouter>
             <App/>
         </BrowserRouter>
     ), document.getElementById('root'));
     */
}

start();



