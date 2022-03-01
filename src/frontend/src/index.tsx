import * as React from 'react'

import { App } from './App'
import { ColorModeScript } from '@chakra-ui/react'
import ReactDOM from 'react-dom'
import localCanisterIDs from '../../../.dfx/local/canister_ids.json'
import prodCanisterIDs from '../../../canister_ids.json'

const network = process.env.REACT_APP_DFX_NETWORK
export const contractID = network == 'local' ? localCanisterIDs.contract[network] : prodCanisterIDs.contract[network]
export const identityProvider = network == 'local' ? 'http://rrkah-fqaaa-aaaaa-aaaaq-cai.localhost:8000/#authorize' : 'https://identity.ic0.app/#authorize'

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
