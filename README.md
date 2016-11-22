# react-starter
starter project for react

#first follow these steps to import dependancies:
npm install babel webpack webpack-dev-server -g
npm install react react-dom --save
npm install babel-loader babel-core babel-preset-es2015 babel-preset-react
npm install react-redux


#follow these steps if you wish to create this from scratch

#setup github
https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/
https://help.github.com/articles/changing-a-remote-s-url/

#Redux

step 1 - define actions - see actions.js
step 2 - define reducers - see reducers.js
step 3 - the store - see main.js

Actions - 
    All Application state is stored as a single object - the 'store'
    -In this example we want to store two things
        1. the currently selected visibility filter
        2. the actual list of todos
            example state object - the 'store':
                {
                    visibilityFilter: 'SHOW_ALL',
                    todos: [
                                {
                                    text: 'Consider using Redux',
                                    completed: true,
                                },
                                {
                                    text: 'Keep all state in a single tree',
                                    completed: false
                                }
                            ]
                }
Reducers - 
    Actions describe the fact that something happened, but don't specify how the application's state changes in response. This is the job of a reducer.
    The reducer is a pure function that takes the previous state and an action, and returns the next state.
        (previousState, action) => newState
    It's very important that the reducer stays pure. Things you should never do inside a reducer:
        - Mutate its arguments;
        - Perform side effects like API calls and routing transitions;
        - Call non-pure functions, e.g. Date.now() or Math.random().

Store - 
    The Store is the object that brings them together. The store has the following responsibilities:

    - Holds application state;
    - Allows access to state via getState();
    - Allows state to be updated via dispatch(action);
    - Registers listeners via subscribe(listener);
    - Handles unregistering of listeners via the function returned by subscribe(listener).
        
    It's important to note that you'll only have a single store in a Redux application. 
    When you want to split your data handling logic, you'll use reducer composition instead of many stores.


Data Flow - 
    The data lifecycle in any Redux app follows these 4 steps:

    1. You call store.dispatch(action).

        An action is a plain object describing what happened. For example:

        { type: 'LIKE_ARTICLE', articleId: 42 }
        { type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary' } }
        { type: 'ADD_TODO', text: 'Read the Redux docs.' }
        Think of an action as a very brief snippet of news. “Mary liked article 42.” or “‘Read the Redux docs.' was added to the list of todos.”

        You can call store.dispatch(action) from anywhere in your app, including components and XHR callbacks, or even at scheduled intervals.

    2. The Redux store calls the reducer function you gave it.

        The store will pass two arguments to the reducer: the current state tree and the action. For example, in the todo app, the root reducer might receive something like this:

        // The current application state (list of todos and chosen filter)
        let previousState = {
        visibleTodoFilter: 'SHOW_ALL',
        todos: [ 
            {
            text: 'Read the docs.',
            complete: false
            }
        ]
        }

        // The action being performed (adding a todo)
        let action = {
        type: 'ADD_TODO',
        text: 'Understand the flow.'
        }

        // Your reducer returns the next application state
        let nextState = todoApp(previousState, action)
        Note that a reducer is a pure function. It only computes the next state. It should be completely predictable: calling it with the same inputs many times should produce the same outputs. It shouldn't perform any side effects like API calls or router transitions. These should happen before an action is dispatched.

    3. The root reducer may combine the output of multiple reducers into a single state tree.

        How you structure the root reducer is completely up to you. Redux ships with a combineReducers() helper function, useful for “splitting” the root reducer into separate functions that each manage one branch of the state tree.

        Here's how combineReducers() works. Let's say you have two reducers, one for a list of todos, and another for the currently selected filter setting:

        function todos(state = [], action) {
        // Somehow calculate it...
        return nextState
        }

        function visibleTodoFilter(state = 'SHOW_ALL', action) {
        // Somehow calculate it...
        return nextState
        }

        let todoApp = combineReducers({
        todos,
        visibleTodoFilter
        })
        When you emit an action, todoApp returned by combineReducers will call both reducers:

        let nextTodos = todos(state.todos, action)
        let nextVisibleTodoFilter = visibleTodoFilter(state.visibleTodoFilter, action)
        It will then combine both sets of results into a single state tree:

        return {
        todos: nextTodos,
        visibleTodoFilter: nextVisibleTodoFilter
        }
        While combineReducers() is a handy helper utility, you don't have to use it; feel free to write your own root reducer!

    4. The Redux store saves the complete state tree returned by the root reducer.

        This new tree is now the next state of your app! 
        Every listener registered with store.subscribe(listener) will now be invoked; 
        listeners may call store.getState() to get the current state.

        Now, the UI can be updated to reflect the new state. 
        If you use bindings like React Redux, this is the point at which component.setState(newState) is called.



