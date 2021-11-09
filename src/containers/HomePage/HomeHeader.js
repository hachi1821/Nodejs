//HomeHeader cua HomeHeader
import React, { Component } from 'react';
import { connect } from 'react-redux'; // ket noi giua readux- và reatjs
import './HomeHeader.scss';
import logo from '../../assets/logo2.svg'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../utils";

import { changeLanguageApp } from "../../store/actions";
import { withRouter } from 'react-router';
class HomeHeader extends Component {
    //map to dispatch to props
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        //fire redux event : actions 
    }
    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }

    }
    render() {
        let language = this.props.language;


        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <img className="header-logo" src={logo}
                                onClick={(event) => this.returnToHome(event)}
                            />
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div ><b> <FormattedMessage id="homeheader.speciality" /></b></div>
                                <div className="subs-title"> <FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>
                            <div className="child-content">
                                <div ><b> <FormattedMessage id="homeheader.health-facility" /></b></div>
                                <div className="subs-title"> <FormattedMessage id="homeheader.select-room" /></div>
                            </div>
                            <div className="child-content">
                                <div ><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className="subs-title"> <FormattedMessage id="homeheader.select-doctor" /></div>
                            </div>
                            <div className="child-content">
                                <div ><b> <FormattedMessage id="homeheader.fee" /></b></div>
                                <div className="subs-title"> <FormattedMessage id="homeheader.general-health-check" /></div>
                            </div>
                        </div>
                        <div className="rigt-content">
                            <div className="support"><i className="fas fa-question-circle"></i>
                                <FormattedMessage id="homeheader.support" />
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}> <span onClick={() => this.changeLanguage(LANGUAGES.VI)} >VI</span></div>

                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}> <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title1"> <FormattedMessage id="banner.title1" /> </div>
                            <div className="title2"><FormattedMessage id="banner.title2" /> </div>
                            <div className="search"> <i className="fas fa-search"></i> <input type="text" placeholder="Tìm kiếm" /></div>
                        </div>
                        <div className="content-down">
                            <div className="options">
                                <div className="option-child">
                                    <div className="icon-child"> <i className="far fa-hospital"></i></div>
                                    <div className="text-child"> <FormattedMessage id="banner.examination" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"> <i className="fas fa-mobile-alt"></i></div>
                                    <div className="text-child"> <FormattedMessage id="banner.remote-examination" /> </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"> <i className="fas fa-procedures"></i></div>
                                    <div className="text-child"> <FormattedMessage id="banner.general" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"> <i className="fas fa-flask"></i></div>
                                    <div className="text-child"> <FormattedMessage id="banner.medical-test" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"> <i className="fas fa-user-md"></i></div>
                                    <div className="text-child"> <FormattedMessage id="banner.mental-examination" /> </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-briefcase-medical"></i></div>
                                    <div className="text-child"> <FormattedMessage id="banner.dental-examination" /></div>
                                </div>



                            </div>
                        </div>

                    </div>
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // khai bao sử dụng dispatch  để fire event
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
