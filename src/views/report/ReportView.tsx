import React, { useState, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { Wrapper, Container, Spacer, Input, Button } from '3oilerplate'
// import FileComponent from '../../components/File/File'

const GET_REPORT_FILE = gql`
  query GetReportFile($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      defaultBranchRef {
        target {
          ... on Commit {
            history(first: 100, path: "undercoverage/*") {
              nodes {
                author {
                  email
                }
                message
                oid
              }
            }
          }
        }
      }
    }
  }
`

export const ReportView = () => {
  const [currentOwner, setCurrentOwner] = useState('')
  const [currentRepo, setCurrentRepo] = useState('')

  const [fetchReport, { data }] = useLazyQuery(GET_REPORT_FILE, {
    variables: { owner: currentOwner, name: currentRepo },
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <Wrapper style={{ padding: 'm' }}>
      <Container>
        <Spacer size="xs" style={{ flexDirection: 'row' }}>
          <Input style={{ flexGrow: 1 }} onChange={setCurrentOwner} />
          <Input style={{ flexGrow: 1 }} onChange={setCurrentRepo} />
          <Button onClick={fetchReport}>Submit</Button>
        </Spacer>
      </Container>
    </Wrapper>
  )
}
