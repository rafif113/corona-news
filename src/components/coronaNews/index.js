import React, { useEffect, useState } from 'react';
import app from '../../services/firebase';
import Pagination from './pagination';
import 'firebase/database';

const CoronaNews = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(9);
  const [newsPerPage, setNewsPerPage] = useState(5);

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

  console.log(news);

  if (isLoading) {
    return <h2>Loading.....</h2>;
  }
  return (
    <div>
      <h2>Data Corona</h2>
      {currentNews.map((note) => {
        return (
          <>
            <div class="card text-center" key={note.id}>
              <div class="card-header">
                <h5 class="card-title">{note.activity[0].title}</h5>
              </div>
              <div class="card-body">
                <p class="card-text">{note.activity[0].desc}</p>
                <a href={note.activity[0].url} class="btn btn-link">
                  Link Berita
                </a>
              </div>
              <div class="card-footer text-muted">{note.date}</div>
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
