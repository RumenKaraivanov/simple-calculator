import './App.css';
import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';


function reducer(state, { type, payload }) {

  switch (type) {
    case 'Add-digit':
      if (payload === '.' && state.currentValue?.includes('.')) {
        return state;
      };
      if (state.currentValue === '0' && payload === '0') {
        return state;
      }
      if ((payload === '.' && state.currentValue === undefined) || (payload === '.' && state.currentValue === '')) {
        return state;
      };
      if (!state.operation && state.previousValue !== '' && state.previousValue !== undefined) {
        return state;
      }
      return { ...state, currentValue: `${state.currentValue || ''}${payload}` };
    case 'Add-operation':
      if (state.currentValue === undefined) {
        return state;
      }
      if (state.previousValue !== undefined && state.currentValue === '') {
        return { ...state, operation: payload.operation };
      }
      if (state.previousValue !== undefined && state.currentValue !== undefined) {
        if (state.operation === '÷') {
          state.operation = '/';
        };
        const result = eval(`${state.previousValue}${state.operation}${state.currentValue}`);
        return { operation: payload.operation, previousValue: result.toString(), currentValue: '' };
      }
      return { operation: state.currentValue ? payload.operation : '', currentValue: '', previousValue: state.currentValue };
    case 'Clear': return {};
    case 'Delete':
      if (state.currentValue === undefined) {
        return state;
      }
      return { ...state, currentValue: state.currentValue.slice(0, state.currentValue.length - 1) };
    case 'Evaluate':
      if (state.operation === '÷') {
        state.operation = '/';
      };
      if (state.currentValue === undefined || state.currentValue === '') {
        return state;
      }
      const result = eval(`${state.previousValue}${state.operation}${state.currentValue}`);
      return { operation: '', previousValue: result.toString(), currentValue: '' };
    default: return state;
  };
};

function App() {

  const [{ currentValue, previousValue, operation }, dispatch] = useReducer(reducer, {});

  return (
    <div className="calculator-container">
      <div className='output'>
        <div className='previous-value'>{previousValue} {operation}</div>
        <div className='current-value'>{currentValue}</div>
      </div>
      <button className='span-two' onClick={() => dispatch({ type: 'Clear' })}>AC</button>
      <button onClick={() => dispatch({ type: 'Delete' })}>DEL</button>
      <OperationButton operation={"÷"} dispatch={dispatch} />
      <DigitButton digit={"1"} dispatch={dispatch} />
      <DigitButton digit={"2"} dispatch={dispatch} />
      <DigitButton digit={"3"} dispatch={dispatch} />
      <OperationButton operation={"*"} dispatch={dispatch} />
      <DigitButton digit={"4"} dispatch={dispatch} />
      <DigitButton digit={"5"} dispatch={dispatch} />
      <DigitButton digit={"6"} dispatch={dispatch} />
      <OperationButton operation={"+"} dispatch={dispatch} />
      <DigitButton digit={"7"} dispatch={dispatch} />
      <DigitButton digit={"8"} dispatch={dispatch} />
      <DigitButton digit={"9"} dispatch={dispatch} />
      <OperationButton operation={"-"} dispatch={dispatch} />
      <DigitButton digit={"."} dispatch={dispatch} />
      <DigitButton digit={"0"} dispatch={dispatch} />
      <button className='span-two' onClick={() => dispatch({ type: 'Evaluate' })}>=</button>
    </div>
  );
}

export default App;
