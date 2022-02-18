import { extendTheme } from '@chakra-ui/react'

const fonts = { mono: '\'Menlo\', monospace' }

const theme = extendTheme({
  colors: {
    black: '#16161D',
    brand: {
      500: '#D7B12B',
      600: '#BD9919'
    }
  },
  fonts
})

export default theme
