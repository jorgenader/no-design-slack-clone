import {createStore, applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';

import rootReducer from './reducers';

// Enable Redux devTools in development (only when browser is used, ignored when rendered with node)
const composeEnhancers =
    process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({shouldHotReload: false}) : compose;

const storeEnhancers = [];

// create list of middleware to spread latter, makes easier way to add based on environment
const middlewares = [];

// if not production, add redux logger
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger({
        level: 'info', collapsed: false,
    }));
}

// might contain pre-configured enhancers
storeEnhancers.unshift(applyMiddleware(...middlewares));

export default function configureStore(initialState = {}) {
    // mount middleware and reducers to store
    return createStore(rootReducer, initialState, composeEnhancers(...storeEnhancers));
}
