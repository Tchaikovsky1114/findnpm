import axios from 'axios'
import { ActionType } from '../action-types'
import { Actions } from '../actions'
//redux의 type definition
import { Dispatch } from 'redux'


//thunk
export const searchRepositories = (term: string) => {
  return async (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionType.SEARCH_REPOSITORIES,
    })

    try {
      const {data} = await axios.get('https://registry.npmjs.org/-/v1/search',{
        params: {
          text: term
        }
      })

      const packageData = data.objects.map((result: any) => {
          return result.package
      })
      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
        payload: packageData
      })
    }catch(err) {
      // error 객체가 any 타입에서 unknown으로 바뀌었기에, type narrowing.
      if(err instanceof Error){
        dispatch({
          type:ActionType.SEARCH_REPOSITORIES_ERROR,
          payload: err.message
        })
      }

    }
  }
}
















    // const packageData = {
    //   name: '',
    //   version: '',
    //   description:'',
    //   date:'',
    //   npm:'',
    //   homepage:'',
    //   publisher:'',
    // }
        // packageData.name = result.package.name
        // packageData.version = result.package.version
        // packageData.description = result.package.description
        // packageData.date = result.package.date
        // packageData.npm = result.package.links.npm
        // packageData.homepage = result.package.links.homepage
        // packageData.publisher = result.package.publisher
        // return packageData