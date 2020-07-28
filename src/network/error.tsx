import { onError } from 'apollo-link-error'
import { history } from '../app/App'

export const errorLink = onError(({ graphQLErrors, networkError }: any) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ extensions: { code = null } = {} }: any) => {
      // if (code === 'UNAUTHENTICATED') {
      //   history.push('/logout')
      // }

      if (code === 'INTERNAL_SERVER_ERROR') {
        // console.log('[Server error]:', JSON.stringify(graphQLErrors))
      }

      // if (code === 'NOT_FOUND') {
      //   history.push('/logout')
      // }
    })
  }

  if (networkError) {
    // eslint-disable-next-line no-console
    // console.log('[Network error]:', JSON.stringify(networkError))
    // networkError.result.errors.forEach(({ message }: any) => {
    //   // eslint-disable-next-line no-console
    //   console.error(message)
    // })
  }
})
