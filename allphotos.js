import React from 'react';

let listOfImages = [];

class App extends React.Component {
  importAll(allPhotos) {
      console.log(require.context('../../public/images/plasticIdol/designs/', true, /\_big.png$/));
      
    return allPhotos.keys().map(allPhotos);
  }

  componentDidMount() {
    listOfImages = this.importAll(require.context('../../public/images/plasticIDOL/designs/CloudDARK', true, /\_big.png$/));
  }
  


  render() {
    return (
        <div>
        {
          // react docs require a key that is unique to the particular list. as stated in the docs, index is a last resort option which breaks if the list gets reordered (this one might get reordered or edited), so i decided to give the key the value of 'image.toString' because it is unique.
          // "The best way to pick a key is to use a string that uniquely identifies a list item among its siblings."
          // https://reactjs.org/docs/lists-and-keys.html#keys

          // make the inside of this a component https://reactjs.org/docs/components-and-props.html#extracting-components
          listOfImages.map(
            (image) => <img style={{width: "150px"}} key={image.toString()} src={image} alt="info"></img>
          )

        }
      </div>
    )
  }
}

export default App;