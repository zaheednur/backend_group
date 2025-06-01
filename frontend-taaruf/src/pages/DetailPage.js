// src/pages/DetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import './detailPage.css';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/${id}`)
      .then((res) => setDetail(res.data))
      .catch((err) => {
        console.error(err);
        setError("Gagal mengambil data. Silakan login ulang.");
      });
  }, [id]);

  if (error) return <p className="error-text">{error}</p>;
  if (!detail) return <p className="loading-text">Loading...</p>;

  return (
    <div className="detail-page">
      <h2 className="detail-title">Detail Taaruf</h2>

      <div className="detail-card">
        {Object.entries(detail).map(([key, value]) =>
          key !== 'id' && key !== 'created_at' ? (
            <p className="detail-line" key={key}>
              <span className="detail-key">{key.replace('_', ' ').toUpperCase()}</span>
              <span className="colon"> : </span>
              <span className="detail-value">{value}</span>
            </p>
          ) : null
        )}

        <div className="button-wrapper">
          <button className="back-btn" onClick={() => navigate('/')}>
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
