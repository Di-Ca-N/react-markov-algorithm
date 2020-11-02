import React, { useContext } from 'react';
import { MdClose } from 'react-icons/md'

import InterpreterContext from '../../contexts/InterpreterContext';

import { Tr } from './styles';

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
    <Tr>
        <td>{id}</td>
        <td>
          <input 
            name="originString" 
            value={rule.originString} 
            onChange={getChangeHandler(parseString)}
            disabled={disabled}
          />
        </td>
        <td>
          <input 
            name="targetString" 
            value={rule.targetString} 
            onChange={getChangeHandler(parseString)} 
            disabled={disabled}
          />
        </td>
        <td>
          <input 
            name="successNext" 
            type="number" 
            value={rule.successNext} 
            onChange={getChangeHandler(parseInt)} 
            disabled={disabled}
          />
        </td>
        <td>
          <input 
            name="failNext" 
            type="number" 
            value={rule.failNext} 
            onChange={getChangeHandler(parseInt)} 
            disabled={disabled}
          />
        </td>
        <td>
          <button onClick={deleteSelf} disabled={disabled}><MdClose size={20}/></button>
        </td>
    </Tr>
  );
}
