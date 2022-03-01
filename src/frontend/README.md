# Frontend canister
The web application is situated in this folder and takes the form of an asset canister in the IC.
Built with `create-app-rewired` and ChakraUI as a CSS library.

## Overview
```
src/frontend/
	*

	config-overrides.js
		React webpack configuration overrides including dev server proxy to 
		redirect /api requests to localhost:8000 (Replica address)

	src/
		App.tsx
			Entrypoint of the application components.
			Containing Providers such as Context, ChakraUI and react-query.

		index.tsx
			Entrypoint of React app.
			Additionnaly contains contract ID and identity provider 
			initialization.

		theme.tsx
			Contains ChakraUI default theme including font registration as 
			well as colours and components variants.

		hooks/
			Registration of all custom-made React hooks including 
			authentication as well as all queries from react-query.

		components/
			All application components organized in folders for complex ones.

			'name'/
				index.tsx

	public/
		Containing all static public files including fonts, images and 
		index.html.

	build/
		Folder containing built static files with index.html as an entry file.

```