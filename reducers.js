//import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'
//const { SHOW_ALL } = VisibilityFilters

/*
**  First go at it
**

const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
}

function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: state.todos.map((todo, index) => {
          if(index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          }
          return todo
        })
      })
    default:
      return state
  }
}
Is there a way to make it easier to comprehend? 
It seems like todos and visibilityFilter are updated completely independently. 
Sometimes state fields depend on one another and more consideration is required, 
but in our case we can easily split updating todos into a separate function:

below we now have what is called reducer composition, and it's the fundamental pattern of building Redux apps.

//Second go

function toDoApp( state  = initialState, action) {
    switch( action.type ){
        case SET_VISIBILITY_FILTER:
            return Object.assign({}, state, {
                visibilityFilter: action.filter
            })
        case ADD_TODO:
        case TOGGLE_TODO:
            return Object.assign({}, state, {
                todos: todos( state.todo, action)
            })
        default:
            return state
    }
}

function todos( state = [], action) {
    switch( action.type ){
         case ADD_TODO:
            return Object.assign({}, state, {
                todos: [
                    ...state.todos,
                    {
                        text: action.text,
                        completed: false
                    }
                ]
            })
        case TOGGLE_TODO:
            return Object.assign({}, state, {
                todos: state.todos.map((todo, index) => {
                    if(index ===action.index) {
                        return Object.assign({}, todo, {
                            completed: !todo.completed
                        })
                    }
                    return todo
                })
            })
        default:
            return state
    }
}
*/

/*
third go - reduce composition more with visibility filter and
Now we can rewrite the main reducer as a function that calls the reducers managing parts of the state, 
and combines them into a single object. It also doesn't need to know the complete initial state anymore. 
It's enough that the child reducers return their initial state when given undefined at first.


function visibilityFilter( state = SHOW_ALL, action ){
    switch( action.type ){
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

function todos( state = [], action) {
    switch( action.type ){
         case ADD_TODO:
            return Object.assign({}, state, {
                todos: [
                    ...state.todos,
                    {
                        text: action.text,
                        completed: false
                    }
                ]
            })
        case TOGGLE_TODO:
            return Object.assign({}, state, {
                todos: state.todos.map((todo, index) => {
                    if(index ===action.index) {
                        return Object.assign({}, todo, {
                            completed: !todo.completed
                        })
                    }
                    return todo
                })
            })
        default:
            return state
    }
}

/*
export default function toDoApp( state = {}, action ){
    return {
        visibiltyFilter: visiblityFilter( state.visibilityFilter, action ),
        todos: todos( state.todos, action )
    }
}

Note that each of these reducers is managing its own part of the global state. 
The state parameter is different for every reducer, and corresponds to the part of the state it manages.

This is already looking good! 
When the app is larger, we can split the reducers into separate files 
and keep them completely independent and managing different data domains.

Finally, Redux provides a utility called combineReducers() 
that does the same boilerplate logic that the todoApp above currently does. 
With its help, we can rewrite todoApp like this:

import { combineReducers } from 'redux'

const todoApp = combineReducers({
    visibilityFilter,
    todos
})

export default todoApp

/*
Note for ES6 Savvy Users

Because combineReducers expects an object, we can put all top-level reducers into a separate file, 
export each reducer function, and use import * as reducers to get them as an object with their names as the keys:

    import { combineReducers } from 'redux'
    import * as reducers from './reducers'

    const todoApp = combineReducers(reducers)

Because import * is still new syntax, we don't use it anymore in the documentation to avoid confusion, 
but you may encounter it in some community examples.
*/


import { combineReducers } from 'redux'
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp