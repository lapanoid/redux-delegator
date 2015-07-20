#redux-delegator

[![npm version](https://badge.fury.io/js/redux-delegator.svg)](http://badge.fury.io/js/redux-delegator)

Compose stores in a structured way 

```
const companiesStore = handleActions({
                ADD_COMPANY: (state, {payload:{doc, ASIN}}) => state.set(ASIN, doc),
                REMOVE_COMPANY: (state, {payload:{ASIN}}) => state.delete(ASIN),
                DROP_COMPANIES: (state, action) => Immutable.fromJS({})
            }, Immutable.fromJS({}))
            
const dbStore = handleActions({
                INIT_DB: (state, action) => state.merge(action.payload),
                PROGRESS_SYNC_DB: (state, action) => state.set('dbSyncProgress', action.payload),
                STATUS_SYNC_DB: (state, action) => state.set('dbSyncMode', action.payload)
            }, Immutable.fromJS({}))

export const rootStore = createImmutableDelegator(
    [
        {
            prop: "companies",
            store: companiesStore
        },
        {
            prop: "db",
            store: dbStore
        }
    ]
);
```

this creates store which maintain such data



```
{
  companies:/*maintained by companiesStore*/
  db:/*maintained by dbStore*/
}
```

You can also <img src='https://i.imgflip.com/ob4v0.jpg' width='200'> ...

```
export const rootStore = createImmutableDelegator(
    [
        {
            prop: "db",
            store: dbStore
        },
        {
            prop: "data",
            store: createImmutableDelegator(
            [
              {
                  prop: "companies",
                  store: companiesStore
              },
              {
                  prop: "products",
                  store: dbStore
              }
            ]
        }
    ]
);
```

## TODO
- rename stores to reducers
- make an example
- remove Immutable dep (maybe)
