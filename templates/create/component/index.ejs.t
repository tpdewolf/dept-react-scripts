---
to: src/components/<%= path %><%= h.inflection.camelize(name) %>/index.ts
---
export * from './<%= h.inflection.camelize(name) %>'
