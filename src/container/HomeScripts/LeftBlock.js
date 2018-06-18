import React from 'react'


//===========================================
class LeftBlock extends React.Component {
    /*  constructor(props) {
          super(props);
          this.state = {
              clickedHome: 'active', clickedJob: 'non',
              clickedMessages: 'non', clickedNotification: 'non'
          };
      }
      handleClick(e) {
          this.setState({
              clickedHome: 'non', clickedJob: 'non', clickedMessages: 'non'
              , clickedNotification: 'non'
          });

          if (e.currentTarget.id == 'Home') {
              this.setState({
                  clickedHome: 'active'
              });
          };
      }*/
    render() {
        return (

            <div id="container" style={{marginTop:'2px'}}>


                <div id="Posts" >

                    <div className="thumbnail shdow jump">
                        <p><a href="/">Advertisements</a></p>
                        <a a href="https://www.ivory.co.il" target="_blank">
                        <img src="http://www.interload.co.il/upload/3262529.PNG"/></a>
                    </div>

                </div>

            </div>

        )
    }
}

export default LeftBlock
//=======================================================
const headerstyle = {
    textAlign: 'center'

};
//=======================================================
