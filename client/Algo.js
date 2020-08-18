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
	const grossProfitMarginPct = 1.02
	const maxInterval = 0.008 // Largest Trade Interval
	const medInterval = 0.004 // Moderate Trade Interval
	const minInterval = 0.002 // Smallest Trade Interval
	let currentPrice

	try {
		// [CURRENT-PRICE][GET] // [MY-FILLS][GET] //
		currentPrice = await CBPublicClient.t_getProductTicker(product_id)
	}
	catch(e) { console.log(`Algo: Caught Error --> ${e}`) }


	// [SELL-PRICE][ARITHMETIC] sellPrice //
	const sellPrice = await AlgoFunctions.determinSellPrice(
		currentPrice.price,
		grossProfitMarginPct
	)


	// [TIME-FRAME-PRICE-AVGS][GET] Average(s) //
	const timeFramePriceAvgs = await AlgoFunctions.determinTimeFramePriceAvgs(
		timeFrames,
		product_id
	)


	// [COUNT][ARITHMETIC] Determine Count //
	// Count is the number of averages about currentPrice
	const avgsAboveCurrentPriceCount = await AlgoFunctions.determinCount(
		timeFramePriceAvgs
	)


	// [CURRENT-INTERVAL] Determine Interval //
	const currentInterval = await AlgoFunctions.determinCurrentInterval(
		avgsAboveCurrentPriceCount,
		maxInterval,
		medInterval,
		minInterval
	)

	
	// [ALREADY-BOUGHT] //
	const alreadyBought = await AlgoFunctions.determinAlreadyBought(
		product_id,
		sellPrice,
		currentInterval
	)


	// [] //
	if (!alreadyBought) {
		// [EXECUTE-TRADE] Buy Order //
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
		// [SIZE] //
		const sellSize = await AlgoFunctions.determinSellSize(tradeAmount)
		
		// [EXECUTE-TRADE] Sell Order //


		return {
			status: true,
			message: `Bought @ ${currentPrice.price}`
		}
	}
	else {
		// [SIZE] //
		const sellSize = await AlgoFunctions.determinSellSize(tradeAmount)

		
		return {
			status: true,
			message: `Not Bought @ ${currentPrice.price}`
		}
	}


	// [LOG] //
	console.log('currentPrice:', currentPrice.price)
	//console.log('myOrders:', myOrders)
	//console.log('myFills:', myFills)
}

// [EXPORT] //
module.exports = {
	gregsAlgo,
}