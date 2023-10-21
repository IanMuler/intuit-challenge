"use client";

import React, { useState } from "react";
import CitySearch from "../components/city_search/component";
import WeatherDetails from "../components/weather_details/component";
import DateSelector from "../components/date_selector/component";
import styles from "./page.module.css";

const Home: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleCitySelect = (url: string, name: string) => {
    setUrl(url);
    setName(name);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Weather App</h1>
      <CitySearch onSelect={handleCitySelect} />
      {url && <WeatherDetails url={url} />}
      {url && <DateSelector url={url} name={name} />}
    </main>
  );
};

export default Home;
