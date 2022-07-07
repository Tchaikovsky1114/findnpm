import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import {AppDispatch, RootState} from '../store'


// documentation에 나와있다...
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// RootState = ReturnType<typeof store.getState>
//


export const useAppDispatch = () => useDispatch<AppDispatch>();
