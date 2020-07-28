/**
 * %%%%%%%%%%%%%%%%%%%%%%%% *
 * %%% ECCENTRIC TRADER %%% *
 * %%%%%%%%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] //
require('dotenv').config()


// [REQUIRE] Personal //
const Algo = require('./Algo')


/***** [TRADING-BOT-START] *****/
// [INIT] //
let timeFrames = [60, 300, 1800, 3600, 43200, 86400]
let timeFramePriceAvgs = []

async function trade() {
	// For Each timeFrame in timeFrames
	for (let i = 0; i < timeFrames.length; i++) {
		timeFramePriceAvgs[i] = await Algo.getAverage(
			null,
			timeFrames[i]
		)
	}

	console.log('timeFramePriceAvgs:', timeFramePriceAvgs)
}


trade()
