import { styled } from '3oilerplate'

export const SFile = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

export const SFileHeader = styled.div({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#232931',
  color: 'white',
  padding: 's',
  borderTopLeftRadius: 'm',
  borderTopRightRadius: 'm',
})

export const SFileHeaderPath = styled.div({
  display: 'flex',
  backgroundColor: '#393e46',
  padding: 'xs',
  marginBottom: 's',
  borderRadius: 's',
})

export const SFileHeaderOptions = styled.div({
  display: 'flex',

  '> * + *': {
    marginLeft: 'm',
  },
})

export const SFileSource = styled.div({
  display: 'flex',
  flexGrow: 1,
})
