import React from 'react';
import UserService from '../../services/UserService';
import { Router, Route, Switch } from "react-router";



class UserLoginComponent extends React.Component {



    constructor(props) {
        super(props)
        this.state = {
            userAccount: "",
            userPassword: ""
        }
        // this.login = this.login.bind(this);
    }

    handleChange = (e) => {

        this.setState({
            [e.target.id]: e.target.value
        })
        
        // console.log(e.target.id)
        // if (e.target.id === "userAccount"){
        //     this.setState({
        //         userAccount: e.target.value
        //     })
        // }else if(e.target.id === "userPassword"){
        //     this.setState({
        //         userPassword: e.target.value
        //     })
        // }

        
    }

    userLogin = () => {
        UserService.userLogin(this.state.userAccount, this.state.userPassword).then(
            () => window.alert("SUCCESS")
        ).catch(
            () => window.alert("FAIL")
        )
    }
    createAccount = () => {
        window.alert("跳轉建立帳號畫面")
    }
    forgetPassword = () => {

    }


    render() {
        console.log(this.state.userAccount)
        console.log(this.state.userPassword)
        console.log(this.props)

        return (
            <div>
                <label>帳號：</label>
                <input
                    id="userAccount"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.userAccount}
                />
                <br />
                <label>密碼：</label>
                <input type="password"
                    id="userPassword"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.userPassword}
                />
                <br />
                <button onClick={this.userLogin}>確認</button>
                <button onClick={this.createAccount}>建立帳號</button>
                {/* <button onClick={this.forgetPassword}>忘記密碼</button> */}

            </div>


        )
    }

}


export default UserLoginComponent
