import React, { useEffect, useState } from 'react';
import app from '../../services/firebase';
import Pagination from './pagination';
import 'firebase/database';
import { Link } from 'react-router-dom';

const CoronaNews = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(3);

  useEffect(() => {
    const db = app.database().ref('news');
    db.on('value', (snapshot) => {
      const firebaseNews = snapshot.val();
      setNews(firebaseNews.data);
      setIsLoading(false);
    });
  }, []);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (string) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  };

  if (isLoading) {
    return <h2>Loading.....</h2>;
  }
  return (
    <div>
      <h2>Data Corona</h2>
      {currentNews.map((note) => {
        return (
          <>
            <div className="card text-center" key={note.id}>
              <div className="card-header">
                <Link to={`/infoCorona/${note.date}`}>
                  <h5 className="card-title">{formatDate(note.date)}</h5>
                </Link>
              </div>
              {note.activity.map((data) => {
                return (
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{data.title}</h5>
                      <p className="card-text">{data.desc}</p>
                      <a href={data.url} className="card-link">
                        link
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
            <br></br>
          </>
        );
      })}
      <Pagination
        postsPerPage={newsPerPage}
        totalPosts={news.length}
        paginate={paginate}
      />
    </div>
  );
};

export default CoronaNews;
