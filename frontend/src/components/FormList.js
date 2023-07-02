import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FormList = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/form');
      setFormData(response.data);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className="form-list">
      <h1>Form Submissions</h1>
      {formData.length === 0 ? (
        <p>No form submissions yet.</p>
      ) : (
        <ul>
          {formData.map((form, index) => (
            <li key={index}>
              <strong>Name:</strong> {form.name}<br />
              <strong>Date of Birth:</strong> {new Date(form.dob).toLocaleDateString()}<br />
              <strong>Email:</strong> {form.email}<br />
              <strong>Phone:</strong> {form.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormList;
