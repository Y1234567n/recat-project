/**
 * Created by user on 2019/5/24.
 */
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from './reducer'

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))