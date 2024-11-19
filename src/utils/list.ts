export const sortBy = (list: any, sortDirection: string, key: string) => {
  const sortedData = [...list].sort((a, b) => {
    const itemA = a[key].toLowerCase();
    const itemB = b[key].toLowerCase();

    if (sortDirection === 'asc') {
      return itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
    } else {
      return itemA > itemB ? -1 : itemA < itemB ? 1 : 0;
    }
  });

  return sortedData;
};
