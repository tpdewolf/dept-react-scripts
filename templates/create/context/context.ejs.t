---
to: src/context/<%= name %>Context.tsx
sh: prettier --write src/context/<%= name %>Context.tsx && eslint --fix src/context/<%= name %>Context.tsx

---
<% classified = h.inflection.classify(name) -%>
import { FC, useContext } from 'react'

export interface <%= classified %>ContextStore {}

export const <%= classified %>Context = React.createContext({} as <%= classified %>ContextStore)
export const use<%= classified %> = () => {
  const ctx = useContext(<%= classified %>Context)
  if (!ctx) {
    throw Error('The `use<%= classified %>` hook must be called from a descendent of the `<%= classified %>ContextProvider`.');
  }
  return ctx
}

// add <%= classified %>ContextProvider to ContextProvider
export const <%= classified %>ContextProvider: FC = ({children}) => {
  const store: <%= classified %>ContextStore = {}

  return <<%= classified %>Context.Provider value={store}>{ children }</<%= classified %>Context.Provider>
}

