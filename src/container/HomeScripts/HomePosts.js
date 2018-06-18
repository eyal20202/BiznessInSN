import React from 'react'
import Post from './Post'
import axios from 'axios';
import Cookies from 'universal-cookie';
import PostHeader from './PostHeader'
import PostBody from './PostBody'
import PostFooter from './PostFooter'




const cookies = new Cookies();
//===========================================
class HomePost extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
             Posts:[],
          };
         this.GetPost();
      }
//--------------------------------------------------------------------
 GetPost(){


     axios.get("/Home/GetPosts", {

         params: {
             user_id:cookies.get('userID'),
         }
     }) .then(res => {
             console.log(res.data);

             if (res.data == "false") {
                 return;
             }
             var arr = [];
             for (var i = 0; i < res.data.length; i++) {
                 console.log(i);

                 arr.push(
                     <div>
                         <Post time_post={res.data[i].time_post} user_id={res.data[i].user_id} type='RegPost'  text={res.data[i].post} post_id={res.data[i].id}/>
                 {/*<PostFooter/>*/}
                     </div>);
             }
             this.setState({Posts:arr});
             console.log(arr);

         },

         // Note: it's important to handle errors here
         // instead of a catch() block so that we don't swallow
         // exceptions from actual bugs in components.
         (error) => {

         }
     );


 }

 //==============================
    render() {
        return (
            <div >


                <div id="Posts">
                    {this.state.Posts}
                </div>

            </div>

        )
    }
}

export default HomePost
//=======================================================
const Pstyle={
   // borderRadius: '15px',
padding:'1px',
    margin:'1px',

    border:'solid',
    backgroundColor:'#ffffff'
}