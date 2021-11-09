import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        {
            this.state = {
                detailDoctors: {},
                currentDoctorId: -1,
            }
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailInforDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctors: res.data,
                    currentDoctorId: id
                })
            }
        }
    }

    componentDidUpdate(prevProps, prveState, snapshot) {

    }

    render() {

        console.log('Admin check state', this.state);
        let { language } = this.props;
        let { detailDoctors } = this.state;
        let nameVi = '', nameEn = '';
        if (detailDoctors && detailDoctors.positionData) {
            nameVi = `${detailDoctors.positionData.valueVi} : ${detailDoctors.lastName} ${detailDoctors.firstName}`;
            nameEn = `${detailDoctors.positionData.valueEn} :${detailDoctors.firstName} ${detailDoctors.lastName}`;
        }

        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">

                        <div className="content-left"
                            style={{
                                backgroundImage: `url(${detailDoctors && detailDoctors.image ? detailDoctors.image : ''}) `
                            }}
                        >
                        </div>
                        <div className="content-right">
                            <div className="up">
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className="down">
                                {detailDoctors && detailDoctors.Markdown && detailDoctors.Markdown.description

                                    && <span>
                                        {detailDoctors.Markdown.description}
                                    </span>
                                }

                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="content-left">
                            <DoctorSchedule
                                doctorIdFromParent={this.state.currentDoctorId}
                            />
                        </div>
                        <div className="content-right">

                        </div>
                    </div>
                    <div className="detail-infor-doctor">
                        {detailDoctors && detailDoctors.Markdown && detailDoctors.Markdown.contentHTML

                            && <div dangerouslySetInnerHTML={{ __html: detailDoctors.Markdown.contentHTML }}>

                            </div>
                        }
                    </div>
                    <div className="comment-doctor">

                    </div>

                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
