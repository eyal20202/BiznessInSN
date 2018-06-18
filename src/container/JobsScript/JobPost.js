import React from 'react'
import {Link} from 'react-router-dom'
import NewMsg from '../MessagesScripts/NewMsg';
//===========================================================
class JobPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedJob: false,
        clickAp:false,
            ShowAp:[],
            userId:this.props.userId,
        };
    }
//----------------------------------------------------------------
    handleClick(e) {

        this.setState({
            clickedJob: !this.state.clickedJob
        });
    }
//---------------------------------------------------------------------
    handelaplly(){
        this.setState({
            clickAp: !this.state.clickAp
        });
    }
    //---------------------------------------
    handelSend(){
        this.setState({
            clickAp: !this.state.clickAp
        });
    }
//----------------------------------------------------------------------
    render() {
        return (
            <div class="col-md-3 col-sm-3 col-xs-3 jump" style={{padding: '10px', margin: '10px', width: "200px", borderStyle: "ridge"}}>
                <div class="card" style={BodyStyle}>
                    <div style={TextStyle}>
                        <img class="card-img-bottom " src="..\handshake.png"
                             alt="Card image" style={{width: "50%"}}/><div>
                        <b class="card-header" style={pStyle}>{this.props.header}</b>
                    </div>
                        <div class="card-body">
                            <div><h4 style={pStyle}>{this.props.Company}</h4></div>
                            <div><h6 style={pStyle}>{this.props.Location}</h6></div>
                            <Link to='\' onClick={this.handleClick.bind(this)}>
                                <h4 style={{ textDecoration: 'underline',color:'black'}}>{this.props.body}</h4>

                            </Link>
                            {this.state.clickedJob ? <MoreDidtels type={this.props.JobDescription}/> : null}
                            <hr/>
                            <span class="card-footer" style={DateColor}><small>{this.props.footer}</small></span>
                        </div>
                        <button onClick={this.handelaplly.bind(this)} type="button" class="btn btn-info btn-block">Apply</button>
                        {this.state.clickAp? <NewMsg afterSend={this.handelSend.bind(this)} userId={this.state.userId}/> : null}
                    </div>
                </div>
            </div>




        )
    }
}

export {JobPost};

//====================================
function MoreDidtels(JobDescription) {
    return (
        <div class="card-body">
            {/*{this.props.type=='PermissionForeign' ? <ButtonFriend/> : null}*/}
            {/*     <p style={pStyle}> wsvwvwvewvewv
                eeefffffffffffffffffff
                eeeeeeeeeeeefveve
                veveveeeeeeeee1</p>
            <p style={pStyle}> wsvwvwvewvewv
                eeeffffffffffffxxksdj
                eeeeeeeeeeeefveve
                veveveeeeeeeee1</p>*/}

            <p style={pStyle}>{JobDescription.type}</p>

        </div>
    );
}

//===========================================================
const BodyStyle = {
    color: '#7c8188'
};

//==================================color:'#000000',
const pStyle = {
    color: '#000000',

};
//==================================color:'#000000',
const DateColor = {
    color: '#556564',

};
//==================================
const TextStyle = {
    //backgroundColor:'#fffdf5',
};

const arrow = {

    position: ' absolute',
    left: '50%',
    top: '-8px',
    width: 0,
    height: 0,
    content: '',
    borderLeft: '20px', solid: 'transparent',
    borderRight: '20px', solid: 'transparent',
    borderBottom: '20px', solid: '#000000'    //backgroundColor:'#fffdf5',
};
//========================
