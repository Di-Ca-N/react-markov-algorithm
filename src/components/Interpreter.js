import React, { useState, useEffect } from 'react';
import Instruction from './Instruction.js';
import InterpreterContext from '../contexts/InterpreterContext';
import { MdAdd } from 'react-icons/md';

export default function Interpreter() {
  const blankRule = {
    originString: "",
    targetString: "",
    successNext: 0,
    failNext: 0,
  };

  const [rules, setRules] = useState([{...blankRule}]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    function processInstruction(instructionId, currentString){
      if (instructionId === rules.length){
        return currentString;
      }
  
      if (instructionId > rules.length){
        throw new Error("Instruction does not exist");
      }
  
      const rule = rules[instructionId];
  
      if (currentString.indexOf(rule.originString) !== -1) {
        const processedString = currentString.replace(rule.originString, rule.targetString);
        return processInstruction(rule.successNext, processedString);
      } else {
        return processInstruction(rule.failNext, currentString);
      }
    }

    if (running) {
      try {
        const output = processInstruction(0, input);
        setOutput(output);
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setRunning(!running);
      }
    }
  }, [running, input, rules]);

  function addRule(){
    setRules(oldRules => [...oldRules, {...blankRule}]);
  }

  function updateRule(id, updatedRule) {
    const newRules = [...rules];
    newRules.splice(id, 1, updatedRule);
    setRules(newRules);
  }

  function deleteRule(id){
    const newRules = [...rules];
    newRules.splice(id, 1);
    setRules(newRules);
  }

  return (
    <div class="flex flex-col my-10 w-4/5 m-auto">
      <h2 class="font-bold text-lg">Algorithm Rules</h2>
      <InterpreterContext.Provider value={{updateRule, deleteRule}}>
          <table class="table-fixed">
            <thead>
                <tr>
                  <th class="text-left w-10">ID</th>
                  <th class="text-left w-32">String origin</th>
                  <th class="text-left w-32">String target</th>
                  <th class="text-left w-60">Next instruction (Success)</th>
                  <th class="text-left w-60">Next instruction (Fail)</th>
                  <th class="text-left w-10">Delete</th>
                </tr>
            </thead>
            <tbody>
                {rules.map((rule, index) => (
                  <Instruction rule={rule} id={index} disabled={running} key={index} />
                ))}
            </tbody>
          </table>
      </InterpreterContext.Provider>
      <button 
        onClick={addRule}
        class="flex items-center bg-green-400 px-2 py-1 rounded focus:outline-none hover:bg-green-500 w-40"
      >
        <MdAdd size={32} display="inline"/>Add Instruction
      </button>

      <div>
        <input 
            type="text" 
            value={input} 
            class="border-gray-100"
            onChange={event => setInput(event.target.value)} 
            placeholder="Type the algorithm input"
        />
        <button 
          onClick={() => setRunning(!running)}>
          {running ? "Stop" : "Run"}
        </button>
      </div>
      
      <span>Output: {output}</span>
      {errorMessage && <span>Error: {errorMessage}</span>}
    </div>
  );
}
