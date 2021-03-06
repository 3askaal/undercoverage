import { HttpLink } from 'apollo-link-http'
import { API_URL } from '../config'

export const httpLink: any = new HttpLink({
  uri: `${API_URL}/graphql`,
})
