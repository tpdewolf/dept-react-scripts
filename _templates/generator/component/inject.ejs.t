---
inject: true
to: src/components/<%= h.inflection.pluralize(kind) %>/index.ts
append: true
---
export * from './<%= Name %>'
