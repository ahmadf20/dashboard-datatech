export function sortData(data, field, sortType) {
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

export function resetSortFilter(sortBy, sortType, filterStatus) {
  sortBy.value = "name";
  sortType.value = "asc";
  filterStatus.value = "all";
}
