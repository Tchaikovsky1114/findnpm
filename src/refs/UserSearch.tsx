import React, { ChangeEvent, FormEvent, useState,useRef, useEffect } from 'react';

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
  // ts는 해당 ref가 어떤 element에 할당된다는 사실을 알지 못한다.
  // ref의 current값을 null로 지정하여 첫 값은 개발자가 아직 할당하지 않았음을 알리고
  // 할당된다면 HTMLInputElement라는 사실을 ts에게 알려준다.
  const inputRef = useRef<HTMLInputElement>(null);
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

  useEffect(()=>{
    if(!inputRef.current){
      return
    }
    inputRef.current.focus()
  },[])

  return (
    <div>
      <p>User Search</p> 
      <form onSubmit={onSubmit}>
      <input ref={inputRef} type="text" value={name} onChange={onChange} />
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