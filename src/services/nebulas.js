import nebulas from "nebulas"
import NebPay from "nebpay"

const NETWORK_URL = "https://pay.nebulas.io/api/pay"
const CONTRACT_ADDRESS = "n1es5LQYdYG2g373XqJTDa1RwnsWP12hQeS"

export const nebPay = new NebPay()

export function getGameInformations() {
  const options = { callback: NETWORK_URL }
  const callArgs = JSON.stringify([])
  const serialNumber = nebPay.call(
    CONTRACT_ADDRESS,
    0,
    "getGameInformations",
    callArgs,
    options
  )
  return nebPay.queryPayInfo(serialNumber, options)
}
