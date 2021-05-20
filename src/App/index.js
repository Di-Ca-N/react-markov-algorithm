import React from 'react'

import Interpreter from '../components/Interpreter.js';

export default function App() {
  return (
    <>
      <header class="flex py-8 px-8 bg-gray-700">
        <h1 class="text-gray-100 text-xl">Markov Algorithm Simulator</h1>
      </header>
      <main>
        <Interpreter />
      </main>
    </>
  )
}
