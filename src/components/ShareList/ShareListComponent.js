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
import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';


class ShareListComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            shareList: [],
            modalOpen: false,
            selectedUser: '',
            userPasswordCommit: ''
        }
    }

    columns = [
        { field: 'number', headerName: '序號', width: 100 },
        { field: 'listId', headerName: '分帳ID', width: 150 },
        { field: 'listName', headerName: '分帳表名稱', width: 130 },
        { field: 'listCreater', headerName: '建立人', width: 150 },
        { field: 'listMember', headerName: '分帳成員', width: 300 },
        { field: 'createdTime', headerName: '建立時間', width: 120 },
        { field: 'updatedTime', headerName: '最後更新時間', width: 140 },
        {
            field: 'functionList', headerName: '功能', width: 150,
            renderCell: (params) =>
            // console.log(params)
                // console.log(params.row.userAccount)
                <div>
                    <button><Link to={`./AddUserController?mode=editAccount&userID=${params.row.userAccount}`}>編輯</Link></button>
                    {/* <button><Link to={`./AddUserController?mode=viewAccount&userID=${params.row.userAccount}`}>檢視</Link></button> */}
                    {/* <button><Link to={{
                        pathname:'./AddUserController?ID=viewAccount',
                        test: this.state.selectedUser
                    }}>檢視</Link></button> */}
                    <button onClick={this.deleteClick}>刪除</button>
                </div>
        }];

    componentDidMount() {
        ShareListService.getShareList().then((response) => {
            console.log(response)
            const data = response.data
            const shareList = data.map((item, index) => ({ ...item, id: item.listId, number: index + 1 }))
            this.setState({ shareList })
            // console.log(this.state)
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    setSelection = (rowData) => {
        try{
            this.setState({ selectedUser: rowData.id })
            console.log(rowData)
        }catch(e){
            console.log(e)
        }
        
        // console.log(this.state.selectedUser)

    }

    deleteClick = () => {
        this.setState({ modalOpen: true });
        // this.setState({ selectedUser: this.state.user[this.state.index]})
        // UserService.deleteUser(this.state).then((response) => {
        //     console.log("SUCCESS")
        // })
    }
    deleteUser = () => {
        // console.log(this.state.selectedUser)
        // console.log(this.state.userPasswordCommit)
        ShareListService.deleteUser(this.state.selectedUser, this.state.userPasswordCommit).then((response) => {
            // console.log(response);
            if (response.data === 1) {
                // () => window.alert("SUCCESS")
                console.log("SUCCESS");
                
            } else {
                // () => window.alert("密碼錯誤")
                console.log(response.data);
            }
            this.setState({ modalOpen: false });
        }
        ).catch((err) => {
            window.alert("密碼錯誤")
            console.log(err);
            this.setState({ modalOpen: false });
            // this.setState({ redirect: false })
        })
    }
    deleteCancel = () => {
        this.setState({ modalOpen: false });
    }

    render() {
        
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
                <h1 align="left">連線帳號管理</h1>
                <h3 align="left">帳號清單</h3>
                <Button><Link to="./AddUserController?mode=addAccount">+新增一筆</Link></Button>
                <DataGrid rows={this.state.shareList || []} columns={this.columns} pageSize={20} onRowClick={(rowData) => this.setSelection(rowData)} />

                <Modal
                    open={this.state.modalOpen}
                    // onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={style}>
                        <h2 id="simple-modal-title">確定刪除資料</h2>
                        <h5 >刪除資料後無法復原</h5>
                        <label>密碼確認：</label>
                        <input
                            type="password"
                            id="userPasswordCommit"
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.userPasswordCommit}
                        />
                        <br />
                        <button onClick={this.deleteUser}>確認</button>
                        <button onClick={this.deleteCancel}> 取消</button>
                    </div>
                </Modal>
            </div>

        )
    }

}
export default ShareListComponent
