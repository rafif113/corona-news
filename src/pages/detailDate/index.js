import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import app from '../../services/firebase';
import 'firebase/database';

const formatDate = (string) => {
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(string).toLocaleDateString([], options);
};

const NewsItem = ({ news }) => {
  const { date, activity } = news[0];
  return (
    <div class="card text-center">
      <div class="card-header">
        <h5 class="card-title">{formatDate(date)}</h5>
      </div>
      {activity.map((data) => {
        return (
          <div class="card" key={data.url}>
            <div class="card-body">
              <a href={data.url} class="card-link" target="blank">
                <h5 class="card-title">{data.title}</h5>
              </a>
              <p class="card-text">{data.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const DetailDate = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const { dateId } = params;

  useEffect(() => {
    const db = app.database().ref('news');
    db.on('value', (snapshot) => {
      const firebaseNews = snapshot.val();
      const filterByDate = firebaseNews.data.filter((resp) => {
        return resp.date === dateId;
      });
      setNews(filterByDate);
      setIsLoading(false);
    });
  }, [dateId]);

  if (isLoading) {
    return <h2 className="container">Loading.....</h2>;
  }

  return (
    <div className="container">
      <h1>Info Corona</h1>
      {!isLoading && news.length > 0 ? (
        <NewsItem news={news} />
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default DetailDate;
