import React from "react";
import { InputNumber } from "antd";

const DecimalNumberInput = (props) => {
    const { controls = false, min, max, placeholder, className, addonAfter, onChange} = props;
    console.log(max)
    return (
        <InputNumber
            controls={controls}
            addonAfter={addonAfter}
            placeholder={placeholder}
            className={`exchange-rate w-full text-right text-[15px] ${
                "edit" == "view" && "!font-normal !text-gray-900 cursor-default"
            } ${className}`}
            min={min}
            max={max}
            formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => {
                if (max && value > max) return max;
                const floatValue = parseFloat(value.replace(/,/g, ""));
                const roundedValue = isNaN(floatValue)
                    ? 1
                    : floatValue % 1 === 0
                    ? floatValue
                    : floatValue.toFixed(2);
                return Math.max(1, roundedValue);
            }}
            onChange={(value) => onChange(value)}
        />
    );
};

export default DecimalNumberInput;
