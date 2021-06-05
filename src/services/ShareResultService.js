import axios from 'axios';


const USER_REST_API_URL = "https://25.32.250.115:8080/ShareResult";

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