/**
 * %%%%%%%%%%%%%%%%%%%%%%%%%%%% *
 * %%% MATH FUNCTIONS CLASS %%% *
 * %%%%%%%%%%%%%%%%%%%%%%%%%%%% *
 * Basic Math Functions
 * Should not contain algorithmic stuff
*/
// [REQUIRE] Personal //
const TickersCollection = require('../collections/TickersCollection')


class MathFunctions {
	// [ALGO] Average //
	static async getAverage(product_id, timeFrame) {
		// [INIT] //
		let sumOfTradePrices = 0

		try {
			// [READL-ALL] Within Timeframe //
			const trades = await TickersCollection.readAllWithinTimeFrame(
				product_id,
				timeFrame
			)
			
			// [ARITHMETIC] Sum //
			trades.forEach((trade) => {
				sumOfTradePrices = sumOfTradePrices + trade.price
			})

			return {
				status: true,
				message: 'Successfully calculated avg',
				timeFrame: timeFrame,
				totalTrades: trades.length,
				average: (sumOfTradePrices / trades.length),
			}
		}
		catch(e) {
			return {
				status: false,
				message: `Caught Error --> ${e}`,
			}
		}
	}
}


// [EXPORT] //
module.exports = MathFunctions