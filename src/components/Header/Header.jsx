import React from 'react';
import s from './Header.module.css';
import { Link, NavLink } from 'react-router-dom';

const Header = (props) => {
    const ShowImg = (img) => { 
        debugger
        if (!props.img) { 
            <div>No img</div>
        }else { 
            <img src={props.img} alt='Avatar user' />  
        }
    }
    return <header className={s.header}>
        <Link to="/users">
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Vanamo_Logo.svg/768px-Vanamo_Logo.svg.png' alt='Logo'></img>
        </Link>

        <div className={s.loginBlock}>
            <div>
                {ShowImg(props.img)}
            </div>

            
            {props.isAuth 
                ? <div> {props.login} - <button className={s.block} onClick={props.logout}>LOGOUT</button> </div>
                : <NavLink to={'/login'}> <button className={s.block}> Login </button> </NavLink>}
            

        </div>
    </header>
}

export default Header;