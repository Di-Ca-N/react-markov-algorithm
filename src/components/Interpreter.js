import React, { useState, useEffect } from 'react';
import Instruction from './Instruction.js';
import InterpreterContext from '../contexts/InterpreterContext';
import { MdAdd, MdChevronRight, MdPlayArrow, MdStop } from 'react-icons/md';


export default function Interpreter() {
  const blankRule = {
    originString: "",
    targetString: "",
    successNext: 0,
    failNext: 0,
  };

  const maxStep = 10000;

  const [rules, setRules] = useState([{...blankRule}]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [runner, setRunner] = useState(null);
  const [stepCounter, setStepCounter] = useState(0);
  const [currentRuleId, setCurrentRuleId] = useState(null);
  const [currentRuleSuccess, setCurrentRuleSuccess] = useState(null);

  useEffect(() => {
    if (running && autoAdvance) {
      let done = false;
      let outputValue;

      try {
        while (!done) {
          const output = runner.next();
  
          done = output.done;
  
          if (!done) {
            outputValue = output.value.string;
          }
        }
        setOutput(outputValue);
      } catch (e) {
        setErrorMessage(e.message);
      } finally {
        setRunning(false);
        setRunner(null);
      }
    }
  }, [runner, autoAdvance, running]);

  function setUpRun() {
    setOutput(input);
    setErrorMessage("");
    
    function* processAlgorithm(inputString){
      let currentString = inputString;
      let ruleId = 0;
      let currentStep = 1;

      while (ruleId < rules.length) {
        if (currentStep > maxStep) {
          throw Error("Max steps reached");
        }

        let rule = rules[ruleId];

        if (currentString.indexOf(rule.originString) !== -1) {
          const processedString = currentString.replace(rule.originString, rule.targetString);
          yield {string: processedString, step: currentStep, currentRule: ruleId, success: true};
          currentString = processedString;
          ruleId = rule.successNext;
        } else {
          yield {string: currentString, step: currentStep, currentRule: ruleId, success: false};
          ruleId = rule.failNext;
        }

        currentStep += 1;
      }

      if (ruleId > rules.length) {
        throw Error(`Instruction ${ruleId} does no exist`);
      }

      if (ruleId === rules.length) {
        yield {string: currentString, step: currentStep, currentRule: ruleId}
      }
    }

    setRunner(processAlgorithm(input));
  }

  function handleStart() {
    setUpRun();
    setRunning(true);
    setCurrentRuleId(0);
  }

  function handleStop() {
    setRunning(false);
    setStepCounter(0);
    setCurrentRuleId(null);
    setCurrentRuleSuccess(null);
  }

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

  function printNextStep() {
    const output = runner.next();

    if (output.done) {
      handleStop();
    } else {
      const value = output.value;
      
      setCurrentRuleId(value.currentRule);
      setOutput(value.string);
      setStepCounter(value.step);
      setCurrentRuleSuccess(value.success);
    }
  }

  return (
    <div className="flex flex-col my-10 w-4/5 m-auto">
      <h2 className="font-bold text-lg">Algorithm Rules</h2>
      <InterpreterContext.Provider value={{updateRule, deleteRule}}>
          <table className="table-fixed mb-2">
            <thead>
                <tr>
                  <th className="text-center w-10">ID</th>
                  <th className="text-left w-32">String origin</th>
                  <th className="text-left w-32">String target</th>
                  <th className="text-left w-60">Next instruction (Success)</th>
                  <th className="text-left w-60">Next instruction (Fail)</th>
                  <th className="text-center w-10">Delete</th>
                </tr>
            </thead>
            <tbody>
                {rules.map((rule, index) => (
                  <Instruction 
                    rule={rule} 
                    id={index} 
                    disabled={running} 
                    highlight={index === currentRuleId} 
                    success={currentRuleSuccess}
                    key={index}
                  />
                ))}
                <tr>
                  <td className={"text-center rounded" + (currentRuleId === rules.length ? " bg-blue-300" : "")}>{rules.length}</td>
                  <td colSpan="5">Done!</td>
                </tr>
            </tbody>
          </table>
      </InterpreterContext.Provider>
      <button 
        onClick={addRule}
        className="flex items-center bg-green-400 px-2 py-1 rounded focus:outline-none hover:bg-green-500 w-40"
      >
        <MdAdd size={32} display="inline"/>Add Instruction
      </button>

      <div className="flex items-center my-5 w-4/5">
        <input 
            type="text" 
            value={input} 
            className="input"
            onChange={event => setInput(event.target.value)} 
            placeholder="Type the algorithm input"
            disabled={running}
        />
        {running && !autoAdvance && 
          <button
            className="shadow rounded border border-gray-200 focus:outline-none flex items-center px-2 ml-2 bg-gray-400 active:bg-gray-600 hover:bg-gray-500 text-white h-8"
            onClick={printNextStep}
          >
            Step {stepCounter}
            <MdChevronRight size={30}/>
            Next
          </button>
        }
        
        <button 
          onClick={running ? handleStop : handleStart }
          className="shadow rounded border border-gray-200 focus:outline-none w-20 flex items-center px-2 ml-2 bg-gray-400 text-white active:bg-gray-600 hover:bg-gray-500"
        >
          {running ? 
            <>
              <MdStop size={30}/> Stop
            </> : 
            <>
              <MdPlayArrow size={30} /> Start
            </>
          }
        </button>

        {!running && 
          <label className="ml-2 shadow rounded border border-gray-200 focus:outline-none flex items-center px-2 ml-2 bg-gray-400 active:bg-gray-600 hover:bg-gray-500 text-white h-8">
            <input 
              type="checkbox" 
              className="mr-2"
              checked={!autoAdvance}
              onChange={() => setAutoAdvance(!autoAdvance)}/> 
              Step-by-step
          </label>
        }
        
        
      </div>
      <p>
        Output: {errorMessage ? <span className="text-red-500">Error - {errorMessage}</span> : <span>{output}</span>}
      </p>
    </div>
  );
}
