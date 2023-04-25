import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios'
function App() {
  const [data, setData] = useState('');
  const [imageData, setImageData] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false)
  useEffect(() => {
    const params = {
      method: "flickr.photos.search",
      api_key: "7e30084d2e70f75cc0e78e5ae7bc1273",
      text: data,
      sort: "",
      per_page: 39,
      license: '4',
      extras: "yash_Choudhary, license",
      format: "json",
      nojsoncallback: 1
    }
    const parametes = new URLSearchParams(params);
    const url = `https://api.flickr.com/services/rest/?${parametes}`
    axios.get(url)
      .then((res) => {
        console.log(res.data)
        const arr = res.data.photos.photo.map((img) => {
          return Images(img, 'q')
        });
        setImageData(arr);
      })
      .catch((e) => {
        console.log(e.message)
      })
  }, [data])
  const Images = (picture, size) => {
    let url = `https://live.staticflickr.com/${picture.server}/${picture.id}_${picture.secret}`
    if (size) {
      url += `_${size}`
    }
    url += '.jpg'
    return url
  }
  return (
    <div>
      <div id="heading">
        <span className="heading">React Photo Search</span>
        <button className="book">BookMarks</button>
      </div>
      <input type="text" placeholder='Search high-resolution images' onChange={(e) => setSearch(e.target.value)} />
      <button className="search" onClick={() => {
        setData(search)
        setShow(true)
      }}>Search</button>
      {show &&
        <section className='images-section'>
          {imageData.map((img, index) => {
            return (
              <div className='main'>
                <img src={img} key={index} alt="" />
              </div>
            )
          })}
        </section>
      }
    </div >);
}

export default App;
