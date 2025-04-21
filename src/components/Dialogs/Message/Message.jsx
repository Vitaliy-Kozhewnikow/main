
import a from './Message.module.css';

const Message = (props) => {

    return (
        <div className={a.flex}>
            <div className={`${a.message} ${props.forme ? a.sentByMe : a.received}`}>
                <img src='https://avatars.mds.yandex.net/i?id=4328f20db151eb6cd02e84c618ee71e5_l-8497474-images-thumbs&n=13' alt="Avatar" className={a.img} />
                {props.message}
            </div>

        </div>
    )

}


export default Message;