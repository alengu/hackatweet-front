import styles from '../styles/login.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { login } from '../reducers/users';

function Signin() {

    const router = useRouter();
    const dispatch = useDispatch();
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    let msg = '';

    // Fonction de connexion au site
        async function handleSignin() {
            const response = await fetch('http://localhost:3000/users/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            try {
                dispatch(login({ _id: data._id, firstname: data.firstname, username, token: data.token }));
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
                <p>Sign-in</p>
                <input type="text" placeholder="Username" id="signInUsername" onChange={(e) => setusername(e.target.value)} value={username} />
                <input type="password" placeholder="Password" id="signInPassword" onChange={(e) => setPassword(e.target.value)} value={password} />
                <button id="connection" onClick={() => handleSignin()}> Sign in </button>
            </div>
        </div>
    )
}
    
export default Signin;
    