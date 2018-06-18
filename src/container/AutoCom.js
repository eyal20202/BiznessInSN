import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import Cookies from 'universal-cookie';
import Autosuggest from 'react-autosuggest';


import UserProfile from '../Profile/UserProfile'
import {Redirect, Switch, Route} from 'react-router-dom'

const cookies = new Cookies();

class AutoCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            suggestions: [],
            table: this.props.table,
            ShowSug: [], show: false,
        };
        this.Select = this.Select.bind(this);
    }

    Select = param => e => {

        this.setState({value: param.value});
        this.setState({ShowSug: []});

        if (this.props.SaveResFunc != "")
            this.props.SaveResFunc(param, this.props.SaveRes);
        else
            this.props.SaveResFunc(param);

    };
    onChange = (event, {newValue, method}) => {
        this.setState({value: newValue});
        cookies.set("Value", newValue.SubCategory);
    };

    SetClassTOinput() {
        var inputList = document.getElementsByTagName("input");
        for (var i = 0; i < inputList.length; i++) {
            inputList[i].className = "form-group";

        }
    }

    getSuggestions(value) {
        if (value.trim() === '') {
            this.setState({
                suggestions: []
            });
            return;
        }

        if (this.state.table == 'users') {
            axios.get("/AutoCom/usersName", {
                params: {
                    FirstName: value.trim().split(' ')[0],
                    LastName: value.trim().split(' ')[1]
                }
            })
                .then(res => {
                        this.setState({
                            suggestions: res.data.filter(uesr => (   `${uesr.FirstName} ${uesr.ID} ${uesr.LastName}`))
                        });
                        var arr = res.data.filter(uesr => (   `${uesr.FirstName} ${uesr.ID} ${uesr.LastName}`));
                        var dad = [];
                        for (var i = 0; i < arr.length; i++) {
                            var temp = {
                                FirstName: arr[i].FirstName,
                                LastName: arr[i].LastName,
                                ID: arr[i].ID,
                                value: arr[i].FirstName + " " + arr[i].LastName
                            };
                            dad.push(<a class="list-group-item " role="button"
                                        onClick={this.Select(temp)}>
                                <span className="glyphicon glyphicon-user"> {arr[i].FirstName} {arr[i].LastName}</span>
                            </a>)

                        }
                        this.setState({ShowSug: dad});

                    },

                    (error) => {
                        alert("ERROR");
                    }
                );
        }

        else if (this.state.table == 'skilessubcategory') {

            axios.get("/AutoCom/skill", {
                params: {
                    skill: value.trim(),
                }
            })

                .then(res => {

                        var arr = res.data.filter(skill => ( `${skill.SubCategory}`));
                        var dad = [];
                        for (var i = 0; i < arr.length; i++) {

                            var temp = {
                                SubCategory: arr[i].SubCategory,

                                value: arr[i].SubCategory
                            };

                            dad.push(<a role="button" class="list-group-item"
                                        onClick={this.Select(temp)}>{arr[i].SubCategory}</a>);
                        }
                        this.setState({ShowSug: dad});
                        this.setState({
                            suggestions: res.data.filter(skill => ( `${skill.SubCategory}`))
                        });
                    },
                    (error) => {
                        alert("ERROR");
                    }
                );
        }
    }

    OnBlurClean() {
        this.setState({ShowSug: ""});
        this.setState({ShowSug: []});
    }

    onSuggestionsFetchRequested = ({value}) => {
        this.getSuggestions(value);


    };

    //=====================================================================================================
    onSuggestionSelected(event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}) {


        if (this.props.SaveResFunc != "")
            this.props.SaveResFunc(suggestionValue, this.props.SaveRes);
        else {
            cookies.set("Value", suggestionValue.SubCategory);

        }
    }

    //===================================
    renderSuggestion(suggestion) {

        if (this.state.table === "users")
            return UsersSearch(suggestion);

        if (this.state.table === "skilessubcategory")
            return SkillsSearch(suggestion);


    }

    //=====================================================================================================
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

//=====================================================================
    hanChange(e) {

        this.setState({value: e.target.value});
        this.getSuggestions(e.target.value);
        this.setState({show: false,});
        // onFocus= {() => }
    }

    //==================================
    handblur(e) {
        console.log(this.state.show);
        this.setState({show: true});


    }

    //===============================================
    render() {
        const {value, suggestions} = this.state;
        const inputProps = {
            placeholder: this.props.placeholder,
            value,
            onChange: this.onChange,
            className: "form-control"
        };

        return (
            <div>

                <input class="form-control " placeholder={this.props.placeholder} name={this.props.name}
                       type="text" value={this.state.value} onChange={this.hanChange.bind(this)}/>
                <div>
                    <ul class="list-group"
                        style={this.state.table === 'users' ? {display: 'inline', width: '100%', position: 'absolute'}
                            : {display: 'inline', width: '100%'}}>
                        {this.state.ShowSug}
                    </ul>
                </div>

            </div>
        );
    }
}

//==================================
const ImgStyle = {
    paddingLeft: '10px',
};

//============================
function ButtonFriend() {
    return (<div style={ImgStyle}>
            <br/>

        </div>
    )
}

//===================================
function getSuggestionValue(suggestion) {
    if (suggestion) {

        return suggestion;

    }
    return null;
}

//================================================================
function SkillsSearch(suggestion) {
    return (
        <span> {suggestion.SubCategory} </span>
    );
}

//================================================================
function UsersSearch(suggestion) {
    return (
        <span class="glyphicon glyphicon-user"> {suggestion.FirstName} {suggestion.LastName}</span>
    );
}

//===================================
export default AutoCom
