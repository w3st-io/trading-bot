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
	static async algo(product_id) {
		// If no params passed set Default
		if (!product_id) product_id = 'ETH-USD'

		// [INIT] //
		const timeFrames = [60, 300, 1800, 3600, 43200, 86400]
		const grossProfitMarginPct = 0.02
		const minimumInt = 0.002 // smallest interval we’ll trade at
		const moderateInt = 0.004 // moderate interval we’ll trade at
		const maximumInt = 0.008 // largest interval we’ll trade at


		// [INIT] To Be Determined //
		let timeFramePriceAvgs = []
		let grossProfitMarginPrice = 0
		let count = 0
		

		// For Each timeFrame in timeFrames
		for (let i = 0; i < timeFrames.length; i++) {
			try {
				timeFramePriceAvgs[i] = await MathFunctions.getAverage(
					product_id,
					timeFrames[i]
				)	
			}
			catch(e) { console.log(`Caught Error --> ${e}`) }
		}

		try {
			// Get Current Price of Asset
			const currentPrice = await CBPublicClient.t_getProductTicker(product_id)

			// Get My Orders
			const myOrders = await CBAuthClient.t_getOrders()

			// [ARITHMETIC] //
			grossProfitMarginPrice = currentPrice.price * (1 + grossProfitMarginPct)


			// For each timeFramePriceAvg in timeFramePriceAvgs
			timeFramePriceAvgs.forEach((timeFramePriceAvg) => {
				if (timeFramePriceAvg.average > currentPrice.price) {
					count = count + 1
				}
			})

			// [LOG] //
			console.log('timeFramePriceAvgs:', timeFramePriceAvgs)
			console.log('currentPrice:', currentPrice.price)
			//console.log('myOrders:', myOrders)
			console.log('count:', count)
		}
		catch(e) { console.log(`Caught Error --> ${e}`) }
	}
}

// [EXPORT] //
module.exports = Algo