class CBAuthClient {
	static async t_getAccount(authedClient) {
		try {
			const returnedData = await authedClient.getAccounts()
	
			console.log('returnedData:', returnedData)	
		}
		catch (e) { console.log(`Caught Error --> ${e}`) }
	}
	
	
	static async t_placeOrder(authedClient) {
		const params = {
			side: 'buy',
			price: '266', // USD
			size: '.05', // ETH
			product_id: 'ETH-USD',
		}
	
		try {
			const returnedData = await authedClient.placeOrder(params)
	
			console.log('returnedData:', returnedData)
		}
		catch(e) { console.log(`Caught Error --> ${e}`) }
	}
}

// [EXPORT] //
module.exports = CBAuthClient