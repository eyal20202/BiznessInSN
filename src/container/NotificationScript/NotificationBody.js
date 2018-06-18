import React from 'react'
import NotificationMsg from './NotificationMsg';



//==============================
function MakeNut(){
    var dad=[];
    for(var i=0; i<20;i++){
        dad.push(
            <div className="col-md-12">
                <NotificationMsg header="header" body='body' footer='footer'/>
            </div>
      );
    }
    return dad;
}
class NotificationBody extends React.Component {
    constructor(props) {
          super(props);
          this.state = {
              clickedHome: 'active', clickedJob: 'non',
              clickedMessages: 'non', clickedNotification: 'non'
          };
      }
      GetUserNotification(e) {
          this.setState({
              clickedHome: 'non', clickedJob: 'non', clickedMessages: 'non'
              , clickedNotification: 'non'
          });

          if (e.currentTarget.id == 'Home') {
              this.setState({
                  clickedHome: 'active'
              });
          };
      }
    render() {
        return (
            <div class="col-md-offset-2">
                <div class=" col-md-9 thumbnail  " style={BodyStyle}>

                        <div className="col-md-12">
                        <NotificationMsg header="header" body='body' footer='footer'/>
                        </div>


                    <div className=" col-md-12">
                        <NotificationMsg header="header" body='body' footer='footer'/>
                    </div>

                    {MakeNut()}
                </div>
            </div>
        )
    }
}

//=================================c
const BodyStyle = {
    color: '#f7f3ff',
    margin: '20px',
    padding: '30px'
};
//=================================class="dropdown-menu dropdown-menu-right"
export default NotificationBody


