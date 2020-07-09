import React from 'react';

let listOfImages =[];

class App extends React.Component{
    importAll(r) {
      
      return r.keys().map(r);
    }
    
    // executed first?
    componentWillMount() {
      listOfImages = this.importAll(require.context('../../public/images', true, /\.png$/));
      console.log(listOfImages);
    }
    render(){
        return(
          <div>
              {
                    listOfImages.map(
                      (image, index) =>    <img key={index} src={image} alt="info"></img>
                    )
                    
              }
              1
          </div>
        )
    }
}

{/* <img src={`${process.env.PUBLIC_URL}/images/` + this.state.season + `/designs/` + this.state.name + `/` + this.state.name + `_` + this.props.match.params.color + `_small.png`} /> */}
export default App;
