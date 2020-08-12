/**
 * %%%%%%%%%%%%%% *
 * %%% CBALGO %%% *
 * %%%%%%%%%%%%%% *
*/
// [REQUIRE] Personal //
const CBAuthClient = require('./coinbase/CBAuthClient')
const CBPublicClient = require('./coinbase/CBPublicClient')
const MathFunctions = require('./functions/MathFunctions')


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
	let sellPrice = null
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


	// [SELL-PRICE][ARITHMETIC] sellPrice //
	sellPrice = currentPrice.price * (1 + grossProfitMarginPct)
	console.log('sellPrice:', sellPrice)


	// [COUNT][ARITHMETIC] Determine Count //
	count = algoFunctions.determinCount(timeFramePriceAvgs, currentPrice)


	// [CURRENT-INTERVAL] Determine Interval //
	if (count <= 1) { currentInterval = maximumInterval }
	else if (count <= 4) { currentInterval = moderateInterval }
	else if (count <= 6) { currentInterval = minimumInterval }
	else { console.log(`Error Count Is: ${count}`) }
	console.log('currentInterval:', currentInterval)


	
	// [ALREADY-BOUGHT] //
	alreadyBought = algoFunctions.determinAlreadyBought(
		myOrders,
		product_id,
		sellPrice,
		currentInterval
	)
	console.log('alreadyBought:', alreadyBought)


	// [] //
	if (!alreadyBought) {
		/*
		// [EXECUTE-TRADE] //
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