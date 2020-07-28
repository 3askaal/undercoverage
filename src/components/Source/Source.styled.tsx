import { styled, rgba } from '3oilerplate'

export const SSource = styled.div({
  display: 'flex',
  flexGrow: 1,
  overflow: 'hidden',
})

export const SSourceLineInfo = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

export const SSourceLineInfoLine = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '1.5rem',
  marginTop: '4px',
  backgroundColor: '#eee',
  width: '5rem',
})

export const SSourceLineInfoLineIndex = styled.div({
  display: 'flex',
  paddingX: 'xs',
})

export const SSourceLineInfoLineHits = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '1.8rem',
  borderRadius: '100% 0 0 100%',
  backgroundColor: rgba('#40dab2', 0.4),
  fontSize: '.8em',
  marginRight: '2px',
})

export const SSourceSourceWrapper = styled.div({
  display: 'flex',
  overflow: 'auto',
  minWidth: '0',
  flexGrow: 1,
})

export const SSourceSource = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  fontFamily: 'code',
  fontSize: 'xs',
})

export const SSourceSourceLine = styled.div(({ theme, type }: any) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '1.5rem',
  flexGrow: 1,
  marginTop: '4px',
  backgroundColor: '#eee',
  whiteSpace: 'nowrap',

  ...(type === 'hit' && {
    backgroundColor: rgba(theme.colors.indicators.hit, 0.4),
  }),

  ...(type === 'miss' && {
    backgroundColor: rgba(theme.colors.indicators.miss, 0.4),
  }),

  ...(type === 'partial' && {
    backgroundColor: rgba(theme.colors.indicators.partial, 0.4),
  }),
}))

export const SSourceSourceLineMain = styled.div(({ type }: any) => ({
  paddingX: 's',
}))

export const SSourceSourceLineHighlight = styled.div(({ type }: any) => ({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  color: 'transparent',
  pointerEvents: 'none',
  userSelect: 'none',
  paddingX: 's',
  top: 0,
  bottom: 0,
}))

export const SSourceSourceLineHighlightPart = styled.div(({ theme, type, isFull }: any) => ({
  display: 'inline-flex',
  alignItems: 'center',
  pointerEvents: 'auto',
  cursor: 'pointer',
  height: '100%',
  borderRadius: 's',

  ...(type === 's' && {
    zIndex: 1,
    boxShadow: `inset 0 0 0 1px ${rgba(theme.colors.indicators.statement, 1)}`,

    ':hover': {
      backgroundColor: rgba(theme.colors.indicators.statement, 0.25),
    },
  }),

  ...(type === 'f' && {
    zIndex: 1,
    boxShadow: `inset 0 0 0 1px ${rgba(theme.colors.indicators.function, 1)}`,

    ':hover': {
      backgroundColor: rgba(theme.colors.indicators.function, 0.25),
    },
  }),

  ...(type === 'b' && {
    zIndex: 1,
    boxShadow: `inset 0 0 0 1px ${rgba(theme.colors.indicators.branch, 1)}`,

    ':hover': {
      backgroundColor: rgba(theme.colors.indicators.branch, 0.25),
    },
  }),

  ...(isFull && {
    zIndex: '0 !important',
  }),
}))
