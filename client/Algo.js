/**
 * %%%%%%%%%%%%%%%%%%%% *
 * %%% CBALGO CLASS %%% *
 * %%%%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] Personal //
const CBAuthClient = require('./coinbase/CBAuthClient')
const CBPublicClient = require('./coinbase/CBPublicClient')
const MathFunctions = require('./MathFunctions')


class Algo {
	// [ALGO] Average //
	static async algo(product_id, tradeAmount) {
		// If no params passed set Default
		if (!product_id) product_id = 'ETH-USD'

		// [INIT] //
		const timeFrames = [60, 300, 1800, 3600, 43200, 86400]
		const grossProfitMarginPct = 0.02
		const minimumInterval = 0.002 // smallest interval we’ll trade at
		const moderateInterval = 0.004 // moderate interval we’ll trade at
		const maximumInterval = 0.008 // largest interval we’ll trade at
		

		// [INIT] To Be Determined //
		let timeFramePriceAvgs = []
		let currentPrice = {}
		let myOrders = []
		let grossProfitMarginPrice = 0
		let count = 0
		let currentInterval = 0

		// [GET] Average(s) //
		for (let i = 0; i < timeFrames.length; i++) {
			try {
				timeFramePriceAvgs[i] = await MathFunctions.getAverage(
					product_id,
					timeFrames[i]
				)	
			}
			catch(e) { console.log(`Caught Error --> ${e}`) }
		}

		// [GET] currentPrice // [GET] myOrders //
		try {
			currentPrice = await CBPublicClient.t_getProductTicker(product_id)
			myOrders = await CBAuthClient.t_getOrders()
		}
		catch(e) { console.log(`Caught Error --> ${e}`) }


		// [ARITHMETIC] grossProfitMarginPrice //
		grossProfitMarginPrice = currentPrice.price * (1 + grossProfitMarginPct)


		// [ARITHMETIC] Determine Count //
		timeFramePriceAvgs.forEach(timeFramePriceAvg => {
			if (timeFramePriceAvg.average > currentPrice.price) {
				count = count + 1					
			}
		})

		// [ARITHMETIC] Determine Interval //
		if (count <= 1) { currentInterval = maximumInterval }
		else if (count <= 4) { currentInterval = moderateInterval }
		else if (count <= 6) { currentInterval = minimumInterval }
		else { console.log(`Error Count Is: ${count}`) }

		let something = false
		myOrders.forEach(myOrder => {
			if (myOrder.product_id == product_id) {
				// [INIT] //
				const currentSellPrice = currentPrice.price * (1 + grossProfitMarginPct)
				const topPriceRange = currentSellPrice * (1 + currentInterval)
				const bottomPriceRange = (currentSellPrice * (currentInterval - 1) * -1)

				// [LOG] //
				console.log('grossProfitMarginPct:', grossProfitMarginPct)
				console.log('currentSellPrice:', currentSellPrice)
				console.log('topPriceRange:', topPriceRange)
				console.log('bottomPriceRange:', bottomPriceRange)
				console.log('myOrder.price:', myOrder.price)

				// if ANY of the orders are within the range
				if (
					myOrder.price <= topPriceRange &&
					myOrder.price >= bottomPriceRange
				) { something = true }
				else { something = false }
			}	
		})	

		if (something == true) {
			// Try to execute the trade
			console.log(`Will buy @ ${currentPrice.price}`)

			try {
				/*
				await CBAuthClient.t_placeOrder(
					'Buy',
					null,
					null,
					product_id,
					tradeAmount
				)
				*/
			}
			catch (e) { console.log(`Trade Execution Caught Error --> ${e}`) }
		}
		else { console.log(`Will NOT buy @ ${currentPrice.price}`) }

		// [LOG] //
		//console.log('timeFramePriceAvgs:', timeFramePriceAvgs)
		//console.log('currentPrice:', currentPrice.price)
		//console.log('myOrders:', myOrders)
		//console.log('count:', count)
	}
}

// [EXPORT] //
module.exports = Algo