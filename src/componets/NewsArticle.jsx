import React from 'react';
import './NewsArticles.css';

function NewsArticle({ article }) {
  return (
    <div className='news-card' >
      <div className="news-image-container">
        <img className='news-img' src={article.urlToImage} alt={article.title} />
      </div>
      <div className="card-content">
        <h2 className='article-head'>{article.title.length > 80 ?
          `${article.title.substring(0, 80)}...` : article.title
        }  </h2>
        <p className='article-title'>{article.description.length > 200 ?
          `${article.description.substring(0, 200)}...` : article.description
        }</p>
      </div>
      <div className='news-link'>
        <a href={article.url} rel="noreferrer" target="_blank">Read More</a>
      </div>
    </div>
  )
}

export default NewsArticle