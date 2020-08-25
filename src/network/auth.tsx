import { setContext } from 'apollo-link-context'

export const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: process.env.REACT_APP_PUBLIC_ACCESS_TOKEN
        ? `Bearer ${process.env.REACT_APP_PUBLIC_ACCESS_TOKEN}`
        : '',
    },
  }
})
