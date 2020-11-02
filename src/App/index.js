import React from 'react'

import Header from '../components/Header';
import Interpreter from '../components/Interpreter';
import Footer from '../components/Footer';

import './styles.css';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Interpreter />
      </main>
      <Footer />
    </>
  )
}
