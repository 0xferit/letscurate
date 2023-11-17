import { Outlet } from 'react-router-dom';
import React from 'react';

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

const Header =()=>{
    return <div>Header</div>
}