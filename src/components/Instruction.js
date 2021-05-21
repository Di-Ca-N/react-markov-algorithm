import React, { useContext } from 'react';
import { MdClose } from 'react-icons/md'

import InterpreterContext from '../contexts/InterpreterContext';


export default function Instruction({ rule, id, disabled }) {
  const context = useContext(InterpreterContext);

  function getChangeHandler(parser){
    return (event) => {
      const fieldName = event.target.name;
      const value = parser(event.target.value);
      const newRule = rule;
      newRule[fieldName] = value;
      context.updateRule(id, newRule);
    }
  }

  function deleteSelf(){
    context.deleteRule(id);
  }

  function parseString(value){
    return value.toString();
  }

  function parseInteger(value) {
    if (value) {
      return parseInt(value);
    }
    return 0;
  }

  return (
    <tr>
        <td className="w-10">{id}</td>
        <td className="w-32 pr-2">
          <input 
            name="originString" 
            value={rule.originString} 
            className="input w-full"
            onChange={getChangeHandler(parseString)}
            disabled={disabled}
          />
        </td>
        <td className="w-32 pr-2">
          <input 
            name="targetString" 
            value={rule.targetString}
            className="input w-full"
            onChange={getChangeHandler(parseString)} 
            disabled={disabled}
          />
        </td>
        <td className="w-60 pr-2">
          <input 
            name="successNext" 
            type="number" 
            value={rule.successNext}
            className="input w-full"
            onChange={getChangeHandler(parseInteger)} 
            disabled={disabled}
            min={0}
          />
        </td>
        <td className="w-60 pr-2">
          <input 
            name="failNext" 
            type="number" 
            value={rule.failNext}
            className="input w-full"
            onChange={getChangeHandler(parseInteger)} 
            disabled={disabled}
            min={0}
          />
        </td>
        <td className="w-10">
          <button 
            onClick={deleteSelf} 
            disabled={disabled}
            className="bg-red-500 rounded mt-1"
          >
            <MdClose size={26} color='white'/>
          </button>
        </td>
    </tr>
  );
}
