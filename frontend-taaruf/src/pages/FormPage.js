import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api'; // gunakan instance api yang sudah siap pakai token
import './formPage.css';

function FormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    nama: '',
    jenis_kelamin: '',
    daerah_asal: '',
    suku: '',
    pekerjaan: '',
    status: '',
    usia: '',
    ciri_fisik: '',
    hobi: '',
    target_menikah: ''
  });

  useEffect(() => {
    if (isEdit) {
      api
        .get(`/${id}`)
        .then((res) => setForm(res.data))
        .catch((err) => {
          console.error('Gagal mengambil data:', err);
          alert('Data tidak ditemukan');
          navigate('/'); // opsional redirect kalau error
        });
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await api.put(`/${id}`, form);
      } else {
        await api.post('/', form);
      }
      navigate('/');
    } catch (error) {
      console.error('Gagal submit:', error);
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  };

  return (
    <div className="page-background">
      <div className="form-glass">
        <h2>{isEdit ? 'Update' : 'Tambah'} Data Taaruf</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          {Object.entries(form).map(([key, value]) =>
            key !== 'id' && key !== 'created_at' ? (
              <div key={key} className="form-group">
                <label>{key.replace('_', ' ').toUpperCase()}</label>
                {key === 'jenis_kelamin' ? (
                  <select name={key} value={value} onChange={handleChange} required>
                    <option value="">-- Pilih Jenis Kelamin --</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                ) : (
                  <input
                    type={key === 'usia' ? 'number' : 'text'}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
            ) : null
          )}
          <div className="form-actions">
            <button type="submit" className="save">
              {isEdit ? 'Update' : 'Simpan'}
            </button>
            <button type="button" className="cancel" onClick={() => navigate('/')}>
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormPage;
