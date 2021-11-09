import React, { Component } from 'react';

import { connect } from 'react-redux';
import Slider from "react-slick";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from "../../../store/actions";
class MedicalFacility extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        //fire redux event : actions 
    }
    render() {
        let language = this.props.language;
        return (
            <div className=" section-share section-medical-facility ">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section"> <FormattedMessage id="homeheader.medical-facilities" /> </span>
                        <button className="btn-section"> <FormattedMessage id="homeheader.search" /> </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="bg-image section-medical-facility" />
                                <div>Hệ Thống  Y Tế Thu Cúc 1 </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-medical-facility" />
                                <div>Hệ Thống  Y Tế Thu Cúc 2 </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-medical-facility" />
                                <div>Hệ Thống  Y Tế Thu Cúc 3 </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-medical-facility" />
                                <div>Hệ Thống  Y Tế Thu Cúc 4 </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-medical-facility" />
                                <div>Hệ Thống  Y Tế Thu Cúc 5 </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-medical-facility" />
                                <div>Hệ Thống  Y Tế Thu Cúc 6 </div>
                            </div>


                        </Slider>
                    </div>

                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
