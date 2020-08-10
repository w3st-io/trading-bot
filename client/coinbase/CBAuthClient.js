/**
 * %%%%%%%%%%%%%%%%%%%% *
 * %%% CBALGO CLASS %%% *
 * %%%%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] //
const CoinbasePro = require('coinbase-pro')
require('dotenv').config()


// [INIT] //
const coinbaseURI = 'https://api.pro.coinbase.com'
const sandboxCoinbaseURI = 'https://api-public.sandbox.pro.coinbase.com'


// [CB-AUTH-CLIENT] //
const authedClient = new CoinbasePro.AuthenticatedClient(
	process.env.KEY || '',
	process.env.SECRET || '',
	process.env.PASS_PHRASE || '',
	sandboxCoinbaseURI
)


/*** [CLASS] ***/
class CBAuthClient {
	// [GET-COINBASE-ACCOUNTS] //
	static async t_getCoinbaseAccounts() {
		try { return await authedClient.getCoinbaseAccounts() }
		catch (e) { console.log(`getCoinbaseAccounts: Caught Error --> ${e}`) }
	}


	// [GET-PAYMENT-METHOD] //
	static async getPaymentMethods() {
		try { return await authedClient.getPaymentMethods() }
		catch (e) { console.log(`getPaymentMethods: Caught Error --> ${e}`) }
	}


	// [GET-ACCOUNTS] //
	static async t_getAccounts() {
		try { return await authedClient.getAccounts() }
		catch (e) { console.log(`getAccounts: Caught Error --> ${e}`) }
	}


	// [GET-ACCOUNT] (Single) //
	static async t_getAccount(accountID) {
		try { return await authedClient.getAccount(accountID) }
		catch (e) { console.log(`getAccount: Caught Error --> ${e}`) }
	}

	// [GET-ACCOUNT-HISTORY] //
	static async t_getAccountHistory(accountID) {
		try { return await authedClient.getAccountHistory(accountID) }
		catch (e) { console.log(`getAccountHistory: Caught Error --> ${e}`) }
	}
	

	// [BUY] //
	static async t_buy(price, size, product_id) {
		const buyParams = {
			price: price, // USD
			size: size,
			product_id: product_id,
		}

		try { return await authedClient.buy(buyParams) }
		catch (e) { console.log(`buy: Caught Error --> ${e}`) }
	}

	// [SELL] //
	static async t_sell(price, size, product_id) {
		const buyParams = {
			price: price, // USD
			size: size,
			product_id: product_id,
		}

		try { return await authedClient.sell(buyParams) }
		catch (e) { console.log(`sell: Caught Error --> ${e}`) }
	}

	
	// [PLACE-ORDER] //
	static async t_placeOrder(side, price, size, product_id) {
		const params = {
			side: side, // BUY/SELL
			price: price, // USD
			size: size,
			product_id: product_id,
		}
	
		try { return await authedClient.placeOrder(params) }
		catch(e) { console.log(`placeOrder: Caught Error --> ${e}`) }
	}


	// [GET-ORDERS] //
	static async t_getOrders() {
		try { return await authedClient.getOrders() }
		catch(e) { console.log(`getOrders: Caught Error --> ${e}`) }
	}
	

	// [GET-FILLS]
	static async t_getFills(product_id) {
		const params = { product_id: product_id }

		try { return await authedClient.getFills(params) }
		catch(e) { console.log(`getFills: Caught Error --> ${e}`) }
	}
}

// [EXPORT] //
module.exports = CBAuthClient