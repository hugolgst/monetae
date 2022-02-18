import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
	  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;400;600&display=swap');
	  
	@font-face {
		font-family: 'moranga';
		font-style: normal;
		font-weight: 700;
		src: url("https://furrynomad.io/api/fonts/620359926c9aa9001d155abd/n7/otf?domain=furrynomad.io&md5=VxKcFqIfFizvN6HQwtFCyw") format('opentype');
	} 

	@font-face {
		font-family: 'moranga';
		font-style: normal;
		font-weight: 900;
		src: url("https://furrynomad.io/api/fonts/620359926c9aa9001d155abd/n9/otf?domain=furrynomad.io&md5=iPbU4aw6juHX434ASklnog") format('opentype');
	} 

	@font-face {
		font-family: 'moranga';
		font-style: normal;
		font-weight: 500;
		src: url("https://furrynomad.io/api/fonts/620359926c9aa9001d155abd/n5/otf?domain=furrynomad.io&md5=bafPru17fYvjS1H6OvOEjw") format('opentype');
	} 

	@font-face {
		font-family: 'moranga';
		font-style: normal;
		font-weight: 300;
		src: url("https://furrynomad.io/api/fonts/620359926c9aa9001d155abd/n3/otf?domain=furrynomad.io&md5=dCNSB6oc560ol80i7DC7tw") format('opentype');
	} 

	@font-face {
		font-family: 'moranga';
		font-style: normal;
		font-weight: 400;
		src: url("https://furrynomad.io/api/fonts/620359926c9aa9001d155abd/n4/otf?domain=furrynomad.io&md5=U4wgV7xlodyP3svRkyfmNQ") format('opentype');
	} 
      `}
  />
)

export default Fonts