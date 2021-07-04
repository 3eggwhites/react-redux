// State management library code
const createStore = (reducer) => {
  // The store should have 4 parts
  
  // 1. The state  
  let state;
  let listners = [];
  
  // 2. Get the state
  const getState = () => state;

  // 3. Listen to change in state
  const subscribe = (listner) => {
    listners.push(listner);
    // returning an unsubscribe method which will remove the callback function from the listners array
    return () => {
      listners = listners.filter((l) => l !== listner );
    };
  };

  // 4. Update the state
  const dispatch = (action) => {
    // updating the state
    state = reducer(state, action);

    // invoking all listners function
    listners.forEach((listner) => listner());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
};

// App code
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

// action creators
const addTodoAction = (todo) => {
  return {
    type: ADD_TODO,
    todo,
  }
};

const removeTodoAction = (id) => {
  return {
    type: REMOVE_TODO,
    id,
  }
};

const toggleTodoAction = (id) => {
  return {
    type: TOGGLE_TODO,
    id,
  }
};

const addGoalAction = (goal) => {
  return {
    type: ADD_GOAL,
    goal,
  }
};

const removeGoalAction = (id) => {
  return {
    type: REMOVE_GOAL,
    id,
  }
};

// todos reducer function
const todos = (state = [], action) => {

  switch(action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) => todo.id !== action.id ? todo : {
        ...todo,
        complete: !todo.complete
      });
    default:
      return state;  
  }
};

// goals reducer function
const goals = (state = [], action) => {
  switch(action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
};

// root reducer
const app = (state = {}, action) => {
  return {
    todo: todos(state.todo, action),
    goal: goals(state.goal, action),
  }
};


const store = createStore(app)

store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})

store.dispatch(addTodoAction({
  id: 0,
  name: 'Walk the dog',
  complete: false,
}))

store.dispatch(addTodoAction({
  id: 1,
  name: 'Wash the car',
  complete: false,
}))

store.dispatch(addTodoAction({
  id: 2,
  name: 'Go to the gym',
  complete: true,
}))

store.dispatch(removeTodoAction(1))

store.dispatch(toggleTodoAction(0))

store.dispatch(addGoalAction({
  id: 0,
  name: 'Learn Redux'
}))

store.dispatch(addGoalAction({
  id: 1,
  name: 'Lose 20 pounds'
}))

store.dispatch(removeGoalAction(0))