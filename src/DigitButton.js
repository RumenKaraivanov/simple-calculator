export default function DigitButton({ digit, dispatch }) {

    return (
        <button onClick={() => dispatch({ type: 'Add-digit', payload: digit })}>{digit}</button>
    )
};