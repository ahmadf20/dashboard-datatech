function sortData(data, field, sortType) {
  if (!data.length) return [];

  const isString = typeof data[0][field] === "string";

  return [...data].sort((a, b) => {
    if (sortType === "asc") {
      if (isString) return a[field].localeCompare(b[field]);
      return a[field] - b[field];
    } else {
      if (isString) return b[field].localeCompare(a[field]);
      return b[field] - a[field];
    }
  });
}

export { sortData };
