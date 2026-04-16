function MyButton(props){
    return (
        <button onClick={props.onClick} 
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
        {props.children}
        </button>
    );
}

export default MyButton