export default function OperationButton({ operation, dispatch }) {

    return (
        <button onClick={() => dispatch({ type: 'Add-operation', payload: { operation } })}>{operation}</button>
    )
};