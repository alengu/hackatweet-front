import styles from '../styles/login.module.css';
import { useState } from 'react';
import { Modal } from 'antd';
import Signup from '../components/Signup';
import Signin from '../components/Signin';

function Login() {
    const [visibleModal, setVisibleModal] = useState(null);

    return (
        <div>
            <div className={styles.globalContainer}>
                <div>
                    <Modal getContainer="#react-modals" className={styles.modal} open={visibleModal} closable={true} footer={null} onCancel={() => setVisibleModal(null)}>
                        {visibleModal && (visibleModal === "signup" ? <Signup></Signup> : <Signin></Signin>)}
                    </Modal>
                </div>
                <div className={styles.leftContainer}>

                </div>
                <div className={styles.rightContainer}>
                    <img className={styles.logo} />
                    <h1>See what's happening</h1>
                    <h2>Join Hackatweet today.</h2>
                    <button className={styles.signupBtn} onClick={() => setVisibleModal("signup")}> Sign up </button>
                    <p>Already have an account ?</p>
                    <button className={styles.signinBtn} onClick={() => setVisibleModal("signin")}> Sign in </button>
                </div>
            </div>
        </div>
    )
}

export default Login;
