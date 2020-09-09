import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { GlobalStyle, theme } from '3oilerplate'
import { createBrowserHistory } from 'history'
import { theme as localTheme } from '../style'
import { ThemeProvider } from 'styled-components'
import { IndexView, ReportView } from '../views'
import './fonts.css'
import { SApp } from './App.styled'
import { ApolloProvider, ApolloLink, DefaultOptions, ApolloClient } from '@apollo/client'
import { httpLink, authLink, cache } from '../network'

export const history = createBrowserHistory()

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  mutate: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    // errorLink,
    authLink,
    // retryLink,
    httpLink,
  ]),
  cache,
  defaultOptions,
})

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={{ ...theme, ...localTheme }}>
        <GlobalStyle />
        <SApp>
          <Router history={history}>
            <Switch>
              <Route exact path="/">
                <IndexView />
              </Route>
              <Route exact path="/:owner/:repo">
                <ReportView />
              </Route>
            </Switch>
          </Router>
        </SApp>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
