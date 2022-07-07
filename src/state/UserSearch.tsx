import React, { ChangeEvent, FormEvent, useState } from 'react';

const users = [
  {
    name: 'Kim',
    age: 33
  },
  {
    name: 'Kim',
    age: 28
  },
  {
    name: 'Choi',
    age: 29
  },
  {
    name: 'Park',
    age: 31
  },
]


interface SearchUser {
  name: string;
  age: number;
}

const UserSearch = () => {

  const [name, setName] = useState('');
  const [searchedUser,setSearchedUser] = useState<SearchUser[]>([]);
  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const founduser = users.filter( user => user.name === name)
    setSearchedUser(founduser);
  }

  return (
    <div>
      <p>User Search</p> 
      <form onSubmit={onSubmit}>
      <input type="text" value={name} onChange={onChange} />
      <button>Find User</button>
      </form>
      <ul>
      {searchedUser?.map(user =>
      <div key={Math.random().toString()}>
      <li>{user.name}</li>
      <li>{user.age}</li>
      </div>
      )}
      </ul>

    </div>
  );
};

export default UserSearch;