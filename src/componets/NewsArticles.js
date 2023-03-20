import { useEffect, useState } from "react";
import './NewsArticles.css';
import NewsArticle from "./NewsArticle";

function NewsArticles({ city }) {
  const [resultsNews, setResultsNews] = useState(null);
  const [noNewsFound, setNoNewsFound] = useState(false); // add this state
  // List of keywords to search for
  const WeatherKeywords = [
    "rainfall", "snow", "heat", "weather", "rain",
    "cloud", "temperature", "overcast", "sunrise",
    "tornado", "sunset", "humidity", "cold",
    "wind", "cloudy", "heat wave", "fog", "breeze", "humid",
    "blustery", "thunder", "heat index", "thunderstorm",
    "drought", "tropical", "water cycle", "temperate",
    "moisture", "drizzle", "warm", "dry", "hail", "icicle", "climate", "storm",
    "frosty", "dew point", "drought", "flood", "muggy", "gale", "flash flood",
    "atmosphere", "weather forecast", "weather report", "weather station",
    "cold front", "warm front", "weather map", "weather satellite",
    "mist", "weather balloon", "weather vane", "weather radar",
    "isobar", "cold snap", "condensation", "forecast", "ice storm",
    "freeze", "barometric", "gust", "snowfall", "snowstorm", "snowdrift",
    "whirlwind", "hurricane", "tornado", "cyclone", "air", "balmy", "avalanche",
    "barometer", "blizzard", "chill", "cloudburst", "damp",
    "air pressure", "frost", "spring", "smog", "ozone", "fall",
    "winter", "summer", "storm surge", "rain gage",
    "low pressure", "high pressure", "barometric pressure",
    "wind chill", "sleet", "sky", "dew", "surge", "monsoon",
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
    const title = article.title.toLowerCase();
    return WeatherKeywords.some(keyword => title.includes(keyword));
  }

  // Fetch the articles
  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(`https://newsapi.org/v2/everything?q=Weather%20in%20${city}&from=${formatDate(yesterday)}&units=metric&apiKey=${process.env.REACT_APP_WEATHERNEWSKEY}`)
        .then(res => res.json())
        .then(
          (result) => {
            if (result['cod'] !== 200) {
              // Fetch Articles, and filter out articles that don't contain weather keywords
              const articles = Object.values(result.articles);
              const filteredArticles = articles.filter(article => containsWeatherKeyword(article));

              // slice the first 4 articles
              if (filteredArticles.length === 0) { // check if filteredArticles is empty
                setResultsNews(null);
                setNoNewsFound(true); // set noNewsFound to true
              } else {
                const ShowingArticles = Object.values(filteredArticles).slice(0, 4);
                setResultsNews(ShowingArticles);
                setNoNewsFound(false); // set noNewsFound to false
              }
            } else {

              // console.log(result)
            }
          },
          (error) => {
            // setError(error);
            // console.log(error)
          }
        )
    }, 2000);

    return () => clearTimeout(timer);
  }, [city])

  // Preview of the articles

  return (
    <>
      <div className="NewsArticles">
        <h2>News Articles in {city}</h2>
        {noNewsFound ? (
          <p>No news found</p> // render "No news found" message if noNewsFound is true
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