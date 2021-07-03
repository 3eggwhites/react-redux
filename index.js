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

function createStore() {
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

  return {
    getState,
    subscribe,
  };
};