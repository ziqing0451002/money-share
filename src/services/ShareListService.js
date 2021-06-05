import axios from 'axios';


const USER_REST_API_URL = "http://25.32.250.115:8080/ShareList";

class ShareListService{

    getShareList(){
        //http://localhost:8080/ShareList/getShareList
        return axios.get(USER_REST_API_URL + "/getShareList");
    }

    getShareListById(shareListId){
        //http://localhost:8080/ShareList/getShareListById/
        return axios.get(USER_REST_API_URL + "/getShareListById/" + shareListId);
    }

    getShareListById(userAccount){
        //http://localhost:8080/ShareList/getShareListById/ziqing?
        return axios.get(USER_REST_API_URL + "/getShareListById/" + userAccount);
    }

    addShareList(addJson){
        console.log("addJson:",addJson)
        //http://localhost:8080/ShareList/addShareList
        return axios.post(USER_REST_API_URL + "/addShareList",addJson);
    }

    editShareList(listId,listName,listCreater,listMember){
        // http://localhost:8080/ShareList/upShareListInfo/2021052200003?listName=國慶日三日遊&listCreater=阿慶&listMember=阿慶,1234,子慶003,子慶004
        return axios.put(USER_REST_API_URL + "/upShareListInfo/" + listId + "?listName=" + listName +"&listCreater=" + listCreater + "&listMember=" + listMember);

    }

    deleteShareList(listId,listCreater){
        // http://localhost:8080/ShareList/deletShareList/2021051100001?listCreater=子慶
        return axios.delete(USER_REST_API_URL + "/deletShareList/" + listId + "?listCreater=" + listCreater);

    }




}

export default new ShareListService();