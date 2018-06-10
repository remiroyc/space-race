import 'whatwg-fetch'
import nebulas from 'nebulas'
import NebPay from 'nebpay'

const NETWORK_URL = 'https://pay.nebulas.io/api/pay'
const CONTRACT_ADDRESS = 'n1wEtkgCwj6kxBDXmEBk6gx6eszozX8Xg7f'
const NEBULAS_BASE_URL = 'https://testnet.nebulas.io'
const NEBULAS_OWNER_ADDRESS = 'n1QAfaRsRfCtgyWdz9TWd7V1gUHa1uAYZVN'
const NEBULAS_DEFAULT_GAS_PRICE = 1000000
const NEBULAS_DEFAULT_GAS_LIMIT = 2000000

export const nebPay = new NebPay()

export function buyGas(quantity) {
  const options = { callback: NETWORK_URL }
  const callArgs = JSON.stringify([quantity])
  const serialNumber = nebPay.call(CONTRACT_ADDRESS, (quantity * 0.01).toString(), 'buyGas', callArgs, options)
  return nebPay.queryPayInfo(serialNumber, options)
}

export function useGas(gas, ship) {
  debugger
  const options = { callback: NETWORK_URL }
  const callArgs = JSON.stringify([gas, ship, false])
  const serialNumber = nebPay.call(CONTRACT_ADDRESS, 0, 'spendGas', callArgs, options)
  return nebPay.queryPayInfo(serialNumber, options)
}

export function getUserInformations(account) {
  return fetch(`${NEBULAS_BASE_URL}/v1/user/call`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: account,
      to: CONTRACT_ADDRESS,
      value: '0',
      nonce: 3,
      gasPrice: NEBULAS_DEFAULT_GAS_PRICE.toString(),
      gasLimit: NEBULAS_DEFAULT_GAS_LIMIT.toString(),
      contract: {
        function: 'getUserInformations',
        args: `["${account}"]`
      }
    })
  }).then(response => {
    return response.json().then(json => {
      return json
    })
  })
}

export function getGameInformations() {
  return fetch(`${NEBULAS_BASE_URL}/v1/user/call`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: NEBULAS_OWNER_ADDRESS,
      to: CONTRACT_ADDRESS,
      value: '0',
      nonce: 3,
      gasPrice: NEBULAS_DEFAULT_GAS_PRICE.toString(),
      gasLimit: NEBULAS_DEFAULT_GAS_LIMIT.toString(),
      contract: {
        function: 'getGameInformations',
        args: ''
      }
    })
  }).then(response => {
    return response.json().then(json => {
      return json
    })
  })
}
