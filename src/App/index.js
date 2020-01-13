import React, { useState, useEffect } from 'react'
import Rule from '../components/Rule'
import AppContext from '../contexts/AppContext';


export default function App() {
  const blankRule = {
    originString: "",
    targetString: "",
    successNext: 0,
    failNext: 0,
  };

  const [rules, setRules] = useState([blankRule]);
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
    setRules(oldRules => [...oldRules, blankRule]);
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
    <div>
      <AppContext.Provider value={{updateRule, deleteRule}}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>String origin</th>
              <th>String target</th>
              <th>Next instruction (Success)</th>
              <th>Next instruction (Fail)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule, index) => (
              <Rule rule={rule} id={index} disabled={running} key={index} />
            ))}
          </tbody>
        </table>
      </AppContext.Provider>
      <button onClick={addRule}>Add rule</button>
      <br/>
      <input 
        type="text" 
        value={input} 
        onChange={event => setInput(event.target.value)} 
        placeholder="Type the algorithm input"
      />
      <button onClick={() => setRunning(!running)}>{running ? "Stop" : "Run"}</button>
      <br/>
      <span>Output: {output}</span>
      <br/>
      {errorMessage && <span>Error: {errorMessage}</span>}
    </div>
  );
}
