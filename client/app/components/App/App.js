import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';


const App = ({ children }) => (

  <>
    <Header />

    <div align="center">
    <main>
      {children}
    </main>
  </div>

    <Footer />
  </>
);

export default App;
