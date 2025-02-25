import { useMemo } from 'react';
import { ICat } from '../entities';

export type SortByOption = {
  value: keyof ICat;
  label: string;
};

export const useCatsFilter = (
  cats: ICat[],
  searchValue: string,
  sortBy: SortByOption
) => {
  return useMemo(() => {
    return cats
      .filter((cat) => {
        return searchValue
          ? cat.origin.toLowerCase().includes(searchValue.toLowerCase())
          : true;
      })
      .sort((a, b) => {
        const aValue = a[sortBy.value];
        const bValue = b[sortBy.value];
        if (typeof aValue === "string" && typeof bValue === "string") {
          return aValue.localeCompare(bValue);
        }
        return Number(bValue) - Number(aValue);
      });
  }, [cats, searchValue, sortBy]);
};