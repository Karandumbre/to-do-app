export const today = () => {
  const date = new Date();
  const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${date.getUTCFullYear()}-${month}-${day}`;
}