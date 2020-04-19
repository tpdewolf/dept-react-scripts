---
to: src/components/<%= h.inflection.pluralize(kind) %>/<%= path %><%= h.inflection.camelize(name) %>/<%= h.inflection.camelize(name) %>.tsx
---
<% Name = h.inflection.camelize(name) %>
import React from 'react'

export interface <%= Name %>Props {}

export const <%= Name %>: React.FC<<%= Name %>Props> = () => {
  return <div>Hello World</div>
}



