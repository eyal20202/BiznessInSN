import React from 'react'
import { render } from 'react-dom';
import  ReactDOM  from 'react-dom';
import App from '../container/App';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
//import Cookies from 'universal-cookie';

// The Header creates links that can be used to navigate
// between routes.

const headerStyle = {

    backgroundColor: '#5F9EA0',

};
const Forget = {
    color: '#000000',
    padding: '1px',

};
//====================================
const inputstyle = {
    margin: '5px',
    padding: '5px'
};
//====================================
const HeaderTitleStyle = {
    color:'#e2dada'
};

//====================================
class HeaderSP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {

        event.preventDefault();
        const user = {};
        user['email']=document.getElementById('email').value;
        user['password']=document.getElementById('password').value;

        axios.post("/Login", {user })
            .then(res => {
                    console.log(typeof (res.data));
                    if(res.data==="false"){
                        alert("inviald email or password");
                        return false;
                    }
                    else
                    {
                        window.location.reload();
                        return true;
                    }
                },
                (error) => {

                    alert("error");
                }
            );
    }

    render() {
        return (
            <header >

                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header ">
                            <button type="button" className="navbar-toggle" data-toggle="collapse"
                                    data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <div class=" col-md-12 col-lg-12  col-sm-12 col-xs-9">
                                <a className="navbar-brand" href="/">Business-in</a>
                            </div>
                        </div>
                        <div className="collapse navbar-collapse " id="myNavbar">
                            <form className="form-inline " onSubmit={this.handleSubmit}>
                                <ul className="nav navbar-nav ">
                                    <li className="form-group col-md-4 col-lg-4 col-sm-4 col-xs-12">
                                        <div className="input-group" style={{marginTop: '10px'}}>
                            <span className="input-group-addon"><i
                                className="glyphicon glyphicon-user"></i></span>
                                            <input required id="email" type="email" className="form-control"
                                                   name="email"
                                                   placeholder="Email"/>
                                        </div>
                                    </li>


                                    <li  className=" form-group col-md-4 col-lg-4 col-sm-4 col-xs-12">
                                        <div className="input-group" style={{marginTop: '10px'}}>
                            <span className="input-group-addon"><i
                                className="glyphicon glyphicon-lock"></i></span>
                                            <input id="password" required type="password" className="form-control"
                                                   name="password"
                                                   placeholder="Password"/>
                                        </div>
                                    </li>


                                    <li className=" form-group col-md-1 col-lg-1 col-sm-1 col-xs-2" style={{marginTop: '10px'}}>
                                        <button type="submit" className="btn btn-default" id="LogIn"
                                                onSubmit={this.handleSubmit}>Log in

                                        </button>

                                    </li>

                                    <li className="  col-md-3 col-lg-3 col-sm-3 col-xs-3" > <a href="/" >ForgetPassword?</a></li>
                                </ul>
                            </form>
                        </div>
                    </div>
                </nav>

            </header>
        );
    }
}

//===================================
export default HeaderSP
/*
function handleLogIn(e){
    e.preventDefault();
    console.log('The link was clicked.');
    // if(CheckUser())
    // ReactDOM.render(
    //     element,
    //     document.getElementById('root')
    // );
    console.log("CheckUser");
    CheckUser();
       // window.location.reload();
//else
  //  alert("inviald email or password");

}*/

//========================================
/*function CheckUser(){


    const user = {};
    user['email']=document.getElementById('email').value;
    user['password']=document.getElementById('password').value;

    axios.post("/Login", {user })
        .then(res => {
                console.log(typeof (res.data));
                if(res.data==="false"){
                    alert("inviald email or password");
                    return false;
                }
                else
                    {
                        window.location.reload();
                        return true;

                }

            },


            (error) => {

                alert("error");
            }
        );

return true;

}*/
//==========================================
const element = (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

/*
<header >
<form class="form-inline" action="/action_page.php"  >
    <div class="form-group" class="col-md-3">
    <h3> Business-in</h3>
</div>
<div class="form-group" class="col-md-2" >
    <div class="input-group" style={inputstyle}>
        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
        <input id="email" type="text" class="form-control" name="email" placeholder="Email"/>
        </div>
    </div>
    <div class="form-group" class="col-md-2"  >
        <div class="input-group" style={inputstyle}>
            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
            <input id="password" type="password" class="form-control" name="password"
                   placeholder="Password"/>
        </div>
        </div>
        <div class="form-group" class="col-md-1" style={inputstyle}>
            <button type="button"  class="btn btn-default" id="LogIn">Log in</button>
        </div>
        <div class="form-group" class="col-md-2">
        <a href="#"  data-toggle="tooltip" data-placement="right" style={Forget}><h4>Forget Password?</h4></a>
</div>
</form>
<br/>
<br/>
<br/>
</header>*/
