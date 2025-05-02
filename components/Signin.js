import styles from '../styles/login.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function Signin() {

    const dispatch = useDispatch();
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerSection}>
                <p>Sign-in</p>
                <input type="text" placeholder="Username" id="signInUsername" onChange={(e) => setusername(e.target.value)} value={username} />
                <input type="password" placeholder="Password" id="signInPassword" onChange={(e) => setPassword(e.target.value)} value={password} />
                <button id="connection" onClick={() => handleConnection()}> Sign in </button>
            </div>
        </div>
    )
}
    
export default Signin;
    