import a from './Dialogs.module.css';
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';
import React from 'react';
import { useForm } from 'react-hook-form';


const Dialogs = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()


    let dialogsElements = props.messagesPage.dialogsData.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />)
    let messagesElements = props.messagesPage.messageData.map((message) => <Message message={message.message} forme={message.forme} />)





    const onSubmit = (data) => {
        console.log("Отправляемые данные:", data)
        if (data.message.trim()) { // Проверяем, что сообщение не пустое
            props.addMessage(data.message); // Передаем только текст сообщения
            reset(); // Очищаем поле после отправки
        }

    }

        return (
            <div className={a.dialogs}>
                <div className={a.dialogsItem}>
                    <div className={a.img}>
                        {dialogsElements}
                    </div>
                </div>
                <div className={a.messages}>
                    
                    <div className={a.container_message}>
                        <div className={a.message}>
                            {messagesElements}
                        </div>
                    </div>
                    
    
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={a.textareaWrapper}>
                                <textarea
                                    {...register('message', { required: 'Сообщение не может быть пустым' })}
                                    placeholder='Введите сообщение...'
                                    className={a.area}/>
                                    <button type='submit' className={a.btn} >  Add message </button>
                            </div>

                            
                        </form>
                    </div>

                </div>
            </div>

        )
    }




export default Dialogs;