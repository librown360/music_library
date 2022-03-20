import './App.css'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { createResource as fetchData } from './helper';
import { useEffect, useState, Suspense } from 'react';
import Spinner from './components/Spinner';

const App = () => {
  let [searchTerm, setSearchTerm] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState(null)

  useEffect(() => {
    if(searchTerm) {
      setData(fetchData(searchTerm))
    }
  }, [searchTerm])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearchTerm(term)
  }

  const renderGallery = () => {
    if(data) {
        return (
            <Suspense fallback={<Spinner />} >
                <Gallery data={data} />
            </Suspense>
        )
    }
  }

  return (
    <div className='App'>
      <SearchBar handleSearch={handleSearch} />
      {message}
      {renderGallery()}
    </div>
  );
}

export default App;