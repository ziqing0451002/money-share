import axios from 'axios';


const USER_REST_API_URL = "http://localhost:8080/ShareItem";

class ShareItemService{

    getShareItem(){
        //http://localhost:8080/ShareItem/getShareItem
        return axios.get(USER_REST_API_URL + "/getShareItem");
    }

    addShareItem(addJson){
        console.log("addJson:",addJson)
        //http://localhost:8080/ShareItem/addShareItem
        return axios.post(USER_REST_API_URL + "/addShareItem",addJson);
    }

    deleteShareItem(listId,listCreater){
        // http://localhost:8080/ShareItem/deletShareItem/{itemId}
        return axios.delete(USER_REST_API_URL + "/deletShareItem/" + listId + "?listCreater=" + listCreater);

    }




}

export default new ShareItemService();