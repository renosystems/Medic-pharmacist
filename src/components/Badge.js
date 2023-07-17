import React from "react";

export default function Badge({ children }) {
    return (
        <span
            style={{
                backgroundColor: "#EE5858",
                color: "#fff",
                borderRadius: "5px",
                padding: "3px 5px",
                fontSize: "12px",
                marginInlineStart: "5px",
                display: "inline-block",
            }}
        >
            {children}
        </span>
    );
}
