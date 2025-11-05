export default function tasksReducer(state, action) {
    switch (action.type) {
        case "LOAD_TASKS":
            return action.payload;

        case "ADD_TASK":
            return [...state, action.payload];

        case "REMOVE_TASK":
            return state.filter(task => task.id !== Number(action.payload));

        case "UPDATE_TASK":
            return state.map(task =>
                task.id === action.payload.id ? action.payload : task
            );

        case "REMOVE_MULTIPLE_TASKS":
            return state.filter(task => !action.payload.includes(task.id));

        default:
            return state;
    }
}
