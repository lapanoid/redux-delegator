#redux-delegator

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


## TODO
- rename reducers to stores
- make an example
