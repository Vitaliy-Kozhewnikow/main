import React from 'react';
import a from './userFollow.module.css';
import userPhoto from '../../images/defaultAva.jpg'
import { NavLink } from 'react-router-dom';





const Users = (props) => {

    const pagesCount = Math.ceil(props.totalUserCount / props.pageSize)

    const pages = []

    for (let i = 1; i <= pagesCount; i++) { pages.push(i) }




    return (<div>
        <div className={a.text}>
            {pages.map(p => {
                return <span className={props.currentPage === p && a.textSelected}
                    onClick={(e) => props.onPageClick(p)}>{p}</span>
            })}


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
