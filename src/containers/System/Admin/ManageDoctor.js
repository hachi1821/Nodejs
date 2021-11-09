import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import './ManageDoctor.scss';
import * as actions from "../../../store/actions";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTION, LANGUAGES } from '../../../utils'
import { getDetailInforDoctor } from '../../../services/userService';
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

class ManageDoctor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            allDoctors: [],
            handleOldData: false,
            // Save to doctor infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinc: '',
            note: '',

        }
    }
    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.getAllRequiredDoctorInfor();
    }
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let lableVi = `${item.lastName} ${item.firstName}`;
                    let lableEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? lableVi : lableEn;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                console.log('Admin check input price', inputData);
                inputData.map((item, index) => {
                    let object = {};
                    let lableVi = `${item.valueVi}`;
                    let lableEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? lableVi : lableEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let lableVi = `${item.valueVi}`;
                    let lableEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? lableVi : lableEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }


        }
        return result;
    }
    // KHI THAY ĐỔI LANGUAGE 
    componentDidUpdate(prevProps, prveState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                allDoctors: dataSelect
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrivce, resPayment, resProvince } = this.props.allRequiredDoctorInfor;

            let dataSelectPrivce = this.buildDataInputSelect(resPrivce, 'PRICE');
            let dataSelectOPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');

            this.setState({
                listPrice: dataSelectPrivce,
                listPayment: dataSelectOPayment,
                listProvince: dataSelectProvince,
            })
        }
        //thay đổi ngôn ngữ
        if (prevProps.language !== this.props.language) {

            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let { resPrivce, resPayment, resProvince } = this.props.allRequiredDoctorInfor;
            let dataSelectPrivce = this.buildDataInputSelect(resPrivce, 'PRICE');
            let dataSelectOPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            console.log('dataselect ', dataSelect);
            this.setState({
                allDoctors: dataSelect,
                listPrice: dataSelectPrivce,
                listPayment: dataSelectOPayment,
                listProvince: dataSelectProvince,
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
        console.log('handleEditorChange', html, text);
    }
    handleSaveContentMarkdown = (data) => {
        let { handleOldData } = this.state;
        this.props.saveDetailDoctorsRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: handleOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinc: this.state.addressClinc,
            note: this.state.note,

        })
    }
    //hàm của thư viện select 
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailInforDoctor(selectedDoctor.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                handleOldData: true,
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                handleOldData: false,
            })
        }
        console.log(`admin check handleChangeSelect `, res);
    };
    //ham onchange gọi theo name : tên name giống với tên selected ...
    handleChangeSelectDoctorInfor = async (selectedDoctor, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedDoctor; // cach viet code toi uu khong anh huong hieu nang copystate => mutle state
        this.setState({
            ...stateCopy
        })
        console.log('admin check state handle change', selectedDoctor, stateName);
    }
    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;

        this.setState({
            ...stateCopy
        })
    }
    render() {
        //gán 
        console.log('Admin check state', this.state);
        let arrDoctors = this.state.allDoctors;
        let { handleOldData } = this.state;
        let { language } = this.props;

        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className="more-infor">
                    <div className="content-left form-group">

                        <label>  <FormattedMessage id="admin.manage-doctor.choose" /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.allDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.choose" />}
                        />
                    </div>
                    <div className="content-right">
                        <label> <FormattedMessage id="admin.manage-doctor.infor" /></label>
                        <textarea className="form-control "
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        >
                        </textarea>

                    </div>

                </div>
                <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name="selectedPrice"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label> <FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name="selectedPayment"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.province" /> </label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name="selectedProvince"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                        <input className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic} />
                    </div>
                    <div className="col-4 form-group">
                        <label> <FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                        <input className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinc')}
                            value={this.state.addressClinc}
                        />
                    </div>

                    <div className="col-4 form-group">
                        <label> <FormattedMessage id="admin.manage-doctor.note" />  </label>
                        <input className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note} />
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} // truyền props xuống cho component nên k cần dùng arrow funcition 
                        value={this.state.contentMarkdown}
                    />
                </div>
                <butto
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={handleOldData === true ? "save-content-doctor" : "create-content-doctor"}>
                    {handleOldData === true ?
                        <span>  <FormattedMessage id="admin.manage-doctor.save" /></span> : <span> <FormattedMessage id="admin.manage-doctor.create" /> </span>
                    }
                </butto>

            </div>
        );

    }

}
const mapStateToProps = state => {
    // hứng kết quả từ actions -- tiep state vào component -> vào props nên lấy this.props là lấy từ redux    
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {

        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        //infor doctor table
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        //
        saveDetailDoctorsRedux: (data) => dispatch(actions.saveDetailDoctors(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
