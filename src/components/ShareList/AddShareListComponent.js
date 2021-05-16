import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import ShareListService from '../../services/ShareListService';
import UserService from '../../services/UserService';
// import AddUserModal from './AddUserModal'
import Modal from '@material-ui/core/Modal';
// import { Alert } from 'react-st-modal';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";



// function AlertExample() {
//     return (
//       <div>
//         <button
//           onClick={async () => {
//             await Alert('Alert text', 'Alert title');
//           }}
//         >
//             Alert
//         </button>
//       </div>
//     );
//   }

class AddShareListComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            shareListId: '',
            shareListName: '',
            shareListCreater: '',
            shareListMember: '',
            userLoginAccount:'',
            modalOpen: false,
            mode: '',
            uiDisable: false

        }
        //設定該function的this為class本身
        // this.changeState = this.changeState.bind(this)
        // this.submitForm = this.submitForm.bind(this)
    }

    //傳入event要取觸發事件的元件
    // changeState(event) {
    //     //使用setState將值寫到nameVal中
    //     let changeName = event.target.name
    //     this.setState({ [changeName]: event.target.value })
    // }
    // //新增一個submit的function
    // submitForm(event) {
    //     console.log(this.state)
    //     if (this.state.mode === "addShareList") {
    //         UserService.AddUser(this.state).then((response) => {
    //             console.log("SUCCESS")
    //             this.setState({ modalOpen: true });
    //         })
    //     } else if (this.state.mode === "editShareList") {
    //         UserService.editUser(
    //             this.state.userAccount,
    //             this.state.userName,
    //             this.state.userEmail,
    //             this.state.serviceName,
    //             this.state.agenciesName,
    //             this.state.status,
    //             this.state.remark
    //         ).then((response) => {
    //             console.log("SUCCESS")
    //             this.setState({ modalOpen: true });
    //         })
    //     }



    //     event.preventDefault()
    // }



    // getParameterByName(name, url = window.location.href) {
    //     name = name.replace(/[\[\]]/g, '\\$&');
    //     var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    //         results = regex.exec(url);
    //     if (!results) return null;
    //     if (!results[2]) return '';
    //     return decodeURIComponent(results[2].replace(/\+/g, ' '));
    // }

    componentDidMount() {
        var linkMode = this.getParameterByName('mode');
        var linkUserId = this.getParameterByName('userID');
        this.setState({ mode: linkMode })
        this.setState({ userAccount: linkUserId })
        this.getUserLogin(linkUserId)

    }

    //得到登入者資訊(帶入建立人)
    // getUserLogin = (userID) => {
    //     UserService.ge
    // }


    //帶入該row之shareList info
    // getShareListInfo = (userID) => {
    //     UserService.getUserInfo(userID).then((response) => {
    //         const data = response.data
    //         this.setState({ serviceName: data.serviceName })
    //         this.setState({ userAccount: data.userAccount })
    //         this.setState({ agenciesName: data.agenciesName })
    //         this.setState({ userEmail: data.userEmail })
    //         this.setState({ userAddress: data.userAddress })
    //         this.setState({ userPassword: data.userPassword })
    //         this.setState({ userName: data.userName })
    //         this.setState({ status: data.status })
    //         this.setState({ remark: data.remark })

    //     })
    // }


    render() {
        console.log(this.state)
        const style = {
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        };
        return (

            <div style={{ height: 400, width: '100%' }}>
                <h1 align="left" hidden={this.state.mode === 'addShareList' ? false : true}>連線帳號新增</h1>
                <h1 align="left" hidden={this.state.mode === 'editShareList' ? false : true}>連線帳號編輯</h1>
                <h1 align="left" hidden={this.state.mode === 'viewShareList' ? false : true}>連線帳號檢視</h1>

                <form onSubmit={this.submitForm}>
                    <label>分帳ID: </label>
                    <input
                        id="shareListId"
                        name="shareListId"
                        value={this.state.shareListId}
                        onChange={this.changeState}
                        required
                        disabled
                        placeholder="此為系統提供"
                    />
                    <br />
                    <label>分帳表名稱:</label>
                    <input
                        id="shareListName"
                        name="shareListName"
                        value={this.state.shareListName}
                        onChange={this.changeState}
                        required
                        placeholder="替這次的旅遊取個名字吧"
                        disabled={this.state.mode === 'viewShareList' ? true : false}
                    />
                    <br />
                    <label>建立人: </label>
                    <input
                        id="shareListCreater"
                        name="shareListCreater"
                        value={this.state.shareListCreater}
                        onChange={this.changeState}
                        required
                        placeholder="BB001"
                        disabled
                    />
                    <br />
                    <label>分帳成員： </label>
                    <input
                        id="shareListMember"
                        name="shareListMember"
                        value={this.state.shareListMember}
                        onChange={this.changeState}
                        required
                        placeholder="資訊中心"
                        disabled={this.state.mode === 'viewShareList' ? true : false}
                    />
                    <br />

                    <input type="reset" value="清除" hidden={this.state.mode === 'viewShareList' ? true : false} />
                    <input type="submit" value="新增" hidden={this.state.mode === 'addShareList' ? false : true} />
                    <input type="submit" value="儲存" hidden={this.state.mode === 'editShareList' ? false : true} />

                </form>
                <Modal
                    open={this.state.modalOpen}
                    // onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={style}>
                        <h2 id="simple-modal-title" hidden={this.state.mode === 'editShareList' ? false : true}>資料已更新</h2>
                        <h2 id="simple-modal-title" hidden={this.state.mode === 'addShareList' ? false : true}>資料已新增</h2>
                        <button><Link to="./UserListController">確認</Link></button>
                    </div>
                </Modal>

                {/* <AddUserModal></AddUserModal> */}

            </div>
        )
    }

}

export default AddShareListComponent