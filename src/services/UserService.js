import axios from 'axios';


// const USER_REST_API_URL = "http://localhost:8080/UserInfo";
const USER_REST_API_URL = "https://40d88683935b.ngrok.io/UserInfo";

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