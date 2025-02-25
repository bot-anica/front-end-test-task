import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { useGetBreedsQuery } from "../../services/catsService";
import { useAppSelector } from "../../store/hooks";
import {
  ErrorMessage,
  Loader,
  InputField,
  Dropdown,
  CatCardsList,
} from "../../components";
import ChartsSection from "../../components/charts/ChartsSection";
import useDebounce from "../../hooks/useDebounce";
import { useCatsFilter, SortByOption } from "../../hooks/useCatsFilter";

const sortByOptions: SortByOption[] = [
  { value: "name", label: "Name" },
  { value: "origin", label: "Origin" },
  { value: "adaptability", label: "Adaptability" },
  { value: "affection_level", label: "Affection Level" },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data: cats = [], isLoading, error } = useGetBreedsQuery();

  const [sortBy, setSortBy] = useState<SortByOption>(sortByOptions[0]);
  const [searchValue, setSearchValue] = useState<string>("");

  const debouncedSearchValue = useDebounce(searchValue, 300);
  const filteredAndSortedCats = useCatsFilter(cats, debouncedSearchValue, sortBy);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
  }, [isAuthenticated, navigate]);

  if (cats.length === 0 || isLoading || error) {
    return (
      <div className="flex items-center justify-center h-screen">
        {isLoading ? (
          <Loader size="lg" />
        ) : (
          <ErrorMessage
            text="Error loading cats data"
            size="md"
            classNames="mt-1"
          />
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Cat Breeds Statistics</h1>
      </div>

      <ChartsSection cats={filteredAndSortedCats} />

      <hr className="h-px my-12 bg-gray-200 border-none"></hr>

      <div className="flex items-center gap-4 mt-12">
        <Dropdown
          label="Sort by"
          options={[...sortByOptions]}
          displayKey="label"
          value={sortBy}
          onSelect={(option) => setSortBy(option as SortByOption)}
        />

        <div className="relative">
          <InputField
            type="text"
            placeholder="Search by origin..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            classNames="shadow-sm"
          />
        </div>
      </div>

      <CatCardsList cats={filteredAndSortedCats} />
    </div>
  );
};

export default HomePage;
