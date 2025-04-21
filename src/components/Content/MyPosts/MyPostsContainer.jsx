import { connect } from 'react-redux';
import { addPostActionCreator} from '../../../redux/profileReducer';
import MyPosts from './MyPosts';


const mapStateToProps = (state) => {
  return {
      profilePage: state.profilePage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      addPost: (posts) => {
          dispatch(addPostActionCreator(posts))
          }
  }
}

const MyPostsContainer = connect (mapStateToProps, mapDispatchToProps) (MyPosts);


export default MyPostsContainer;