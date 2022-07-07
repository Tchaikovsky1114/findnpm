import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export interface RepositoriesState {
  loading: boolean;
  error: string | undefined;
  data: string[];
}




const initialState: RepositoriesState = {
  loading: false,
  error: undefined,
  data: [],
}



type NpmPackage = {package: {name: string}}
type NpmRepositoryResponse = {
  objects: NpmPackage[]
}


// createAsyncThunk와 createSlice를 사용하여 Toolkit만으로 비동기 처리를 쉽게 할 수 있으며
// saga의 어느정도 기능까지 구현이 가능하다.

// createAsyncThunk는 액션타입의 문자열, 프로미스를 반환하는 비동기 함수, 추가옵션을 받는다.
// 입력받은 액션 타입 문자열을 기반으로 프로미스 라이프사이클 액션 타입을 생성하고, thunk action creator를 반환한다.
// thunk action creator는 프로미스 콜백을 실행하고, 프로미스를 기반으로 라이프사이클액션을 디스패치한다.

export const searchRepositories = createAsyncThunk<string[],string,{rejectValue: Error}>(
  "repositories/search",
  async (term:string) => {
  const { data } = await axios.get<NpmRepositoryResponse>("https://registry.npmjs.org/-/v1/search",{
    params: {
      text: term
    }
  });

  return data.objects.map((result: NpmPackage) => result.package.name)
})

const repositoriesSlice = createSlice({
  name: "repositories",
  initialState,
  reducers: {},
  // slice.actions에서 생성되지 않은 action을 사용할 수 있게 해준다.
  extraReducers: (builder) => {
    builder.addCase(searchRepositories.fulfilled, (state, action) => {
      return { loading: false, error: undefined, data: action.payload };
    });


    builder.addCase(searchRepositories.rejected, (state, action) => {

      let error;
      if (action.payload) {
        error = action.payload.message;
      } else {
        error = action.error.message;
      }
      return { loading: false, error, data: [] };
    });
    builder.addCase(searchRepositories.pending, () => {
      return { loading: true, error: undefined, data: [] };
    });
  },
});

export const repositoriesReducer = repositoriesSlice.reducer;