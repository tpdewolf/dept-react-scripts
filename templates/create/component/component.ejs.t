---
to: src/components/<%= path %><%= h.inflection.camelize(name) %>/<%= h.inflection.camelize(name) %>.tsx
---
<% Name = h.inflection.camelize(name) %>
export interface <%= Name %>Props {}

export function <%= Name %>(props: <%= Name %>Props) {
  return <div>Hello World</div>
}



