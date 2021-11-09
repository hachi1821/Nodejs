import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import Select from 'react-select';
import { CRUD_ACTION, LANGUAGES, dateFormat } from '../../../utils'
// thư viện datapiker custom component
import DatePicker from '../../../components/Input/DatePicker';
//format ngày tháng năm
import moment from 'moment';
import { toast } from "react-toastify";
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';
class ManageSchedule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allDoctors: [],
            selectedOption: {},
            currentDate: '',
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.fetchAllScheduleTimeRedux();
    }
    componentDidUpdate(prevProps, prveState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                allDoctors: dataSelect
            })
        }
        if (prevProps.allScheduleTimes !== this.props.allScheduleTimes) {
            let data = this.props.allScheduleTimes;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data,
            })
        }

    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let lableVi = `${item.lastName} ${item.firstName}`;
                let lableEn = `${item.firstName} ${item.lastName}`;

                object.label = language === LANGUAGES.VI ? lableVi : lableEn;
                object.value = item.id;
                result.push(object)
            })

        }
        return result;
    }
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedOption: selectedDoctor });

    };
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
        } this.setState({
            rangeTime: rangeTime
        })
    }
    // sự kiện onclick save
    handleSaveSchedule = async () => {
        let { rangeTime, selectedOption, currentDate } = this.state;
        //mảng lưu thông tin
        let resuld = [];
        if (!currentDate) {
            toast.error("Invalid date!");
            return;
        } if (selectedOption && _.isEmpty(selectedOption)) {
            toast.error("Invalid select doctor!");
            return;
        }
        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        // let formatedDate = moment(currentDate).unix();
        let formatedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    let object = {};
                    object.doctorId = selectedOption.value; //trả về 1 cái là value 1 cái là lable từ thư viện selected
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    resuld.push(object)
                })

            } else {
                toast.error("Invalid selected time!");
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: resuld,
            doctorId: selectedOption.value,
            formatedDate: formatedDate,
        })
        if (res && res.errCode === 0) {
            toast.success("Save schedule doctors !");
        } else {
            toast.error("saveBulkScheduleDoctor error !");
            console.log('saveBulkScheduleDoctor >>>err res', res);
        }
    }
    render() {
        let { rangeTime } = this.state;
        let language = this.props.language;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>  <FormattedMessage id="manage-schedule.select-doctor" /> </label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChangeSelect}
                                options={this.state.allDoctors}

                            />

                        </div>
                        <div className="col-6">
                            <label> <FormattedMessage id="manage-schedule.select-date" /> </label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className="col-12 pick-hour-container">
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                            className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"} >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                            }

                                        </button>

                                    )
                                })
                            }
                        </div>
                        <div className="col-12">
                            <button
                                onClick={() => this.handleSaveSchedule()}
                                className="btn btn-primary btn-save-schedule"><FormattedMessage id="manage-schedule.save" /> </button>
                        </div>

                    </div>
                </div>
            </div >

        );
    }
}

const mapStateToProps = state => {
    return {

        isLoggedIn: state.user.isLoggedIn,// điều kiện người dùng có đăng nhập  redux
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTimes: state.admin.allScheduleTimes,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTimeRedux: () => dispatch(actions.fetchAllScheduleTimes()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
