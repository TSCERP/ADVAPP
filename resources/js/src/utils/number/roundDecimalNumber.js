export default function roundDecimalNumber(inputNumber) {
    // Kiểm tra xem có phải là số không
    if (typeof inputNumber !== "number" || isNaN(inputNumber)) {
        return NaN;
    }

    // Kiểm tra xem có phải là số thập phân không
    if (Number.isInteger(inputNumber)) {
        return inputNumber; // Nếu là số nguyên, không làm tròn
    }

    // Kiểm tra xem có ít nhất 2 chữ số phần thập phân không
    const decimalPlaces = inputNumber.toString().split(".")[1]?.length || 0;
    if (decimalPlaces >= 2) {
        // Làm tròn 2 chữ số thập phân và chuyển về kiểu number
        return Number(inputNumber.toFixed(2));
    }

    // Nếu không thỏa mãn điều kiện, trả về số nguyên
    return Math.round(inputNumber);
}
