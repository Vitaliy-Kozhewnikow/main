import React from 'react';
import a from './userFollow.module.css';
import axios from 'axios'
import userPhoto from '../../images/defaultAva.jpg'

const UserFollow = (props) => {
    
    const getUsers = () => {
        if (props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                props.setUsers(response.data.items)
            }
            );
        }
    }


    return <div>
        <button onClick={getUsers}>Get Users</button>
        {
            props.users.map(u => <div key={u.id}>
                < span >
                    <div >
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={a.img} alt={`Аватар пользователя ${u.name}`} />
                    </div>
                    <div>
                        {u.followed === false
                            ? <button onClick={() => { props.follow(u.id) }}>Follow</button>
                            : <button onClick={() => { props.unFollow(u.id) }}>unFollow</button>}
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
            )}
    </div>

}



export default UserFollow;