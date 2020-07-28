import { setContext } from 'apollo-link-context'

export const authLink = setContext((_, { headers }) => {
  const token: string | null = localStorage.getItem('token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${process.env.REACT_APP_PUBLIC_ACCESS_TOKEN}` : '',
    },
  }
})
