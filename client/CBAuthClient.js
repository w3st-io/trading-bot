/**
 * %%%%%%%%%%%%%%%%%%%% *
 * %%% CBALGO CLASS %%% *
 * %%%%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] //
const CoinbasePro = require('coinbase-pro')
require('dotenv').config()


// [INIT-ENV] //
const key = process.env.KEY || ''
const secret = process.env.SECRET || ''
const passphrase = process.env.PASS_PHRASE || ''


// [INIT] //
const coinbaseURI = 'https://api.pro.coinbase.com'
const sandboxCoinbaseURI = 'https://api-public.sandbox.pro.coinbase.com'


// [CB-AUTH-CLIENT] //
const authedClient = new CoinbasePro.AuthenticatedClient(
	key,
	secret,
	passphrase,
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
}

// [EXPORT] //
module.exports = CBAuthClient