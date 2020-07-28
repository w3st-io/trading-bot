/**
 * %%%%%%%%%%%%%%%%%%%%%%%% *
 * %%% ECCENTRIC TRADER %%% *
 * %%%%%%%%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] //
const CoinbasePro = require('coinbase-pro')
require('dotenv').config()


// [REQUIRE] Personal //
const CBAuthClient = require('./CBAuthClient')
const CBPublicClient = require('./CBPublicClient')
const CBAlgo = require('./CBAlgo')


// [INIT-ENV] //
const key = process.env.KEY || ''
const secret = process.env.SECRET || ''
const passphrase = process.env.PASS_PHRASE || ''


// [INIT] //
const apiURI = 'https://api.pro.coinbase.com'
const sandboxURI = 'https://api-public.sandbox.pro.coinbase.com'


// [CB-PUBLIC-CLIENT] //
const publicClient = new CoinbasePro.PublicClient()


// [CB-AUTH-CLIENT] //
const authedClient = new CoinbasePro.AuthenticatedClient(
	key,
	secret,
	passphrase,
	apiURI
)


////////////////////////////////////////////////////////////
CBAlgo.getAverage()