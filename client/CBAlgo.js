/**
 * %%%%%%%%%%%%%%%%%%%% *
 * %%% CBALGO CLASS %%% *
 * %%%%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] //
const mongodb = require('mongodb')
require('dotenv').config()


class CBAlgo {
	// [MONGODB-CONNECT] //
	static async connect() {
		const uri = process.env.MONGO_URI
		const db_name = process.env.DB || 'trader'
		const c_name = 'tickers'
		
		const client = await mongodb.MongoClient.connect(
			uri,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true
			}	
		)

		return client.db(db_name).collection(c_name)
	}


	// [READ-ALL-ALL] //
	static async readAllAll(product_id) {
		if(!product_id) { product_id = 'ETH-USD' }

		const blocks = await this.connect()
		const returnedData = await blocks.find({ product_id: product_id }).toArray()
			
		return returnedData
	}


	// [READL-ALL] Within Timeframe //
	static async readAllWitinTimeFrame(product_id, timeFrame) {
		if(!product_id) { product_id = 'ETH-USD' }

		let currentTime = new Date()
		let pastTime = new Date()

		pastTime.setSeconds(pastTime.getSeconds() - timeFrame)

		const blocks = await this.connect()
		const returnedData = await blocks.find(
			{
				product_id: product_id,
				time: {
					$gte: pastTime,
					$lt: currentTime
				}
			}
		).toArray()
			
		return returnedData
	}


	// [AVERAGE] //
	static async getAverage(product_id, timeFrame) {
		// [INIT] //
		if (!timeFrame) { timeFrame = 1440 }
		let sumOfTradePrices = 0

		// [READL-ALL] Within Timeframe //
		const trades = await this.readAllWitinTimeFrame(product_id, timeFrame)
		
		// [ARITHMETIC] Sum //
		trades.forEach((trade) => {
			sumOfTradePrices = sumOfTradePrices + trade.price
		})

		// [ARITHMETIC] Average //
		const average = sumOfTradePrices / trades.length

		return {
			status: true,
			timeFrame: timeFrame,
			average: average,
		}
	}
}

// [EXPORT] //
module.exports = CBAlgo