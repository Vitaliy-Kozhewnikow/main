import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const mapStateToPropsForNavigate = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const AuthNavigate = (Component) => {

    const RedirectComponent = (props) => {
        if (!props.isAuth) return <Navigate to="/login" replace />
        return <Component {...props}/>
    }

    const ConnectedAuthNavigateComponent = connect (mapStateToPropsForNavigate) (RedirectComponent)

    return ConnectedAuthNavigateComponent

}