/**
 * %%%%%%%%%%%%%% *
 * %%% CBALGO %%% *
 * %%%%%%%%%%%%%% *
*/
// [REQUIRE] Personal //
const CBAuthClient = require('./coinbase/CBAuthClient')
const CBPublicClient = require('./coinbase/CBPublicClient')
const AlgoFunctions = require('./functions/AlgoFunctions')


// [ALGO] Average //
async function gregsAlgo(product_id, tradeAmount) {
	// [SET-PRODUCT-ID] If no params passed set Default
	if (!product_id) { return { status: false, message: 'No "product_id" Passed' } }


	// [INIT] // CONST //
	const timeFrames = [60, 300, 1800, 3600, 43200, 86400]
	const grossProfitMarginPct = 0.02
	const maxInterval = 0.008 // Largest Trade Interval
	const medInterval = 0.004 // Moderate Trade Interval
	const minInterval = 0.002 // Smallest Trade Interval
	let timeFramePriceAvgs = []
	let currentPrice = {}
	let myOrders = []
	let myFills = []
	let sellPrice = null
	let count = 0
	let currentInterval = 0
	let alreadyBought = false
	try {
		// [CURRENT-PRICE][GET] // [MY-ORDERS][GET] // [MY-FILLS][GET] //
		currentPrice = await CBPublicClient.t_getProductTicker(product_id)
		myOrders = await CBAuthClient.t_getOrders()
		myFills = await CBAuthClient.t_getFills(product_id)
	}
	catch(e) { console.log(`Algo: Caught Error --> ${e}`) }


	// [SELL-PRICE][ARITHMETIC] sellPrice //
	sellPrice = AlgoFunctions.determinSellPrice(
		currentPrice.price,
		grossProfitMarginPct
	)


	// [TIME-FRAME-PRICE-AVGS][GET] Average(s) //
	timeFramePriceAvgs = await AlgoFunctions.determinTimeFramePriceAvgs(
		timeFrames,
		product_id
	)


	// [COUNT][ARITHMETIC] Determine Count //
	count = AlgoFunctions.determinCount(timeFramePriceAvgs, currentPrice)


	// [CURRENT-INTERVAL] Determine Interval //
	currentInterval = AlgoFunctions.determinCurrentInterval(
		count,
		maxInterval,
		medInterval,
		minInterval
	)

	
	// [ALREADY-BOUGHT] //
	alreadyBought = AlgoFunctions.determinAlreadyBought(
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
	else { return { status: true, message: `Not Bought @ ${currentPrice.price}` } }


	// [LOG] //
	console.log('currentPrice:', currentPrice.price)
	//console.log('myOrders:', myOrders)
	//console.log('myFills:', myFills)
}

// [EXPORT] //
module.exports = {
	gregsAlgo,
}