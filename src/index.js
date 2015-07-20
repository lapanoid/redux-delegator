import R from 'ramda';
import Immutable from 'immutable'
import reduceReducers from 'reduce-reducers'
import { isError } from 'flux-standard-action';

const handleActionsOnReducers = (reducers, defaultState) =>(
    typeof defaultState !== 'undefined'
        ? (state = defaultState, action) => reduceReducers(...reducers)(state, action)
        : reduceReducers(...reducers)
);

const getReducerDefault = (reducer) =>  reducer(undefined, {type: null});

export const createImmutableDelegator = (propReducerList)=> {
    const reduce = R.reduce(({reducers, defaultObj}, {prop, reducer})=> {
        reducers.push(
            (state, action)=> state.set(prop, reducer(state.get(prop), action))
        );

        defaultObj[prop] = getReducerDefault(reducer);
        return {reducers, defaultObj}
    }, {reducers: [], defaultObj: {}});

    const {reducers, defaultObj} = reduce(propReducerList);

    return handleActionsOnReducers(
        reducers,
        Immutable.fromJS(defaultObj)
    )
};