import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
//============================================
class Msg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PostJobs: [],


        };
    }

    //------------------------------------------------------
    render() {
        return (

            <div>
                <div style={PostStyle}>
                    <div>

                    </div>

                    <div id='body' style={InputBoxStyle}>

            <textarea style={TextAreaq}
                      rows="4" cols="50" placeholder="Write here a post..."></textarea>

                        <hr/>

                        <button class="btn btn-primary btn-sm" disabled={this.state.ButPostStyle}
                                onClick={this.PublishMsg.bind(this)}> Post
                        </button>

                        <button style={ButStyleHeader} class="btn btn-default  btn-sm glyphicon glyphicon-picture"> Images</button>

                    </div>
                </div>
            </div>
        )}}

export default Msg
//--------------------------------------
//=======================================
const InputBoxStyle = {
    paddingLeft: '3%',
    margin: '1%',

};
//=======================================
const TextAreaq = {
    maxWidth:'350px',
};
//===================
const PostStyle = {
    padding: '1%',
    margin: '1%',
    backgroundColor: '#F5F5F5'
};
//==========================
const ButStyleHeader = {
    marginLeft: '4%',
};
