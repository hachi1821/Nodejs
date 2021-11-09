import React, { Component } from 'react';

import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import { FormattedMessage } from 'react-intl'; // ngoon ngu
//import section
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
//import footer
import HomeFooter from './HomeFooter';
//import scss
import './HomePage.scss';
import Slider from "react-slick";
//import css slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 600,
            slidesToShow: 4,
            slidesToScroll: 2,

        };
        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <Specialty
                    settings={settings} />
                <MedicalFacility
                    settings={settings} />
                <OutStandingDoctor
                    settings={settings} />
                <HandBook
                    settings={settings}
                />
                <About />
                <HomeFooter />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn


    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
