import React from 'react'
import NotificationBody from './NotificationScript/NotificationBody'
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

//=================================================
class Network extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            UserFriendReq: [],UserMayKnow: [],
        };
        this.GetUserFrindsRequest();
        this.GetUserMayKnow();
        this.SeeOtherProfile = this.SeeOtherProfile.bind(this);
        this.Accepet = this.Accepet.bind(this);
        this.Rejection = this.Rejection.bind(this);
       // this.SuggestingFriends=this.SuggestingFriends.bind(this);
        this.AddFriend=this.AddFriend.bind(this);
    }
//==========================================================
    GetUserFrindsRequest() {

        axios.get("/Mynetwork/GetfriendRequset", {
            params: {
                userID: cookies.get('userID'),

            }
        }).then(res => {
                if (res.data == "")
                    return;
                var arr = [];
                for (var i = 0; i < res.data.length; i++) {
                    arr.push(res.data[i]);
                }

                console.log(res.data);
                //UserFriendReq
                this.MakeFrinedUI(arr);

            }, (error) => {

            }
        );

    }
    GetUserMayKnow() {

        axios.get("/Mynetwork/GetUserMayKnowByWork", {
            params: {
                userID: cookies.get('userID'),
                WorkCategory :cookies.get('WorkCategoryID')
            }
        }).then(res => {
                if (res.data == "")
                    return;
                var arr = [];
                for (var i = 0; i < res.data.length; i++) {
                    if(res.data[i].ID !=cookies.get('userID') && res.data[i].ID !=68)
                    arr.push(res.data[i]);
                }

                console.log(res.data);
                //UserFriendReq
            this.SuggestingFriends(arr);
            }, (error) => {

            }
        );

    }
    //====================================================
    MakeFrinedUI(arr) {
        var res = [];

        for (var j = 0; j < arr.length; j++) {

            res.push(
                <div className="col-md-3 col-xs-12 jump"
                     style={{padding: '5px', margin: '20px', width: "200px", borderStyle: "ridge"}}>
                    <div class="card ">
                    <div class="card-header">
                        <img class="card-img-bottom" src="https://www.w3schools.com/bootstrap4/img_avatar1.png"
                             alt="Card image" style={{width: "100%"}}/>

                    </div>
                    <div class="card-body">
                        <h4 class="card-title text-center" style={{marginLeft:'10px'}}> {arr[j].FirstName + " " + arr[j].LastName}</h4>
                        <p class="card-text">want to be your friend</p>

                    </div>
                    <div >
                        <button style={{marginBottom:'30px'}} onClick={this.SeeOtherProfile(arr[j].ID)}
                                class="btn btn-info card-text col-xs-12 col-md-12"> See Profile
                        </button>
                        <button onClick={this.Accepet(arr[j].ID)} class="btn btn-info card-text col-xs-6 col-md-6">
                            Accept
                        </button>
                        <button onClick={this.Rejection(arr[j].ID)} class="btn btn-info  card-text col-xs-6 col-md-6">
                            Rejection
                        </button>
                    </div>
                </div>
                </div>
            );

        }
        this.setState({UserFriendReq: res});
    }
    SuggestingFriends(arr){
        var res = [];

        for (var j = 0; j < arr.length; j++) {

            res.push(
                <div className="col-md-3 col-xs-12 jump"
                     style={{padding: '5px', margin: '20px', width: "200px", borderStyle: "ridge"}}>
                    <div class="card ">
                        <img class="card-img-bottom" src="https://www.w3schools.com/bootstrap4/img_avatar3.png"
                             alt="Card image" style={{width: "100%"}}/>
                        <div class="card-body">
                            <h4 class="card-title">{arr[j].FirstName + " " + arr[j].LastName}</h4>
                            <p class="card-text"><b>Maybe you know {arr[j].FirstName}? </b> </p>
                            <hr/>
                            <button onClick={this.SeeOtherProfile(arr[j].ID)}
                                    class="btn btn-info card-text col-xs-12 col-md-12"> See Profile <span className=" glyphicon glyphicon-eye-open"></span>
                            </button>
                            <button style={{marginTop:'20px'}} onClick={this.AddFriend(arr[j].ID)}
                                    class="btn btn-info  card-text col-xs-12 col-md-12">
                             <b > Add Friend <span className="glyphicon glyphicon-plus"></span></b>
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        this.setState({UserMayKnow: res});
    }
    //=====================================================
    Rejection = param => e => {

        axios.get("/UserProfile/removefriend", {
            params: {
                userid: cookies.get('userID'),
                friendid: param,
                status: 1,

            }
        }).then(res => {

                axios.get("/UserProfile/removefriend", {
                    params: {
                        userid: param,
                        friendid: cookies.get('userID'),
                        status: 1,

                    }
                }).then(res => {
                        window.location.reload();
                    }, (error) => {

                    }
                );


            }, (error) => {

            }
        );
    };
    //====================================================
    SeeOtherProfile = param => e => {
        cookies.set('prodileToShowId', param);
        window.location.href = "/UserProfile";
    };
    //=============================================================
        AddFriend = param => e => {

                axios.get("/UserProfile/addfriend", {
                    params: {
                        frinedid:param,
                        userid: cookies.get('userID'),
                        status:0
                    }
                }).then(res => {

                        axios.get("/UserProfile/addfriend", {
                            params: {
                                frinedid: cookies.get('userID'),
                                userid: param ,
                                status:2,
                            }
                        }).then(res => {
                                window.location.reload();
                            }, (error) => {

                            }
                        );

                    }, (error) => {

                    }
                );
            };
    //=============================================================

    Accepet = param => e => {

        axios.get("/Mynetwork/Accept", {
            params: {
                userID: cookies.get('userID'),
                friendid: param,
                status: 1,

            }
        }).then(res => {

                axios.get("/Mynetwork/Accept", {
                    params: {
                        userID: param,
                        friendid: cookies.get('userID'),
                        status: 1,

                    }
                }).then(res => {
                        window.location.reload();
                    }, (error) => {

                    }
                );


            }, (error) => {

            }
        );
    };

    //====================================================
    handleClick(e) {
        this.setState({
            clickedHome: 'non', clickedJob: 'non', clickedMessages: 'non'
            , clickedNotification: 'non'
        });

        if (e.currentTarget.id == 'Home') {
            this.setState({
                clickedHome: 'active'
            });
        }
        ;
    }


    render() {
        return (



            <div class=" col-lg-6 col-md-6 col-sm-12 col-xs-12" >

                <div class="container">

                    <div class="panel-group">
                        <div class="panel panel-default">
                            <div class="panel-heading text-center " style={{marginTop:'40px',paddingTop:'20px'}}><h2>My network</h2></div>
                            {this.state.UserFriendReq.length >0?
                                <div className="col-md-12 col-lg-11">
                                    <h1> Your friend requsets!</h1>
                                    {this.state.UserFriendReq}
                                </div> : null
                            }

                            <div className="panel-body ">

                                <hr/>
                                <h1> Pepole you may know</h1>
                                {this.state.UserMayKnow}
                            </div>
                        </div>

                    </div>
                </div>


            </div>



        )
    }

}


//=======================================================

//===========================================================
const BodyStyle = {



};

//=================================================
export default Network
const HeaderStyle = {marginTop: '60px'};