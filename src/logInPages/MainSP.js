import React from 'react'
import axios from 'axios';
const PageBody = {
    margin: '10px',
};
const registerStyle = {
    margin: '20px',


};
const TextColor = {

    color: '#000000',

};
//============================================================================================

class MainSP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        //--------------------------------------------
        const user = {};

        user['email']=document.getElementById('EmailReg').value;
        user['FirstName']=document.getElementById('FirstName').value;
        user['LastName']=document.getElementById('LastName').value;
        user['password']=document.getElementById('PasswordReg').value;

        axios.post("/CheckEmailRegister",{user})
            .then(res => {
                    console.log(typeof (res.data));
                    if(res.data==="false"){
                        alert("inviald data email is use");
                        return ;
                    }
                    else
                    {

                        axios.post("/Register",{user})
                            .then(res => {




                                    axios.post("/Login",{user})
                                        .then(res => {
                                                window.location.reload();
                                                return;
                                            } ,
                                            (error) => {

                                                alert("error");
                                            });


                                    return;

                                },
                                (error) => {

                                    alert("error");
                                }
                            );
                    }
                }
                ,
                (error) => {
                    alert("error");
                }
            );


        //-----------------------------
    }

    render() {
        return (
            <div style={PageBody}>
                <div id="register" class="col-md-6" style={registerStyle}>
                    <div id="RegisterTitle">
                        <h3>Register for a better life</h3>
                    </div>

                    <form id="registerForm" style={TextColor} onSubmit={this.handleSubmit}>

                        <div class="form-group" class="col-md-5">
                            <label for="text">First name:</label>
                            <input required type="text" class="form-control" id="FirstName" placeholder="First name"
                                   name="first name" />
                        </div>
                        <div class="form-group" class="col-md-5">
                            <label for="text">Last name:</label>
                            <input type="text" class="form-control" id="LastName" placeholder="Last name"
                                   name="LastName"required/>
                        </div>

                        <div class="form-group" class="col-md-10">
                            <label for="email">Email:</label>
                            <input type="email"  required class="form-control" id="EmailReg" placeholder="Enter email" name="EmailReg"/>
                        </div>
                        <div class="form-group" class="col-md-10">
                            <label for="pwd">Password:</label>
                            <input type="password" required class="form-control" id="PasswordReg" placeholder="Enter password" name="PasswordReg"/>
                        </div>
                        <div class="radio" class="col-md-3">
                            <label><input type="radio" name="Male"/>Male</label>
                        </div>
                        <div class="radio" class="col-md-9">
                            <label><input type="radio" name="Female"/>Female</label>
                        </div>
                        <div class="col-md-4">

                            <button id="sendBtn" type="submit"  onSubmit={handleNewUser} class="btn btn-default">create user</button>
                        </div>

                    </form>
                </div>
                <div >
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <img  src="..\handshake.png" alt="handshake image"/>
                </div>
            </div>
        );
    }
}
///==============================================================================================

export default MainSP

//=============================================
function handleNewUser(e) {
e.preventDefault();

    const user = {};

    user['email']=document.getElementById('EmailReg').value;
    user['FirstName']=document.getElementById('FirstName').value;
    user['LastName']=document.getElementById('LastName').value;
    user['password']=document.getElementById('PasswordReg').value;

    axios.post("/CheckEmailRegister",{user})
        .then(res => {
                console.log(typeof (res.data));
                if(res.data==="false"){
                    alert("inviald data email is use");
                    return ;
                }
                else
                {

                    axios.post("/Register",{user})
                        .then(res => {

                            alert("Register is Done!");


                            axios.post("/Login",{user})
                                .then(res => {
                                        window.location.reload();
                                        return;
                                    } ,
                                    (error) => {

                                        alert("error");
                                    });


                            return;

                        },
                            (error) => {

                                alert("error");
                            }
                         );
}
                }
           ,
            (error) => {
                alert("error");
            }
        );


}

//=============================================

