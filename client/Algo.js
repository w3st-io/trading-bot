/**
 * %%%%%%%%%%%%%%%%%%%% *
 * %%% CBALGO CLASS %%% *
 * %%%%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] Personal //
const TickersCollection = require('./collections/TickersCollection')


class Algo {
	// [ALGO] Average //
	static async getAverage(product_id, timeFrame) {
		// [INIT] //
		let sumOfTradePrices = 0

		try {
			// [READL-ALL] Within Timeframe //
			const trades = await TickersCollection.readAllWitinTimeFrame(
				product_id,
				timeFrame
			)
			
			// [ARITHMETIC] Sum //
			trades.forEach((trade) => {
				sumOfTradePrices = sumOfTradePrices + trade.price
			})

			return {
				status: true,
				message: '',
				timeFrame: timeFrame,
				totalTrades: trades.length,
				average: (sumOfTradePrices / trades.length),
			}
		}
		catch(e) {
			return {
				status: false,
				message: `Caught Error --> ${e}`,
				timeFrame: null,
				average: average,
			}
		}
	}
}

// [EXPORT] //
module.exports = Algo