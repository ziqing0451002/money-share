import axios from 'axios';


const USER_REST_API_URL = "http://localhost:8080/ShareList";

class ShareListService{

    getShareList(){
        //http://localhost:8080/ShareList/getShareList
        return axios.get(USER_REST_API_URL + "/getShareList");
    }

    getShareListById(userAccount){
        //http://localhost:8080/ShareList/getShareListById/ziqing?
        return axios.get(USER_REST_API_URL + "/getShareListById/" + userAccount);
    }

    addShareList(addJson){
        //http://localhost:8080/ShareList/addShareList
        return axios.post(USER_REST_API_URL + "/addShareList",addJson);
    }


}

export default new ShareListService();