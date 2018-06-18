import React from 'react'
import {Link} from 'react-router-dom'
import PostHeader from './PostHeader'
import PostBody from './PostBody'
import PostFooter from './PostFooter'



class Post extends React.Component {
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

            <div style={PostStyle} class="shdow ">
                <PostHeader src={"https://www.w3schools.com/bootstrap/img_avatar5.png"}
                            time_post={this.props.time_post} user_id={this.props.user_id} type='RegPost' />
                <PostBody text={this.props.text}/>
                <PostFooter  post_id={this.props.post_id}/>
            </div>

        )
    }
}
//=================================
const PostStyle={
    padding: '1%',
    margin: '1%',
    backgroundColor:'white'
};
//=================================
const DropMenu = {
    color: 'black'
};
//==================================
const HeaderStyle = {
    padding: '1%',
};
//=================================class="dropdown-menu dropdown-menu-right"
export default Post

//==================================
