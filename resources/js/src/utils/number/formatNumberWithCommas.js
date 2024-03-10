export default function formatNumberWithCommas(value) {
    // Kiểm tra xem có phải là số không
    if (typeof value !== 'number' && !parseFloat(value) && !parseInt(value)) {
      return null;
    }
  
    // Làm tròn 2 chữ số nếu có phần thập phân từ 2 chữ số trở lên
    const roundedValue = Math.abs(value % 1) >= 0.01 ? value.toFixed(2) : value;
  
    // Sử dụng RegEx để thêm dấu phẩy ngăn cách giữa 3 số
    return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  