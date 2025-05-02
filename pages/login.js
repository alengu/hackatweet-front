import styles from '../styles/login.module.css';
import { useState } from 'react';
import { Modal } from 'antd';
import Signup from '../components/Signup';
import Signin from '../components/Signin';

function Login() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [signUp, setSignUpModal] = useState(false);
    const [signIn, setSignInModal] = useState(false);
    let modalContent;

    function showSignUpModal() {
        console.log('fonction appelée');
            console.log('condition signup ok');
            modalContent = <Signup>Hello</Signup>;
            setIsModalVisible(true);
    }

    function showSignInModal() {
        console.log('fonction appelée');
            console.log('condition signin ok');
            modalContent = (<Signin></Signin>);
            setIsModalVisible(true);
    }

    if (isModalVisible === false) {
        console.log('modal false')
        modalContent = '';
    }

    return (
        <div>
            <div className={styles.globalContainer}>
                <div>
                    <Modal getContainer="#react-modals" className={styles.modal} visible={isModalVisible} closable={true} footer={null} onClick={() => setIsModalVisible(false)}>
                        {modalContent}
                    </Modal>
                </div>
                <div className={styles.leftContainer}>

                </div>
                <div className={styles.rightContainer}>
                    <img className={styles.logo} />
                    <h1>See what's happening</h1>
                    <h2>Join Hackatweet today.</h2>
                    <button className={styles.signupBtn} onClick={() => showSignUpModal()}> Sign up </button>
                    <p>Already have an account ?</p>
                    <button className={styles.signinBtn} onClick={() => showSignInModal()}> Sign in </button>
                </div>
            </div>
        </div>
    )
}

export default Login;
