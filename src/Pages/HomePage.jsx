import React from 'react'
import Navbar from '../components/NavBar'
import Recommendation from '../components/Recommendation'
import BookOnSale from '../components/BookOnSale'
import FeaturedProduct from '../components/FeaturedProduct'
import SpecialOffers from '../components/SpecialOffers'
import Footer from '../components/Footer'
import ImagePreviewSection from '../components/ImagePreviewSection'

export default function HomePage() {
  return (
    <div>
      <Recommendation/>
      <BookOnSale/>
      <FeaturedProduct/>
      <SpecialOffers/>
      <ImagePreviewSection/>
      <Footer/>
    </div>
  )
}
