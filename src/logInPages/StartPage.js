import React from 'react'
import MainSP from './MainSP'
import HeaderSP from './HeaderSP'

// The Header creates links that can be used to navigate
// between routes.

var StartPage = () => (

    <div id="startPage" >
        <div >
           <HeaderSP />
        </div>
        <div   >
            <MainSP />
        </div>

    </div>

);

export default StartPage
