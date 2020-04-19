---
to: "<%= withStorybook ? `src/components/${h.inflection.pluralize(kind)}/${path}${h.inflection.camelize(name)}/${h.inflection.camelize(name)}.stories.tsx` : null %>"
---
<% Name = h.inflection.camelize(name) %>
import React from 'react'

import { <%= Name %> } from './<%= Name %>'

export default { title: '<%= h.capitalize(h.inflection.pluralize(kind)) %>|<%= Name %>', component: <%= Name %> }

export const example = () => <<%= Name %>></<%= Name %>>
