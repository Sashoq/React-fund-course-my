import React, {useMemo, useState} from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyInput from './components/UI/input/MyInput';
import MySelect from './components/UI/select/MySelect';
import './styles/App.css';

function App() {
  const[posts, setPosts] = useState([
    {id: 1, title: 'Javascript', body: 'The Best language'},
    {id: 2, title: 'Pythen', body: 'I dont know what is it'},
    {id: 3, title: 'Java', body: 'I was try it'},
    {id: 4, title: 'PHP', body: 'I dont like it'}
  ]);

  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const sortedPosts = useMemo(() => {
    if(selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    }
    return posts;
  }, [selectedSort, posts]);
  
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p =>  p.id !== post.id))
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort);
  }

  return (
    <div className="App">
    <PostForm create={createPost} />
    <hr style={{margin: '15px 0'}} />
    <div>
        <MyInput 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
       <MySelect 
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Sort by"
          options={[
            {value: 'title', name: 'By name'},
            {value: 'body', name: 'By description'}
          ]}
         />
    </div>
    {posts.length 
    ? 
    <PostList remove={removePost} posts={sortedPosts} title='List of posts' />
    : 
    <h1 style={{textAlign: 'center'}}>
    The posts not found!
    </h1>
    }
    </div>
  );
}

export default App;
