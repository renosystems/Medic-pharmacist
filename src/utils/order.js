

export const formatToCurrency = (amount) => {
    const isInt = Number.isInteger(amount);
    const decimals = isInt ? 0 : 2;
    return amount.toFixed(decimals).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};


/**
 *
 * @param {Object} order
 * @returns {float} the sum of per medicine discounts
 */
export const totalPerMedicineDiscount = (order) => {
    const discounts = order?.order_items?.map((oi) => oi?.discount || 0);
    const sum = discounts?.reduce(
        (discountsPartialSum, discount) => discountsPartialSum + discount,
        0
    );
    return sum;
};

/**
 *
 * @param {Object} order
 * @returns {float} the instant promocode instant discount
 */
export const promoInstantDiscount = (order) => {
    return order?.promocode_discount || 0;
};

/**
 *
 * @param {Object} order
 * @returns {float} the cash promocode instant discount
 */
export const promoCashbackDiscount = (order) => {
    if (!order?.promo_wallet_amount) return 0;
    return parseFloat(order?.promo_wallet_amount);
};

/**
 *
 * @param {Object} order
 * @returns {float} the total instant discount applied on this order
 */
export const instantDiscount = (order) => {
    let discount = promoInstantDiscount(order);
    return discount;
};

/**
 *
 * @param {Object} order
 * @returns {float} the total cashback discount applied on this order
 */
export const cashbackDiscount = (order) => {
    return promoCashbackDiscount(order) + totalPerMedicineDiscount(order);
};



export const itemsInstantDiscount = (order) => {
	const itemsDiscounts = order?.order_items
		?.filter(
			(item) =>
        item?.productform?.discount_method === "instant" 
		)
		.map((i) => i.discount);
	const sum = itemsDiscounts?.reduce(
		(discountsPartialSum, discount) => discountsPartialSum + discount,
		0);

  return sum;
};

/**
 *
 * @param {Object} order
 * @returns {float} the total price that the user should pay for this order
 */
export const orderTotalPrice = (order) => {
	return formatToCurrency(order?.total_final - itemsInstantDiscount(order));
};




// /**
//  *
//  * @param {Object} order
//  * @returns {[String]} prescription links
//  */
// export const getPrescriptions = (order) => {
//     //may contain duplicates
//     const itemsPrescriptions = order?.order_items
//         ?.filter((oi) => oi?.user_attachment?.image)
//         .map((oi) => oi?.user_attachment?.image);
//     return [...new Set(itemsPrescriptions)];
// };
