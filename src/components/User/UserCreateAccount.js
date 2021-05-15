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
                <label>帳號：</label>
                <input 
                id="userAccount" 
                onChange={(e) => this.handleChange(e)}
                value={this.state.userAccount} 
                />
                <br/>
                <label>密碼：</label>
                <input 
                id="userPassword"
                type="password" 
                onChange={(e) => this.handleChange(e)}
                value={this.state.userPassword} 
                />
                <br/>
                <label>暱稱：</label>
                <input 
                id="userName" 
                onChange={(e) => this.handleChange(e)}
                value={this.state.userName} 
                />
                <br/>
                <label>手機：</label>
                <input 
                id="userPhoneNumber" 
                onChange={(e) => this.handleChange(e)}
                value={this.state.userPhoneNumber} 
                />
                <br/>
                <button onClick={this.submit}>確認</button>
                <button onClick={this.cancel}>取消</button>

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
