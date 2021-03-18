---
to: "<%= withStorybook ? `src/components/${path}${h.inflection.camelize(name)}/${h.inflection.camelize(name)}.stories.tsx` : null %>"
---
<% Name = h.inflection.camelize(name) %>
import * as React from 'react'

import { <%= Name %> } from './<%= Name %>'

export default { title: 'Components/<%= Name %>', component: <%= Name %> }

export const Example = () => <<%= Name %>></<%= Name %>>
