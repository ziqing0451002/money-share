import React from 'react';
import UserService from '../../services/UserService';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Redirect } from 'react-router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';





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
            return <Redirect push to={`/ShareList?userID=${this.state.userAccount}`} />;
            //   return <Redirect push to={'/UserListController/'}/>;
            // return <Link to='/UserListController' component={UserListComponent} />;
        }
        console.log(this.state.userAccount)
        console.log(this.state.userPassword)
        // console.log(this.props)

        return (
            <div style={{ height: 400, width: '100%' }}>
                <h1 align="center">分帳程式</h1>
                <TextField
                    label="帳號"
                    id="userAccount"
                    name="userAccount"
                    value={this.state.userAccount}
                    onChange={(e) => this.handleChange(e)}
                    required
                />
                <br />
                <br />
                <TextField
                    label="密碼"
                    type="password"
                    id="userPassword"
                    name="userPassword"
                    value={this.state.userPassword}
                    onChange={(e) => this.handleChange(e)}
                    required
                />
                <br />
                <br />
                <Button variant="contained" color="default" onClick={this.userLogin}>確認</Button>
                <label>  &nbsp;&nbsp;&nbsp; </label>
                <Button variant="contained" color="default" >
                    <Link to="./AddUser">建立帳號</Link>
                </Button>
                {/* <button onClick={this.forgetPassword}>忘記密碼</button> */}

            </div>


        )
    }

}


export default UserLoginComponent
