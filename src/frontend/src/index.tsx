import { ColorModeScript } from '@chakra-ui/react'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import localCanisterIDs from '../../../.dfx/local/canister_ids.json'
import prodCanisterIDs from '../../../canister_ids.json'

const network = process.env.REACT_APP_DFX_NETWORK
export const contractID = network == 'local' ? localCanisterIDs.contract[network] : prodCanisterIDs.contract[network]

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
