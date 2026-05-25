export const calculatePrice = (releaseDate: string | undefined): number => {
  if (!releaseDate) return 19.99;

  const releaseYear = Number(releaseDate.split("-")[0]);
  const currentYear = new Date().getFullYear();
  const age = currentYear - releaseYear;
  const basePrice = 19.99;
  const price = Math.max(4.99, basePrice - age);

  return parseFloat(price.toFixed(2));
};
