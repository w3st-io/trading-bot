/**
 * %%%%%%%%%%%%%%%%%%%%%%%% *
 * %%% ECCENTRIC TRADER %%% *
 * %%%%%%%%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] //
// [REQUIRE] Personal //
const Algo = require('./Algo')



// [TRADING-BOT-START] //
tradeAmount = 50
async function run() {	
	while (1 == 1) {
		const returnedData = await Algo.gregsAlgo(null, tradeAmount)

		console.log('[CLIENT-INDEX] returnedData:', returnedData)

		if (!returnedData.status) break
	}
}

// Call the async function
run()