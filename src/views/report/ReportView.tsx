import React, { useState, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { Wrapper, Container, Spacer, Input, Button, Title } from '3oilerplate'
// import FileComponent from '../../components/File/File'

const GET_REPORT_FILE_HISTORY = gql`
  query GetReportFile($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      defaultBranchRef {
        target {
          ... on Commit {
            history(first: 100, path: "undercoverage") {
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

const GET_SOURCE = gql`
  query GetSourceFile($owner: String!, $name: String!, $expression: String!) {
    repository(owner: $owner, name: $name) {
      object(expression: $expression) {
        ... on Blob {
          byteSize
          text
        }
      }
    }
  }
`

export const ReportView = () => {
  const [currentOwner, setCurrentOwner] = useState('3askaal')
  const [currentRepo, setCurrentRepo] = useState('undercoverage')
  const [commits, setCommits] = useState([])

  const [fetchReportHistory, { data: reportFileHistory }] = useLazyQuery<any>(
    GET_REPORT_FILE_HISTORY,
    {
      variables: { owner: currentOwner, name: currentRepo },
    },
  )

  const [fetchSourceFile, { data: sourceFile }] = useLazyQuery<any>(GET_SOURCE, {
    variables: { owner: currentOwner, name: currentRepo },
  })

  useEffect(() => {
    if (
      reportFileHistory &&
      reportFileHistory.repository.defaultBranchRef.target.history.nodes.length
    ) {
      setCommits(
        reportFileHistory.repository.defaultBranchRef.target.history.nodes.map(
          ({ oid }: any) => oid,
        ),
      )
    }
    // console.log('source: ', sourceFile)
  }, [reportFileHistory])

  useEffect(() => {
    if (commits.length) {
      commits.forEach(({ oid }) => {
        fetchSourceFile({
          variables: {
            expression: `${oid}:undercoverage.json`,
          },
        })
      })
    }
  }, [commits])

  return (
    <Wrapper style={{ padding: 'm' }}>
      <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Spacer size="m">
          <Title level={4}>Pick your Git repository</Title>
          <Spacer size="xs" style={{ flexDirection: 'row' }}>
            <Input
              placeholder="Owner"
              style={{ flexGrow: 1 }}
              value={currentOwner}
              onChange={setCurrentOwner}
            />
            <Input
              placeholder="Repository"
              style={{ flexGrow: 1 }}
              value={currentRepo}
              onChange={setCurrentRepo}
            />
            <Button onClick={fetchReportHistory}>Submit</Button>
          </Spacer>
        </Spacer>
      </Container>
    </Wrapper>
  )
}
