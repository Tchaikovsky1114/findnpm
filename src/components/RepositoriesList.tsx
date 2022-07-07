import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks/useActions' 
import {searchRepositories} from '../store/slices/RepositorySlice'

import {RepositoriesState} from '../store/slices/RepositorySlice'
interface childProps {
  children: React.ReactNode
}

const RepositoriesList = () => {
  const dispatch = useAppDispatch();
  const [inputVal, setInputVal] = useState('');
  const {data,error,loading} = useAppSelector((state) => state.repositories);

  
  const onSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(searchRepositories(inputVal))
  }

  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value)
  }
  return (
    <div>
      <form  onSubmit={onSubmit}>
        <input type="text" value={inputVal} onChange={onChange} />
        <button>Search</button>
      </form>
    </div>
  );
};

export default RepositoriesList;