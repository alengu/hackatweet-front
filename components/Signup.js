import styles from '../styles/login.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { login } from '../reducers/users';

function Signup() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [firstname, setFirstName] = useState('');
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    let msg = '';

    // Fonction d'envoi des infos de création d'un nouveau compte à la BDD
    async function handleSignup() {
        const response = await fetch('http://localhost:3000/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname, username, password })
        });
        const data = await response.json();
        try {
            dispatch(login({ _id: data._id, firstname, username, token: data.token }));
            setusername('');
            setPassword('');
            router.push('/');      
        } catch(error) {
            msg = data.error;
        }
    }

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerSection}>
                <h2 className = {styles.loginModalTitle}>Create your Hackatweet account</h2>
                <input className={styles.loginField} type="text" placeholder="Firstname" id="signUpFirstname" onChange={(e) => setFirstName(e.target.value)} value={firstname} />
                <input className={styles.loginField} type="text" placeholder="Username" id="signUpUsername" onChange={(e) => setusername(e.target.value)} value={username} />
                <input className={styles.loginField} type="password" placeholder="Password" id="signUpPassword" onChange={(e) => setPassword(e.target.value)} value={password} />
                <button className= {styles.modalSigninButton} id="register" onClick={() => handleSignup()}> Sign up </button>
                <div className={styles.errorMsg}> {msg} </div>
            </div>
        </div>
    )
}

export default Signup;
