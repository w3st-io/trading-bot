/**
 * %%%%%%%%%%%%%%%%%%%%%%%% *
 * %%% ECCENTRIC SERVER %%% *
 * %%%%%%%%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] //
const CoinbasePro = require('coinbase-pro')
const mongoose = require('mongoose')
require('dotenv').config()


// [REQUIRE] Personal //
const TickerModel = require('./models/TickerModel')


// [MONGOOSE-CONNECT] //
mongoose.connect(
	process.env.MONGO_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	(e) => {
		if (e) { console.log(`Mongoose Connection Error --> ${e}`) }
		else { console.log('Mongoose Connected to DB') }
	}
)
mongoose.set('useFindAndModify', false)


// [SOCKET] //
const websocket = new CoinbasePro.WebsocketClient(
	['ETH-USD'],
	'wss://ws-feed.pro.coinbase.com',
	{
		key: process.env.KEY || '',
		secret: process.env.SECRET || '',
		passphrase: process.env.PASS_PHRASE || '',
	},
	{ channels: ['ticker'] }
)


// [WSS] message //
websocket.on('message', async (data) => {
	if (data.type == 'ticker') {
		// [LOG] //
		console.log(data)

		// [STORE] //
		let document = data
		document = new TickerModel(
			{
				_id: mongoose.Types.ObjectId(),
				sequence: document.sequence,
				product_id: document.product_id,
				price: document.price,
				open_24h: document.open_24h,
				volume_24h: document.volume_24h,
				low_24h: document.low_24h,
				high_24h: document.high_24h,
				volume_30d: document.volume_30d,
				best_bid: document.best_bid,
				best_ask: document.best_ask,
				side: document.side,
				time: new Date(document.time),
				trade_id: document.trade_id,
				last_size: document.last_size,
			}
		)

		// [SAVE-TO-DB] //
		try { await document.save() }
		catch(e) { console.log(`Caught Error --> ${e}`) }
	}
})


// [WSS] errpr //
websocket.on('error', function (err) { console.log('Error:', err) })


// [WSS] close //
websocket.on('close', () => { console.log('CLOSED') })