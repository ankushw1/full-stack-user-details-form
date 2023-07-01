import React, { useState } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !dob || !email || !phone) {
      setError('Please fill in all required fields.');
      return;
    }

    const age = calculateAge(dob);
    if (age < 18) {
      setError('You must be at least 18 years old.');
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phone.match(phoneRegex)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      const apiUrl = process.env.NODE_ENV === 'production' ? '/form' : 'http://localhost:8081/form';
      await axios.post(apiUrl, {
        name,
        dob,
        email,
        phone,
      });

     
      const templateParams = {
        to_email: email,
        to_name:name,
        from_name: 'Max Techies',
        from_email: 'info@maxtechies.com',
      };


      emailjs
        .send('service_q52zpkb', 'template_6gb8bek', templateParams, 'Tmj4Q_O-3hyHdBJz6')
        .then((response) => {
          console.log('Email sent successfully!', response.text);
          setName('');
          setDob('');
          setEmail('');
          setPhone('');
          setError('');
          console.log('Form submitted successfully');
          alert('Form submitted successfully !!!')
          navigate('/form-list')
        })
        .catch((error) => {
          console.error('Error sending email:', error);
          alert('Error sending in email');
        });
    } catch (error) {
      console.error('Error occured form:', error);
      setError('error occurred');
    }
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div className="user-form">
      <h1>User Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          id="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          required
          onChange={(e) => setPhone(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
