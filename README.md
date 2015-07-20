#redux-delegator

[![npm version](https://badge.fury.io/js/redux-delegator.svg)](http://badge.fury.io/js/redux-delegator)

Compose reducers in a structured way 

```
const companiesReducer = handleActions({
                ADD_COMPANY: (state, {payload:{doc, ASIN}}) => state.set(ASIN, doc),
                REMOVE_COMPANY: (state, {payload:{ASIN}}) => state.delete(ASIN),
                DROP_COMPANIES: (state, action) => Immutable.fromJS({})
            }, Immutable.fromJS({}))
            
const dbReducer = handleActions({
                INIT_DB: (state, action) => state.merge(action.payload),
                PROGRESS_SYNC_DB: (state, action) => state.set('dbSyncProgress', action.payload),
                STATUS_SYNC_DB: (state, action) => state.set('dbSyncMode', action.payload)
            }, Immutable.fromJS({}))

export const rootReducer = createImmutableDelegator(
    [
        {
            prop: "companies",
            reducer: companiesReducer
        },
        {
            prop: "db",
            reducer: dbReducer
        }
    ]
);
```

this creates reducer which maintain such data



```
{
  companies:/*maintained by companiesReducer*/
  db:/*maintained by dbReducer*/
}
```

You can also <img src='https://i.imgflip.com/ob4v0.jpg' width='200'> ...

```
export const rootReducer = createImmutableDelegator(
    [
        {
            prop: "db",
            reducer: dbReducer
        },
        {
            prop: "data",
            reducer: createImmutableDelegator(
            [
              {
                  prop: "companies",
                  reducer: companiesReducer
              },
              {
                  prop: "products",
                  reducer: dbReducer
              }
            ]
        }
    ]
);
```

## TODO
- make an example
- remove Immutable dep (maybe)
