import Content from "./content";
// import React from "react"
import Converter from "./convertor";

const Home = () => {
  return (
    <>
      <div className="container">
        <Content />
      </div>
      <div className="container" style={{fontFamily: 'Montserrat'}}>
        <Converter />
      </div>
    </>
  );
};
export default Home;
