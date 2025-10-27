import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { email, password };
    localStorage.setItem('user', JSON.stringify(user));
    toast.success('Signup successful! You can now log in.');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Signup</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>Signup</button>
      </form>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', backgroundColor: '#f0f4f8' },
  form: { backgroundColor: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', width: '100%', maxWidth: '350px', display: 'flex', flexDirection: 'column', gap: '1rem' },
  title: { textAlign: 'center', marginBottom: '1rem', color: '#0077b6' },
  input: { padding: '0.8rem', border: '1px solid #ccc', borderRadius: '5px', outline: 'none' },
  button: { backgroundColor: '#0077b6', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '5px', cursor: 'pointer' },
};
