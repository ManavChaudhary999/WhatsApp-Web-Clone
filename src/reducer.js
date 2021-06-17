export const actionTypes = {
    SET_USER: "SET_USER"
};

export const initialState = {
    user: null
};

const reducer = (state, action) => {
    switch(action.type){
        case actionTypes.SET_USER:
            return{
                ...state,
                user: action.user
            };
        default:
            return state;
    }
}

export default reducer;