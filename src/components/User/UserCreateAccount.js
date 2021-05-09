import React from 'react';
import UserService from '../../services/UserService';


class UserCreateAccount extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        userAccount : "" , 
        userPassword : "",
        userName : "",
        userPhoneNember : ""
        }
        // this.login = this.login.bind(this);
    }

    handleChange = (e) => {
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
        
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    submit = () => {
        UserService.addUser(this.state).then(
            () => window.alert("SUCCESS")
        ).catch(
            () => window.alert("FAIL")
        )
    }


    
    cancel = () => {
        window.alert("返回")
    }


    render() {
        console.log(this.state.userAccount)
        console.log(this.state.userPassword)
        console.log(this.state.userName)
        console.log(this.state.userPhoneNumber)
        console.log(this.state)

        return (
            <div>
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

            </div>

        )
    }

}


export default UserCreateAccount
