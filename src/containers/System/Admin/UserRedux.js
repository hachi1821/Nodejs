import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
//import connect de su dung react-redux
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTION, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import './UserRedux.scss';
// thư viện react light box 
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
//TableManageUser
import TableManageUser from './TableManageUser';
//dung de cover file ->base 64 CommonUtils

class UserRedux extends Component {
    constructor(props) {
        super(props); {
            this.state = {
                // tạo state để lấy dữ liệu
                genderArr: [],
                roleArr: [],
                positionArr: [],
                previewImgURL: '',
                isOpen: false,

                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',

                action: '',
                userEditId: '',
            }
        }
    }
    //gọi database thì funciton bất đồng bộ
    async componentDidMount() {
        // Redux
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

    }
    // chạy sau hàm render => disupdate
    componentDidUpdate(prevProps, prveState, snapshot) {
        //render    => didupdate 
        //hiện tại (this ) và quá khứ (previous)
        //[] [3] 
        // sau đó nạp vào phần tử [3] [3 ]
        // 
        if (prevProps.genderRedux !== this.props.genderRedux) {
            //gán defaut dropdowm
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',

            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;

            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',

            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;

            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',

            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrPositions = this.props.positionRedux;
            let arrRoles = this.props.roleRedux;
            let arrGenders = this.props.genderRedux;
            //reset các trường thuộc tính sau khi tạo người dùng
            this.setState({
                //khi có sự thay đổi người dùng thì state trả về 
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTION.CREATE,

            })
        }
    }
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            //preview file  api của html -> sử dụng privew image reactjs
            let base64 = await CommonUtils.getBase64(file); // dùng để covert file -> base 64
            let objectURL = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectURL,
                avatar: base64
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;

        this.setState({
            isOpen: true,
        })
    }
    handleSaveUser = () => {
        let isValid = this.checkValidataInput();
        if (isValid === false) return;
        let { action } = this.state;
        if (action === CRUD_ACTION.CREATE) {
            //fire redux action 
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            })
            //fire  redux aciton fetchUserRedux: () => dispatch(actions.fetchAllUsersStart())
            this.props.fetchUserRedux();
        }
        if (action === CRUD_ACTION.EDIT) {
            //fire redux edit user
            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber, // lấy state nhưng mà ép kiểu phonenumber đồng bộ data
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar // khi truyền thay đổi 
            })
        }
    }
    checkValidataInput = () => {
        //check onchang dungf vong for 
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName',
            'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('this input is required ' + arrCheck[i])
                break;
            }
        }
        return isValid;


    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        // k mutate state k chỉnh sửa trực tiếp mà thông qua copystate
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
        })
    }
    //truyền 1 funciton từ cha qua con
    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }

        this.setState({
            //khi có sự thay đổi người dùng thì state trả về 
            email: user.email,
            password: 'HardCode',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: '',
            previewImgURL: imageBase64, // cần nối chuỗi để đọc được image 
            action: CRUD_ACTION.EDIT,
            userEditId: user.id,
        }, () => {
            console.log('check image', this.state); //callback
        })
    }
    render() {
        //gender lấy từ database load động // tương tự role , postion
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        //
        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGender; // đặt tên biến 
        /** cách lấy thuộc tính state bth trong init
         * let email = this.state.email;
         * let role = this.state.role; // tương tự cho các thuộc tình còn lại
        */
        //theo es7 lấy theo obj nếu tên biến và thuộc tính lấy là giống nhau .
        let { email, password, firstName, lastName,
            phoneNumber, address, gender, position, role, avatar
        } = this.state;

        return (
            <div className="user-redux-container" >
                <div className="title">
                    User redux - from admin:
                </div>

                <div className="user-redux-body" >
                    <div className="container">
                        <div className="row" >
                            <div className="col-12 my-3" > <FormattedMessage id="manage-user.add" /> </div>
                            <div className="col-12 my-3" >{isGetGenders === true ? 'Loading genders ' : ''} </div>
                            <div className="col-3">
                                <label ><FormattedMessage id="manage-user.email" /> </label>
                                <input className="form-control" type="email"
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                                />
                            </div>
                            <div className="col-3">
                                <label> <FormattedMessage id="manage-user.password" /></label>
                                <input className="form-control" type="password"
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                    disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.firstname" /></label>
                                <input className="form-control" type="text"
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.lastname" /></label>
                                <input className="form-control" type="text"
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.phonenumber" /></label>
                                <input className="form-control" type="text"
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                />
                            </div>
                            <div className="col-9">
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className="form-control" type="text"
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                    value={gender}
                                >
                                    {/* giá trị value xét trong trường gender = this.state.gender */}
                                    {/* xét điều kiện khi nào genders data  dùng genders.map để dùng vòng lập obj*/}
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                //check props để đổi tiếng anh và tiếng việt = language ... dùng redux để load động
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}
                                    value={position}
                                >
                                    {/* xét điều kiện khi nào role data  dùng positions.map để dùng vòng lập obj*/}
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                //check props để đổi tiếng anh và tiếng việt = language ... dùng redux để load động
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}
                                    value={role}
                                >
                                    {/* xét điều kiện khi nào role data  dùng role.map để dùng vòng lập obj*/}
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                //check props để đổi tiếng anh và tiếng việt = language ... dùng redux để load động
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className="preview-img-container">
                                    <input id="previewImg" type="file" hidden
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                    />
                                    <label className="lable-upload" htmlFor="previewImg"><FormattedMessage id="manage-user.upload" />
                                        <i className="fas fa-upload"></i> </label>
                                    <div className="preview-image"
                                        style={{ backgroundImage: `url(${this.state.previewImgURL}) ` }}
                                        onClick={() => this.openPreviewImage()}
                                    >

                                    </div>
                                </div>
                            </div>
                            <div className="col-12 my-3">
                                <button className={this.state.action === CRUD_ACTION.EDIT ? " btn btn-warning" : " btn btn-success"}
                                    onClick={() => this.handleSaveUser()}
                                > {this.state.action === CRUD_ACTION.EDIT ?
                                    <FormattedMessage id="manage-user.edit" />
                                    : <FormattedMessage id="manage-user.save" />

                                    } </button>
                            </div>
                            <div className="col-12 mb-5">
                                <TableManageUser
                                    handleEditUserFromParentKey={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* thư viện preview image-lightbox */}
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>

        )
    }

}
// map state redux vào trong props của react
const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    //để fire event của redux cần keyword là dispatch    
    return {
        getGenderStart: () => dispatch(actions.fetGendersStart()),

        getPositionStart: () => dispatch(actions.fetPositionStart()),

        getRoleStart: () => dispatch(actions.fetRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data)),

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
