---
to: "<%= withTest ? `src/components/${path}${h.inflection.camelize(name)}/${h.inflection.camelize(name)}.test.tsx` : null %>"
sh: prettier --write src/components/<%= path %><%= h.inflection.camelize(name) %>/* && eslint --fix src/components/<%= path %><%= h.inflection.camelize(name) %>/**
---
<% Name = h.inflection.camelize(name) %>
import { render } from '@test/utils'
import * as React from 'react'

import { <%= Name %> } from './<%= Name %>'

test('it renders', () => {
  render(<<%= Name %>></<%= Name %>>)
})
