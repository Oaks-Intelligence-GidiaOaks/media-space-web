export function formatAmount(amount) {
  // Ensure the input is a valid number or a string that can be converted to a number
  if (amount === null || amount === undefined || isNaN(amount)) {
    throw new Error(
      "Invalid input: amount must be a number or a numeric string."
    );
  }

  // Convert the amount to a string
  const amountStr = String(amount);

  // Use regex to add commas as thousand separators
  return amountStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
