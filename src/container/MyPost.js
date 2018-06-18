import React from 'react'
import Post from './HomeScripts/Post'
import axios from 'axios';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
//------------------------------------------------------
const cookies=new Cookies();
//--------------------------------------------------------
class MyPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg:"",
            Posts:[],
            post_id:"",
        };
        this.removee=this.removee.bind(this);
        this.Edit=this.Edit.bind(this);
        this.GetPost();
    }
    //============================================================================================

    //=============================================================================================
    Edit = param => e => {
this.setState({msg:param.msg,post_id:param.id});
    };
    //=============================================================================================
    removee = param => e => {
        axios.get("/Home/RemovePost", {

            params: {
                post_id:param,
            }
        }) .then(res => {
            console.log(res.data);

            if (res.data == "false")
                return;
                this.GetPost();
                toast.success("remove success!",{
                    position: toast.POSITION.TOP_CENTER
                });

                return ;
            },

            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {

            }
        );
    };
//--------------------------------------------------------------------
    GetPost(){


        axios.get("/Home/GetMyPosts", {

            params: {
                user_id:cookies.get('userID'),
            }
        }) .then(res => {
                console.log(res.data);

                if (res.data == "false") {
                    this.setState({Posts:[]});
                    return;
                }
                var arr = [];
                for (var i = 0; i < res.data.length; i++) {
                    console.log(i);
                   var PostDel={
                       id:res.data[i].id,
                       msg:res.data[i].post
                   };
                    arr.push(
                        <div>

                            <div >
                                <button type="button" class="btn btn-primary" style={{marginLeft:'10px'}} onClick={this.Edit(PostDel)} data-toggle="modal"
                                        data-target="#myModal">Edit</button>

                            <button type="button" class="btn btn-primary" style={{marginLeft:'10px'}} onClick={this.removee(res.data[i].id)}>Remove</button>
                            </div>
                            <Post time_post={res.data[i].time_post} user_id={res.data[i].user_id} type='RegPost'
                                  text={res.data[i].post} post_id={res.data[i].id}/>
                            <hr/>
                            {/*<PostFooter/>*/}
                        </div>);
                }
                this.setState({Posts:arr});
            },

            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {

            }
        );


    }
//-------------------------------------------------------------
    SubEdit(){

        axios.get("/Home/EditPost", {

            params: {
                post_id:this.state.post_id,
                msg:this.state.msg,
            }
        }) .then(res => {
                console.log(res.data);

                if (res.data == "false")
                    return;
                this.GetPost();
                toast.success("Edit success!",{
                    position: toast.POSITION.TOP_CENTER
                });



            },

            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {

            }
        );

    }
    //--------------------------------------------------------
    handleInputChange(e) {
        this.setState({msg: e.target.value});
    }
    //------------------------------------------------------
    render() {
        return (
<div>
    <div style={{marginTop:'30px'}} className='well col-md-12 col-lg-12'><h1 className="text-center"> Your Posts:</h1> </div>

            <div style={{marginTop:'30px'}} className="col-md-offset-3 col-lg-offset-3 col-md-6 col-lg-6 well ">

                {this.state.Posts.length < 1 ? <h3 className='well'>you not have any your own posts</h3> :this.state.Posts}
                <ToastContainer />
                <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">


                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Edit Your Post</h4>
                            </div>
                            <div class="modal-body">
                                  <textarea  value={this.state.msg} onChange={this.handleInputChange.bind(this)} type='text' id='TextVal'
                                    className="from-control"  rows="6" cols="50"    placeholder="Write here a post..."/>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-info" data-dismiss="modal" onClick={this.SubEdit.bind(this)}>submit</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            </div>
        )}}

export default MyPost;
//---------------------------------------