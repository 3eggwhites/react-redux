{
  type: 'ADD_TODO';
  todo: {
    id: 0;
    label: 'Learn Redux';
    complete: false;
  };
}

{
  type: 'REMOVE_TODO';
  id: 0;
}

{
  type: 'TOGGLE_TODO';
  id: 0;
}

{
  type: 'ADD_GOAL';
  goal: {
    id: 0;
    label: 'RUN A MARATHON';
  };
}

{
  type: 'REMOVE_GOAL';
  id: 0;
}

// a reducer function
const todos = (state = [], action) => {
  if (action.type === 'ADD_TODO') {
    return state.concat(action.todo);
  }
  return state;
};

function createStore(reducer) {
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