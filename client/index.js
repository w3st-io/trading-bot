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
	//while (1 == 1) {
		await Algo.algo(null, tradeAmount)
	//}
}

// Call the async function
run()