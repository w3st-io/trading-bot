// [REQUIRE] //
const mongoose = require("mongoose")


// [SCHEMA MODEL] //
const TickerSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	
	type: { type: String, },

	sequence: { type: Number, },

	product_id: { type: String, },

	price: { type: Number, },

	open_24h: { type: Number, },

	volume_24h: { type: Number, },

	low_24h: { type: Number, },

	high_24h: { type: Number, },

	volume_30d: { type: Number, },

	best_bid: { type: Number, },

	best_ask: { type: Number, },

	side: { type: String, },

	time: { type: Date, },

	trade_id: { type: Number, },

	last_size: { type: Number, },
})


// [EXPORTS] //
module.exports = mongoose.model('Ticker', TickerSchema)