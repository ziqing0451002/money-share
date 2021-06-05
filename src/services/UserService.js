import axios from 'axios';


const USER_REST_API_URL = "http://25.32.250.115:8080/UserInfo";

class UserService{

    getUsers(){
        return axios.get(USER_REST_API_URL + "/getUser");
    }

    getUserByAccount(userAccount){
        //http://localhost:8080/UserInfo/getUserByAccount/ziqing?
        return axios.get(USER_REST_API_URL + "/getUserByAccount/" + userAccount);
    }

    userLogin(userAccount,userPassword){
        return axios.get(USER_REST_API_URL + "/login/" + userAccount + "?userPassword=" +userPassword)
    }

    addUser(addJson){
        return axios.post(USER_REST_API_URL + "/AddUser",addJson);
    }


}

export default new UserService();