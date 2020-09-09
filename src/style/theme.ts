import { darken } from '3oilerplate'

export const theme: any = {
  rootFontSizes: ['8px', '12px', '14px'],
  colors: {
    primary: '#3e64ff',
    primaryDark: darken('#3e64ff', 0.25),
    dark: '#34495e',
    darker: '#22313f',
    light: '#e5e5e5',
    indicators: {
      hit: '#40dab2',
      miss: '#fa163f',
      partial: '#ffd700',
      statement: '#f8b500',
      function: '#7971ea',
      branch: '#118df0',
    },
  },
}
