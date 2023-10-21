"use client";

import { useState } from "react";
import styles from "./component.module.css";
import DayCard from "../day_card/component";
import LoadingSpinner from "../loading_spinner/component";
import { HistoricalWeather } from "@/services/weather_service/types";
import { getHistoricalWeather } from "@/services/weather_service";

interface DataSelectorProps {
  url: string;
  name: string;
}

const DateSelector = ({ url, name }: DataSelectorProps) => {
  const [selectedDate, setSelectedDate] = useState<string>( //to control the date input
    new Date().toISOString().split("T")[0] //set the default date to today
  );
  const [historicalWeather, setHistoricalWeather] =
    useState<HistoricalWeather | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistoricalWeather = async (date: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getHistoricalWeather(url, date);
      setHistoricalWeather(data);
    } catch (err) {
      setError("Error fetching weather details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectedDateChange = (date: string) => {
    setSelectedDate(date);
    fetchHistoricalWeather(date);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Historical Weather for {name}</h2>
      <h3 className={styles.subtitle}>Select a date</h3>
      <input
        type="date"
        value={selectedDate}
        className={styles.input}
        onChange={(e) => handleSelectedDateChange(e.target.value)}
        //limit the date from 1 year ago to today
        max={new Date().toISOString().split("T")[0]}
        min={
          new Date(new Date().setFullYear(new Date().getFullYear() - 1))
            .toISOString()
            .split("T")[0]
        }
      />
      <div className={styles.result}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {error ? (
              <p className={styles.error}>{error}</p>
            ) : (
              <>
                {historicalWeather && (
                  <DayCard
                    date={selectedDate}
                    day={historicalWeather.forecast.forecastday[0].day}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DateSelector;
