import R from 'ramda';
import Immutable from 'immutable'
import reduceReducers from 'reduce-reducers'
import { isError } from 'flux-standard-action';

function handleActionsOnReducers(reducers, defaultState) {
    return typeof defaultState !== 'undefined'
        ? (state = defaultState, action) => reduceReducers(...reducers)(state, action)
        : reduceReducers(...reducers);
}

function getStoreDefault(store) {
    return store(undefined, {type: null})
}

export const createImmutableDelegator = (propStoreList)=> {
    const reduce = R.reduce(({reducers, defaultObj}, {prop, store})=> {
        reducers.push(
            (state, action)=> state.set(prop, store(state.get(prop), action))
        );

        defaultObj[prop] = getStoreDefault(store);
        return {reducers, defaultObj}
    }, {reducers: [], defaultObj: {}});

    const {reducers, defaultObj} = reduce(propStoreList);

    return handleActionsOnReducers(
        reducers,
        Immutable.fromJS(defaultObj)
    )
};