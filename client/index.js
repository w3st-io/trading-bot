/**
 * %%%%%%%%%%%%%%%%%%%%%%%% *
 * %%% ECCENTRIC TRADER %%% *
 * %%%%%%%%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] //
require('dotenv').config()


// [REQUIRE] Personal //
const CBAuthClient = require('./CBAuthClient')
const CBPublicClient = require('./CBPublicClient')
const CBAlgo = require('./CBAlgo')
////////////////////////////////////////////////////////////

// 1 5 30 60 720 1440 Minutes
let timeFrames = [60, 300, 1800, 3600, 43200, 86400]
let timeFramePriceAvgs = []

async function trade() {
	// For Each timeFrame in timeFrames
	for (let i = 0; i < timeFrames.length; i++) {
		console.log(timeFrames[i])
		timeFramePriceAvgs[i] = await CBAlgo.getAverage(
			null,
			timeFrames[i]
		)
	}

	console.log('timeFramePriceAvgs:', timeFramePriceAvgs)
}


trade()
