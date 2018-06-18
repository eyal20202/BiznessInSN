
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

//import App from './components/App';
import App from './container/App';
import HeaderSP from './logInPages/HeaderSP';
import StartPage from './logInPages/StartPage';
import NavBar from './container/Header'
import Cookies from 'universal-cookie';
//===========================================================
function StartWebPage(){
    render((

            <StartPage/>
    ), document.getElementById('root'));
}
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
const cookies = new Cookies();


if(cookies.get('login'))
start();
else {

    StartWebPage();
}

