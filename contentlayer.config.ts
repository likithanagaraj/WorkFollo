import { makeSource, defineDatabase } from 'contentlayer-source-notion'
import { Client } from '@notionhq/client'
import * as notion from '@notionhq/client'
const client = new Client({ auth: process.env.NOTION_TOKEN })

export const Post = defineDatabase(() => ({
  name: 'Post',
  databaseId: 'd8316a1e68b34e17a5762b8451ac928c',
  query: {
    filter: {
      property: 'Status',
      status: {
        equals: 'Published',
      },
    },
  },
  properties: {
    date: {
      name: 'Created time',
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._id}`,
    },
  },
}))

export default makeSource({
  client,
  databaseTypes: [Post],
})