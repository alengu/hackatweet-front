import styles from '../styles/login.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function Signup() {

    const dispatch = useDispatch();
    const [firstname, setFirstName] = useState('');
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');

    // Fonction d'envoi des infos de création d'un nouveau compte à la BDD
    async function handleSignup() {
        const response = await fetch('http://localhost:3000/users/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname, username, password })
        });
        const data = await response.json();
        if (data.result) {
            dispatch(login({ username, token: data.token }));
            setusername('');
            setPassword('');
        }
    }

    return (
        <div className={styles.registerContainer}>
            <div>
                <h2>Create your Hackatweet account</h2>
                <input type="text" placeholder="Firstname" id="signUpFirstname" onChange={(e) => setFirstName(e.target.value)} value={firstname} />
                <input type="text" placeholder="Username" id="signUpUsername" onChange={(e) => setusername(e.target.value)} value={username} />
                <input type="password" placeholder="Password" id="signUpPassword" onChange={(e) => setPassword(e.target.value)} value={password} />
                <button id="register" onClick={() => handleSignup()}> Sign up </button>
            </div>
        </div>
    )
}

export default Signup;
