import React from 'react'
import { HeadProvider, Title, Link } from 'react-head';
import MainMenu from './Components/MainMenu'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import './css/style.css'
// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function App() {
  library.add(fab, faBars)
  return (
    <HeadProvider>
      <Title>Sunib Blog</Title>
      <Link rel="icon" href="favicon.ico" />
      <div className="App">
        <Navbar />
        <MainMenu />
        <Footer />
      </div>
    </HeadProvider>
  );
}