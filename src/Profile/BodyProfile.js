import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import Cookies from 'universal-cookie';
import Autocomplete from 'react-google-autocomplete';
import AutoCom from '../container/AutoCom';
//-----------------------------------------------------------
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//-----------------------------------------------------------
class BodyProfile extends React.Component {
    constructor(props) {
        super(props);
        const cookies = new Cookies();
        this.state = {
            PermissionUser: cookies.get('prodileToShowId') == cookies.get('userID'),
            PermissionFrined: false,
            PermissionForeign: true,
            First: true,
            Experience: [],
            NewEx: false,
            Remove: true,
            current: false,
            StartDay: '',
            EndDay: '',
            UserPlace: "",
            FromHid: false,
            UserData: "",
            WorkerTypeShow: true,
            UserSkills: "",
            AddSkills: false,
            AddSkill: [],
            RemoveSkill: true,
            SaveSkills: [],
            ExLocation: "",
        };
        this.RemoveEx = this.RemoveEx.bind(this);
        this.RemoveSkills = this.RemoveSkills.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.openCity = this.openCity.bind(this);
    }

    handleClick(e) {
        if (this.props.type == 'PermissionUser')//prodileToShowId
            this.setState({PermissionUser: true});
        else if (this.props.type == 'PermissionFrined')
            this.setState({PermissionFrined: true});
        else if (this.props.type == 'PermissionForeign')
            this.setState({PermissionForeign: true});


    }

    //==============================================================
    ButtonOption(funAdd, funcEdit) {
        return (
            <div>
                {/*<button type="button" class="btn btn-info" onClick={funAdd}>+</button>*/
                }
                <a role="button" onClick={funAdd} class="glyphicon glyphicon-plus"></a>
                <a role="button"  style={{marginLeft: '30px'}} onClick={funcEdit}><b>Remove</b></a>

                <br/>
            </div>)
    }

    //======================================================================================================
    handelRemove(e) {

        this.setState({
            Remove: !this.state.Remove,
            First: !this.state.First,
        });

    }

    //====================================================
    RemoveEx = param => e => {

        const cookies = new Cookies();
        var userID = cookies.get('prodileToShowId');

        axios.get("/UserProfile/RemoveExperience", {
            params: {
                MsgID: param,
                userID: userID,

            }
        }).then(res => {


                if (res.data === "false") {
                    alert("inviald data ");

                    return false;
                }
                else {

                    toast.success("delete succses !",{
                        position: toast.POSITION.TOP_CENTER
                    });
                    //alert("delete succses");
                    // window.location.reload();


                }
                this.handelData();
            },

            (error) => {

                alert("error");
            });
    };

    //===========================================================================================================
    Add() {
        this.setState({
            NewEx: !this.state.NewEx,
        });

    }

    //===============================================================
    AddEx() {

        return (
            <div class="container col-md-12 ">

                <div class="login-panel panel panel-primary" id="from-panl">
                    <div class="panel-heading">
                        <h3 class="panel-title">Add new Experience</h3>
                    </div>
                    <div class="panel-body">
                        <form id="form" class="form-horizontal" onSubmit={this.handelNewEx.bind(this)}>

                            <div class="form-group">
                                <label class="control-label col-sm-2" for="Title">Title:</label>
                                <div class="col-sm-10">
                                    <input required type="text" class="form-control" id="Title"
                                           placeholder="Enter Title" name="Title"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-sm-2" for="Company">Company name:</label>
                                <div class="col-sm-10">
                                    <input required={"required"} type="text" class="form-control" id="Company"
                                           placeholder="Enter Company name" name="Company"/>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-sm-2" for="location">location: </label>
                                <div name="Location" id="Location" class="col-sm-10">
                                    <Autocomplete class="form-control" componentRestrictions={{country: "isr"}}
                                                  style={{width: '100%'}}
                                                  onPlaceSelected={(place) => {
                                                      this.setState({ExLocation: place});
                                                      console.log(place);
                                                  }}
                                                  types={['(regions)']}/>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-sm-2" for="Description">Description:</label>
                                <div class="col-sm-10">
                                    <input required={"required"} type="text" class="form-control" id="Description"
                                           placeholder="Enter Description" name="Description"/>
                                </div>
                            </div>


                            <div class="form-group">
                                <label class="control-label col-sm-2" for="Mon">Start Date:</label>
                                <div class="col-sm-10">
                                    {this.month("SM")}
                                    <select id="SY" class="form-control">
                                        {this.year()}
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-sm-2" for="CY">current job</label>
                                <div class="col-sm-10 ">
                                    <div class="checkbox col-sm-6">
                                        <input type="checkbox" id="CY" name="disabled" value={this.state.current}
                                               checked={this.state.disabled}
                                               onChange={this.handleInputChange}/>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group" hidden={this.state.current}>
                                <label class="control-label col-sm-2" for="Mon">End Date </label>
                                <div class="col-sm-10">

                                    <div hidden={this.state.current}>

                                        {this.month("EM")}

                                        <select id="EY" class="form-control" name="SY">
                                            {this.year()}
                                        </select>
                                    </div>
                                </div>
                            </div>


                            <div class="form-group">
                                <div class="col-sm-offset-2 col-sm-10">
                                    <button id="sendBtn" type="button" onClick={this.handelNewEx.bind(this)}
                                            class="btn btn-info">Submit
                                    </button>
                                </div>
                            </div>


                        </form>
                    </div>

                </div>


            </div>

        )

    }

    //====================================================================
    handleInputChange(event) {

        const target = event.target;

        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            current: value,
        });

        if (this.state.current) {
            var da = new Date();

        }
        else {
            da = document.getElementById('EM').value.toString() + document.getElementById('EY').value.toString()
        }

    }

//==========================================================================
    year() {
        var arr = [];

        for (let i = 1960; i <= 2018; i++) {
            arr.push(<option key={i} value={i}>{i}</option>)
        }

        return arr;
    }

    month(nid) {
        var arr = [];
        arr.push(
            <select id={nid} class="form-control" name={nid}>
                <label>Month</label>+
                <option value="January">January</option>
                +
                <option value="February">February</option>
                +
                <option value="March">March</option>
                +
                <option value="April">April</option>
                +
                <option value="May">May</option>
                +
                <option value="June">June</option>
                +
                <option value="July">July</option>
                +
                <option value="August">August</option>
                +
                <option value="September">September</option>
                +
                <option value="October">October</option>
                +
                <option value="November">November</option>
                +
                <option value="December">December</option>
                +
            </select>
        );
        return arr;
    }

    //================================================================
    handelNewEx(e) {


        e.preventDefault();


        var user = [];

        user['Title'] = document.getElementById('Title').value;
        user['Company'] = document.getElementById('Company').value;
        user['Location'] = this.state.ExLocation;
        user['Description'] = document.getElementById('Description').value;
        var END = null;

        if (!this.state.current) {
            END = document.getElementById('EM').value + " " + document.getElementById('EY').value;

        }

        const cookies = new Cookies();
        var userID = cookies.get('userID');


        axios.get("/UserProfile/AddExperience", {
            params: {
                Title: document.getElementById('Title').value,
                Company: document.getElementById('Company').value,
                Location: this.state.ExLocation["formatted_address"],
                Description: document.getElementById('Description').value,
                userID: userID,
                START: document.getElementById('SM').value + " " + document.getElementById('SY').value,
                END: END,


            }

        }).then(res => {

                if (res.data === "false") {
                    alert("inviald data ");
                    return false;
                }
                if (this.state.current)
                    this.InsertToDbUserCurrentJob(user['Title'] + " at " + user['Company']);
                else

                    toast.success("Update Done! !",{
                        position: toast.POSITION.TOP_CENTER
                    });
                this.handelData();
            }

            ,
            (error) => {
                alert("error");
            }
        );
        //SendToServer();
        return false;

    }

    //===============================================================
    GetUserData() {
        const cookies = new Cookies();
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
        axios.get("/UserProfile/Skills", {
            params: {
                userID: cookies.get('prodileToShowId'),
            }
        })
            .then(res => {
                    if (res.data.length == 0)
                        return;

                    this.setState({UserSkills: []});
                    var arrdata = res.data;
                    var arr = [];

                    var Save = [];
                    for (var i = 0; i < arrdata.length; i++) {
                        Save.push(arrdata[i]['skill']);
                        arr.push(
                            <div className="col-md-12">
                                <div className="col-md-1" style={{color:'black'}}>
                                    {this.state.PermissionUser ?
                                        <a role="button"  hidden={this.state.RemoveSkill} style={{marginLeft: '20px'}}
                                          onClick={this.RemoveSkills(arrdata[i]['ID'])}>
                                            <b >x</b>
                                        </a>
                                        : null}
                                </div>
                                <div className="col-md-11 bg-primary" style={{
                                    marginBottom: '10px',
                                    marginLeft: '10px',
                                    marginTop: '10px',
                                    borderRadius: '25px',
                                    borderStyle: 'solid',
                                    borderWidth: '1px'
                                }}>

                                    <div style={{paddingTop: '10px', paddingBottom: '10px', paddingLeft: '10px'}}>
                            <span>
                                <b>{arrdata[i]["skill"]} </b>
                            </span>

                                    </div>
                                </div>
                            </div>
                        )
                    }

                    this.setState({SaveSkills: Save});
                    console.log(this.state.SaveSkills);
                    this.setState({UserSkills: arr});
                }, (error) => {
                }
            );
    }

    //================================================================
    handelData(e) {
        const cookies = new Cookies();
        this.setState({
            First: false,
        });

        axios.get("/UserProfile/Experience", {
            params: {
                userID: cookies.get('prodileToShowId'),
            }
        })
            .then(res => {
                    var PostRes;
                    this.GetUserData();
                    console.log(res.data);
                    var dad = [];
                    PostRes = res.data;
                    /*      if(this.state.profileID==cookies.get('userID'))
                          this.setState({PermissionUser: true});
                          else
                              this.setState({PermissionUser: false});*/
                    for (var i = 0; i < PostRes.length; i++) {
                        dad.push(
                            //------------------------------------
                            <div class="col-md-12 login-panel panel panel-primary shdow">

                                <div>
                                    <div class="panel-body" style={{color:'black'}}>
                                        {this.state.PermissionUser ?
<div>
                                            <a role="button"  hidden={this.state.Remove} style={{marginLeft: '20px'}}
                                               onClick={this.RemoveEx(PostRes[i].ID)}>

                                                <b >x</b>
                                            </a>

                                        </div>: null}
                                        <h3 style={pStyle}>Title: {PostRes[i].Title}</h3>
                                        <h4 style={pStyle}>Company: {PostRes[i].Company}</h4>
                                        <h5 style={pStyle}>Location: {PostRes[i].Location}</h5>
                                        <h5 style={pStyle}> {PostRes[i].start} {PostRes[i].end == null ? "- Present" : " - " + PostRes[i].end}</h5>
                                        <div>
                                            <h5 style={pStyle}>{PostRes[i].Description}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            //---------------------------------
                        );
                    }
                    this.setState({
                        Experience: dad,
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

//=====================================================================================================
    EditForm() {
        this.setState({FromHid: !this.state.FromHid,});

    }

    //----------------------------------------------------------------------------------------------------------------
    InsertToDbUserCurrentJob(currentjob) {


        const cookies = new Cookies();

        axios.get("/UserProfile/UpdateCurrentJob", {
            params: {
                CurrentJob: currentjob,
                userID: cookies.get('userID')
            }
        })

            .then(res => {

                    toast.success("Update Done! !",{
                        position: toast.POSITION.TOP_CENTER
                    });
                    this.handelData();
                },


                (error) => {
                    alert("Srever Error");

                }
            );


    }

//----------------------------------------------------------------------------------------------------------------
    InsertToDbEditForm() {
        this.setState({FromHid: !this.state.FromHid,});
        const cookies = new Cookies();
        axios.get("/UserProfile/UpdataFrom", {
            params: {
                UserPlace: this.state.UserPlace["formatted_address"],
                userID: cookies.get('userID')
            }
        })
            .then(res => {


                        toast.success("delete succses !",{
                            position: toast.POSITION.TOP_CENTER
                        });
                        //alert("delete succses");
                        // window.location.reload();



                    this.handelData()
                },
                (error) => {
                    alert("Srever Error");
                }
            );
    }

//=====================================================================================================
    InsertToDbEmployee() {

        var value = "";
        if (document.getElementById('Independent').checked) {
            value = 'Independent';
        } else if (document.getElementById('Employee').checked) {
            value = "Employee";
        }

        const cookies = new Cookies();

        axios.get("/UserProfile/UpdataWorkerType", {
            params: {
                WorkerType: value,
                userID: cookies.get('userID')
            }
        })
            .then(res => {

                    toast.success("Update Done! !",{
                        position: toast.POSITION.TOP_CENTER
                    });
                    //alert("delete succses");
                    // window.location.reload();



                    this.handelData()
                },
                (error) => {
                    alert("Srever Error");
                }
            );
    }

    //---------------------------------------------------------
    RemSkill(e) {

        this.setState({RemoveSkill: !this.state.RemoveSkill});
        this.GetUserData();
    }

    //---------------------------------------------------------
    AddSkiils(e) {

        this.setState({AddSkills: !this.state.AddSkills});

    }

//====================================================================================================
    InsertSkills(val, arrSkill) {
        console.log(val.SubCategory);

        const cookies = new Cookies();
        console.log((arrSkill));
        if (arrSkill.indexOf(val.SubCategory) != -1) {

            toast.error("You alreay select this skill! !",{
                position: toast.POSITION.TOP_CENTER
            });
        } else {
            axios.get("/UserProfile/InsertSkill", {
                params: {
                    userid: cookies.get('userID'),
                    skill: val.SubCategory
                }
            })
                .then(res => {


                        console.log(arrSkill.length);
                        if (arrSkill.length == 0) {
                            axios.get("/UserProfile/UpdateUserWorkCategory", {
                                params: {
                                    userid: cookies.get('userID'),
                                    category: val.category_id
                                }
                            })
                                .then(res => {

                                        toast.success("Update Done! !",{
                                            position: toast.POSITION.TOP_CENTER
                                        });
                                        this.handelData();
                                        //alert("delete succses");
                                       // window.location.reload();




                                    },
                                    (error) => {
                                        alert("Srever Error");
                                    }
                                );


                        }

                        toast.success("Update Done! !",{
                            position: toast.POSITION.TOP_CENTER
                        });
                        //alert("delete succses");
                       window.location.reload();


                    },
                    (error) => {
                        alert("Srever Error");
                    }
                );
        }
    }

    //=============================================================================================
    RemoveSkills = param => e => {


        const cookies = new Cookies();
        var userID = cookies.get('prodileToShowId');

        axios.get("/UserProfile/RemoveSkill", {
            params: {
                skillid: param,


            }
        }).then(res => {


                if (res.data === "false") {
                    toast.error("inviald data !",{
                        position: toast.POSITION.TOP_CENTER
                    });

                    return false;
                }
                else {
                    toast.success("delete succses !",{
                        position: toast.POSITION.TOP_CENTER
                    });

                    // window.location.reload();


                }
                this.handelData();
                            },

            (error) => {

                alert("error");
            });
    };
//-----------------------------------
    openCity = param => e => {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(param).style.display = "block";
        e.target.className += " active";
    };

//=====================================================================================================
    render() {

        return (

            <div>


                <div class="panel panel-default ">
                    <div class="panel-heading">

                        <ul class="nav nav-pills "style={{color:'black'}}>
                            <li class="active"><a data-toggle="pill" href="#Experience" style={{color:'black'}}>Experience</a></li>
                            <li><a data-toggle="pill" href="#Skills" style={{color:'black'}}>Skills</a></li>

                            <li><a data-toggle="pill" href="#From1" style={{color:'black'}}>From</a></li>
                            <li><a data-toggle="pill" href="#Employee" style={{color:'black'}}>Your work type</a></li>
                        </ul>
                        <ToastContainer />
                    </div>
                    <div class="panel panel-body">
                        <div class="tab-content">

                            <div id="Experience" class="tab-pane fade in active">
                                <div>
                                    <div className="bg-primary">
                                        <h1 class="text-center">Experience</h1>
                                    </div>

                                    <div style={{marginLeft:'10px',marginBottom:'30px',marginTop:'30px'}}>
                                        {this.state.PermissionUser ? this.ButtonOption(this.Add.bind(this), this.handelRemove.bind(this)) : null}
                                    </div>
                                        {this.state.NewEx ? this.AddEx() : null}
                                        {this.state.First ? this.handelData() : null}

                                        {this.state.Experience}

                                </div>
                            </div>
                            <div id="Skills" class="tab-pane fade ">
                                <div>
                                    <div className="bg-primary">
                                        <h1 class="text-center">Skills</h1>
                                    </div>
                                    {this.state.PermissionUser ? <div style={{marginLeft: '43px'}}>
                                        {this.ButtonOption(this.AddSkiils.bind(this), this.RemSkill.bind(this))} </div> : null}
                                    {this.state.AddSkills ? (<div class="col-md-12 ">

                                        <div>


                                            <div class="form-group bg-primary">
                                                <label class="control-label col-sm-3 " for="Skill">Add your
                                                    Skill: </label>
                                                <div>

                                                    <AutoCom SaveResFunc={this.InsertSkills}
                                                             SaveRes={this.state.SaveSkills}
                                                             table="skilessubcategory"
                                                             placeholder="enter skill name" name="Skill"
                                                             class="  form-control"/>
                                                </div>
                                            </div>


                                        </div>


                                    </div>) : null}
                                    <div class=" col-md-5">
                                        <h4> {this.state.UserSkills} </h4>
                                    </div>
                                    <br/>


                                </div>
                            </div>

                            <div id="From1" class="tab-pane   fade shdow"
                                 style={{borderRadius: '1px', borderWidth: '1px'}}>
                                <div class="bg-primary">
                                    <div style={{paddingTop: '10px', marginLeft: '30px'}}>

                                        <h2>From</h2>
                                    </div>
                                    <div class="col-md-12">

                                        {this.state.UserData["location"] != null ?
                                            <div class=" col-md-5" style={{
                                                borderRadius: '25px',
                                                borderStyle: 'solid',
                                                borderWidth: '1px'
                                            }}>
                                                <h4 style={{
                                                    marginBottom: '20px',
                                                    marginLeft: '30px',
                                                    marginTop: '20px'
                                                }}
                                                    class="glyphicon glyphicon-map-marker"> {this.state.UserData["location"]}</h4>
                                            </div> : null}
                                    </div>
                                    <br/>
                                    {this.state.PermissionUser ?

                                        <button class="btn btn-info"
                                                style={{marginBottom: '20px', marginLeft: '30px', marginTop: '20px'}}
                                                onClick={this.EditForm.bind(this)}>
                                            Edit</button> :        <div>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <br/>
                                        </div>}
                                    {this.state.FromHid ? <div>
                                        <br/>
                                        <div style={{marginBottom: '20px', marginLeft: '30px', marginTop: '20px'}}>
                                        <Autocomplete componentRestrictions={{country: "isr"}} style={{width: '90%',color:'black'}}
                                                      onPlaceSelected={(place) => {
                                                          this.setState({UserPlace: place});
                                                          console.log(place);
                                                      }}
                                                      types={['(regions)']}/>
                                        <br/>
                                        </div>
                                        <button class="btn btn-info" onClick={this.InsertToDbEditForm.bind(this)}
                                                style={{marginLeft: '30px'}}>
                                            Submit
                                        </button>
                                    </div> :null  }


                                    <div>
                                    <br/>
                                    </div>
                                </div>
                            </div>


                            <div id="Employee" class="tab-pane bg-primary panel-body fade shdow"
                                 style={{borderRadius: '1px', borderWidth: '1px'}}>
                                <h3 style={{marginLeft: '30px'}}>Independent or Employee</h3>

                                <div class="col-md-12 ">
                                    {this.state.UserData["WorkerType"] != null ?
                                        <div class=" col-md-5"
                                             style={{borderRadius: '25px', borderStyle: 'solid', borderWidth: '1px'}}>
                                            <h4 class="glyphicon  glyphicon-briefcase"> {this.state.UserData["WorkerType"]}</h4>
                                        </div> : null}
                                </div>
                                <br/>

                                {this.state.PermissionUser ? <div>
                                    <br/>
                                    <button style={{marginLeft: '30px', marginTop: '15px'}} class="btn btn-info"
                                            onClick={() => this.setState({WorkerTypeShow: !this.state.WorkerTypeShow})}>
                                        Edit
                                    </button>


                                    <div id="radios" hidden={this.state.WorkerTypeShow}>
                                        <div class="radio">
                                            <label><input value="Independent" type="radio" id="Independent"
                                                          name="optradio"/>Independent
                                            </label>
                                        </div>
                                        <div class="radio">
                                            <label><input value="Employee" type="radio" id="Employee"
                                                          name="optradio"/>Employee</label>
                                        </div>
                                        <br/>
                                        <button class="btn btn-info" onClick={this.InsertToDbEmployee.bind(this)}>
                                            Submit
                                        </button>
                                    </div>
                                </div> : null}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }


}


//===========================================================
const BodyStyle = {
    //color: '#556564'
};

//==================================color:'#000000',
const pStyle = {
    color: '#000000',

};
//===========================================================
const StickyStyle = {
    position: '-webkit-sticky',
    top: '100px',
    position: 'sticky'
};

//=============================================================
function SendToServer() {
    var user = [];

    user['Title'] = document.getElementById('Title').value;
    user['Company'] = document.getElementById('Company').value;
    user['Location'] = document.getElementById('Location').value;
    user['Description'] = document.getElementById('Description').value;
    user['email'] = "avi@walla.com";
    user['password'] = "a";
    axios.post("/UserProfile/Experience", {user}).then(res => {//"/UserProfile/Experience"

            console.log(typeof (res.data));
            if (res.data === "false") {

                toast.error("inviald data !!!",{
                    position: toast.POSITION.TOP_CENTER
                });
                //alert("delete succses");
                // window.location.reload();

                return true;
            }
            else {
                return false;
                /*  this.setState({
                      NewEx:"succses to add",
                  });*/
            }

        },

        (error) => {

            alert("error");
        }
    );
}

//============================


export default BodyProfile
