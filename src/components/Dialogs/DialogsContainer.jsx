import { connect } from 'react-redux';
import { addMessageActionCreator, messageChangeActionCreator } from '../../redux/messagesReducer';
import Dialogs from './Dialogs';
import { AuthNavigate } from '../hoc/AuthNavigate';
import { compose } from 'redux';
             
const mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (messageText) => {
            dispatch(addMessageActionCreator(messageText))
            }
    }
}


export default compose (
    connect (mapStateToProps, mapDispatchToProps),
    AuthNavigate
) (Dialogs)