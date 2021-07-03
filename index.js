// todos reducer function
const todos = (state = [], action) => {

  switch(action.type) {
    case 'ADD_TODO':
      return state.concat([action.todo]);
    case 'REMOVE_TODO':
      return state.filter((todo) => todo.id !== action.id);
    case 'TOGGLE_TODO':
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
    case 'ADD_GOAL':
      return state.concat([action.goal]);
    case 'REMOVE_GOAL':
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

const createStore = (reducer) => {
// The store should have 4 parts
// 4. Update state

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

const store = createStore(app)