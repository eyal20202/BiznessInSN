import React from 'react'
import {Link} from 'react-router-dom'

class PostBody extends React.Component {
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

            <div>
                <div style={HeaderStyle} id="text">
                    {this.props.text}
                </div>
                <div id="likesAndComment"></div>

            </div>

        )
    }
}

//=================================
const DropMenu = {
    color: 'black'
};
//==================================
const HeaderStyle = {
    padding: '10px',
};
//=================================class="dropdown-menu dropdown-menu-right"
export default PostBody


