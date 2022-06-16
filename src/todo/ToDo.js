import './ToDo.css'
import React, {useState, useEffect} from 'react'

const getLocalItmes = () => {
    let list = localStorage.getItem('lists');
    console.log(list);
    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}

export default function ToDo(){
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItmes());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    const AddItem=()=>{
        if (!inputData) {
            alert('plzz fill data');
        } else if(inputData && !toggleSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputData }
                    }
                    return elem;
                })
            )
                 setToggleSubmit(true);
                 setInputData('');
                 setIsEditItem(null);
        } else {
            const allInputData = { id: new Date().getTime().toString(), name:inputData }
            const reverse=new Date(allInputData.id-1).toString()
            console.log(reverse)
            setItems([...items, allInputData]);
            setInputData('')
        }
    }

    const DeleteItem=(index)=>{
        const updateditems = items.filter((elem) => {
            return index !== elem.id;
        });
        setItems(updateditems);
    }

    const EditItem=(id)=>{
        let newEditItem = items.find((elem) => {
            return elem.id === id
        });
        console.log(newEditItem);
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setIsEditItem(id);
    }

    const DeleteAllItem=()=>{
        setItems([]);
    }

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
     }, [items]);

    return(<div className="todo-page">
        <h2 className="todo-head">ToDo App</h2>
        <input type="text" 
                placeholder="Add Items..."
                value={inputData} 
                onChange={(e) => setInputData(e.target.value) }/> 
                {toggleSubmit ? <button className="" title="Add" onClick={AddItem}>
                                    Add</button> :
                                <button className="" title="Update" onClick={AddItem}>
                                    Update</button>}
        <div className="">
            {items.map((elem) => {
                    return (<div className="eachItem" key={elem.id}>
                            <h4>{elem.name}
                                <button className="" title="Edit" onClick={() => EditItem(elem.id)}>
                                    Edit</button>
                                <button className="" title="Delete" onClick={() => DeleteItem(elem.id)}>
                                    Delete</button>
                            </h4>
                        </div>)
                })
            }
        </div>
        <div className="">
            <button className="" data-sm-link-text="Remove All" onClick={DeleteAllItem}>
                Clear All
            </button>
        </div>

    </div>)
}