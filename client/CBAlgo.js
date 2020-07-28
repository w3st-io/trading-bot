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
	static async readAllWitinTimeFrame(product_id, timeframe) {
		if(!product_id) { product_id = 'ETH-USD' }

		let currentTime = new Date()
		let pastTime = new Date()

		pastTime.setSeconds(pastTime.getSeconds() - timeframe)

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
	static async getAverage(product_id) {
		let tradesSum = 0
		let average = 0
		let timeframe = 60
		let trades = await this.readAllWitinTimeFrame(product_id, timeframe)
		
		trades.forEach((trade) => { tradesSum = tradesSum + trade.price })

		average = tradesSum / trades.length

		console.log('AVERAGE:', average)

		return average
	}
}

// [EXPORT] //
module.exports = CBAlgo