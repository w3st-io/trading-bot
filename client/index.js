/**
 * %%%%%%%%%%%%%%%%%%%%%%%% *
 * %%% ECCENTRIC TRADER %%% *
 * %%%%%%%%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] Personal //
const Algo = require('./Algo')

// Trade Amount //
tradeAmount = 50

// [TRADING-BOT-START] //
async function run() {	
	while (1 == 1) {
		const returnedData = await Algo.gregsAlgo(null, tradeAmount)

		console.log('[CLIENT-INDEX] returnedData:', returnedData)

		if (!returnedData.status) break
	}
}

// Call the async function
run()