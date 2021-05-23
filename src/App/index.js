import React from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import { MdHelp } from 'react-icons/md';

import Interpreter from '../components/Interpreter.js';
import Help from '../components/Help.js';

import "./styles.css";


export default function App() {
  return (
    <BrowserRouter>
      <header className="flex py-3 px-8 bg-gray-700 items-center justify-between">
        <h1 className="text-gray-100 text-xl font-bold">Markov Algorithm Simulator</h1>

        <nav>
          <ul className="flex gap-3">
            <li>
              <Link to="/" className="flex items-center text-white text-lg hover:text-gray-200 hover:bg-gray-600 rounded p-2">
                Algorithm Builder
              </Link>
            </li>
            <li>
              <Link to="/help" className="flex items-center text-white text-lg hover:text-gray-200 hover:bg-gray-600 rounded p-2">
                Help
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container m-auto">
        <Switch>
          <Route path="/help">
            <Help />
          </Route>
          <Route path="/">
            <Interpreter />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  )
}
