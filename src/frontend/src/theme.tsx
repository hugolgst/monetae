import type { ComponentStyleConfig } from '@chakra-ui/theme'
import { extendTheme } from '@chakra-ui/react'

// You can also use the more specific type for
// a single part component: ComponentSingleStyleConfig
const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 'bold',
    borderRadius: 'base',
  },
  variants: {
    solid: {
      bg: 'brand.500',
      color: 'black',
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
}

const theme = extendTheme({
  colors: {
    black: '#16161D',
    brand: {
      500: '#D7B12B',
      600: '#BD9919'
    }
  },
  fonts: {
    heading: 'moranga',
    body: 'Inter',
  },
  components: {
    Button
  }
})

export default theme
