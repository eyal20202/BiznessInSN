import React from 'react'
import Header from './Header'
import Main from './Main'
//==================================
const App = () => (

    <div >
        <Header />
        <div style={headerstyle}>
            <Main />
        </div>
    </div>
);

export default App
//=====================================
const headerstyle = {
    padding :'3%',
};
//=====================================