"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./component.module.css";
import LoadingSpinner from "../loading_spinner/component";
import SearchIcon from "../search_icon";
import { searchCities } from "@/services/weather_service";
import { City } from "@/services/weather_service/types";

interface CitySearchProps {
  onSelect: (url: string, name: string) => void;
}

const CitySearch = ({ onSelect }: CitySearchProps) => {
  const [query, setQuery] = useState<string>("");
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [listVisible, setListVisible] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  const searchTimeoutRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Handle clicks outside the search input to close results dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setListVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Fetch city results based on query input
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchCities(query);
      if (results.length === 0) {
        setError("No results found.");
      }
      setCities(results);
    } catch (err) {
      setError("Error fetching cities. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Manage changes to the input and initiate a delayed search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // If input is empty, hide results. Otherwise, show them.
    setListVisible(value.length > 0);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = window.setTimeout(handleSearch, 500);
  };

  // Handle keyboard actions for navigation and selection within results
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
        }
        if (selectedIndex !== null && cities[selectedIndex]) {
          handleSelect(cities[selectedIndex]);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex === null || prevIndex >= cities.length - 1
            ? 0
            : prevIndex + 1
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex === null || prevIndex <= 0
            ? cities.length - 1
            : prevIndex - 1
        );
        break;
      default:
        break;
    }
  };

  const handleSelect = (city: City) => {
    setQuery(`${city.name}, ${city.region}, ${city.country}`);
    setListVisible(false);
    onSelect(city.url, city.name); // Pass the url and name of the selected city up to the parent component
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="text"
            placeholder="Search city..."
            autoComplete="off"
            value={query}
            onFocus={() => setListVisible(true)}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            ref={containerRef as React.RefObject<HTMLInputElement>}
          />
          <div className={styles.inputIcon} onClick={handleSearch}>
            <SearchIcon width={20} height={20} />
          </div>
        </div>
        {query.length > 0 && (
          <ul className={styles.results} hidden={!listVisible}>
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <p className={styles.error}>{error}</p>
            ) : (
              cities.map((city, index) => (
                <li
                  key={city.id}
                  onClick={() => handleSelect(city)}
                  className={index === selectedIndex ? styles.selectedItem : ""}
                >
                  {city.name}, {city.region}, {city.country}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CitySearch;
