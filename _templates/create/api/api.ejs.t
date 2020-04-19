---
to: src/pages/<%= name %>.ts
sh: prettier --write src/pages/<%= name %>.ts && eslint --fix src/pages/<%= name %>.ts
---
import { NextApiRequest, NextApiResponse } from 'next'

export default function handle(_req: NextApiRequest, res: NextApiResponse) {
  res.end('Hello World')
}
