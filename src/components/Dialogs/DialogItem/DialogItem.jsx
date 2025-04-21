import { NavLink } from 'react-router-dom';
import a from './../Dialogs.module.css';
import style from './DialogItem.module.css';


const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;

    return (
        

        <div className={a.dialog + ' ' + a.active}>
            <img src='https://avatars.mds.yandex.net/i?id=4328f20db151eb6cd02e84c618ee71e5_l-8497474-images-thumbs&n=13' alt="Avatar" className={style.img}/>
            <NavLink to={path}> {props.name} </NavLink>
            
        </div>
    )
}

export default DialogItem;