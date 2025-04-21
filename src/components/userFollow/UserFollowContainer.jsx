import { connect } from "react-redux";
import React, { useCallback, useEffect } from "react";
import Users from './Users';
import { follow, unFollow, getUserThunkCreator, setCurrentPage} from "../../redux/usersReducer";
import Preloader from "../Preloader/Preloader";


const UsersAPIComponent = (props) => { 
    useEffect( () => { 
        props.getUserThunkCreator(props.currentPage, props.pageSize)
        }, [props.getUserThunkCreator, props.currentPage, props.pageSize])

        
        const onPageClick = useCallback((currentPage) => { 
            props.getUserThunkCreator(currentPage, props.pageSize)
        },[props.pageSize, props.getUserThunkCreator])


        return <>
            {props.isFetching ? <Preloader /> : null}
            <Users totalUserCount={props.totalUserCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                follow={props.follow}
                unFollow={props.unFollow}
                users={props.users}
                onPageClick={onPageClick}
                followingProgress={props.followingProgress}
                 />
        </>
    }   



// class UsersAPIComponent extends React.Component {
//     componentDidMount() {

//         this.props.getUserThunkCreator(this.props.currentPage, this.props.pageSize)

//     }

//     onPageClick = (currentPage) => {
//         this.props.getUserThunkCreator(currentPage, this.props.pageSize)
//     }



//     render() {
//         return <>
//             {this.props.isFetching ? <Preloader /> : null}
//             <Users totalUserCount={this.props.totalUserCount}
//                 pageSize={this.props.pageSize}
//                 currentPage={this.props.currentPage}
//                 follow={this.props.follow}
//                 unFollow={this.props.unFollow}
//                 users={this.props.users}
//                 onPageClick={this.onPageClick}
//                 followingProgress={this.props.followingProgress}
//                  />
//         </>
//     }
// }



const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUserCount: state.usersPage.totalUserCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingProgress: state.usersPage.followingProgress

    }
}





export default connect(mapStateToProps, { follow, unFollow, setCurrentPage, getUserThunkCreator })(UsersAPIComponent);
