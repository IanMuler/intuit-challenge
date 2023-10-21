"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./component.module.css";
import DayCard from "../day_card/component";
import LoadingSpinner from "../loading_spinner/component";
import { getWeatherForecast } from "@/services/weather_service";
import { WeatherForecast } from "@/services/weather_service/types";

interface WeatherDetailsProps {
  url: string;
}

const WeatherDetails = ({ url }: WeatherDetailsProps) => {
  const [weatherData, setWeatherData] = useState<WeatherForecast | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isInitialMount = useRef(true); // to avoid useEffect on first render

  const DAYS_FORECAST = 6; // today + 5 days

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await getWeatherForecast(url, DAYS_FORECAST);
          setWeatherData(data);
        } catch (err) {
          setError("Error fetching weather details. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [url]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      {weatherData && (
        <>
          <DayCard
            location={weatherData.location}
            day={weatherData.forecast.forecastday[0].day}
          />
          <h2 className={styles.futureDaysTitle}>Next days</h2>
          <div className={styles.futureDaysContainer}>
            {weatherData.forecast.forecastday
              .slice(1)
              .map((dayForecast, index) => (
                <div key={index}>
                  <DayCard date={dayForecast.date} day={dayForecast.day} />
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherDetails;
