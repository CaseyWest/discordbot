class Helpers {
  getFormattedPrice (price) {
    price = price.toString()
    var copper = price.substring(price.length, price.length - 2)
    var silver = price.substring(price.length - 2, price.length - 4)
    var gold = Number(price.substring(0, price.length - 4)).toLocaleString(undefined, {maximumFractionDigits: 0})

    return {
      gold: gold,
      silver: silver,
      copper: copper
    }
  }
}

export default Helpers
