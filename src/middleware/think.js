export default (store) => (next) => (action) => {
    if (typeof action !== 'function') {
        return next(action);
    }

    return action(store.dispatch);  //only calling dispatch from index.js(action folder function)
}