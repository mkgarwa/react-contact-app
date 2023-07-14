import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import uuid from 'react-uuid';

const AddContact = (props) => {
    const data = useLocation().state ?? "";
    const editId = data.contact ? data.contact.id :  "";

    const [input , setInput] = useState({
        name: editId ? data.contact.name : "",
        email: editId ? data.contact.email :  "",
    });

    const inputsHandler = (e) =>{
        const {name, value} = e.target;
        setInput( prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const add = (e) => {
        e.preventDefault();
        if(input.name === '' || input.email === '') {
            alert('all fields are mendatory');
            return;
        }
        const entryData = {
            id: editId !== "" ? editId : uuid(),
            name: input.name,
            email: input.email,
        };
        props.addContactHandler(entryData, editId?true:false);
        setInput(prevState => ({...prevState, name: '', email: ''}));
    };

    return (
        <div className="ui main">
            <h2>
            {editId ? "Edit" : "Add Contact"}</h2>
            <form className="ui form" onSubmit={add}>
                <div className="field">
                    <label>Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        onChange={inputsHandler} 
                        placeholder="Name" 
                        value={input.name} />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="email"
                        name="email"
                        placeholder="email"
                        value={input.email}
                        onChange={inputsHandler}  />
                </div>
                <button className="ui button blue">{editId ? "Edit" : "Add"}</button>
            </form>
        </div>
    );
}

export default AddContact;