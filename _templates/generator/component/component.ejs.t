---
to: src/components/<%= h.inflection.pluralize(kind) %>/<%= Name %>/<%= Name %>.tsx
---
<% classified = h.inflection.classify(name) -%>
import React from 'react'

export interface <%= Name %>Props {}

<% if(componentType === 'f'){ -%>
export const <%= Name %>: React.FC<<%= Name %>Props> = () => {
  return <div></div>
}
<% } -%>
<% if(componentType === 'c'){ -%>
export class <%= Name %> extends React.Component<<%= Name %>Props> {
  render() {
    return <div></div>
  }
}
<% } -%>


