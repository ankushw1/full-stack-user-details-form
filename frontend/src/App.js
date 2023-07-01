import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserForm from './components/UserForm'
import FormList from './components/FormList';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/form-list" element={<FormList />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App
