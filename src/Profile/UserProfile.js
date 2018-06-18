import React from 'react'
import HeaderProfile from './HeaderProfile'
import BodyProfile from './BodyProfile'
import axios from 'axios';
import Cookies from 'universal-cookie';



//===========================================
function GetData(){
    const cookies = new Cookies();
    var userID = cookies.get('userID');
    axios.get("/UserProfile/GetProfileData", {

        params: {
            userID: userID
        }
    })

        .then(res => {
               alert(res.data);
            return res.data;
            },

            (error) => {
              alert("error");
            }
        );
}

//==================================
class UserProfile extends React.Component {
    constructor(props) {
        super(props);

      //  alert(this.props.profileid);
        this.state = {
            InputVal: '', ButPostStyle: true
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
    }
    render() {
        return (
            <div>
                <div class="col-md-offset-2 col-md-8 col-sm-12 col-xs-12" >
                    <div class=" " style={headerStyle}>
                        <HeaderProfile  type='PermissionForeign'/>

                    </div>

                    <div style={BodyStyle} >
                        <BodyProfile  type='PermissionForeign'/>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }

}
//---------------------------------------------------------borderRadius:'50%'
export default UserProfile
//=========================================
const BodyStyle = {
     paddingTop: '10px',
    marginTop: '10px',
    // marginLeft: '40px',

    backgroundColor: '#f7f3ff',

   // color: '#000000'
};
//=========================================
const headerStyle = {

    // padding: '10px',
    // margin: '10px',
    // marginLeft: '40px',
     marginTop: '90px',
 //   backgroundColor: 'white'


};