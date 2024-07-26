import { Nav } from '../../components'
import React, { useEffect } from 'react'
import Help from './Help'
import SupportActions from './SupportActions'
import { useLocation } from 'react-router-dom'

const Support = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
  return (
    <>
     <Nav />
     <Help/>
     <SupportActions />
    </>
  )
}

export default Support
