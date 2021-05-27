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
import ShareItemService from '../../services/ShareItemService';
import UserService from '../../services/UserService';
// import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';



class ShareItemComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            shareItem: [],
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
        { field: 'itemId', headerName: '品項ID', width: 150 },
        { field: 'itemName', headerName: '品項名稱', width: 200 },
        { field: 'itemCreater', headerName: '品項建立人', width: 150 },
        { field: 'itemMember', headerName: '分帳成員', width: 300 },
        { field: 'createdTime', headerName: '建立時間', width: 120 },
        { field: 'updatedTime', headerName: '最後更新時間', width: 140 },
        {
            field: 'functionList', headerName: '功能', width: 400,
            renderCell: (params) =>
                // console.log(params);
                // console.log(params.row.userAccount)
                <div>
                    <Button variant="contained" color="default" >
                        <Link to={`./AddShareItem?userID=${this.state.userLoginAccount}&listID=${params.row.itemId}&mode=editShareItem`}>編輯名稱</Link>
                    </Button>
                    <Button variant="contained" color="default" onClick={this.deleteClick}>
                        刪除
                    </Button>

                </div>
        }];
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

        ShareItemService.getShareItem().then((response) => {
            console.log(response)
            const data = response.data
            const shareItem = data.map((item, index) => ({ ...item, id: item.itemId, number: index + 1 }))
            this.setState({ shareItem })
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
        ShareItemService.resultCalculate(this.state.listId).then((response) => {
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
    deleteShareItem = () => {
        // console.log(this.state.selectedUser)
        // console.log(this.state.userPasswordCommit)
        ShareItemService.deleteShareItem(this.state.selectedUser, this.state.userLoginName).then((response) => {
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
                <h3 align="left">項目清單</h3>
                <div align="right">
                    <Button variant="contained" color="default"  >
                        <Link to="./UserLogin">登出</Link>
                    </Button>
                    <br />
                    <br />
                </div>
                <h5 align="right">登入帳號為:{this.state.userLoginAccount}</h5>
                <Button variant="contained" color="default" >
                    <Link to={`./AddShareItem?userID=${this.state.userLoginAccount}&listID=${this.state.listId}&mode=addShareItem`}>+新增一筆</Link>
                </Button>
                <br />
                <br />

                <DataGrid rows={this.state.shareItem || []} columns={this.columns} pageSize={20} onRowClick={(rowData) => this.setSelection(rowData)} />
                <br />

                <div align="right">
                    <Button variant="contained" color="default" onClick={this.shareCalculate} >
                        分帳結果計算
                    </Button>
                    <br />
                    <br />
                </div>

                <Modal
                    open={this.state.modalOpen}
                    // onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={style}>
                        <h2 id="simple-modal-title">確定刪除資料</h2>
                        <h5 >刪除資料後無法復原</h5>
                        <br />
                        <button onClick={this.deleteShareItem}>確認</button>
                        <button onClick={this.deleteCancel}> 取消</button>
                    </div>
                </Modal>
            </div>

        )
    }

}
export default ShareItemComponent
