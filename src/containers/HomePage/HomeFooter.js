//About cua About
import React, { Component } from 'react';
import { connect } from 'react-redux'; // ket noi giua readux- và reatjs
import { FormattedMessage } from 'react-intl';


class HomeFooter extends Component {
    render() {
        return (
            <div className="home-footer">
                <p> &copy; 2021 Wep.info.com More information ,pls vistits Web infor <a target="_blank" href="#"> &#8594;Clck here &#8592; </a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
