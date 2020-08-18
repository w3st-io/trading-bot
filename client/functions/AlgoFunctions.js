/**
 * %%%%%%%%%%%%%%%%%%%%%%%%%%%% *
 * %%% ALGO FUNCTIONS CLASS %%% *
 * %%%%%%%%%%%%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] Perosnal //
const CBPublicClient = require('../coinbase/CBPublicClient')
const CBAuthClient = require('../coinbase/CBAuthClient')
const MathFunctions = require('./MathFunctions')


class AlgoFunctions {
	// [SELL-PRICE][ARITHMETIC] sellPrice //
	static determinSellPrice(currentPrice, grossProfitMarginPct) {
		let sellPrice = currentPrice * grossProfitMarginPct

		//console.log('sellPrice:', sellPrice, '\n')

		return sellPrice
	}


	// [TIME-FRAME-PRICE-AVGS][GET] Average(s) //
	static async determinTimeFramePriceAvgs(timeFrames, product_id) {
		let timeFramePriceAvgs = []

		for (let i = 0; i < timeFrames.length; i++) {
			try {
				//
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
	static async determinCount(timeFramePriceAvgs) {
		let avgsAboveCurrentPriceCount = 0
		let currentPrice

		// [CURRENT-PRICE][GET] //
		try { currentPrice = await CBPublicClient.t_getProductTicker(product_id) }
		catch(e) { `AlgoFunctions: Caught Error --> ${e}` }

		if (timeFramePriceAvgs) {
			for (let i = 0; i < timeFramePriceAvgs.length; i++) {
				if (timeFramePriceAvgs[i].average > currentPrice.price) {
					avgsAboveCurrentPriceCount
				}

				/*
				console.log(
					'timeframe:', timeFramePriceAvgs[i].timeFrame, 
					'average:', timeFramePriceAvgs[i].average
				)
				*/
			}
		}
		else { avgsAboveCurrentPriceCount++ }

		//console.log('avgsAboveCurrentPriceCount:', avgsAboveCurrentPriceCount, '\n')

		return avgsAboveCurrentPriceCount
	}


	// [CURRENT-INTERVAL] Determine Interval //
	static async determinCurrentInterval(avgsAboveCurrentPriceCount, maxInterval, medInterval, minInterval) {
		let currentInterval = ''
		//  5  4  3  2  1  0
		if (avgsAboveCurrentPriceCount >= 5) currentInterval = minInterval
		else if (avgsAboveCurrentPriceCount >= 3) currentInterval = medInterval
		else if (avgsAboveCurrentPriceCount >= 0) currentInterval = maxInterval
		else console.log(`Error Count Is: ${avgsAboveCurrentPriceCount}`)

		//console.log('currentInterval:', currentInterval, '\n')

		return currentInterval
	}


	// [ALREADY-BOUGHT] //
	static async determinAlreadyBought(product_id, sellPrice, currentInterval) {
		let alreadyBought = null
		let myOrders

		// [MY-ORDERS][GET] //
		try { myOrders = await CBAuthClient.t_getOrders() }
		catch(e) { `AlgoFunctions: Caught Error --> ${e}` }

		// If Orders Exist.. //
		if (myOrders) {
			myOrders.forEach(myOrder => {
				if (myOrder.product_id == product_id) {
					// [INIT] //
					// (100.08% of (102% of currentPrice))
					const topPriceRange = sellPrice * (1 + currentInterval)
					const bottomPriceRange = (sellPrice * (currentInterval - 1) * -1)

					// [LOG] //
					//console.log('topPriceRange:', topPriceRange)
					//console.log('bottomPriceRange:', bottomPriceRange)
					//console.log('myOrder.price:', myOrder.price, '\n')
	
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

		//console.log('alreadyBought:', alreadyBought)
		
		return alreadyBought
	}


	static async determinSellSize(tradeAmount) {
		console.log(tradeAmount)
		let myFills = []

		// [MY-FILLS][GET] //
		try { myFills = await CBAuthClient.t_getFills(product_id) }
		catch(e) { `AlgoFunctions: Caught Error --> ${e}` }

		myFills.forEach(myFill => {
			console.log(myFill.usd_volume)
		})

		// multiple Executed price and fillsize
		
		let ss = [myFills[7], myFills[8], myFills[9]]
		
		let myFillTotal = 0
		let mySizeTotal = 0

		ss.forEach(myFill => {
			if (!(myFillTotal >= (tradeAmount * .985) && myFillTotal < tradeAmount)) {
				
				let temp = myFillTotal + myFill.usd_volume
				console.log('ss', temp)

				if (temp < tradeAmount) {
					myFillTotal = myFillTotal + myFill.usd_volume
					mySizeTotal = mySizeTotal + myFill.size

					console.log('myFill:', myFill)
				}
			}
		})
		

		console.log('myFillTotal:', myFillTotal)
		console.log('mySizeTotal:', mySizeTotal)
	}
}


// [EXPORT] //
module.exports = AlgoFunctions