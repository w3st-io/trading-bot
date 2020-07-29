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
	coinbaseURI
)


/*** [CLASS] ***/
class CBAuthClient {
	// [GET-ACCOUNT] //
	static async t_getAccount() {
		try { return await authedClient.getAccounts() }
		catch (e) { console.log(`Caught Error --> ${e}`) }
	}
	
	
	// [PLACE-ORDER] //
	static async t_placeOrder() {
		const params = {
			side: 'buy',
			price: '266', // USD
			size: '.05', // ETH
			product_id: 'ETH-USD',
		}
	
		try { return await authedClient.placeOrder(params) }
		catch(e) { console.log(`Caught Error --> ${e}`) }
	}

	// [GET-ORDERS] //
	static async t_getOrders() {
		try { return await authedClient.getOrders() }
		catch(e) { console.log(`Caught Error --> ${e}`) }
	}
}

// [EXPORT] //
module.exports = CBAuthClient