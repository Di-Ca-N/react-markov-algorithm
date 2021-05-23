import React, { useState, useRef, useEffect } from 'react';
import Instruction from './Instruction.js';
import InterpreterContext from '../contexts/InterpreterContext';
import { getMarkovAlgorithmProcessor } from '../markovAlgorithm';
import { MdAdd, MdChevronRight, MdPlayArrow, MdStop } from 'react-icons/md';


export default function Interpreter() {
  const blankRule = {
    originString: "",
    targetString: "",
    successNext: 0,
    failNext: 0,
  };

  const [rules, setRules] = useState([{ ...blankRule }]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [stepCounter, setStepCounter] = useState(0);
  const [currentRuleId, setCurrentRuleId] = useState(null);
  const [currentRuleSuccess, setCurrentRuleSuccess] = useState(null);

  const runnerRef = useRef();
  const advanceStepRef = useRef(false);

  const ruleManager = {
    addBlankRule() {
      setRules(oldRules => [...oldRules, { ...blankRule }]);
    },

    updateRule(id, updatedRule) {
      const newRules = [...rules];
      newRules.splice(id, 1, updatedRule);
      setRules(newRules);
    },

    deleteRule(id) {
      const newRules = [...rules];
      newRules.splice(id, 1);
      setRules(newRules);
    }
  }

  useEffect(runAlgorithm, [running, autoAdvance]);

  function runAlgorithm() {
    function doAutoAdvance() {
      return running ? 'next' : 'end';
    }

    function doStepAdvance() {
      if (running) {
        if (advanceStepRef.current) {
          advanceStepRef.current = false;
          return 'next';
        }
        return 'wait';
      }
      return 'end';
    }

    if (running) {
      const advanceMethod = autoAdvance ? doAutoAdvance : doStepAdvance;
      runnerRef.current.run(
        advanceMethod,
        displayOutput,
        displayError,
        handleStop,
      );
    }
  }

  function handleStart() {
    setOutput(input);
    setErrorMessage("");
    setCurrentRuleId(0);
    runnerRef.current = getMarkovAlgorithmProcessor(input, rules);

    setRunning(true);
  }

  function displayOutput(value) {
    setCurrentRuleId(value.currentRule);
    setOutput(value.string);
    setStepCounter(value.step);
    setCurrentRuleSuccess(value.success);
  }

  function displayError(error) {
    setErrorMessage(error.message);
  }

  function handleStop() {
    runnerRef.current.stop();
    runnerRef.current = null;
    setStepCounter(0);
    setCurrentRuleId(null);
    setCurrentRuleSuccess(null);
    setRunning(false);
  }

  function handleAutoAdvanceChange() {
    setAutoAdvance(!autoAdvance);
  }

  function handleNextStep() {
    advanceStepRef.current = true;
  }

  return (
    <div className="flex flex-col my-10 w-4/5 m-auto">
      <h2 className="font-bold text-lg">Algorithm Rules</h2>
      <InterpreterContext.Provider value={ruleManager}>
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
        onClick={ruleManager.addBlankRule}
        className="flex items-center bg-green-400 px-2 py-1 rounded focus:outline-none hover:bg-green-500 w-40"
      >
        <MdAdd size={32} display="inline" />Add Instruction
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
            onClick={handleNextStep}
          >
            Step {stepCounter}
            <MdChevronRight size={30} />
            Next
          </button>
        }

        <button
          onClick={running ? handleStop : handleStart}
          className="shadow rounded border border-gray-200 focus:outline-none w-20 flex items-center px-2 ml-2 bg-gray-400 text-white active:bg-gray-600 hover:bg-gray-500"
        >
          {running ?
            <>
              <MdStop size={30} /> Stop
            </> :
            <>
              <MdPlayArrow size={30} /> Start
            </>
          }
        </button>

        {!running &&
          <label className="ml-2 shadow rounded border border-gray-200 focus:outline-none flex items-center px-2 ml-2 bg-gray-400 active:bg-gray-600 hover:bg-gray-500 text-white h-8 cursor-pointer">
            <input
              type="checkbox"
              className="mr-2 cursor-pointer"
              checked={!autoAdvance}
              onChange={handleAutoAdvanceChange} />
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
