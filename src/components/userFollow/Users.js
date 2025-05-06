import React from 'react';
import a from './userFollow.module.css';
import userPhoto from '../../images/defaultAva.jpg'
import { NavLink } from 'react-router-dom';
import Paginator from "../common/Pagindator";





const Users = (props) => {




    return (<div>
        <div className={a.text}>
            <Paginator totalUserCount={props.totalUserCount} pageSize={props.pageSize} currentPage={props.currentPage} onPageClick={props.onPageClick} />
        </div>
        {
            props.users.map(u => <div key={u.id}>
                < span >
                    <div >
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={a.img} alt={`Аватар пользователя ${u.name}`} />
                        </NavLink>
                    </div>
                    <div>
                        {u.followed === false
                            ? <button disabled={props.followingProgress.some(id => id === u.id)} onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>

                            : <button disabled={props.followingProgress.some(id => id === u.id)} onClick={() => {props.unFollow(u.id)}}>unFollow</button>}
                    </div>
                </span >

                <span>
                    <div>
                        {u.name}
                    </div>
                    <div>
                        {u.status}
                    </div>
                </span>

            </div>
            )
        }
    </div>
    )
}



export default Users
