import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import Cookies from 'universal-cookie';
import $ from 'jquery'

$(document).ready(function () {
    $(".btn-pref .btn").click(function () {
        $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
        // $(".tab").addClass("active"); // instead of this do the below
        $(this).removeClass("btn-default").addClass("btn-primary");
    });
});
const cookies = new Cookies();

class HeaderProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PermissionUser: false, PermissionFrined: false, PermissionForeign: false, UserData: []
            , PermissionWaitOtherConfirmed: false, PermissionWaituserConfirmed: false,
        };
        this.GetUserData();
        this.GetProfileFriendStatus();
    }

    //==============================================================
    handleClick(e) {
        this.GetProfileFriendStatus();
    }

    GetProfileFriendStatus() {
        if (cookies.get('prodileToShowId') === cookies.get('userID')) {
            this.setState({PermissionUser: true});
            return;
        }
        axios.get("/UserProfile/GetProfileFriendStatus", {
            params: {
                profileID: cookies.get('prodileToShowId'),
                userid: cookies.get('userID'),
            }
        })
            .then(res => {

                    if (res.data[0].friend) {
                        if (res.data[0].confirmed)
                            this.setState({PermissionFrined: true});
                        else if (!res.data[0].wait)
                            this.setState({PermissionWaitOtherConfirmed: true});
                        else
                            this.setState({PermissionWaituserConfirmed: true});
                    }
                    else
                        this.setState({PermissionForeign: true});

                }, (error) => {

                }
            );
    }

//PermissionWaituserConfirmed
    //==============================================================
    GetUserData() {
        axios.get("/UserProfile/GetProfileData", {
            params: {
                userID: cookies.get('prodileToShowId'),
            }
        })
            .then(res => {
                    this.setState({UserData: res.data[0]});
                    console.log(res.data);
                }, (error) => {

                }
            );
    }

//====================================================================
    ButtonFriend(func, parm) {
        return (

            <div style={ImgStyle}>

                <button onClick={func} type="button" class="btn btn-info">{parm}</button>
            </div>)
            ;
    }

    //====================================================================

    removefriend() {
        if (!window.confirm("Remove this friend?")) return;

        axios.get("/UserProfile/removefriend", {
            params: {
                profileID: cookies.get('prodileToShowId'),
                userid: cookies.get('userID'),
            }
        }).then(res => {
                axios.get("/UserProfile/removefriend", {
                    params: {
                        profileID: cookies.get('userID'),
                        userid: cookies.get('prodileToShowId'),
                    }
                }).then(res => {
                        window.location.reload();
                    }, (error) => {

                    }
                );
            }, (error) => {

            }
        );
    }

    //====================================================================
    addfriend() {

        axios.get("/UserProfile/addfriend", {
            params: {
                frinedid: cookies.get('prodileToShowId'),
                userid: cookies.get('userID'),
                status: 0
            }
        }).then(res => {

                axios.get("/UserProfile/addfriend", {
                    params: {
                        frinedid: cookies.get('userID'),
                        userid: cookies.get('prodileToShowId'),
                        status: 2,
                    }
                }).then(res => {
                        window.location.reload();
                    }, (error) => {

                    }
                );

            }, (error) => {

            }
        );
    }

//==============================================================

    render() {
        return (
            <div className="   shdow" id="UserBackgroud" >


                <div style={{paddingTop: '15px'}}>
                    <center>
                        <div class="card1  " style={{marginTop: '15px'}}>
                            <div>
                                <img className="img-circle" src="https://www.w3schools.com/howto/img_avatar.png"
                                     alt="John" style={{width: "40%"}}/>
                                <h3 style={{color:'white'}}>{this.state.UserData["FirstName"] + " " + this.state.UserData["LastName"]}</h3>
                                <div style={{margin: "24px"}}>
                                    {this.state.UserData["currentJob"] != null ?
                                        <hh5><i className="glyphicon glyphicon-briefcase"style={{color:'white'}}> </i><span
                                            style={{marginLeft: '10px',color:'white'}}>{this.state.UserData["currentJob"]}</span></hh5>
                                        : <p style={{color:'white'}}>Looking for the next challenge!</p>}
                                </div>
                                <h5><i className="glyphicon glyphicon-map-marker" style={{color:'white'}}> </i><span
                                    style={{marginLeft: '10px',color:'white'}}>{this.state.UserData["location"]}</span></h5>
                                {/*this.state.PermissionForeign ? <ButtonFriend/> : null*/}
                                {/*{this.props.type == 'PermissionForeign' ? <ButtonFriend/> : null}*/}
                                <div>
                                {this.state.PermissionFrined ? this.ButtonFriend(this.removefriend.bind(this), 'Remove Friend') : null}
                                {this.state.PermissionForeign ? this.ButtonFriend(this.addfriend.bind(this), 'Add Friend') : null}
                                {this.state.PermissionWaitOtherConfirmed ? this.ButtonFriend(this.removefriend.bind(this), 'Cancel request') : null}
                                {this.state.PermissionWaituserConfirmed ?
                                    <h3><b>Wating for your Confirmed</b></h3> : null}
                                    <div/>
                                </div>
                                <br/>
                            </div>
                        </div>
                    </center>
                </div>


                {/*//------------------------------------------------------------------------------------*/}


            </div>
    )
    }
    }

    //==================================
    const ImgStyle = {
        paddingLeft: '10px',
        marginTop:'20px'
    };

    //============================
        /*function ButtonFriend(func,parm) {
            return (<div style={ImgStyle}>
                <br/>
                <br/>
                <button onClick={func} type="button" class="btn btn-primary">{parm}</button>
            </div>)
        }*/


    export default HeaderProfile
