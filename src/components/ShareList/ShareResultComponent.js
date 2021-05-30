import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
// import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import ShareListService from '../../services/ShareListService';
import ShareResultService from '../../services/ShareResultService';
import UserService from '../../services/UserService';
// import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import moment from 'moment';



class ShareResultComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            shareResult: [],
            modalOpen: false,
            selectedUser: '',
            userPasswordCommit: '',
            userLoginAccount: '',
            userLoginName: '',

            listId: '',
            listName: ''
        }
    }

    columns = [
        { field: 'number', headerName: '序號', width: 100 },
        { field: 'resultId', headerName: '分帳結果ID', width: 150 },
        { field: 'shareListId', headerName: '所屬分帳表ID', width: 150 },
        { field: 'memberName', headerName: '分帳人', width: 200 },
        { field: 'createdTime', headerName: '產生時間', width: 220 },
        { field: 'payTotal', headerName: '已代墊總和', width: 150 },
        { field: 'shareTotal', headerName: '分帳金額', width: 150 },
        { field: 'resultTotal', headerName: '最終結果', width: 150 },
        ];
    getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    componentDidMount() {
        var linkListId = this.getParameterByName('listID');
        var linkUserId = this.getParameterByName('userID');
        this.setState({ listId: linkListId })
        this.setState({ userLoginAccount: linkUserId })

        ShareResultService.getShareResultById(linkListId).then((response) => {
            console.log(response)
            const data = response.data
            const shareResult = data.map((item, index) => ({ ...item, id: item.resultId, number: index + 1 ,createdTime: moment(item.createdTime).format("YYYY-MM-DD HH:mm:ss")}))
            this.setState({ shareResult })
            // console.log(this.state)
        })

        this.getUserLogin(linkUserId)
        this.getListInfo(linkListId)

    }

    //得到登入者資訊
    getUserLogin = (userID) => {
        console.log("userAccount:" + this.state.userAccount)
        UserService.getUserByAccount(userID).then((response) => {
            const data = response.data
            console.log("data:" + data)
            this.setState({ userLoginName: data.userName })
            console.log("SUCCESS");
        }
        ).catch((err) => {
            console.log("FAIL");
            console.log(err);
        })
    }

    //得到分帳表資訊
    getListInfo = (listId) => {
        console.log("listId:" + this.state.listId)
        ShareListService.getShareListById(listId).then((response) => {
            const data = response.data
            console.log("data:" + data)
            this.setState({ listName: data.listName })
            console.log("SUCCESS");
        }
        ).catch((err) => {
            console.log("FAIL");
            console.log(err);
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    setSelection = (rowData) => {
        try {
            this.setState({ selectedUser: rowData.id })
            console.log(rowData)
        } catch (e) {
            console.log(e)
        }
        // console.log(this.state.selectedUser)
    }

    shareCalculate = () =>{
        ShareResultService.resultCalculate(this.state.listId).then((response) => {
            const data = response.data
            console.log("data:" + data)
            // this.setState({ modalOpen: true })
            console.log("SUCCESS");
        }
        ).catch((err) => {
            console.log("FAIL");
            console.log(err);
        })
    }

    deleteClick = () => {
        this.setState({ modalOpen: true });
        // this.setState({ selectedUser: this.state.user[this.state.index]})
        // UserService.deleteUser(this.state).then((response) => {
        //     console.log("SUCCESS")
        // })
    }
    deleteShareResult = () => {
        // console.log(this.state.selectedUser)
        // console.log(this.state.userPasswordCommit)
        ShareResultService.deleteShareResult(this.state.selectedUser, this.state.userLoginName).then((response) => {
            // console.log(response);
            window.alert("刪除成功")
            console.log("SUCCESS");
            console.log(response.data);
            this.setState({ modalOpen: false });
            window.location.reload();
        }
        ).catch((err) => {
            window.alert("刪除失敗")
            console.log(err);
            this.setState({ modalOpen: false });
            // this.setState({ redirect: false })
        })
    }
    deleteCancel = () => {
        this.setState({ modalOpen: false });
    }

    render() {
        console.log(this.state)
        console.log(this.state.selectedUser)
        const style = {
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        };
        return (
            <div style={{ height: 400, width: '100%' }}>
                <h1 align="left">{this.state.listName}</h1>
                <h3 align="left">分帳結果</h3>
                <div align="right">
                    <Button variant="contained" color="default"  >
                        <Link to="./UserLogin">登出</Link>
                    </Button>
                    <br />
                    <br />
                </div>
                <h5 align="right">登入帳號為:{this.state.userLoginAccount}</h5>
                

                <DataGrid rows={this.state.shareResult || []} columns={this.columns} pageSize={20} onRowClick={(rowData) => this.setSelection(rowData)} />
                <br />

                <div align="right">
                    <Button variant="contained" color="default" style={{float:'right'}}>
                    <Link to={`/ShareList?userID=${this.state.userLoginAccount}`}>回首頁</Link>
                    </Button>
                    <Button variant="contained" color="default" type="reset" style={{float:'left'}}>
                            <Link to={`./ShareItem?userID=${this.state.userLoginAccount}&listID=${this.state.listId}`}>返回</Link>
                        </Button>
                    <br />
                    <br />
                </div>



                {/* <Modal
                    open={this.state.modalOpen}
                    // onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={style}>
                        <h2 id="simple-modal-title">確定刪除資料</h2>
                        <h5 >刪除資料後無法復原</h5>
                        <br />
                        <button onClick={this.deleteShareResult}>確認</button>
                        <button onClick={this.deleteCancel}> 取消</button>
                    </div>
                </Modal> */}
            </div>

        )
    }

}
export default ShareResultComponent
