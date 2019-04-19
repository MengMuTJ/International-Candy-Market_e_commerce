import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
const ADD_CATEGORY = 'ADD_CATEGORY'

/**
 * INITIAL STATE
 */

 const initialState = []

 /**
 * ACTION CREATORS
 */

const getCategories = (categories) => {

    return{
     type: ADD_CATEGORY,
     categories
    }
  }

 const addCategory = (category) => {

   return{
    type: ADD_CATEGORY,
    category
   }
 }

  /**
 * THUNK CREATORS
 */

export const fetchCategories = () => {

    return async (dispatch) => {
        const {data} = await axios.get('/api/categories')
        dispatch(getCategories(data))
    }
}

export const postCategory = (category) => {

    return async (dispatch) => {
        try{
        const {data} = await axios.post('/api/categories/add-category', category)
        dispatch(addCategory(data))
        } catch (error){
            console.log(error)
        }
    }
}

  /**
 * REDUCER
 */

export default function(state = initialState, action) {
    switch(action.type){
        case GET_CATEGORIES:
           return action.categories
       case ADD_CATEGORY:
           return [...state, action.category]
       default:
           return state
    }
}

