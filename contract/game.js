const Game = function() {
  LocalContractStorage.defineProperty(this, 'owner')
  LocalContractStorage.defineProperty(this, 'globalBalance')
  LocalContractStorage.defineProperty(this, 'finished')
  LocalContractStorage.defineProperty(this, 'winner')

  LocalContractStorage.defineProperty(this, 'players1Length')
  LocalContractStorage.defineProperty(this, 'players2Length')
  LocalContractStorage.defineProperty(this, 'players3Length')
  LocalContractStorage.defineProperty(this, 'players4Length')

  LocalContractStorage.defineMapProperty(this, 'distance')
  LocalContractStorage.defineMapProperty(this, 'gas')
  LocalContractStorage.defineMapProperty(this, 'lastTransaction')
  LocalContractStorage.defineMapProperty(this, 'playerBalance1')
  LocalContractStorage.defineMapProperty(this, 'playerBalance2')
  LocalContractStorage.defineMapProperty(this, 'playerBalance3')
  LocalContractStorage.defineMapProperty(this, 'playerBalance4')
  LocalContractStorage.defineMapProperty(this, 'playerChoice')
}

Game.prototype = {
  init: function() {
    this.owner = Blockchain.transaction.from
    this.distance.set(1, 0)
    this.distance.set(2, 0)
    this.distance.set(3, 0)
    this.distance.set(4, 0)
    this.finished = false
  },

  getGameInformations: function() {
    return {
      finished: this.finished,
      price: this.globalBalance,
      ships: {
        1: {
          country: 'US',
          players: this.players1Length,
          distance: this.distance.get(1)
        },
        2: {
          country: 'CH',
          players: this.players2Length,
          distance: this.distance.get(2)
        },
        3: {
          country: 'RU',
          players: this.players3Length,
          distance: this.distance.get(3)
        },
        4: {
          country: 'EU',
          players: this.players4Length,
          distance: this.distance.get(4)
        }
      }
    }
  },

  getDistance: function(shipNumber) {
    return this.distance.get(shipNumber)
  },

  getDistances: function() {
    return {
      1: this.distance.get(1),
      2: this.distance.get(2),
      3: this.distance.get(3),
      4: this.distance.get(4)
    }
  },

  getPlayerDistance: function() {
    return {
      1: this.playerBalance1.get(Blockchain.transaction.from),
      2: this.playerBalance2.get(Blockchain.transaction.from),
      3: this.playerBalance3.get(Blockchain.transaction.from),
      4: this.playerBalance4.get(Blockchain.transaction.from)
    }
  },

  getUserInformations: function(user) {
    return {
      lastTransaction: this.lastTransaction.get(user),
      gas: this.gas.get(user),
      ship: this.playerChoice.get(user)
    }
  },

  getPlayerShipNumber: function() {
    const playerChoice = this.playerChoice.get(Blockchain.transaction.from)
    if (playerChoice !== 1 && playerChoice !== 2 && playerChoice !== 3 && playerChoice !== 4) {
      throw new Error('You need to spending your gas first')
    }
    return playerChoice
  },

  checkWinner: function(shipNumber) {
    var distance = this.distance.get(shipNumber)
    if (distance > 20000) {
      this.finished = true
    }
  },

  _sendBalance: function(user, balance) {
    if (!Blockchain.verifyAddress(user)) {
      throw 'User address is not correct'
    }

    if (balance.gt(0)) {
      if (!Blockchain.transfer(user, balance)) {
        throw new Error('transfer failed')
      }
    }
  },

  withdraw: function() {
    if (this.finished === false) {
      throw new Error('Game is not finished')
    }

    if (this.winner === 1) {
      _sendBalance(new BigNumber(this.playerBalance1.get(Blockchain.transaction.from)))
    } else if (this.winner === 2) {
      _sendBalance(new BigNumber(this.playerBalance2.get(Blockchain.transaction.from)))
    } else if (this.winner === 3) {
      _sendBalance(new BigNumber(this.playerBalance3.get(Blockchain.transaction.from)))
    } else if (this.winner === 4) {
      _sendBalance(new BigNumber(this.playerBalance4.get(Blockchain.transaction.from)))
    }
  },

  buyGas: function(quantity) {
    if (this.finished === true) {
      throw new Error('Game is finished')
    }

    if (quantity <= 0) {
      throw new Error('Quantity is invalid')
    }

    var value = new BigNumber(Blockchain.transaction.value)
    var requiredPrice = new BigNumber(quantity * 0.01)

    if (value.lt(requiredPrice)) {
      throw new Error('Required min price (' + requiredPrice.toString() + ')')
    }

    var currentGas = this.gas.get(Blockchain.transaction.from) || 0
    var newGasValue = currentGas + quantity
    this.gas.set(Blockchain.transaction.from, newGasValue)
  },

  spendGas: function(distance, shipNumber, disadvantage) {
    if (this.finished === true) {
      throw new Error('Game is finished')
    }

    if (shipNumber !== 1 && shipNumber !== 2 && shipNumber !== 3 && shipNumber !== 4) {
      throw new Error('Invalid ship number')
    }

    var playerChoice = this.playerChoice.get(Blockchain.transaction.from)
    if (playerChoice === 1 || playerChoice === 2 || playerChoice === 3 || playerChoice === 4) {
      if (playerChoice !== shipNumber) {
        throw new Error('You cannot invest in both teams')
      }
    } else {
      this.playerChoice.set(Blockchain.transaction.from, shipNumber)
    }

    var currentGas = new BigNumber(this.gas.get(Blockchain.transaction.from) || 0)

    if (currentGas <= 0 || distance > currentGas) {
      throw new Error('Required more gas')
    }
    var timeStamp = Date.now()
    this.lastTransaction.set(Blockchain.transaction.from, timeStamp)
    this.gas.set(Blockchain.transaction.from, currentGas.minus(new BigNumber(distance)))

    this.players1Length = this.players1Length + 1
    var previousPlayerBalance = this.playerBalance1.get(Blockchain.transaction.from)
    this.playerBalance1.set(Blockchain.transaction.from, previousPlayerBalance + distance)
    var previousDistance = this.distance.get(shipNumber)
    var newDistance = disadvantage ? previousDistance - distance : previousDistance + distance

    this.distance.set(shipNumber, newDistance < 0 ? 0 : newDistance)
    this.checkWinner(shipNumber)
  }
}

module.exports = Game
