import styles from '../styles/login.module.css';
import { useState } from 'react';

function Signup() {

    const [firstname, setFirstName] = useState('');
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerSection}>
                <p>Sign-up</p>
                <input type="text" placeholder="Firstname" id="signUpFirstname" onChange={(e) => setFirstName(e.target.value)} value={firstname} />
                <input type="text" placeholder="Username" id="signUpUsername" onChange={(e) => setusername(e.target.value)} value={username} />
                <input type="password" placeholder="Password" id="signUpPassword" onChange={(e) => setPassword(e.target.value)} value={password} />
                <button id="register" onClick={() => handleRegister()}> Sign up </button>
            </div>
        </div>
    )
}

export default Signup;
