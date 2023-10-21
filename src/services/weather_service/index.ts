import { City, HistoricalWeather, WeatherForecast } from "./types";

const API_URL = "https://api.weatherapi.com/v1";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function searchCities(query: string): Promise<City[]> {
  if (!query) {
    return [];
  }

  try {
    const response = await fetch(
      `${API_URL}/search.json?key=${API_KEY}&q=${query}`
    );
    if (!response.ok) {
      throw new Error("Error fetching cities");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in searchCities function:", error);
    throw error;
  }
}

export async function getWeatherForecast(
  url: string,
  days: number
): Promise<WeatherForecast> {
  if (!url) {
    throw new Error("City url is required");
  }

  if (!days) {
    throw new Error("Days to forecast is required");
  }

  try {
    const response = await fetch(
      `${API_URL}/forecast.json?key=${API_KEY}&q=${url}&days=${days}`
    );
    if (!response.ok) {
      throw new Error("Error fetching weather data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getWeatherForecast function:", error);
    throw error;
  }
}

export async function getHistoricalWeather(
  url: string,
  date: string
): Promise<HistoricalWeather> {
  if (!url) {
    throw new Error("City url is required");
  }

  if (!date) {
    throw new Error("Date is required");
  }

  try {
    // Supports historical dates since 1 year ago
    const response = await fetch(
      `${API_URL}/history.json?key=${API_KEY}&q=${url}&dt=${date}`
    );
    if (!response.ok) {
      throw new Error("Error fetching historical weather data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getHistoricalWeather function:", error);
    throw error;
  }
}
