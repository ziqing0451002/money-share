import axios from 'axios';


const USER_REST_API_URL = "http://115.165.204.34:8080/ShareResult";

class ShareResultService{

    getShareResult(){
        //http://localhost:8080/ShareResult/getShareResult
        return axios.get(USER_REST_API_URL + "/getShareResult");
    }

    getShareResultById(shareListId){
        //http://localhost:8080/ShareResult/getShareResultByShareListId/
        return axios.get(USER_REST_API_URL + "/getShareResultByShareListId/" + shareListId);
    }

}

export default new ShareResultService();