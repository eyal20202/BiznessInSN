import React from 'react'
import {Link} from 'react-router-dom'
import Commnets from './Comments'
import axios from 'axios';
import Cookies from 'universal-cookie';
import PostHeader from './PostHeader'
const cookies= new Cookies();
//==================================
const butStyle = {

    paddingLeft: '6px',
    marginLeft:'20px'
};
//==================================
const ClickLikeStyle = {

    paddingLeft: '6px',
    color: 'blue',
    marginLeft:'20px'
};
//=====================================================================
class PostFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedLike: butStyle, clickedShare: 'def',
            showComments: false,
            post_id:this.props.post_id,UserLikes:[],showUsersLike:true,post_comments:[],ComSize:0,
        };
        this.GetPostLike();
        this.GetComments();
       this.GotoProfile=this.GotoProfile.bind(this);
    }
    //--------------------------------------Select = param => e =>{
    GotoProfile= param => e =>{
        cookies.set('prodileToShowId', param);
        window.location.href = "/UserProfile";
    };
///----------------------------------------------------------------------------------
    GetPostLike(){


        axios.get("/Home/GetPostLike", {

            params: {
                post_id:this.props.post_id,
            }
        }) .then(res => {
            console.log(this.props.post_id);
                console.log(res.data);

                if (res.data == "false")
                    return;
                var arr = [];
                for (var i = 0; i < res.data.length; i++) {
                    console.log(i);
                    arr.push(
                        <a class="list-group-item " >

                            <span className="glyphicon glyphicon-user"
                                  onClick={this.GotoProfile(res.data[i].user_id)}> {res.data[i].FirstName} {res.data[i].LastName}</span> </a>);
                    if(cookies.get('userID')==res.data[i].user_id){
                        this.setState({
                            clickedLike: ClickLikeStyle
                        });

                    }
                }
                {/*<ul class="list-group" style={{display:'inline',width: '100%',  position: 'absolute'}} >*/}
                    {/*{this.state.ShowSug}*/}
                {/*</ul>  onClick={this.Select(arr[i].ID)}*/}
                this.setState({UserLikes:arr});
            },

            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {

            }
        );

    }
    //--------------------------------------------------------------------------
    handleClick(e) {

        if (e.currentTarget.id == 'Like') {
            if (this.state.clickedLike == 'def'){
                this.setState({
                    clickedLike: ClickLikeStyle
                });


            }
            else {

                this.setState({
                    clickedLike: 'def'
                });
                axios.get("/Home/RemoveLike", {

                    params: {
                        user_id:cookies.get('userID'),
                        post_id:this.state.post_id
                    }
                }) .then(res => {
                        if (res.data == "false")
                            return;
                        this.GetPostLike();
                    },

                    (error) => {

                    }
                );
            }
        };
    }

    //==================================
    handleClickLike(e) {

        if (this.state.clickedLike == butStyle) {
            this.setState({
                clickedLike: ClickLikeStyle
            });

            axios.get("/Home/AddLike", {

                params: {
                    user_id:cookies.get('userID'),
                    post_id:this.state.post_id
                }
            }) .then(res => {
                    if (res.data == "false")
                        return;

                    this.GetPostLike();
                },

                (error) => {

                }
            );
        }
        else {
            this.setState({
                clickedLike: butStyle
            });
            axios.get("/Home/RemoveLike", {

                params: {
                    user_id:cookies.get('userID'),
                    post_id:this.state.post_id
                }
            }) .then(res => {
                    if (res.data == "false")
                        return;
                    this.GetPostLike();
                },

                (error) => {

                }
            );

        }
    }
//-------------------------------------------------------------
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
                this.setState({ComSize:arr.length});
            },

            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {

            }
        );

    }
// ----------------------------------------------
//--------------------------------------------------------------
    handleClickComment(e) {
        this.setState({
            showComments: !this.state.showComments
        });

    }
//-----------------------------------
    Clickc(){
        this.setState({
            showUsersLike:! this.state.showUsersLike });

    }
    render() {
        return (


            <div style={FooterStyle}>

                <hr/>
                <div >
                    <a role="button" href style={{color:'grey',paddingLeft:'17px'}} data-toggle="modal"
                       data-target={"#"+"myModalLike"+this.state.post_id} onClick={this.Clickc.bind(this)}>{this.state.UserLikes.length} Likes  </a>
                    <div class="modal fade" id={"myModalLike"+this.state.post_id} role="dialog">
                        <div class="modal-dialog">


                            <div class="modal-content">
                                <div class="modal-header" style={{backgroundColor:'blue'}}>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <h4 class="modal-title">{this.state.UserLikes.length} Users like this post: </h4>
                                </div>
                                <div class="modal-body">
                                    <ul hidden={this.state.showUsersLike} >
                                        {this.state.UserLikes}
                                    </ul>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-info" data-dismiss="modal" >Close</button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <a role="button" style={{color:'grey',paddingLeft:'35px'}}
                       onClick={this.handleClickComment.bind(this)}>{this.state.ComSize +" Comments"} </a>




                </div>
                <button  class="btn btn-default btn-sm   glyphicon glyphicon-thumbs-up"
                         style={this.state.clickedLike}
                         onClick={this.handleClickLike.bind(this)}> Like </button>
                    <button  class="btn btn-default btn-sm  glyphicon glyphicon-comment" style={butStyle}
                             onClick={this.handleClickComment.bind(this)} >  Comment</button>
                    {this.state.showComments ? <Commnets  Com={this.state.post_comments} post_id={this.state.post_id}/> : null}








            </div>

        )
    }
}

//=================================
const dropdownStyle = {
    display:'inline-block',

};
//=================================
const DropMenu = {
    color: 'black',

};
//==================================
const FooterStyle = {
    //  marginBottom: '1%',
    //  padding:'1%'
};
//=================================class="dropdown-menu dropdown-menu-right"
export default PostFooter


