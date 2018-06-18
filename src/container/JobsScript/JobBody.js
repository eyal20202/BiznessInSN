import React from 'react'
import {render} from 'react-dom';
import {JobPost} from './JobPost';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Autocomplete from 'react-google-autocomplete';
import AutoCom from '../AutoCom'
import { ToastContainer, toast } from 'react-toastify';
//===========================================
/*function MakeJobPosts(){

var ResDb;//=GetData();

    var dad=[];
    for(var i=0; i<20;i++){
        dad.push(
            <div class="col-md-4">
            <JobPost header='Job title' body='Job Description' footer='Date published' JobDescription='JobDescription'/>
            </div>
        );
    }
    return dad;
}*/
//========================================
/*function GetData(){


    axios.get("/Job/LoadMas")

        .then(res => {
                var PostRes;
                console.log(res.data);
                var dad=[];
                PostRes=res.data;
                for(var i=0; i<PostRes.length;i++){
                    dad.push(
                        <div class="col-md-4">
                            <JobPost header={PostRes[i].JobTitle} body='Job Description' footer={PostRes[i].DatePublish} JobDescription={PostRes[i].JobDescription}/>
                        </div>
                    );
                    console.log(PostRes[i].JobTitle)
                }
                this.setState({
                    PostJobs: dad
                });
                return dad;
            },

            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    PostJobs: "Error"
                });
            }
        );


}*/
///===================
//========================================
class JobBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PostJobs: [],
            NewJob: false,
            firs: true,
            JobLocation: "",
            SkillCatg:"",

        };
        this.GetData();
    }
//=============================================================
    InsertSkills(val,lmbada){

        this.setState({SkillCatg:val.SubCategory});

    }
//============================================================================
    PostAJob() {

        return (
            <div class="container col-md-12 " style={{borderStyle: 'groove'}}>

                <div class="login-panel panel  panel-info" id="from-panl" >
                    <div class="panel-heading">
                        <h3 class="panel-title">Publish new job</h3>
                    </div>
                    <div class="panel-body">
                        <form id="form" class="form-horizontal" onSubmit={this.handelNewJob.bind(this)}
                              style={FromStyle} >

                            <div class="form-group">
                                <label class="control-label col-sm-2" for="JobTitle">Job Title: </label>
                                <div class="col-sm-10">
                                    <input required type="text" class="form-control" id="JobTitle"
                                           placeholder="Enter Title" name="JobTitle"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-sm-2" for="JobDescription">Job Description: </label>
                                <div class="col-sm-10">
                                    <input required={"required"} type="text" class="form-control" id="JobDescription"
                                           placeholder="Enter Company name" name="JobDescription"/>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-sm-2" for="Company">Company: </label>
                                <div class="col-sm-10">
                                    <input required={"required"} type="text" class="form-control" name="Company" id="Company"
                                           placeholder="Enter Company" />
                                </div>
                            </div>


                            <div class="form-group">
                                <label class="control-label col-sm-2" for="location">location: </label>
                                <div name="location" class="col-sm-10">
                                    <Autocomplete class="form-control" componentRestrictions={{country: "isr"}}
                                                  style={{width: '100%'}}
                                                  onPlaceSelected={(place) => {
                                                      this.setState({JobLocation: place});
                                                      console.log(place);
                                                  }}
                                                  types={['(regions)']}/>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-sm-2" for="category">category: </label>
                                <div class="col-sm-10 ">

                                    <AutoCom  SaveRes="" SaveResFunc={this.InsertSkills} table="skilessubcategory"   style={{display:'inline'}}
                                               placeholder="enter skill name" name="category"
                                               class=" form-control"
                                               />
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-sm-offset-2 col-sm-10">
                                    <button class="btn btn-info" id="sendBtn" type="submit" onSubmit={this.handelNewJob.bind(this)}
                                            >Submit
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>

                </div>


            </div>
        );


    }

    Add() {
        this.setState({
            NewJob: !this.state.NewJob,
        });

    }

//==================================================================================
    handelNewJob(e) {

        e.preventDefault();




        const cookies = new Cookies();
        var userID = cookies.get('userID');
//cookies.get('Value');
        axios.get("/Job/InsertNewJob", {
            params: {
                JobTitle: document.getElementById('JobTitle').value,
                JobDescription: document.getElementById('JobDescription').value,
                Company: document.getElementById('Company').value,
                JobLocation:  this.state.JobLocation["formatted_address"],
                userID: userID,
                SkillCatg: this.state.SkillCatg,

            }
        }).then(res => {
                if (res.data === "false") {

                    toast.error("inviald data !",{
                        position: toast.POSITION.TOP_CENTER
                    });


                    return false;
                }
                toast.success("upload success !",{
                    position: toast.POSITION.TOP_CENTER
                });
                this.GetData();

            },
            (error) => {
                alert("error");
            }
        );
        //SendToServer();
        return false;


    }

    //=============================================================================
    GetData(e) {

        this.setState({firs: false,});
        axios.get("/Job/LoadMas")

            .then(res => {
                    var PostRes;
                    console.log(res.data);
                    var dad = [];
                    PostRes = res.data;
                    for (var i = 0; i < PostRes.length; i++) {
                        var Date = "Date: " + PostRes[i].DatePublish.split('T')[0] + "\n Time:" +
                            PostRes[i].DatePublish.split('T')[1].split('.')[0];
                        dad.push(
                            <JobPost header={PostRes[i].JobTitle} Location={PostRes[i].location}
                                     Company={PostRes[i].Company} body='Job Description' footer={Date}
                                     JobDescription={PostRes[i].JobDescription}
                                     userId={PostRes[i].userID}
                            />
                        );
                        console.log(PostRes[i].JobTitle)
                    }

                    this.setState({
                        PostJobs: dad,
                    });
                    return dad;
                },

                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        PostJobs: "Error"
                    });
                }
            );
    }

    render() {


        return (



            <div class=" col-md-offset-3 col-md-6 col-sm-11 col-xs-11" style={BodyStyle}>

                <div class="container">





                    <div class="panel-group">
                        <div class="panel panel-default">
                            <div class="panel-heading text-center "><h2>Jobs for you</h2></div>

                            <button style= {{marginLeft:'30px',marginTop:'20px'}} class="btn btn-info " onClick={this.Add.bind(this)}>Post a job</button>
                            {this.state.NewJob ? <div  style={{marginTop:'20px'}}> {this.PostAJob()} </div>: null}
                            <hr/>
                            <div class="panel-body" > {this.state.PostJobs}</div>
                        </div>
                        <ToastContainer />
                    </div>
                </div>


            </div>
        )
    }
}
//=======================================================

//===========================================================
const BodyStyle = {
    color: '#f7f3ff',
    margin: '30px',

};
const HeaderStyle = {
    color: '#000000',
    padding: '12px'
};
const text = {

    color: '#72ff32',

};
const FromStyle = {

    color: '#000000',

};
//===========================================================
export default JobBody