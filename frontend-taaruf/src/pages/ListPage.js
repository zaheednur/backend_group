// src/pages/ListPage.js
import React, { useEffect, useState } from 'react';
import api from '../api'; // pastikan pakai instance yg punya token
import { useNavigate } from 'react-router-dom';
import './listPage.css';

function ListPage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await api.get('/');
      setData(res.data);
    } catch (error) {
      console.error('Gagal fetch data:', error);
      if (error.response?.status === 401) {
        alert('Silakan login terlebih dahulu');
        navigate('/login');
      }
    }
  };

  const deleteData = async (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      try {
        await api.delete(`/${id}`);
        fetchData();
      } catch (err) {
        console.error('Gagal menghapus:', err);
      }
    }
  };

  useEffect(() => {
    // 🔐 Cek apakah user sudah login
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchData();
    }
  }, []);

  return (
    <div className="page-background">
      <div className="glass-card">
        <h2>Taarufin Ajee</h2>
        <button className="add-btn" onClick={() => navigate('/add')}>Tambah Data</button>
        <button className="logout-btn" onClick={() => {
          localStorage.removeItem('token');
          navigate('/login');
        }}>Logout</button>
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Jenis Kelamin</th>
              <th>Usia</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.id}>
                <td>{d.nama}</td>
                <td>{d.jenis_kelamin}</td>
                <td>{d.usia}</td>
                <td>
                  <button className="view" onClick={() => navigate(`/view/${d.id}`)}>View</button>
                  <button className="update" onClick={() => navigate(`/edit/${d.id}`)}>Update</button>
                  <button className="delete" onClick={() => deleteData(d.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
