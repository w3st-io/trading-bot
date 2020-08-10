/**
 * %%%%%%%%%%%%%% *
 * %%% CBALGO %%% *
 * %%%%%%%%%%%%%% *
*/
// [REQUIRE] Personal //
const CBAuthClient = require('./coinbase/CBAuthClient')
const CBPublicClient = require('./coinbase/CBPublicClient')
const MathFunctions = require('./MathFunctions')


// [ALGO] Average //
async function gregsAlgo(product_id, tradeAmount) {
	// [SET-PRODUCT-ID] If no params passed set Default
	if (!product_id) { return { status: false, message: 'No "product_id" Passed' } }


	// [INIT-CONST] //
	const timeFrames = [60, 300, 1800, 3600, 43200, 86400]
	const grossProfitMarginPct = 0.02
	const minimumInterval = 0.002 // smallest interval we’ll trade at
	const moderateInterval = 0.004 // moderate interval we’ll trade at
	const maximumInterval = 0.008 // largest interval we’ll trade at
	

	// [INIT] To Be Determined //
	let timeFramePriceAvgs = []
	let currentPrice = {}
	let myOrders = []
	let myFills = []
	let currentSellPrice = null
	let count = 0
	let currentInterval = 0
	let alreadyBought = false


	// [AVERAGES][GET] Average(s) //
	for (let i = 0; i < timeFrames.length; i++) {
		try {
			timeFramePriceAvgs[i] = await MathFunctions.getAverage(
				product_id,
				timeFrames[i]
			)
		}
		catch(e) { console.log(`Caught Error --> ${e}`) }
	}


	// [CURRENT-PRICE][GET] // [MY-ORDERS][GET] // [MY-FILLS][GET] //
	try {
		currentPrice = await CBPublicClient.t_getProductTicker(product_id)
		console.log('currentPrice:', currentPrice.price)

		myOrders = await CBAuthClient.t_getOrders()
		//console.log('myOrders:', myOrders)

		myFills = await CBAuthClient.t_getFills(product_id)
		//console.log('myFills:', myFills)
	}
	catch(e) { console.log(`Caught Error --> ${e}`) }


	// [CURRENT-SELL-PRICE][ARITHMETIC] currentSellPrice //
	currentSellPrice = currentPrice.price * (1 + grossProfitMarginPct)
	console.log('currentSellPrice:', currentSellPrice)


	// [COUNT][ARITHMETIC] Determine Count //
	if (timeFramePriceAvgs) {
		timeFramePriceAvgs.forEach(timeFramePriceAvg => {
			if (timeFramePriceAvg.average > currentPrice.price) {
				count = count + 1					
			}
			
			console.log(
				'timeframe:', timeFramePriceAvg.timeFrame, 
				'average:', timeFramePriceAvg.average
			)
		})
	}
	else { count = count + 1 }


	// [CURRENT-INTERVAL] Determine Interval //
	if (count <= 1) { currentInterval = maximumInterval }
	else if (count <= 4) { currentInterval = moderateInterval }
	else if (count <= 6) { currentInterval = minimumInterval }
	else { console.log(`Error Count Is: ${count}`) }
	console.log('count:', count)


	
	// [ALREADY-BOUGHT] //
	if (myOrders) {
		myOrders.forEach(myOrder => {
			if (myOrder.product_id == product_id) {
				// [INIT] //
				const topPriceRange = currentSellPrice * (1 + currentInterval)
				const bottomPriceRange = (currentSellPrice * (currentInterval - 1) * -1)

				// if ANY of the orders are within the range set alreadyBought
				if (myOrder.price >= bottomPriceRange && myOrder.price <= topPriceRange) {
					alreadyBought = true
				}
				else { alreadyBought = false }

				// [LOG] //
				console.log('topPriceRange:', topPriceRange)
				console.log('bottomPriceRange:', bottomPriceRange)
				console.log('myOrder.price:', myOrder.price)
			}
		})
	}
	else { alreadyBought = false } // If their are no orders!


	// [] //
	if (alreadyBought == false) {
		// Try to execute the trade
		/*
		try {
			await CBAuthClient.t_placeOrder(
				'Buy',
				null,
				null,
				product_id,
				tradeAmount
			)
		}
		catch (e) { console.log(`Trade Execution Caught Error --> ${e}`) }
		*/

		return { status: true, message: `Bought @ ${currentPrice.price}` }
	}
	else { return { status: true, message: `Bought @ ${currentPrice.price}` } }


	// [MAIN-LOG] //
	//console.log('timeFramePriceAvgs:', timeFramePriceAvgs)
	//console.log('currentPrice:', currentPrice.price)
	//console.log('myOrders:', myOrders)
	//console.log('count:', count)
}

// [EXPORT] //
module.exports = {
	gregsAlgo,
}