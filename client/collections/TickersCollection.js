/**
 * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% *
 * %%% TICKERS COLLECTIONS CLASS %%% *
 * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] //
const mongodb = require('mongodb')
require('dotenv').config()


class TickersCollection {
	// [MONGODB-CONNECT] //
	static async connect() {
		try {
			const client = await mongodb.MongoClient.connect(
				process.env.MONGO_URI,
				{
					useNewUrlParser: true,
					useUnifiedTopology: true
				}	
			)
	
			return client.db('trader').collection('tickers')
		}
		catch (e) { `connect: Caught Error --> ${e}` }
	}


	// [READ-ALL-ALL] //
	static async readAllAll(product_id) {
		if(!product_id) { product_id = 'ETH-USD' }

		const blocks = await this.connect()
		return await blocks.find({ product_id: product_id }).toArray()
	}


	// [READL-ALL] Within Timeframe //
	static async readAllWithinTimeFrame(product_id, timeFrame) {
		if(!product_id) { product_id = 'ETH-USD' }
		let currentTime = new Date()
		let pastTime = new Date()

		// [ARITHMETIC] Calculate Past Time //
		pastTime.setSeconds(pastTime.getSeconds() - timeFrame)

		const blocks = await this.connect()

		return await blocks.find(
			{
				product_id: product_id,
				time: {
					$gte: pastTime,
					$lt: currentTime
				}
			}
		).toArray()
	}
}

// [EXPORT] //
module.exports = TickersCollection