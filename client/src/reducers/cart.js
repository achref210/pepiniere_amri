import { ca } from "date-fns/locale";
import { useSelector } from "react-redux";
import * as api from "../api";
import * as actionTypes from "../constants/actionTypes.js";

let INITIAL_STATE = {
    products: [],
    cart: [],
    currentItem: null
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.INITIALIZE:
            return { ...state, products:action.payload}
        case actionTypes.ADD_TO_CART:
            const item = state.products.find(prod => prod._id === action.payload.id);
            console.log("i",action.payload.id)
            const inCart = state.cart.find(item => item._id === action.payload.id ? true : false);
            return { ...state, cart: inCart ? state.cart.map(cartItem => cartItem._id === action.payload.id && cartItem.age === action.payload.age ? { ...cartItem, quantity: action.payload.selectedQuantity } : cartItem) : [...state.cart, { ...item, quantity: action.payload.selectedQuantity, maxQuantity:action.payload.maxQuantity, age:action.payload.age, price:action.payload.price }] };
        case actionTypes.Duplicate_TO_CART:
            const itemDuplicated = state.products.find(prod => prod._id === action.payload.id);
            if (!itemDuplicated) {
                console.log("break")
                break
            }
            state.cart.map(item => {
                if(item._id === action.payload.id)
                     item.saplingsStock = []
            })
            return { ...state, cart: state.cart.saplingsStock.length? {...state.cart,itemDuplicated}:state.cart}
            //{ ...state, cart: state.cart.map(item => item._id === action.payload.id && item.growth === action.payload.growth ? { ...item, quantity: item.quantity + 1 } : item) };
        case actionTypes.EMPTY_CART:
            return { ...state, cart: state.cart.filter(item => item === null) };
        case actionTypes.REMOVE_FROM_CART:
            return { ...state, cart: state.cart.filter(item => item._id !== action.payload.id ) };
        case actionTypes.ADJUST_COMM:
            const comments = [state.products.find(item => item._id === action.payload.id)]
            comments.push({ ...action.payload.comment })
            return { ...state, products: state.products.map(item => item._id === action.payload.id ? { ...item, comments: comments } : item) };
        case actionTypes.ADJUST_QTY:
            const existItem = state.cart.find(prod => prod._id === action.payload.id);
            if((action.payload.quantity>0||action.payload.quantity==="")&&action.payload.quantity<existItem.maxQuantity)
            return { ...state, cart: state.cart.map(item => item._id === action.payload.id && item.growth === action.payload.growth ? { ...item, quantity: action.payload.quantity } : item) };
            else if(action.payload.quantity>=existItem.maxQuantity) return { ...state, cart: state.cart.map(item => item._id === action.payload.id ? { ...item, quantity: existItem.maxQuantity } : item) };
            else return { ...state, cart: state.cart.filter(item => item._id !== action.payload.id ) };
        case actionTypes.ADJUST_LEN:
            return { ...state, cart: state.cart.map(item => item._id === action.payload.id && item.growth === action.payload.growth ? { ...item, length: action.payload.length, price: action.payload.price } : item) };
        case actionTypes.LOAD_CURRENT_ITEM:
            return { ...state, currentItem: action.payload }
        default:
            return state;
    }
};
export default cartReducer;
