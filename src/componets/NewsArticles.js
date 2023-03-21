import { useEffect, useState } from "react";
import axios from 'axios';

import './NewsArticles.css';
import NewsArticle from "./NewsArticle";

function NewsArticles({ city }) {
  const [resultsNews, setResultsNews] = useState(null);
  const [noNewsFound, setNoNewsFound] = useState(false);
  // List of keywords to search for
  const WeatherKeywords = [
    "rainfall", "snow", "heat", "weather",
    "cloud", "temperature", "sunrise",
    "tornado", "sunset", "humidity", "cold",
    "wind", "cloudy", "fog", "breeze", "humid",
    "blustery", "thunderstorm",
    "drought", "moisture", "warm", "hail", "climate",
    "frosty", "flood", "gale",
    "atmosphere", "mist",
    "isobar", "condensation", "forecast",
    "freeze", "barometric", "gust", "snowfall", "snowstorm", "snowdrift",
    "whirlwind", "hurricane", "cyclone", "air", "balmy", "avalanche",
    "barometer", "blizzard", "chill", "cloudburst", "damp",
    "frost", "spring", "smog", "ozone", "fall",
    "winter", "summer",
    "sleet", "sky", "dew", "surge", "monsoon",
    "permafrost"
  ];

  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 2)

  // Make sure the date is in the format YYYY-MM-DD
  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  // Check if the article contains a weather keyword
  function containsWeatherKeyword(article) {
    const description = article.description.toLowerCase();
    return WeatherKeywords.some(keyword => description.includes(keyword));
  }

  // Fetch the articles
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`http://api.mediastack.com/v1/news?access_key=f33b5637f491d2e72a26120716421b8b&keywords=${city}&date=${formatDate(yesterday)},${formatDate(today)}`);
        const result = await response.json();
        console.log(result.data);
        console.log(city);
        if (result['cod'] !== 200) {
          // Fetch Articles, and filter out articles that don't contain weather keywords
          const articles = Object.values(result.data);
          const filteredArticles = articles.filter(article => containsWeatherKeyword(article));

          // slice the first 4 articles
          if (filteredArticles.length === 0) { 
            setResultsNews(null);
            setNoNewsFound(true); 
          } else {
            const ShowingArticles = Object.values(filteredArticles).slice(0, 4);
            setResultsNews(ShowingArticles);
            setNoNewsFound(false); 
          }
        } else {
          // console.log(result)
        }
      } catch (error) {
        // setError(error);
        // console.log(error)
      }
    }, 2000);

    return () => {
      clearTimeout(timer); 
    };
  }, [city]);



  return (
    <>
      <div className="NewsArticles">
        <h2>News Articles in {city}</h2>
        {noNewsFound ? (
          <p>No news found</p>
        ) : resultsNews ? (
          <div className="article-layout">
            {resultsNews.map((article, index) => (
              <NewsArticle key={index} article={article} />
            ))}
          </div>
        ) : (
          <p>Loading news...</p>
        )}
      </div>
    </>
  )
}
export default NewsArticles;