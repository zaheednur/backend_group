import { useState } from 'react';
import { authApi } from '../api';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await authApi.post('/register', form);
      alert('Registrasi berhasil!');
      navigate('/login');
    } catch (err) {
      alert('Gagal registrasi!');
    }
  };

  return (
    <div>
      <h2>Registrasi</h2>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default RegisterPage;
