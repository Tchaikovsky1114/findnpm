import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export interface RepositoriesState {
  loading: boolean;
  error: string | undefined;
  data: NpmPackage[];
}




const initialState: RepositoriesState = {
  loading: false,
  error: undefined,
  data: [],
}



interface NpmPackage {  
  package:{
    name: string,
    version:string,
    description:string,
    links:{
      npm:string,
      homepage:string
    }
  }
}


// createAsyncThunk
// action type string을 받아 Callback 함수를 실행하고 그 결과를 Promise로 담아 Thunk action creator로 반환하는 콜백 함수이다.
// 어떤 데이터를 가져와서, 어떤 데이터를 반환해야 하는지 모르기 때문에 Reducer 함수를 내부에서 생성할 수 없다.
// 작성한 CreateAsyncThunk는 createSlice의 extraReducers로 등록하여 사용한다.

// createAsyncThunk와 createSlice를 사용하여 Toolkit만으로 비동기 처리를 쉽게 할 수 있으며
// saga의 어느정도 기능까지 구현이 가능하다.

// createAsyncThunk는 액션타입의 문자열, 프로미스를 반환하는 비동기 함수, 추가옵션을 받는다.
// 입력받은 액션 타입 문자열을 기반으로 프로미스 라이프사이클 액션 타입을 생성하고, thunk action creator를 반환한다.
// thunk action creator는 프로미스 콜백을 실행하고, 프로미스를 기반으로 라이프사이클액션을 디스패치한다.

export const searchRepositories = createAsyncThunk<NpmPackage[],string,{rejectValue: Error}>(
  "repositories/search",
  async (term:string) => {
  const { data } = await axios.get("https://registry.npmjs.org/-/v1/search",{
    params: {
      text: term
    }
  });

  return data.objects.map((result: NpmPackage) => result)
})

const repositoriesSlice = createSlice({
  name: "repositories",
  initialState,
  reducers: {},
  // slice.actions에서 생성되지 않은 action을 사용할 수 있게 해주는 extraReducers
  // builder의 addCase를 통해 작성한 CreateAsyncThunk를 등록한다.
  // 3가지 작업유형 fulfilled, rejected, pending을 생성한다.

  extraReducers: (builder) => {
 
    builder.addCase(searchRepositories.fulfilled, (state,action) => {
    
     state.loading = false;
     state.data = [...action.payload]
    })

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