export const DISCOUNT_METHOD_CASHBACK = "cashback";
export const DISCOUNT_METHOD_INSTANT = "instant";

export const hasDiscount = (medicine) => medicine.discount_amount > 0;

export const hasInstantDiscount = (medicine) =>
    medicine.discount_method === DISCOUNT_METHOD_INSTANT;

export const hasCashbackDiscount = (medicine) =>
    medicine.discount_method === DISCOUNT_METHOD_CASHBACK;

export const medicinePrice = (medicine) => {
    if (hasInstantDiscount(medicine)) {
        return medicine.price - medicine.discount_amount;
    }
    return medicine.price;
};

export const medicineOriginalPrice = (medicine) => {
    return medicine.price;
};
