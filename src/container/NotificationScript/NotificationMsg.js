import React from 'react'
import {Link} from 'react-router-dom'

class NotificationMsg extends React.Component {
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

            <div class="well" style={BodyStyle} >
                <div style={TextStyle}>


                    <div className="dropdown" style={{float:'right'}}>

                        <Link to='/' data-toggle="dropdown"  >
                            <span className="glyphicon glyphicon-option-horizontal"></span>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-right">

                            <li><a href="delete link">delete this Notification</a></li>

                        </ul>

                    </div>

                    <p style={pStyle} >{this.props.header}</p>
                    <hr/>
                </div>

                    <div style={TextStyle}>

                        <p style={pStyle}>{this.props.body}</p>
                        <hr/>
                    </div>

                    <div style={TextStyle}>

                        <p style={pStyle}>{this.props.footer}</p>

                    </div>





            </div>

        )
    }
}
//=================================c
const BodyStyle={
    color: '#f7f3ff',
   // margin:'20px',
   // padding:'30px'
};

const HeaderStyle={
    color: '#000000',
    padding:'12px'
};
//==================================color:'#000000',
const pStyle={
    color:'#000000',

};
//==================================
const TextStyle={
    //backgroundColor:'#fffdf5',
};
//=================================class="dropdown-menu dropdown-menu-right"
export default NotificationMsg


