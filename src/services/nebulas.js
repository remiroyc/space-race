import nebulas from "nebulas"
import NebPay from "nebpay"

const CONTRACT_ADDRESS = "n1es5LQYdYG2g373XqJTDa1RwnsWP12hQeS"

export const nebPay = new NebPay()

export function getGameInformations() {
  const options = { callback: CONTRACT_ADDRESS }
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
