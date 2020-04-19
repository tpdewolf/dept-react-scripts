---
inject: true
to: src/components/<%= h.inflection.pluralize(kind) %>/index.ts
append: true
---
export * from './<%= path %><%= h.inflection.camelize(name) %>'
