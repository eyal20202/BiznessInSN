import React from 'react'
import {Redirect, Switch, Route } from 'react-router-dom'
import Home from './Home'
import Jobs from './Jobs'
import Messages from './Messages'
import Notification from './Notification'
import PageNotFound from './PageNotFound'
import UserProfile from '../Profile/UserProfile'
import Network from './Network'
import  MyPost from './MyPost'
// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"

//==============================
function  CheackUrl() {
    var x=window.location.href;
    var count=0;
    for(var i =0 ; i<x.length;i++){

        if(x[i]==='/')
            count++;
    }

    return count>3 ? true : false;
}
//=========================================
const Main = () => (
    <main>
        <Switch>

            { CheackUrl() ?     <Route  component={PageNotFound}/> : null  }

            <Redirect exact from="/" to="/Home"/>
            <Route path='/Home' component={Home}/>
            <Route path='/Job' component={Jobs}/>
            <Route path='/Messages' component={Messages}/>
            <Route path='/Notification' component={Notification}/>
            <Route path='/UserProfile' component={UserProfile}/>
            <Route path='/MyNetwork' component={Network}/>
            <Route path='/MyPost' component={MyPost} />
            <Route  component={PageNotFound}/>

        </Switch>
    </main>
);

export default Main

//=============================