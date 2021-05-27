import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import ShareItemService from '../../services/ShareItemService';
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

class AddShareItemComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            itemId: '',
            itemName: '',
            itemCost: '',
            itemCreater: '',
            itemMember: '',
            userLoginAccount: '',
            modalOpen: false,
            mode: '',
            uiDisable: false,
            memberList: [],
            memberName: [],
            value: '',
            memberSelected:"",
            shareListId:'',
            listCreater:''


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
            itemMember: addNameList.join()
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
        console.log("submitForm")
        console.log(this.state)
        if (this.state.mode === "addShareItem") {
            ShareItemService.addShareItem(this.state).then((response) => {
                console.log(response)
                console.log("SUCCESS")
                this.setState({ modalOpen: true });
            }).catch((err) => {
                window.alert("新增失敗")
                console.log("err: "+ err);
                this.setState({ modalOpen: false });
                // this.setState({ redirect: false })
            })
        } else if (this.state.mode === "editShareItem") {
            console.log("err:000000000 ");
            ShareItemService.editShareItem(
                this.state.itemId,
                this.state.itemName,
                this.state.itemCreater,
                this.state.itemMember,
                this.state.itemCost
            ).then((response) => {
                console.log("SUCCESS")
                console.log(response)
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
        this.setState({ shareListId: linkListId })
        this.getUsers(linkUserId)
        this.getUserLogin(linkUserId)
        if (linkMode === "editShareItem" ){
            this.getShareItemInfo(linkListId)

        }

    }

    //得到登入者資訊(帶入建立人)
    getUserLogin = (userID) => {
        console.log("userAccount:" + this.state.userAccount)
        UserService.getUserByAccount(userID).then((response) => {
            const data = response.data
            console.log("data:" + data)
            this.setState({ itemCreater: data.userName })
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

    //帶入該row之ShareItem info
    getShareItemInfo = (itemId) => {
        ShareItemService.getShareItemById(itemId).then((response) => {
            const data = response.data
            console.log(data)
            this.setState({ itemId: data.itemId })
            this.setState({ itemCreater: data.itemCreater })
            this.setState({ itemName: data.itemName })
            this.setState({ itemCost: data.itemCost })
            this.setState({ itemMember: data.itemMember.split(',') })
            this.setState({ memberSelected: data.itemMember.split(',') })
            this.setState({ shareListId: data.shareListId })


            const members = data.itemMember.split(',')
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
        console.log("renderrenderrenderrenderrender")
        const style = {
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        };
        return (

            <div style={{ height: 400, width: '100%' }}>
                <h1 align="left" hidden={this.state.mode === 'addShareItem' ? false : true}>分帳項目新增</h1>
                <h1 align="left" hidden={this.state.mode === 'editShareItem' ? false : true}>分帳項目編輯</h1>
                <div align="right">
                    <Button variant="contained" color="default"  >
                        <Link to="./UserLogin">登出</Link>
                    </Button>
                    <br />
                    <br />
                </div>
                <h5 align="right">登入帳號為:{this.state.userLoginAccount}</h5>


                <form onSubmit={this.submitForm} align="left">
                    <TextField
                        variant="filled"
                        label="分帳ID (由系統建立)"
                        id="itemId"
                        name="itemId"
                        value={this.state.itemId}
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
                        id="itemCreater"
                        name="itemCreater"
                        value={this.state.itemCreater}
                        onChange={this.changeState}
                        required
                        // placeholder="BB001"
                        disabled
                    />
                    <br />
                    <br />
                    <TextField
                        label="品項名稱"
                        id="itemName"
                        name="itemName"
                        value={this.state.itemName}
                        onChange={this.changeState}
                        required
                        placeholder="輸入品項"
                    />
                    <br />
                    <br />
                    <TextField
                        label="品項金額"
                        id="itemCost"
                        name="itemCost"
                        value={this.state.itemCost}
                        onChange={this.changeState}
                        required
                        placeholder="輸入金額"
                    />
                    <br />
                    <br />
                    {/* <TextField
                        label="分帳成員"
                        id="ShareItemMember"
                        name="ShareItemMember"
                        value={this.state.itemMember}
                        onChange={this.changeState}
                        required
                        placeholder=""
                        disabled={this.state.mode === 'viewShareItem' ? true : false}
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
                        // isDisabled = {this.state.mode === 'editShareItem' ? true : false}

                    />
                    <br />
                    <br />
                    <Button variant="contained" color="default" type="reset" hidden={this.state.mode === 'viewShareItem' ? true : false}>
                        清除
                    </Button>
                    <Button variant="contained" color="primary" type="submit" hidden={this.state.mode === 'addShareItem' ? false : true}>
                        新增
                    </Button>
                    <Button variant="contained" color="primary" type="submit" hidden={this.state.mode === 'editShareItem' ? false : true}>
                        儲存
                    </Button>
                    {/* <input type="submit" value="儲存" hidden={this.state.mode === 'editShareItem' ? false : true} /><input type="reset" value="清除" hidden={this.state.mode === 'viewShareItem' ? true : false} />
                    <input type="submit" value="新增" hidden={this.state.mode === 'addShareItem' ? false : true} />
                    <input type="submit" value="儲存" hidden={this.state.mode === 'editShareItem' ? false : true} /> */}

                </form>

                
               
                <Modal
                    open={this.state.modalOpen}
                    // onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={style}>
                        <h2 id="simple-modal-title" hidden={this.state.mode === 'editShareItem' ? false : true}>資料已更新</h2>
                        <h2 id="simple-modal-title" hidden={this.state.mode === 'addShareItem' ? false : true}>資料已新增</h2>
                        {/* <button><Link to="./ShareItem">確認</Link></button> */}
                        <button><Link to={`./ShareItem?userID=${this.state.userLoginAccount}&listID=${this.state.shareListId}`}>確認</Link></button>
                    </div>
                </Modal>

                {/* <AddUserModal></AddUserModal> */}

            </div>
        )
    }

}

export default AddShareItemComponent