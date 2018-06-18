import React from 'react'
import {render} from 'react-dom';
import {Link} from 'react-router-dom'
import Cookies from 'universal-cookie';
import AutoCom from './AutoCom';
import axios from 'axios';
import UserProfile from '../Profile/UserProfile'

const cookies = new Cookies();


//===========================================
class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            SaveResOfScerh: "",
            clickedHome: SetNavHome(), clickedJob: SetNavJob(),
            clickedMessages: SetNavMessages(), clickedNotification: SetNavNotification(), clickedNetwork: SetNetwork()
        };

        this.HandelClickOnSerch = this.HandelClickOnSerch.bind(this);
        this.logout = this.logout.bind(this);
    }

    //======================================================
    logout() {

        cookies.remove('login');
        cookies.remove('userID');
        cookies.remove('UserName');
        cookies.remove('prodileToShowId');
    }

    //=====================================================
    HandelClickOnSerch(val) {

        this.setState({SaveResOfScerh: val.ID});
        cookies.set('prodileToShowId', val.ID);
        window.location.href = "/UserProfile";
    }

//======================================================================
    handleClick(e) {
        this.setState({
            clickedHome: 'non', clickedJob: 'non', clickedMessages: 'non'
            , clickedNotification: 'non', clickedNetwork: 'non'
        });

        if (e.currentTarget.id == 'Network') {

            this.setState({
                clickedNetwork: 'active'

            });
        }
        else if (e.currentTarget.id == 'Home') {

            this.setState({
                clickedHome: 'active'

            });
        }
        else if (e.currentTarget.id == 'Job') {

            this.setState({
                clickedJob: 'active'
            });

        }
        else if (e.currentTarget.id == 'Messages') {
            this.setState({
                clickedMessages: 'active'
            });
        }
        else if (e.currentTarget.id == 'Notification') {
            this.setState({
                clickedNotification: 'active'
            });
        }
        ;

    }

    render() {
        return (

            <nav class="navbar navbar-drak bg-primary navbar-fixed-top "  role="navigation" style={{display:'block'}}>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 " >

                    <div  class="col-xs-9 col-sm-9 col-md-4 col-lg-3 ">
                        <span class="navbar-brand" id="toolbarTitle" >Business-in</span>

                        <ul class="nav navbar-nav" >
                            <li  class="dropdown ">
                                <a id="UserUp" role="button" class="dropdown-toggle glyphicon glyphicon-user" data-toggle="dropdown"> {cookies.get('UserName')}
                                <b class="caret"></b></a>
                                <ul class="dropdown-menu " id="brr" style={{backgroundColor:'#428bca'}}>
                                    <li ><Link to='/UserProfile'
                                              onClick={() => cookies.set(("prodileToShowId"), cookies.get('userID'), window.location.reload())}
                                              href="View Profile" >View Profile</Link></li>
                                    <li class="divider"></li>
                                    <li><Link to='/MyPost'
                                              onClick={() =>  (window.location.reload())}
                                              href="/MyPost" >My Post</Link></li>

                                    <li class="divider"></li>
                                    <li ><a href="/" onClick={this.logout }>Log out</a></li>
                                </ul>
                            </li>
                        </ul>

                    </div>


                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>

                    </button>
                    <div class="col-sm-12 col-md-8 col-lg-8 col-xs-12 ">
                        <div class="collapse navbar-collapse col-xs-12 col-sm-12 " id="myNavbar">

                            <ul class="nav navbar-nav">



                                {/*<div class="col-xs-12 col-sm-8 col-md-7 col-lg-9" >*/}


                                <li  id="Home" class={this.state.clickedHome}
                                     onClick={this.handleClick.bind(this)}>
                                    <Link to='/Home' style={NavOptions}><span>Home </span>
                                        <div class="glyphicon glyphicon-home"></div>
                                    </Link>

                                </li>
                                <li id="Job" class={this.state.clickedJob} onClick={this.handleClick.bind(this)}>
                                    <Link to='/Job' style={NavOptions}> <span>
                                        Jobs </span>
                                        <div class="glyphicon glyphicon-briefcase"></div>
                                    </Link>
                                </li>
                                <li id='Messages' class={this.state.clickedMessages}
                                    onClick={this.handleClick.bind(this)}>
                                    <Link to='/Messages' style={NavOptions}><span>Messages </span>
                                        <div class="glyphicon glyphicon-envelope"></div>
                                    </Link>

                                </li>

                                <li id='Network' class={this.state.clickedNetwork}
                                    onClick={this.handleClick.bind(this)}>
                                    <Link to='/MyNetwork' style={NavOptions}><span> My Network </span>
                                        <span className="glyphicon glyphicon-globe"></span>
                                    </Link>
                                </li>

                                <ul   class="nav navbar-nav navbar-right "
                                      style={ulstyle}>

<li>
                                    <AutoCom SaveResFunc={this.HandelClickOnSerch} table="users"
                                             SaveRes=""
                                             placeholder="enter user name" name=""/>

                                    {/*      <button class="btn btn-default" type="submit"><i
                                                class="glyphicon glyphicon-search"></i>
                                            </button>*/}
</li>
                                </ul>


                                {/*</div>*/}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>


        )

    }
}

function SetNetwork() {
    if (window.location.href == 'http://localhost:3000/MyNetwork')
        return 'active';
    return 'non';
}

//====================================
function SetNavJob() {
    if (window.location.href == 'http://localhost:3000/Job')
        return 'active';
    return 'non';
}

//====================================
function SetNavHome() {
    if (window.location.href == 'http://localhost:3000/Home' ||
        window.location.href == 'http://localhost:3000')
        return 'active';
    return 'non';
}

//====================================
function SetNavNotification() {
    if (window.location.href == 'http://localhost:3000/Notification')
        return 'active';
    return 'non';
}

//====================================
function SetNavMessages() {
    if (window.location.href == 'http://localhost:3000/Messages')
        return 'active';
    return 'non';
}

//======================================
const DropMenu = {
    // color: 'white'
};
//======================================
const ulstyle = {
    padding: '6px',

};
//=======================================================
const toolBarTitle = {

    // color: '#fffdf5'
};
//=======================================================
const NavOptions = {

    // color: '#fffdfe'
};
//=======================================================
const NavbarColor = {

    // backgroundColor: '#221f65',

};
//=======================================================
const UserImgStyle = {
    padding: '16px',


};
//=======================================================
const TextUserImg = {
    margin: '5x',

    padding: '5px'
};
//=======================================================
export default NavBar