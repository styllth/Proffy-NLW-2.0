String.prototype.replaceAll = function (
  this: string,
  search: string,
  replacement: string
) {
  return this.split(search).join(replacement);
};
