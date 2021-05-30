import React from 'react';
import UserService from '../../services/UserService';
import { Redirect } from 'react-router';
import Modal from '@material-ui/core/Modal';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';




class UserCreateAccount extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        userAccount : "" , 
        userPassword : "",
        userName : "",
        userPhoneNember : "",
        modalOpen: false
        }
        // this.login = this.login.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    submit = () => {
        UserService.addUser(this.state).then((response) => {
            console.log(response);
            console.log("SUCCESS");
            this.setState({ modalOpen: true })
        }
        ).catch((err) => {
            console.log(err);
            window.alert("密碼或密碼錯誤")
            // this.setState({ redirect: false })
        })
    }
    
    cancel = () => {
        this.setState({ redirect: true })
    }


    render() {
        console.log(this.state.userAccount)
        console.log(this.state.userPassword)
        console.log(this.state.userName)
        console.log(this.state.userPhoneNumber)
        console.log(this.state)
        console.log(this.state.redirect)
        if (this.state.redirect) {
            return <Redirect push to={'/UserLogin'} />;
        }
        const style = {
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        };
        return (
            <div>
                <h1 align="center">建立帳號</h1>
                <br/>

                <TextField
                        label="帳號"
                        id="userAccount"
                        name="userAccount"
                        value={this.state.userAccount}
                        onChange={(e) => this.handleChange(e)}
                        required
                />
                <br/>
                <br/>
                <TextField
                        label="密碼"
                        type="password"
                        id="userPassword"
                        name="userPassword"
                        value={this.state.userPassword}
                        onChange={(e) => this.handleChange(e)}
                        required
                    />
                <br/>
                <br/>
                <TextField
                        label="暱稱"
                        id="userName"
                        name="userName"
                        value={this.state.userName}
                        onChange={(e) => this.handleChange(e)}
                        required
                    />
                <br/>
                <br/>
                <TextField
                        label="手機"
                        id="userPhoneNumber"
                        name="userPhoneNumber"
                        value={this.state.userPhoneNumber}
                        onChange={(e) => this.handleChange(e)}
                        required
                    />
                <br/>
                <br/>
                
                <Button variant="contained" color="default" onClick={this.submit} >
                    確認
                </Button>
                <label>  &nbsp;&nbsp;&nbsp; </label>
                <Button variant="contained" color="default" onClick={this.cancel} >
                    取消
                </Button>
                <Modal
                    open={this.state.modalOpen}
                    // onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={style}>
                        <h2 id="simple-modal-title">帳號建立成功</h2>
                        <button><Link to="./UserLogin">確認</Link></button>
                    </div>
                </Modal>

            </div>

        )
    }

}


export default UserCreateAccount
