import axios from 'axios';


const USER_REST_API_URL = "http://localhost:8080/ShareList";

class ShareListService{

    getShareList(){
        //http://localhost:8080/ShareList/getShareList
        return axios.get(USER_REST_API_URL + "/getShareList");
    }

    addShareList(addJson){
        //http://localhost:8080/ShareList/addShareList
        return axios.post(USER_REST_API_URL + "/addShareList",addJson);
    }


}

export default new ShareListService();