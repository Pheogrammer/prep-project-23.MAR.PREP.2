import { useEffect, useState } from "react";
import axios from "axios";
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
    const title = article.title.toLowerCase();
    const description = article.description.toLowerCase();
    return WeatherKeywords.some(keyword => title.includes(keyword) || description.includes(keyword));
  }
  


  const requestOptions = {
    method: 'GET',
    url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI',
    params: {
      q: 'Weather in ' + city,
      pageNumber: '1',
      pageSize: '50',
      autoCorrect: 'true',
      fromPublishedDate: 'null',
      toPublishedDate: 'null'
    },
    headers: {
      'X-RapidAPI-Key': '7414da5a00msh9da597818ec1d4ap130955jsn57ffab675690',
      'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
    }
  };
  
  // Fetch the articles
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const response = await axios(requestOptions);
        const result = response.data;
        console.log(result.value);
        console.log(city);
        if (result['cod'] !== 200) {
          // Fetch Articles, and filter out articles that don't contain weather keywords
          const articles = Object.values(result.value);
          const filteredArticles = articles.filter(article => containsWeatherKeyword(article));
    
          // slice the first 4 articles
          const showingArticles = filteredArticles.slice(0, 4);
  
          if (showingArticles.length === 0) { 
            setResultsNews(null);
            setNoNewsFound(true); 
          } else {
            setResultsNews(showingArticles);
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