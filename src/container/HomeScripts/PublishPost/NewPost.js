import React from 'react'

import axios from 'axios';
import Cookies from 'universal-cookie';
import PostHeader from '../PostHeader'
//==================================
const cookies= new Cookies();
//==================================
const butStyle = {

    paddingLeft: '6%'
};
//==================================
const ClickLikeStyle = {

    paddingLeft: '6%',
    color: 'blue'
};

//==================================
class NewPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            InputVal: '', ButPostStyle: true,
            clickedLike: butStyle, num: 3, comment: ""
        };
    }

    handleChange(e) {


        // this.setState({ReplyStyle: inputReplyStyle});

    }

    handleInputChange(e) {
        this.setState({InputVal: e.target.value});
        if (e.target.value.length > 0) {
            this.setState({ButPostStyle: false});
        }
        else
            this.setState({ButPostStyle: true});

        this.setState({comment: e.target.value});

    }

    PublishPost(e) {
        //=================================================
        axios.get("/Home/NewPost", {
            params: {
                PostMsg: this.state.comment,
                user_id:cookies.get('userID')
            }
        })

            .then(res => {
                    console.log(res.data);
                    this.setState({new_msg: 'Post successful',comment:""});
                },

                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                   alert("Post publosh");
                }
            );


        //===============================

    }

    render() {
        return ( <div style={PostStyle}class="shdow  ">
            <div>
                <PostHeader type="NewPost"/>
            </div>

        <div id='body' style={InputBoxStyle}>
            <h3>Share an post or idea</h3>
            <textarea className="from-control" style={TextAreaq} value={this.state.comment} onChange={this.handleInputChange.bind(this)}
                      rows="8" cols="80" placeholder="Write here a post..."></textarea>

            <hr/>

            <button class="btn btn-primary btn-sm" disabled={this.state.ButPostStyle}
                 style={{marginLeft:'21px'}}   onClick={this.PublishPost.bind(this)}  data-toggle="modal" data-target="#myModal"> Post
            </button>

            <button style={ButStyleHeader} class="btn btn-default  btn-sm glyphicon glyphicon-picture"> Images</button>



            <div class="modal fade" id="myModal" role="dialog">
                <div class="modal-dialog">


                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Status</h4>
                        </div>
                        <div class="modal-body" style={{backgroundColor:'#5cb85c'}}>
                            <h2 style={{color:'white'}}>{this.state.new_msg}</h2>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal" >close</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>)
    }

}

export default NewPost;
//=======================================
const InputBoxStyle = {
    paddingLeft: '3px',
    margin: '1px',

};
//=======================================
const TextAreaq = {
    maxWidth:'350px',
};
//===================
const PostStyle = {
    padding: '1%',
    margin: '1%',
    backgroundColor: '#F5F5F5'
};
//==========================
const ButStyleHeader = {
    marginLeft: '4%',
};

//=====================

