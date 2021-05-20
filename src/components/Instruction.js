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

  return (
    <tr>
        <td class="w-10">{id}</td>
        <td class="w-32 pr-2">
          <input 
            name="originString" 
            value={rule.originString} 
            class="border border-gray-500 rounded w-full p-0.5 focus:outline-none focus:ring-2"
            onChange={getChangeHandler(parseString)}
            disabled={disabled}
          />
        </td>
        <td class="w-32 pr-2">
          <input 
            name="targetString" 
            value={rule.targetString}
            class="border border-gray-500 rounded w-full p-0.5 focus:outline-none focus:ring-2"
            onChange={getChangeHandler(parseString)} 
            disabled={disabled}
          />
        </td>
        <td class="w-60 pr-2">
          <input 
            name="successNext" 
            type="number" 
            value={rule.successNext}
            class="border border-gray-500 rounded w-full p-0.5 focus:outline-none focus:ring-2"
            onChange={getChangeHandler(parseInt)} 
            disabled={disabled}
            min={0}
          />
        </td>
        <td class="w-60 pr-2">
          <input 
            name="failNext" 
            type="number" 
            value={rule.failNext}
            class="border border-gray-500 rounded w-full p-0.5 focus:outline-none focus:ring-2"
            onChange={getChangeHandler(parseInt)} 
            disabled={disabled}
            min={0}
          />
        </td>
        <td class="w-10">
          <button 
            onClick={deleteSelf} 
            disabled={disabled}
            class="bg-red-500 rounded mt-1"
          >
            <MdClose size={26} color='white'/>
          </button>
        </td>
    </tr>
  );
}
