import type { ComponentStyleConfig } from '@chakra-ui/theme'
import { Global } from '@emotion/react'
import React from 'react'
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

// You can also use the more specific type for
// a single part component: ComponentSingleStyleConfig
const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 'bold',
    fontFamily: 'moranga',
    borderRadius: 'base',
  },
  variants: {
    solid: {
      bg: 'brand.500',
      color: 'black',
      border: 'solid 2px',
      borderColor: 'brand.500',
      _hover: {
        bg: 'transparent',
        color: 'brand.500'
      }
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
}

export const Fonts = () => (
  <Global
    styles={`
	  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;400;600&display=swap');
	  
	@font-face {
		font-family: 'moranga';
		font-style: normal;
		font-weight: 700;
		src: url("/fonts/moranga-medium.otf") format('opentype');
	} 

	@font-face {
		font-family: 'moranga';
		font-style: normal;
		font-weight: 900;
		src: url("/fonts/moranga-black.otf") format('opentype');
	} 

	@font-face {
		font-family: 'moranga';
		font-style: normal;
		font-weight: 500;
		src: url("/fonts/moranga.otf") format('opentype');
	} 
      `}
  />
)

export const theme = extendTheme({
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
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('#EEEEEE','')(props),
      }
    })
  }
})
