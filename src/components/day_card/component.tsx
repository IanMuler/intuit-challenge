"use client";

import styles from "./component.module.css";
import Image from "next/image";
import {
  WeatherForecast,
  HistoricalWeather,
} from "@/services/weather_service/types";

interface DayCardProps {
  location?: WeatherForecast["location"];
  date?: WeatherForecast["forecast"]["forecastday"][0]["date"];
  day:
    | WeatherForecast["forecast"]["forecastday"][0]["day"]
    | HistoricalWeather["forecast"]["forecastday"][0]["day"];
}

const DayCard = ({ location, date, day }: DayCardProps) => {
  const name = location?.name;
  const region = location?.region;
  const country = location?.country;

  const image_src = day?.condition?.icon;
  const image_alt = day?.condition?.text;
  const temperature = day?.avgtemp_c;
  const max_temp = day?.maxtemp_c;
  const min_temp = day?.mintemp_c;
  const humidity = day?.avghumidity;
  const chance_of_rain =
    "daily_chance_of_rain" in day ? day.daily_chance_of_rain : undefined;

  return (
    <div className={styles.day}>
      {location && (
        <h3>
          {name}, {region}, {country}
        </h3>
      )}
      {date && <p className={styles.date}>{date}</p>}
      <Image
        className={styles.image}
        src={`https:${image_src}`}
        alt={image_alt}
        width={64}
        height={64}
      />
      <p className={styles.temperature}>{temperature}°C</p>
      <div className={styles.details}>
        <p className={styles.item}>Max: {max_temp}°C</p>
        <p className={styles.item}>Min: {min_temp}°C</p>
        <p className={styles.item}>Humidity: {humidity}%</p>
        {chance_of_rain !== undefined && (
          <p className={styles.item}>% Rain: {chance_of_rain}%</p>
        )}
      </div>
    </div>
  );
};

export default DayCard;
