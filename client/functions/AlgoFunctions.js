/**
 * %%%%%%%%%%%%%%%%%%%%%%%%%%%% *
 * %%% ALGO FUNCTIONS CLASS %%% *
 * %%%%%%%%%%%%%%%%%%%%%%%%%%%% *
*/


class algoFunctions {
	// [COUNT] //
	static determinCount(timeFramePriceAvgs, currentPrice) {
		let count = 0

		if (timeFramePriceAvgs) {
			timeFramePriceAvgs.forEach(timeFramePriceAvg => {
				if (timeFramePriceAvg.average > currentPrice.price) { count = count + 1 }
				
				console.log(
					'timeframe:', timeFramePriceAvg.timeFrame, 
					'average:', timeFramePriceAvg.average
				)
			})
		}
		else { count = count + 1 }
		console.log('count:', count)

		return count
	}


	// [ALREADY-BOUGHT] //
	static determinAlreadyBought(myOrders, product_id, sellPrice, currentInterval) {
		if (myOrders) {
			myOrders.forEach(myOrder => {
				if (myOrder.product_id == product_id) {
					// [INIT] //
					const topPriceRange = sellPrice * (1 + currentInterval)
					const bottomPriceRange = (sellPrice * (currentInterval - 1) * -1)
					
					// [LOG] //
					console.log('topPriceRange:', topPriceRange)
					console.log('bottomPriceRange:', bottomPriceRange)
					console.log('myOrder.price:', myOrder.price)
	
					// if ANY of the orders are within the range set alreadyBought
					if (
						myOrder.price >= bottomPriceRange &&
						myOrder.price <= topPriceRange
					) { return true }
					else { return false }
				}
			})
		}
		else { return false } // If their are no orders!
	}
}