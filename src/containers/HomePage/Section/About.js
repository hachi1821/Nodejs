//About cua About
import React, { Component } from 'react';
import { connect } from 'react-redux'; // ket noi giua readux- và reatjs
import { FormattedMessage } from 'react-intl';


class About extends Component {
    render() {
        return (
            <div className=" section-share section-about">
                <div className="section-about-header">
                    Truyền thông về web app
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe width="100%" height="450px"
                            src="https://www.youtube.com/embed/U-HC2MjhJQM"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <div className="content-right">
                        <p> List Sách xin giới thiệu đến bạn những câu quotes hay về cuộc sống ý nghĩa giúp bạn nhận ra nhiều điều trong cuộc đời. Đừng để quá muộn mới nhật ra những triết lý sống hay này nhé. "Đàn ông là sói; chọn đúng sẽ bảo vệ bạn, chọn sai sẽ cắn chết bạn. Phụ nữ là rắn; chọn đúng sẽ quấn quýt yêu thương bạn, chọn sai sẽ từ từ hạ độc bạn. Bạn bè là con đường; chọn đúng sẽ đến đích, chọn sai cả đời đi lạc." Bạn nghĩ sao về câu quote hay này? Đừng quên bấm THEO DÕI List Sách để cập nhật nhiều ghim hay... </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
