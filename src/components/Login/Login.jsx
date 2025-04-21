import React from "react";
import { useForm } from "react-hook-form";
import styles from './Login.module.css';
import { login } from "../../redux/authReducer";
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom'


const LoginForm = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()


    const onSubmit = async (data) => {
        props.login(data.email, data.password, data.rememberMe)
        
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    className={ styles['input-field'] & errors.email ? styles['input-error'] : ''}
                    {...register("email", { required: 'Email обязателен' })}
                    placeholder="Email"
                />
                {errors.email && (  
                    <p className= {styles["error-message"]}>
                        <span className={styles["error-icon"]}>⚠</span>
                        {errors.email.message}
                    </p>)} 
            </div>

            <div>
                <input
                type="password"
                 className={errors.password ? styles['input-error'] : ''}
                    {...register('password', { required: 'Пароль обязателен' })}
                    placeholder="Password"
                />
                {errors.password && (
                    <p className={styles["error-message"]}> 
                        <span className={styles["error-icon"]}>⚠</span>
                        {errors.password.message} 
                        </p>)}
            </div>

            <div>
                <input type="checkbox" {...register('rememberMe')} /> remember me
            </div>

            <button type="submit" >login</button>

        </form>
    );
}



const Login = (props) => {
    if (props.isAuth) { 
        return <Navigate to ="/profile" replace/>
    }
    return <div className= {styles['container']}>
        <LoginForm login={props.login}/>
    </div>
}

const mapStateToProps = (state) => ({ 
    isAuth: state.auth.isAuth
})


export default connect (mapStateToProps , {login}) (Login)