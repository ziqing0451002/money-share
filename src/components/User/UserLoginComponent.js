import React from 'react';
import UserService from '../../services/UserService';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Redirect } from 'react-router';



class UserLoginComponent extends React.Component {



    constructor(props) {
        super(props)
        this.state = {
            userAccount: "",
            userPassword: "",
            redirect: false

        }
        // this.login = this.login.bind(this);
    }

    handleChange = (e) => {

        this.setState({
            [e.target.id]: e.target.value
        })
    }

    userLogin = () => {
        UserService.userLogin(this.state.userAccount, this.state.userPassword).then((response) => {
            console.log(response);
            console.log("SUCCESS");
            this.setState({ redirect: true })
        }
        ).catch((err) => {
            console.log(err);
            window.alert("密碼或密碼錯誤")

            // this.setState({ redirect: false })
        })
    }

    createAccount = () => {
        window.alert("跳轉建立帳號畫面")
    }
    forgetPassword = () => {

    }


    render() {
        console.log(this.state.redirect)
        if (this.state.redirect) {
            // var path = {
            //     pathname:'/UserListController',
            //     state:this.state.userAccount
            // }
            return <Redirect push to={'/ShareList'} />;
            //   return <Redirect push to={'/UserListController/'}/>;
            // return <Link to='/UserListController' component={UserListComponent} />;
        }
        console.log(this.state.userAccount)
        console.log(this.state.userPassword)
        // console.log(this.props)

        return (
            <div style={{ height: 400, width: '100%' }}>
                <h1 align="center">分帳程式</h1>
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
                <button ><Link to="./AddUser">建立帳號</Link></button>
                {/* <button onClick={this.forgetPassword}>忘記密碼</button> */}

            </div>


        )
    }

}


export default UserLoginComponent
