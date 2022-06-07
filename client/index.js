/**
 * %%%%%%%%%%%%%%%%%%%%%%%% *
 * %%% ECCENTRIC TRADER %%% *
 * %%%%%%%%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] Personal //
const Algo = require('./Algo')


// Product_id & Trade Amount //
product_id = 'ETH-USD'
tradeAmount = 70


// [TRADING-BOT-START] //
async function run() {	
	while (true) {
		const returnedData = await Algo.gregsAlgo(product_id, tradeAmount)

		console.log('[CLIENT-INDEX] returnedData:', returnedData)

		if (!returnedData.status) break
	}
}

// Call the async function
run()