import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Posts from './components/Posts'
import Pagination from './components/Pagination'

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  useEffect(()=>{
    const fetchPosts = async () =>{
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    }

    fetchPosts();
  }, [])

  //Get current Posts

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost);

  // Change page
   const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-4">My App</h1>
      <Posts posts={currentPosts} loading={loading}/>
      <Pagination postsPerpage={postPerPage} totalPosts={posts.length} paginate={paginate} />
    </div>
  );
}

export default App;
