import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { gql, useLazyQuery, useApolloClient } from '@apollo/client'
import { Wrapper, Container, Spacer } from '3oilerplate'
import FileComponent from '../../components/File/File'

const GET_REPORT_FILE_HISTORY = gql`
  query GetReportFile($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      defaultBranchRef {
        target {
          ... on Commit {
            history(first: 100, path: "undercoverage/report.json") {
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
  const client = useApolloClient()
  const { owner: currentOwner, repo: currentRepo } = useParams()
  const [states, setStates] = useState<any>({})
  const [commits, setCommits] = useState<any>([])

  const [fetchReportHistory, { data: reportFileHistory }] = useLazyQuery<any>(
    GET_REPORT_FILE_HISTORY,
    {
      variables: { owner: currentOwner, name: currentRepo },
    },
  )

  useEffect(() => {
    if (currentOwner && currentRepo) {
      fetchReportHistory()
    }
  }, [currentOwner, currentRepo])

  useEffect(() => {
    if (reportFileHistory?.repository?.defaultBranchRef?.target?.history?.nodes?.length) {
      setCommits(reportFileHistory.repository.defaultBranchRef.target.history.nodes)
    }
  }, [reportFileHistory])

  useEffect(() => {
    async function fetchCommitSource() {
      if (commits.length && !states.sourceFetched) {
        let commitsWithSource = await Promise.all(
          commits.map(async (commit: any) => {
            const res: any = await client.query({
              query: GET_SOURCE,
              variables: {
                owner: currentOwner,
                name: currentRepo,
                expression: `${commit.oid}:undercoverage/report.json`,
              },
            })

            if (res?.data?.repository?.object?.text) {
              return {
                ...commit,
                data: JSON.parse(res.data.repository.object.text),
              }
            }

            return commit
          }),
        )

        setCommits(commitsWithSource)
        setStates({ sourceFetched: true })
      }
    }

    fetchCommitSource()
  }, [commits])

  return (
    <Wrapper s={{ padding: 'm' }}>
      <Container s={{ alignItems: 'center', justifyContent: 'center', maxWidth: '800px' }}>
        <Spacer size="l">
          <Spacer size="m">
            {commits[0]?.data
              ? commits[0].data.files.map((file: any) => <FileComponent file={file} />)
              : null}
          </Spacer>
        </Spacer>
      </Container>
    </Wrapper>
  )
}
