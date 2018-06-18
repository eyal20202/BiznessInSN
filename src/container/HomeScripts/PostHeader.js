import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import Cookies from 'universal-cookie';

var cookies = new Cookies();

class PostHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            RegPost: false, ComPost: false, NewPost: false
            , user_id: this.props.user_id,
            user_data: [], hide: false,
            time: this.props.time_post, msg: ""
        };

        this.GetUserName();
    }

    //======================================
    ClickUser() {
        cookies.set('prodileToShowId', this.state.user_id);
        window.location.href = "/UserProfile";
    }

//-------------------------------------------
    GetUserName() {


        axios.get("/Home/GetUserInfromation", {

            params: {
                user_id: this.state.user_id,
            }
        }).then(res => {
                if (res.data === "false")
                    return;
                var arr = [];
                //  for(var i=0;res.data.length;i++)
                // {
                //    arr.push(
                //       <div>


                //        </div>);
                //    }


                if (res.data[0].LastName.length > 0)
                    this.setState({
                        user_data:
                            <div>
                                <div class="media">

                                    <div class="media-left">
                                        <a  role="button" onClick={this.ClickUser.bind(this)}>

                                            <img src={this.props.src} class="media-object"
                                                 style={this.props.type == 'ComPost' ? {width: '35px',borderRadius:'50%'} : {width: '45px',borderRadius:'50%'}}/>
                                        </a>
                                    </div>

                                    <div class="media-body">
                                        <a role="button" onClick={this.ClickUser.bind(this)}>
                                            {this.props.type == 'ComPost' ? <small class="media-heading">
                                                    {res.data[0].FirstName} {res.data[0].LastName}
                                                </small> :
                                                <h4 class="media-heading">{res.data[0].FirstName} {res.data[0].LastName}</h4>}
                                        </a>
                                        <div>
                                            <small><i style={{color: 'grey'}}>Posted
                                                in:{this.state.time.split('T')[1].split('.')[0]} {this.state.time.split('T')[0]} </i>
                                            </small>


                                        </div>

                                    </div>


                                </div>
                            </div>
                    });

            },

            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {

            }
        );
    }

    //-------------------------------------------
    handleClick(e) {
        if (this.props.type == 'RegPost')
            this.setState({RegPost: true});
        else if (this.props.type == 'ComPost')
            this.setState({ComPost: true});


    }

    render() {
        return (

            <div hidden={this.state.hide}>
                <div id="headerPost" style={HeaderStyle} className="col-xs-12 ">

                    <div className="col-xs-10">
                        {this.state.user_data}
                    </div>

                    {/*{this.props.type == 'RegPost' ? <div className="dropdown" class="col-xs-2">*/}
                        {/*<div id="PostOption">*/}
                            {/*<Link to='/' data-toggle="dropdown" style={DropMenu}>*/}
                                {/*<span className="glyphicon glyphicon-option-horizontal"></span>*/}
                            {/*</Link>*/}
                            {/*<ul className="dropdown-menu dropdown-menu-right">*/}

                                {/*<li className="divider"></li>*/}
                                {/*<li><a onClick={() => {*/}
                                    {/*this.setState({hide: true});*/}
                                {/*}}>Hide this post</a></li>*/}
                                {/*<li className="divider"></li>*/}
                            {/*</ul>*/}
                        {/*</div>*/}
                    {/*</div> : null}*/}


                    {this.props.type == 'RegPost' ? <hr className="col-xs-10"/> : null}
                    {/*{this.props.type=='ComPost' ? <CommentPostHeader/> : null}*/}

                </div>

            </div>

        )
    }
}

//=================================
function TypePost(props) {//cehck the type of the post

    if (props.type == 'RegPost')
        return (<hr className="col-xs-12 col-md-12"/>);
    return (null);
}

//=================================
const DropMenu = {
    color: 'black'
};
//==================================
const HeaderStyle = {
    padding: '1%',

};


function CommentPostHeader() {

    return (
        <div className="dropdown" class="col-md-2">
            <div id="PostOption">
                <Link to='/' data-toggle="dropdown" style={DropMenu}>
                    <span className="glyphicon glyphicon-option-horizontal"></span>
                </Link>
                <ul className="dropdown-menu dropdown-menu-right">
                    <li className="divider"></li>
                    <li><a href="Copy link">Copy link to the Comment</a></li>
                    <li className="divider"></li>
                    <li><a href="Hide post">Report</a></li>
                    <li className="divider"></li>
                </ul>
            </div>
        </div>
    )

}

//========================================


//=================================class="dropdown-menu dropdown-menu-right"
export default PostHeader

//==================================
