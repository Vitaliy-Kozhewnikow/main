import React from 'react';
import c from './Nav.module.css'
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className={c.nav}>
      <div className={c.item}>
        <NavLink to="/profile" className={({ isActive }) => isActive ? c.active : ""}> Profile</NavLink>
      </div>
      <div className={c.item}>
        <NavLink to="/dialogs" className={({ isActive }) => isActive ? c.active : ""}>Messages</NavLink>
      </div>
      <div className={c.item}>
        <NavLink to="/music" className={({ isActive }) => isActive ? c.active : ""}>Music</NavLink>
      </div>
      <div className={c.item}>
        <NavLink to="/setting" className={({ isActive }) => isActive ? c.active : ""}>Setting</NavLink>
      </div>
    </nav>
  )
}


export default Nav;
