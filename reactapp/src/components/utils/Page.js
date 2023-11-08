import '../../App.css'
import { useEffect, useState } from 'react';

import Header from './Header.js'
import Footer from './Footer.js'

export default function Page({children}) {
    return (
        <>
            <Header></Header>
            {children}
            <Footer></Footer>
        </>
    );
  }