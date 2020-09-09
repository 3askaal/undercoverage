import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Wrapper, Container, Spacer, Input, Button, Title } from '3oilerplate'

export const IndexView = () => {
  const history = useHistory()
  const [currentOwner, setCurrentOwner] = useState<string>('3askaal')
  const [currentRepo, setCurrentRepo] = useState<string>('undercoverage')

  return (
    <Wrapper s={{ padding: 'm' }}>
      <Container s={{ alignItems: 'center', justifyContent: 'center', maxWidth: '540px' }}>
        <Spacer size="l">
          <Spacer size="m">
            <Title level={4}>Pick your Git repository</Title>
            <Spacer size="xs" s={{ flexDirection: 'column' }}>
              <Input
                placeholder="Owner"
                s={{ flexGrow: 1 }}
                value={currentOwner}
                onChange={setCurrentOwner}
              />
              <Input
                placeholder="Repository"
                s={{ flexGrow: 1 }}
                value={currentRepo}
                onChange={setCurrentRepo}
              />
              <Button onClick={() => history.push(`${currentOwner}/${currentRepo}`)}>Go</Button>
            </Spacer>
          </Spacer>
        </Spacer>
      </Container>
    </Wrapper>
  )
}
