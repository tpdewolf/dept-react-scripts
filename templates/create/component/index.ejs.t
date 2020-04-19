---
to: src/components/<%= h.inflection.pluralize(kind) %>/<%= path %><%= h.inflection.camelize(name) %>/index.ts
---
export * from './<%= h.inflection.camelize(name) %>'
