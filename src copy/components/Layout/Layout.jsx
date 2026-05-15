import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

export default function Layout() {
  return (
    <>
      <NavBar />
      <div className="px-3 py-3 mb-4">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
