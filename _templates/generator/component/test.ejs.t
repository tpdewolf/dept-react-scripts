---
to: "<%= withTest ? `src/components/${h.inflection.pluralize(kind)}/${Name}/${Name}.test.tsx` : null %>"
---
import { render } from '@test/utils'
import React from 'react'

import { <%= Name %> } from './<%= Name %>'

test('it renders', () => {
  render(<<%= Name %>></<%= Name %>>)
})
