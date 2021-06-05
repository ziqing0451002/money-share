import axios from 'axios';

// const USER_REST_API_URL = "http://localhost:8080/ShareItem";
const USER_REST_API_URL = "https://40d88683935b.ngrok.io/ShareItem";

class ShareItemService{

    getShareItem(){
        //http://localhost:8080/ShareItem/getShareItem
        return axios.get(USER_REST_API_URL + "/getShareItem");
    }

    getShareItemById(itemId){
        //http://localhost:8080/ShareItem/getShareItemById/
        return axios.get(USER_REST_API_URL + "/getShareItemById/" + itemId);
    }

    getShareItemByShareListId(shareListId){
        //http://localhost:8080/ShareItem/getShareItemByShareListId/
        return axios.get(USER_REST_API_URL + "/getShareItemByShareListId/" + shareListId + "?");
    }

    addShareItem(addJson){
        console.log("addJson:",addJson)
        //http://localhost:8080/ShareItem/addShareItem
        return axios.post(USER_REST_API_URL + "/addShareItem",addJson);
    }

    deleteShareItem(itemId,itemCreater){
        // http://localhost:8080/ShareItem/deletShareItem/{itemId}
        return axios.delete(USER_REST_API_URL + "/deletShareItem/" + itemId + "?listCreater=" + itemCreater);
    }

    editShareItem(itemId,itemName,itemCreater,itemMember,itemCost){
        console.log(USER_REST_API_URL + "/upShareItemInfo/" + itemId + "?itemName=" + itemName + "&temCreater=" + itemCreater + "&itemMember=" + itemMember + "&itemCost=" + itemCost)
        // http://localhost:8080/ShareItem/upShareItemInfo/2021052200003?
        return axios.put(USER_REST_API_URL + "/upShareItemInfo/" + itemId + "?itemName=" + itemName + "&itemCreater=" + itemCreater + "&itemMember=" + itemMember + "&itemCost=" + itemCost);
    }

    // ShareMember Calculate
    resultCalculate(shareListId){
        //http://localhost:8080/ShareMember/getResult
        return axios.get("http://localhost:8080/ShareMember/getResult/" + shareListId + "?");
    }



}

export default new ShareItemService();