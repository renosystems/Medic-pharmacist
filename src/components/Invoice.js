import React from "react";
import { Translate } from "react-localize-redux";
import { orderTotalPrice, promoCashbackDiscount, promoInstantDiscount } from "../utils/order";

function InvoiceRow({ label, children, ...props }) {
    return (
        <tr {...props}>
            <td>
                <Translate id={label} />
            </td>
            <td>{children}</td>
        </tr>
    );
}

export default function Invoice({ order }) {
    const promoCashback = promoCashbackDiscount(order);
    const promoInstant= promoInstantDiscount(order);

    return (
        <table>
            <tbody>
                <InvoiceRow label="general.total">
                    {order && order.grand_total_amount_after_discount}
                    <span>ج.م</span>
                </InvoiceRow>
                {order.is_promo_used && (
                    <InvoiceRow label="general.promocode">
                        {order && order.prom_code}
                    </InvoiceRow>
                )}
                {promoInstant > 0 && (
                    <InvoiceRow
                        label="general.instantDiscount"
                        style={{ color: "red" }}
                    >
                        -{promoInstant}
                        <span>ج.م</span>
                    </InvoiceRow>
                )}
                {promoCashback > 0 && (
                    <InvoiceRow label="general.cashbackDiscount">
                        {promoCashback}
                        <span>ج.م</span>
                    </InvoiceRow>
                )}
                {order.wallet_paid_amount > 0 && (
                    <InvoiceRow label="general.payByWalletAmount">
                        {order && order.wallet_paid_amount}
                        <span>ج.م</span>
                    </InvoiceRow>
                )}
                <InvoiceRow label="general.deliveryFees">
                    {order && order.delivery_fees}
                    <span>ج.م</span>
                </InvoiceRow>
                <InvoiceRow label="general.total">
                    {order && orderTotalPrice(order)}
                    <span>ج.م</span>
                </InvoiceRow>
            </tbody>
        </table>
    );
}
