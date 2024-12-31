import React, { useEffect, useState } from 'react'
import Navbar from '../components/NavBar'
import Recommendation from '../components/Recommendation'
import BookOnSale from '../components/BookOnSale'
import FeaturedProduct from '../components/FeaturedProduct'
import SpecialOffers from '../components/SpecialOffers'
import Footer from '../components/Footer'
import ImagePreviewSection from '../components/ImagePreviewSection'
import { message } from 'antd'
import axios from 'axios'

export default function HomePage() {
  const [bookItem , setBookItem] = useState([])
  
  const getBookDetails = async()=>{
    try {
      const response = await axios.get("https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyCjYWVaTy1vF8yF3J47KxQ4BgqghVmbYAU")

      console.log(response.data);
      setBookItem(response.data.items)
      
    } catch (error) {
       message.error(error.message)
    }
  }

  useEffect(()=>{
    getBookDetails()
  },[])

  return (
    <div>
      <Recommendation bookItem = {bookItem}/>
      <BookOnSale bookItem = {bookItem}/>
      <FeaturedProduct bookItem = {bookItem}/>
      <SpecialOffers/>
      <ImagePreviewSection bookItem = {bookItem}/>
      <Footer/>
    </div>
  )
}
