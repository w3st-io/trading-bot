/**
 * %%%%%%%%%%%%%%%%%%%% *
 * %%% CBALGO CLASS %%% *
 * %%%%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] //
const CoinbasePro = require('coinbase-pro')


// [CB-PUBLIC-CLIENT] //
const publicClient = new CoinbasePro.PublicClient()


/*** [CLASS] ***/
class CBPublicClient {
	// [READ] getProducts //
	static async t_getProducts() {
		try { return await publicClient.getProducts() }
		catch(e) { return `Caught Error --> ${e}` }
	}
	

	// [READ] getProductOrders //
	static async t_getProductOrderBook(product_id, level) {
		// If no params passed set Default
		if (!product_id) product_id = 'ETH-USD'
		if (!level) level = 1

		try {
			return await publicClient.getProductOrderBook(
				product_id,
				{ level: level }
			)
		}
		catch(e) { return `Caught Error --> ${e}` }
	}

	
	// [READ] getProductTicker //
	static async t_getProductTicker(product_id) {
		// If no params passed set Default
		if (!product_id) product_id = 'ETH-USD'

		try { return await publicClient.getProductTicker(product_id) }
		catch(e) { return `Caught Error --> ${e}` }
	}


	// [READ] getProductTrades //
	static async t_getProductTrades(product_id) {
		// If no params passed set Default
		if (!product_id) product_id = 'ETH-USD'

		try { return await publicClient.getProductTrades(product_id) }
		catch(e) { return `Caught Error --> ${e}` }
	}


	// [READ] t_getProductTradeStream //
	static async t_getProductTradeStream(product_id, tradesFrom, tradesTo) {
		// If no params passed set Default
		if (!product_id) product_id = 'ETH-USD'

		try {
			return await publicClient.getProductTradeStream(
				product_id,
				tradesFrom,
				tradesTo
			)
		}
		catch(e) { return `Caught Error --> ${e}` }
	}


	// [READ] t_getProductHistoricRates //
	static async t_getProductHistoricRates(product_id, granularity) {
		// If no params passed set Default
		if (!product_id) product_id = 'ETH-USD'

		if (granularity) {
			try {
				return await publicClient.getProductHistoricRates(
					product_id,
					{ granularity: granularity },
				)
			}
			catch(e) { return `Caught Error --> ${e}` }
		}
		else {
			try{
				return await publicClient.getProductHistoricRates(product_id)
			}
			catch(e) { return `Caught Error --> ${e}` }
		}
	}


	// [READ] t_getProduct24HrStats //
	static async t_getProduct24HrStats(product_id) {
		// If no params passed set Default
		if (!product_id) product_id = 'ETH-USD'

		try { return await publicClient.getProduct24HrStats(product_id) }
		catch(e) { return `Caught Error --> ${e}` }
	}


	// [READ] t_getProduct24HrStats //
	static async t_getProduct24HrStats() {
		try { return await publicClient.getCurrencies() }
		catch(e) { return `Caught Error --> ${e}` }
	}


	// [READ] t_getTime //
	static async t_getTime() {
		try { return await publicClient.getTime() }
		catch(e) { return `Caught Error --> ${e}` }
	}
}

// [EXPORT] //
module.exports = CBPublicClient