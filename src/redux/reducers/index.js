import {
    AUTHENTICATE,
    LOGOUT,
    UPDATE_PROFILE,
    FETCH_PROVINCE, 
    PUSH_BUSINESS_TO_MODAL
} from "../constants/action-types";
import axios from "axios";
import API from "../../utils/API/API";


const initialState = {
    user: {
        authenticated: false
    },
    business: {}

};

function rootReducer(state = initialState, action) {
    if (action.type === AUTHENTICATE) {
        //this check the token in localStorage and set the default values for authenticated request from client
        if (localStorage.getItem("user") && localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            API.defaults.baseURL = 'http://localhost:3000/'
            API.defaults.headers.common= {'Authorization': `Bearer ${token}`}
            
            return Object.assign({}, state, {
                user: {
                    authenticated: action.payload.authenticated,
                    email: action.payload.user.email,
                    name: action.payload.user.name,
                    phone: action.payload.user.phone
                }
            });
        }
    }

    // Update profile in Profile Page
    if (action.type === UPDATE_PROFILE) {
        return Object.assign({}, state, {
            user: {
                ...state.user,
                email: action.payload.email,
                name: action.payload.name,
                phone: action.payload.phone
            }
        });
    }

    if(action.type === FETCH_PROVINCE) {
        return Object.assign({}, state, {
            provinces: action.payload
        })
    }

    if(action.type === PUSH_BUSINESS_TO_MODAL) {
        return Object.assign({}, state, {
            business: action.payload
        })
    }

    //logout the user and delete the token in localStorage and in the server as well
    if (action.type === LOGOUT) {
        API.post(`users/logout`)
            .then(response => {
                console.log(response.data)
                axios.defaults.baseURL = "";
                axios.defaults.headers.common = { Authorization: `` };
            })
            .catch(error => {});
            localStorage.clear();
        return Object.assign({}, state, {
            user: {
                authenticated: false
            }
        });
    }
    return state;
}

export default rootReducer;
