import { connect } from "react-redux";
import React from "react";
import Header from "./Header";

import {logout, setUserData, setUserImg } from "../../redux/authReducer";








class HeaderContainer extends React.Component {



    render() {
        return <Header {...this.props} />

    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        id: state.auth.id,
        img: state.auth.img
    }
}

export default connect(mapStateToProps, { setUserData, setUserImg, logout })(HeaderContainer);







