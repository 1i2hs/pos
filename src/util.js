export const formatPriceString = price => {
  let stringPrice = String(price);
  let charCount = stringPrice.length;
  let result = "";
  for (let i = charCount - 1, counter = 1; i >= 0; i--, counter++) {
    result = stringPrice.charAt(i) + result;
    if (counter % 3 === 0 && i !== 0) {
      result = "," + result;
    }
  }
  return result;
};
