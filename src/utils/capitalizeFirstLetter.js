// Capitalize first letter for shopping items
export const capitalizeFirstLetter = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
