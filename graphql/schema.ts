import { makeSchema, connectionPlugin } from 'nexus'
import { join } from 'path'
import * as types from './types'

// use nexus to generator resolver and it will be auto import
export const schema = makeSchema({
  types,
  plugins: [connectionPlugin()],
  outputs: {
    typegen: join(process.cwd(), 'node_modules', '@types', 'nexus-typegen', 'index.d.ts'),
    schema: join(process.cwd(), 'graphql', 'schema.graphql'),
  },
  contextType: {
    export: 'Context',
    module: join(process.cwd(), 'graphql', 'context.ts'),
  },
})

// import { gql } from 'apollo-server-micro'

// export const typeDefs = gql`
//   type Link {
//     id: String
//     title: String
//     description: String
//     url: String
//     category: String
//     imageUrl: String
//     users: [String]
//   }

//   type Query {
//     links: [Link]!
//   }
// `
