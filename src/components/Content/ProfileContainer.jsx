import React, { useEffect } from 'react';
import Profile from './Content';
import { connect } from 'react-redux';
import { getProfileInfo, getStatus, updateStatus} from '../../redux/profileReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthNavigate } from '../hoc/AuthNavigate';
import { compose } from 'redux';





const ProfileContainer = (props) => {
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => { 
        let profileId = params.userId;
        if (!profileId) {
            profileId = 32217;
             if (!profileId) { 
                navigate("/login")
             }
        }
        props.getProfileInfo(profileId)
        props.getStatus(profileId)
    }, [params.userId, navigate, props.ID])
    
        return (<Profile {...props} profile={props.profile} status={props.status} updateStatus={props.updateStatus} />)
    
}


const mapStateToProps = (state) => ({ 
    profile: state.profilePage.info,
    status: state.profilePage.status,
    ID: state.profilePage.info?.userId || null
})


export default compose(
    connect ( mapStateToProps , {getProfileInfo, getStatus , updateStatus}), 
    AuthNavigate
    )(ProfileContainer)

