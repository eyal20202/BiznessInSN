import React from 'react'
import Cookies from 'universal-cookie';

//==================================
const cookies = new Cookies();

//===========================================
class RightBlock extends React.Component {
    /*  constructor(props) {
          super(props);
          this.state = {
              clickedHome: 'active', clickedJob: 'non',
              clickedMessages: 'non', clickedNotification: 'non'
          };
      }
      handleClick(e) {
          this.setState({
              clickedHome: 'non', clickedJob: 'non', clickedMessages: 'non'
              , clickedNotification: 'non'
          });

          if (e.currentTarget.id == 'Home') {
              this.setState({
                  clickedHome: 'active'
              });
          };
      }*/
    render() {
        return (

            <div id="container">

                <div id="header" style={headerstyle}>

                </div>

                <div id="Posts">

                    <div class="well jump">

                        <div >
                            <div id="pro">

                                <center><a role="button" onClick={() => {
                                    window.location.href = "/UserProfile";
                                }}><img class="img-circle" src="https://www.w3schools.com/howto/img_avatar.png"
                                        style={{width: '40%', position: 'bottom'}}/></a></center>
                            </div>
                            <hr/>
                            <div >

                                <center><h2><b>Welcome, {cookies.get('UserName')}</b></h2></center>

                                <div><a role="button" onClick={() => {
                                    window.location.href = "/Job";
                                }}>
                                    <h4 style={{color:'black'}}>Your Dream job closer than you think! </h4>
                                    <h5 style={{color:'black'}}>click to see jobs for you</h5>
                                </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )



    }
    }

    export default RightBlock
    //=======================================================
    const headerstyle = {
        textAlign: 'center'
    };
