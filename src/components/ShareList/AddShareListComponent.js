import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import ShareListService from '../../services/ShareListService';
import UserService from '../../services/UserService';
// import AddUserModal from './AddUserModal'
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import { Redirect } from 'react-router';

// import { colourOptions } from '../data';

class AddShareListComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            listId: '',
            listName: '',
            listCreater: '',
            listMember: '',
            userLoginAccount: '',
            modalOpen: false,
            mode: '',
            uiDisable: false,
            memberList: [],
            memberName: [],
            value: '',
            memberSelected:""
        }
        //設定該function的this為class本身
        this.changeState = this.changeState.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    handleSelectChange = (e) => {
        console.log("e:"+ e)
        const addNameList = e.map((userName) => userName.value);
        this.setState({
            memberSelected: e,
            listMember: addNameList.join()
        });
    }

    //傳入event要取觸發事件的元件
    changeState(event) {
        //使用setState將值寫到nameVal中
        let changeName = event.target.name
        this.setState({ [changeName]: event.target.value })
    }
    // //新增一個submit的function
    submitForm(event) {
        console.log(this.state)
        // this.setState({
        //     listMember: this.state.listMember.join()
        // });
        console.log("submitForm")
        console.log(this.state)
        if (this.state.mode === "addShareList") {
            ShareListService.addShareList(this.state).then((response) => {
                console.log(response)
                console.log("SUCCESS")
                this.setState({ modalOpen: true });
            }).catch((err) => {
                window.alert("新增失敗")
                console.log("err: "+ err);
                this.setState({ modalOpen: false });
                // this.setState({ redirect: false })
            })
        } else if (this.state.mode === "editShareList") {
            ShareListService.editShareList(
                this.state.listId,
                this.state.listName,
                this.state.listCreater,
                this.state.listMember,
            ).then((response) => {
                console.log("SUCCESS")
                this.setState({ modalOpen: true });
            })
        }



        event.preventDefault()
    }



    getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    componentDidMount() {
        var linkMode = this.getParameterByName('mode');
        var linkUserId = this.getParameterByName('userID');
        var linkListId = this.getParameterByName('listID');
        console.log(linkUserId)
        this.setState({ mode: linkMode })
        this.setState({ userLoginAccount: linkUserId })
        this.getUsers(linkUserId)
        this.getUserLogin(linkUserId)
        if (linkMode === "editShareList" ){
            this.getShareListInfo(linkListId)

        }

    }

    //得到登入者資訊(帶入建立人)
    getUserLogin = (userID) => {
        console.log("userAccount:" + this.state.userAccount)
        UserService.getUserByAccount(userID).then((response) => {
            const data = response.data
            console.log("data:" + data)
            this.setState({ listCreater: data.userName })
            console.log("SUCCESS");
        }
        ).catch((err) => {
            console.log("FAIL");
            console.log(err);
        })
    }

    //得到member清單
    getUsers = () => {
        UserService.getUsers().then((response) => {
            const data = response.data
            console.log("data:" + data)
            const memberList = data.map((item) => ({ ...item }))
            const memberName = memberList.map((userName) => ({ value: userName.userName, label: userName.userName + "(" + userName.userAccount + ")" }))
            this.setState({ memberList })
            this.setState({ memberName })
            console.log("SUCCESS");
        }
        ).catch((err) => {
            console.log("FAIL");
            console.log(err);
        })
    }

    //帶入該row之shareList info
    getShareListInfo = (listID) => {
        ShareListService.getShareListById(listID).then((response) => {
            const data = response.data
            console.log(data)
            this.setState({ listId: data.listId })
            this.setState({ listCreater: data.listCreater })
            this.setState({ listName: data.listName })
            this.setState({ listMember: data.listMember.split(',') })
            this.setState({ memberSelected: data.listMember.split(',') })

            const members = data.listMember.split(',')
            console.log(members)
            const allMembers = this.state.memberName
            console.log(allMembers)
            const memberShow = allMembers.filter(allMember=>members.find(member=>allMember.value===member))
            this.setState({ memberSelected: memberShow })

            // const memberShow = allMember.map((userName,item) => ({ 
                
            //     value: userName.userName, label: userName.userName
                
            // }))
        })
    }


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
                <h1 align="left" hidden={this.state.mode === 'addShareList' ? false : true}>分帳表新增</h1>
                <h1 align="left" hidden={this.state.mode === 'editShareList' ? false : true}>分帳表編輯</h1>
                <div align="right">
                    <Button variant="contained" color="default"  >
                        <Link to="./UserLogin">登出</Link>
                    </Button>
                    <br />
                    <br />
                </div>
                <h5 align="right">登入帳號為 : {this.state.userLoginAccount}</h5>


                <form onSubmit={this.submitForm} align="left">
                    <TextField
                        variant="filled"
                        label="分帳ID (由系統建立)"
                        id="listId"
                        name="listId"
                        value={this.state.listId}
                        // onChange={this.changeState}
                        // required
                        disabled
                        placeholder="此為系統提供"
                    />
                    <br />
                    <br />
                    <TextField
                        variant="filled"
                        label="建立人"
                        id="listCreater"
                        name="listCreater"
                        value={this.state.listCreater}
                        onChange={this.changeState}
                        required
                        // placeholder="BB001"
                        disabled
                    />
                    <br />
                    <br />
                    <TextField
                        label="分帳表名稱"
                        id="listName"
                        name="listName"
                        value={this.state.listName}
                        onChange={this.changeState}
                        required
                        placeholder="替這次的旅遊取個名字吧"
                        disabled={this.state.mode === 'viewShareList' ? true : false}
                    />
                    <br />
                    <br />
                    {/* <TextField
                        label="分帳成員"
                        id="shareListMember"
                        name="shareListMember"
                        value={this.state.listMember}
                        onChange={this.changeState}
                        required
                        placeholder=""
                        disabled={this.state.mode === 'viewShareList' ? true : false}
                    /> */}
                    <br />
                    <br />
                    <h4>分帳成員</h4>
                    <label>若建立人也為分帳成員，請記得選取</label>
                    <Select
                        defaultValue={[this.state.memberName[2], this.state.memberName[3]]}
                        isMulti
                        name="memberSelected"
                        options={this.state.memberName}
                        onChange={this.handleSelectChange}
                        value={this.state.memberSelected}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        // isDisabled = {this.state.mode === 'editShareList' ? true : false}

                    />
                    <br />
                    <br />
                    <div  >
                        <Button variant="contained" color="default" type="reset" style={{float:'left'}}>
                            <Link to={`./ShareList?userID=${this.state.userLoginAccount}`}>返回</Link>
                        </Button>
                        <Button variant="contained" color="primary" type="submit" hidden={this.state.mode === 'addShareList' ? false : true} style={{float:'right'}}>
                            新增
                        </Button>
                        <Button variant="contained" color="primary" type="submit" hidden={this.state.mode === 'editShareList' ? false : true} style={{float:'right'}}>
                            儲存
                        </Button>
                    </div>

                    {/* <input type="submit" value="儲存" hidden={this.state.mode === 'editShareList' ? false : true} /><input type="reset" value="清除" hidden={this.state.mode === 'viewShareList' ? true : false} />
                    <input type="submit" value="新增" hidden={this.state.mode === 'addShareList' ? false : true} />
                    <input type="submit" value="儲存" hidden={this.state.mode === 'editShareList' ? false : true} /> */}

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
                        {/* <button><Link to="./ShareList">確認</Link></button> */}
                        <button><Link to={`./ShareList?userID=${this.state.userLoginAccount}`}>確認 </Link> </button>
                    </div>
                </Modal>

                {/* <AddUserModal></AddUserModal> */}

            </div>
        )
    }

}

export default AddShareListComponent