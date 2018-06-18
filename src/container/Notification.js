import React from 'react'
import NotificationBody from './NotificationScript/NotificationBody'
//=================================================
class Notification extends React.Component {


      constructor(props) {
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
      }



    render() {
return(
        <div>
            <br/>
            <h1 style={HeaderStyle}>Notification</h1>
            <div className="col-md-5 offset col-md-5">

            </div>
            <NotificationBody/>
        </div>
)
    }

}

//=================================================
export default Notification
const HeaderStyle = {marginTop: '60px'};