import React from 'react';

import Header from './Header';
import './Layout.css';

function Layout({ children, title }) {
  return (
    <div className="layout">
      <Header className="layout-header bordered" />
      <main className="layout-main bordered">
        <div className="container-layout-title bordered">
        <h2 className="layout-title">{title}</h2>
        </div>
        <section className="layout-content">{children}</section>
      </main>
      <footer className="layout-footer bordered">©Nodepop React-Style</footer>
    </div>
  );
}

export default Layout;
