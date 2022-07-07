import React, { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react';

interface ChildProps {

}


type Name = string;

const GuestList = () => {
  const [name, setName] = useState<Name>('')
  const [guests,setGuests] = useState<Name[]>([]);
  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onSubmit = (e:FormEvent<HTMLFormElement>) =>{ 
    e.preventDefault()
    setGuests(prev => [...prev,name])
    setName('')
  }
  return (
    <div>
      <h3>Guest list</h3>
      <form onSubmit={onSubmit}>
    <input value={name} onChange={onChange} />
    <button>Add Guest</button>
    </form>
    <ul>
    {guests.map(guest => <li key={Math.random().toString()}>{guest}</li>)}
    </ul>
    </div>
  );
};

export default GuestList;