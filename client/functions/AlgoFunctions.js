/**
 * %%%%%%%%%%%%%%%%%%%%%%%%%%%% *
 * %%% ALGO FUNCTIONS CLASS %%% *
 * %%%%%%%%%%%%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] Perosnal //
const MathFunctions = require('./MathFunctions')


class AlgoFunctions {
	// [SELL-PRICE][ARITHMETIC] sellPrice //
	static determinSellPrice(currentPrice, grossProfitMarginPct) {
		let sellPrice = currentPrice * (1 + grossProfitMarginPct)

		console.log('sellPrice:', sellPrice)
		console.log()

		return sellPrice
	}


	// [TIME-FRAME-PRICE-AVGS][GET] Average(s) //
	static async determinTimeFramePriceAvgs(timeFrames, product_id) {
		let timeFramePriceAvgs = []

		for (let i = 0; i < timeFrames.length; i++) {
			try {
				timeFramePriceAvgs[i] = await MathFunctions.getAverage(
					product_id,
					timeFrames[i]
				)
			}
			catch(e) { console.log(`Caught Error --> ${e}`) }
		}
		
		//console.log('timeFramePriceAvgs:', timeFramePriceAvgs)

		return timeFramePriceAvgs
	}


	// [COUNT] //
	static determinCount(timeFramePriceAvgs, currentPrice) {
		let count = 0

		if (timeFramePriceAvgs) {
			for (let i = 0; i < timeFramePriceAvgs.length; i++) {
				if (timeFramePriceAvgs[i].average > currentPrice.price) { count++ }

				console.log(
					'timeframe:', timeFramePriceAvgs[i].timeFrame, 
					'average:', timeFramePriceAvgs[i].average
				)
			}
		}
		else { count++ }

		console.log('count:', count)
		console.log()

		return count
	}


	// [CURRENT-INTERVAL] Determine Interval //
	static determinCurrentInterval(count, maxInterval, medInterval, minInterval) {
		let currentInterval = ''

		if (count <= 1) currentInterval = maxInterval
		else if (count <= 4) currentInterval = medInterval
		else if (count <= 6) currentInterval = minInterval
		else console.log(`Error Count Is: ${count}`)

		console.log('currentInterval:', currentInterval)
		console.log()

		return currentInterval
	}


	// [ALREADY-BOUGHT] //
	static determinAlreadyBought(myOrders, product_id, sellPrice, currentInterval) {
		let alreadyBought = null

		// If Orders Exist.. //
		if (myOrders) {
			myOrders.forEach(myOrder => {
				if (myOrder.product_id == product_id) {
					// [INIT] //
					const topPriceRange = sellPrice * (1 + currentInterval)
					const bottomPriceRange = (sellPrice * (currentInterval - 1) * -1)

					// [LOG] //
					console.log('topPriceRange:', topPriceRange)
					console.log('bottomPriceRange:', bottomPriceRange)
					console.log('myOrder.price:', myOrder.price)
					console.log()
	
					// if ANY of the orders are within the range set alreadyBought
					if (
						myOrder.price >= bottomPriceRange &&
						myOrder.price <= topPriceRange
					) { alreadyBought = true }
					else { alreadyBought = false }
				}
			})
		}
		else { alreadyBought = false } // If their are no orders!

		return alreadyBought
	}
}


// [EXPORT] //
module.exports = AlgoFunctions