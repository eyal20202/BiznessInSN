import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import AutoCom from '../AutoCom'
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
//============================================
class NewMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            InputVal: '', ButPostStyle: true,
            applay:this.props.userId>0,
            SendTo:this.props.userId,
            afterSend:this.props.afterSend,
        };
    }

    //--------------------------------------------

    handleInputChange(e) {
        this.setState({InputVal: e.target.value});
        if (e.target.value.length > 0) {
            this.setState({ButPostStyle: false});
        }
        else
            this.setState({ButPostStyle: true});

        this.setState({comment: e.target.value});

    }
    hanelSendTo(val,bla){
        this.setState({SendTo:val.ID})
    }
    //----------------------------------------------SendTo
    PublishMsg(e) {
        e.preventDefault();
        if(this.state.SendTo<0){
            toast.error("We will not choose who to send the message to !",{
                position: toast.POSITION.TOP_CENTER
            });


            return false;
        }
var cookies=new Cookies();
        var userID = cookies.get('userID');

        axios.get("/Messages/SendMsg", {
            params: {
          SendFor:this.state.SendTo,
                Msg:this.state.InputVal,
                userID: userID,

            }
        }).then(res => {
                if (res.data === "false") {
                    toast.error("inviald data!",{
                        position: toast.POSITION.TOP_CENTER
                    });

                    return false;
                }
                else {

                    toast.success("Message sended!",{
                        position: toast.POSITION.TOP_CENTER
                    });
                    if(this.state.applay)
                        this.state.afterSend();


                }


            },
            (error) => {
                alert("error");
            }
        );
        //SendToServer();
        return false;



    }

    //------------------------------------------------------
    render() {
        return (


                <div style={PostStyle} >

                    {this.state.applay ? null:
                    <div>
                        <div class="form-group  ">
                            <b >TO: </b>
                            <div >

                                <AutoCom SaveRes="x" SaveResFunc={this.hanelSendTo.bind(this)} table="users" style={{display: 'block'}}
                                         placeholder="enter user name" name="user"
                                         />
                            </div>
                        </div>
                        <hr/>
                    </div>
                    }

                    <ToastContainer />
                    <div class="form-group ">

                        <b  >Write your messages: </b>

            <textarea style={TextAreaq}  name="newMsg" onChange={this.handleInputChange.bind(this)}
                      placeholder="Write here your message..."></textarea>

                        <hr/>

                        <button class="btn btn-info" disabled={this.state.ButPostStyle}
                                onClick={this.PublishMsg.bind(this)}> Send
                        </button>


                    </div>
                </div>


        )
    }
}

export default NewMsg;
//--------------------------------------
//=======================================
const InputBoxStyle = {
    paddingLeft: '3px',
    margin: '1px',

};
//=======================================
const TextAreaq = {
    color:'black',

  };
//===================
const PostStyle = {
    padding: '1px',
    margin: '1px',
    marginTop:'30px',
   // backgroundColor: '#F5F5F5',

    color:'black'
};
//==========================
const ButStyleHeader = {
    marginLeft: '4px',
};
