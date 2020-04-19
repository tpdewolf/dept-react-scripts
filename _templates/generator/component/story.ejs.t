---
to: "<%= withStorybook ? `src/components/${h.inflection.pluralize(kind)}/${Name}/${Name}.stories.tsx` : null %>"
---
import React from 'react'

import { <%= Name %> } from './<%= Name %>'

export default { title: '<%= h.capitalize(h.inflection.pluralize(kind)) %>|<%= Name %>', component: <%= Name %> }

export const example = () => <<%= Name %>></<%= Name %>>
