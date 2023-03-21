import React from 'react';
import './NewsArticles.css';

function NewsArticle({ article }) {
  return (
    <div className='news-card'>
      <div className="news-image-container" style={{ height: "200px", overflow: "hidden" }}>
        {article.image.url ?
          <img className='news-img' src={article.image.url} alt={article.title} /> :
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <p>No Image</p>
          </div>
        }
      </div>
      <div className="card-content">
        <h2>{article.title.length > 80 ?
          `${article.title.substring(0, 80)}...` : article.title
        }</h2>
        <p className=''>{article.description.length > 200 ?
          `${article.description.substring(0, 200)}...` : article.description
        }</p>
      </div>
      <div className='news-link'>
        <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
      </div>
    </div>
  )
}

export default NewsArticle;
