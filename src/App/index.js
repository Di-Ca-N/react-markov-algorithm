import React from 'react'

import Interpreter from '../components/Interpreter.js';
import "./styles.css";

window.existingIntervals = new Set();

export default function App() {
  let oldInterval = setInterval;
  let oldClearInterval = clearInterval;

  window.setInterval = (callback, Interval) => {
    let createdInterval = oldInterval(callback, Interval);
    window.existingIntervals.add(createdInterval);
    return createdInterval;
  }

  window.clearInterval = (number) => {
    window.existingIntervals.delete(number);
    return oldClearInterval(number);
  }

  return (
    <>
      <header className="flex py-8 px-8 bg-gray-700">
        <h1 className="text-gray-100 text-xl">Markov Algorithm Simulator</h1>
      </header>
      <main>
        <Interpreter />
      </main>
    </>
  )
}
