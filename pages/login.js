import styles from '../styles/login.module.css';
import { useState } from 'react';
import { Modal } from 'antd';
import SignUp from '../components/Signup';
import SignIn from '../components/Signin';

function Login() {
    const [visibleModal, setVisibleModal] = useState(null);

    return (
        <div>
            <div className={styles.globalContainer}>
                <div>
                    <Modal getContainer="#react-modals" className={styles.modal} open={visibleModal} closable={true} footer={null} onCancel={() => setVisibleModal(null)}>
                        {visibleModal && (visibleModal === "signup" ? <SignUp></SignUp> : <SignIn></SignIn>)}
                    </Modal>
                </div>
                <div className={styles.leftContainer}>

                </div>
                <div className={styles.rightContainer}>
                    <img className={styles.logo} style={{transform: 'rotate(180deg)'}} src={'/logo.png'}/>
                    <h1 className={styles.titre}>See what's happening</h1>
                    <h2 className={styles.slogan}>Join Hackatweet today.</h2>
                    <button className={styles.signupBtn} onClick={() => setVisibleModal("signup")}> Sign up </button>
                    <p className={styles.phrase}>Already have an account ?</p>
                    <button className={styles.signinBtn} onClick={() => setVisibleModal("signin")}> Sign in </button>
                </div>
            </div>
        </div>
    )
}

export default Login;
