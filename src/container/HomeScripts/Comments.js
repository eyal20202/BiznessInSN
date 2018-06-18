import React from 'react'
import {Link} from 'react-router-dom'
import PostHeader from './PostHeader'
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies= new Cookies();

// //==================================
// const butStyle = {
//
//     paddingLeft: '6%'
// };
//
// //==================================
// class Commnet extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             post_id:this.props.post_id,InputVal: '', ShowSend: false, ReplyStyle: inputStartStyle,post_comments:[]
//         };
//
//     }
//
//     handleChange(e) {
//
//
//         this.setState({ReplyStyle: inputReplyStyle});
//
//     }
//
//     handleInputChange(e) {
//         this.setState({InputVal: e.target.value});
//         if (e.target.value.length > 0) {
//             this.setState({ShowSend: true});
//         }
//         else
//             this.setState({ShowSend: false});
//     }
//
//
//     render() {
//         return <div> {this.sate.post_comments}</div>
//     }
//
// }
//
// //=======================================
//
//======================================
// function AddNewComment() {
//
//     return ();
// }

//====================================
class Commnets extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            InputVal: '', ShowSendBut: false,post_id:this.props.post_id,post_comments:this.props.Com
        };
    //   this.GetComments();
    }
//-----------------------------------------
    //--------------------------------------------------
    GetComments(){
        axios.get("/Home/GetCommentsPost", {

            params: {
                post_id:this.props.post_id,
            }
        }) .then(res => {
                console.log(this.state.post_id);
                console.log(res.data);

                if (res.data.length <1 || res.data==="false") {
                    this.setState({post_comments:<div class="well">dont have any comments yet</div>});
                    return;
                }

                var arr = [];
                for (var i = 0; i < res.data.length; i++) {
                    console.log(i);
                    arr.push(
                        <div style={{height:'70%'}}>
                            <div >
                                <PostHeader src={"https://www.w3schools.com/bootstrap/img_avatar2.png"}
                                            time_post={res.data[i].time} user_id={res.data[i].user_id} type='ComPost' />
                                <div style={{marginLeft:'30px'}}><small>   {res.data[i].msg }  </small>
                                </div>
                            </div>

                        </div>);

                }
                {/*<ul class="list-group" style={{display:'inline',width: '100%',  position: 'absolute'}} >*/}
                {/*{this.state.ShowSug}*/}
                {/*</ul>  onClick={this.Select(arr[i].ID)}*/}
                this.setState({post_comments:arr});
            },

            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {

            }
        );

    }
// ----------------------------------------------
    handleChange(e) {
        this.setState({InputVal: e.target.value});
        if (e.target.value.length > 0) {
            this.setState({ShowSendBut: true});
        }
        else
            this.setState({ShowSendBut: false});
    }
//--------------------------------------------------------
    SaveCom(){
        this.setState({InputVal:'',comment:""});
        axios.get("/Home/SaveCom", {

            params: {
                post_id:this.props.post_id,
                msg:this.state.InputVal,
                user_id:cookies.get('userID'),

            }
        }) .then(res => {
                if ( res.data==="false")
                    return;


                this.GetComments();

                    },

            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {

            }
        );

    }
    //------------------------------------------------------------------
    render() {
        return <div>
            <br/>
            <div class="well jump" >
                <textarea col="50" row="4"
                    type="text"
                    value={this.state.comment}
                    onChange={this.handleChange.bind(this)}
                    placeholder="Write a comment..."

                />
                <div >
                {this.state.ShowSendBut ? <button class="btn btn-info btn-sm"  onClick={this.SaveCom.bind(this)}>Send</button> : null}

                {this.state.post_comments}
                </div>
            </div>


        </div>
    }

}

//=================================
const ReplyStyle = {
    paddingTop: '10px'

}
//=================================
const inputReplyStyle = {
    // paddingBottom: '2%',

}
//=================================
const inputStartStyle = {
    visibility: 'hidden'
}
//=================================class="dropdown-menu dropdown-menu-right"
export default Commnets
