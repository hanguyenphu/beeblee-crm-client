import { createStore } from "redux";
import rootReducer from "../reducers/index";

//persists the user data into localStorage
//that prevent refreshing erase redux states
function saveToLocalStorage(user) {
    try {
        const serializedUser = JSON.stringify(user);
        localStorage.setItem("user", serializedUser);
    } catch (e) {
        console.log(e);
    }
}

//load the saved user data from localstorage for Redux state
function loadFromLocalStorage() {
    try {
        const serializedUser = localStorage.getItem("user");
        if (serializedUser === null) {
            const user = new Object({
                authenticated: false
            });
            return Object.assign({}, { user });
        }
        const user = JSON.parse(serializedUser);
        return Object.assign({}, { user });

    } catch (e) {
        const user = new Object({
            authenticated: false
        });

        return Object.assign({}, { user });
    }
}

//User Data load from localStorage
const persistedState = loadFromLocalStorage();



// export const configureStore = () => {
//     const store = createStore(rootReducer,  persistedState,
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//     return store;
// }

const store = createStore(
    rootReducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => saveToLocalStorage(store.getState().user));

export default store