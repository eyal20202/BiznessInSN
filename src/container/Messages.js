import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import Msg from './MessagesScripts/Msg';
import Cookies from 'universal-cookie';
import NewMsg from './MessagesScripts/NewMsg';
import LeftBlock from './HomeScripts/LeftBlock'
import RightBlock from './HomeScripts/RightBlock'
import { ToastContainer, toast } from 'react-toastify';
const cookies = new Cookies();

//============================================
// function GetMessages() {
//     var cookies=new Cookies();
//     var userID = cookies.get('userID');
//     axios.get("/Messages/LoadMessages", {
//         params: {
//             user_id: userID
//         }
//     })
//
//         .then(res => {
//                 console.log(res.data);
//
//             },
//
//             // Note: it's important to handle errors here
//             // instead of a catch() block so that we don't swallow
//             // exceptions from actual bugs in components.
//             (error) => {
//                 alert("error");
//             }
//         );
// }
//
// //==============================================
// function MakeMsg() {
//     return <div style={HeaderStyle}>
//         <div class="well" style={BodyStyle}>
//             <div style={TextStyle}>
//
//
//                 <div className="dropdown" style={{float: 'right'}}>
//
//                     <Link to='/' data-toggle="dropdown">
//                         <span className="glyphicon glyphicon-option-horizontal"></span>
//                     </Link>
//                     <ul className="dropdown-menu dropdown-menu-right">
//
//                         <li><a href="delete link">delete this Notification</a></li>
//
//                     </ul>
//
//                 </div>
//
//                 <p style={pStyle}>user info</p>
//                 <hr/>
//             </div>
//
//             <div style={TextStyle}>
//
//                 <p style={pStyle}>Message</p>
//                 <hr/>
//             </div>
//
//             <div style={TextStyle}>
//
//                 <p style={pStyle}>Reply</p>
//
//             </div>
//
//
//         </div>
//     </div>
// }
//
// //===========================================
// function MakeJobPosts() {
//
//     var ResDb = GetMessages();
//
//     var dad = [];
//     for (var i = 0; i < 20; i++) {
//         dad.push(
//             <MakeMsg/>
//         );
//     }
//     return dad;
// }

//============================================
class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Inbox: [],
            OutBox: [],
            Msg: [],

        };
        this.GetMessagesSend();
        this.GetMessagesGet();

    }

    //----------------------------------------------
    GetMessagesSend() {
        var cookies = new Cookies();
        var userID = cookies.get('userID');
        axios.get("/Messages/LoadMessagesSend", {
            params: {
                user_id: userID
            }
        })

            .then(res => {
                    console.log(res.data);
                    var arr = res.data;
                    this.setState({OutBox: this.SetBody(res.data, "panel panel-info", "You send message to: "),})
                },

                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    alert("error");
                }
            );
    }

    //----------------------------------------------
    GetMessagesGet() {
        var cookies = new Cookies();
        var userID = cookies.get('userID');
        axios.get("/Messages/LoadMessagesGet", {
            params: {
                user_id: userID
            }
        })

            .then(res => {
                    console.log(res.data);
                    var arr = res.data;
                    this.setState({Inbox: this.SetBody(res.data, "panel panel-primary", "You have message from: "),})
                },

                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    alert("error");
                }
            );
    }

    //============================================================
    SetBody(arr, className, HeaderMsg) {
        var res = [];
        for (var i = 0; i < arr.length; i++) {
            var Date = "Date: " + arr[i].time.split('T')[0] + "\n Time:" +
                arr[i].time.split('T')[1].split('.')[0];
            res.push(<div class={className}>
                <div class="panel-heading"> {HeaderMsg} <a style={{color: 'black'}} role="button"><b onClick={() => {
                    cookies.set('prodileToShowId', this.state.user_id);
                    window.location.href = "/UserProfile";
                }}>{arr[i].FirstName} {arr[i].LastName}</b></a></div>
                <div class="panel-body"><h4>{arr[i].msg}</h4></div>
                <div class="panel-footer">
                    <small>{Date}</small>
                </div>
            </div>);
        }
        return res;
    }

    //------------------------------------------------------
    render() {
        return (

            <div class="col-md-offset-1">
                <div style={Body}>
                    <div class=" col-md-10 col-lg-10 text-center  well ">
                        <h1 style={{color: 'black', display: 'block', marginLeft: '20px'}}>Welcome to messages </h1>
                    </div>
                    <br/>
                </div>
                <div class="col-md-10 col-lg-10 ">
                    <div class=" col-md-3 col-xs-12" style={StickyStyle}>
                        <RightBlock/>
                    </div>

                    <div class="panel panel-default col-sm-12  col-xs-12 col-md-6 ">
                        <div class="panel-heading">
                            <ul class="nav nav-tabs ">
                                <li class="active"><a data-toggle="tab" href="#InBox" style={{color:'black'}}>Inbox</a></li>
                                <li><a data-toggle="tab" href="#OutBox" style={{color:'black'}}>Outbox</a></li>
                                <li><a data-toggle="tab" href="#NewMsg" style={{color:'black'}}>New message</a></li>

                            </ul>
                            <ToastContainer />
                        </div>

                        <div class="tab-content">
                            <div id="InBox" class="tab-pane fade in active">
                                {this.state.Inbox.length < 1 ? <h3>you not have any messages</h3> : this.state.Inbox}
                            </div>
                            <div id="OutBox" class="tab-pane fade">
                                {this.state.OutBox.length < 1 ? <h3>you not have any messages</h3> : this.state.OutBox}
                            </div>
                            <div id="NewMsg" class="tab-pane fade" style={{marginTop: '6px'}}>
                                <NewMsg/>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-3 " style={StickyStyle}>
                               <LeftBlock/>
                    </div>
                </div>
            </div>

        )
    }
}

export default Messages;
//=================================c
//=======================================================
const Body = {
    padding: '15px',
    paddingTop: '30px',
    color: '#fffdf5'
};
//===========================================================
//===========================================================
const StickyStyle = {
    position: '-webkit-sticky',
    top: '60px',
    position: 'sticky'
};
const BodyStyle = {
    color: '#f7f3ff',
    margin: '20px',
    padding: '30px'
};

const HeaderStyle = {

    marginTop: '140px'
};
//==================================color:'#000000',
const pStyle = {
    color: '#000000',

};
//==================================
const TextStyle = {
    //backgroundColor:'#fffdf5',
};