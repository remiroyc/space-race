const Game = function() {
  LocalContractStorage.defineProperty(this, 'owner')
  LocalContractStorage.defineProperty(this, 'globalBalance')
  LocalContractStorage.defineProperty(this, 'finished')
  LocalContractStorage.defineProperty(this, 'winner')

  LocalContractStorage.defineProperty(this, 'players1Length')
  LocalContractStorage.defineProperty(this, 'players2Length')

  LocalContractStorage.defineMapProperty(this, 'distance')
  LocalContractStorage.defineMapProperty(this, 'gas')
  LocalContractStorage.defineMapProperty(this, 'playerBalance1')
  LocalContractStorage.defineMapProperty(this, 'playerBalance2')
  LocalContractStorage.defineMapProperty(this, 'playerChoice')
}

Game.prototype = {
  init: function() {
    this.owner = Blockchain.transaction.from
    this.distance.set(1, 0)
    this.distance.set(2, 0)
    this.finished = false
  },

  getGameInformations: function() {
    return {
      finished: this.finished,
      price: this.globalBalance,
      ships: {
        1: {
          players: this.players1Length,
          distance: this.distance.get(1)
        },
        2: {
          players: this.players2Length,
          distance: this.distance.get(2)
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
      2: this.distance.get(2)
    }
  },

  getPlayerDistance: function() {
    return {
      1: this.playerBalance1.get(Blockchain.transaction.from),
      2: this.playerBalance2.get(Blockchain.transaction.from)
    }
  },

  getPlayerShipNumber: function() {
    const playerChoice = this.playerChoice.get(Blockchain.transaction.from)
    if (playerChoice !== 1 && playerChoice !== 2) {
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
      _sendBalance(
        new BigNumber(this.playerBalance1.get(Blockchain.transaction.from))
      )
    } else if (this.winner === 2) {
      _sendBalance(
        new BigNumber(this.playerBalance2.get(Blockchain.transaction.from))
      )
    }
  },

  buyGas: function() {
    if (this.finished === true) {
      throw new Error('Game is finished')
    }

    var currentGas = this.gas.get(Blockchain.transaction.from) || 0
    var value = new BigNumber(Blockchain.transaction.value)
    var gas = value.modulo(0.01)
    var newGasValue = currentGas + gas
    this.gas.set(Blockchain.transaction.from, newGasValue)
  },

  spendGas: function(distance, shipNumber) {
    if (this.finished === true) {
      throw new Error('Game is finished')
    }

    var playerChoice = this.playerChoice.get(Blockchain.transaction.from)
    if (playerChoice === 1 || playerChoice === 2) {
      if (playerChoice !== shipNumber) {
        throw new Error('You cannot invest in both teams')
      }
    } else {
      this.set(Blockchain.transaction.from, shipNumber)
    }

    var currentGas = new BigNumber(
      this.gas.get(Blockchain.transaction.from) || 0
    )
    if (currentGas <= 0 || distance > currentGas) {
      throw new Error('Required more gas')
    }

    this.gas.set(Blockchain.transaction.from, currentGas.minus(distance))

    if (shipNumber === 1) {
      this.players1Length = players1Length + 1
      var previousPlayerBalance = this.playerBalance1.get(
        Blockchain.transaction.from
      )
      this.playerBalance1.set(
        Blockchain.transaction.from,
        previousPlayerBalance + distance
      )
      var previousDistance = this.distance.get(1)
      var newDistance = previousDistance.plus(previousDistance)
      this.distance.set(1, newDistance)
      this.checkWinner(1)
    } else if (shipNumber === 2) {
      this.players2Length = players2Length + 1
      var previousPlayerBalance = this.playerBalance2.get(
        Blockchain.transaction.from
      )
      this.playerBalance2.set(
        Blockchain.transaction.from,
        previousPlayerBalance + distance
      )
      var previousDistance = this.distance.get(2)
      var newDistance = previousDistance.plus(previousDistance)
      this.distance.set(2, newDistance)
      this.checkWinner(2)
    }
  }
}
