import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const App: React.FC = () => {
  return (
    <div style={{ display: "block", width: 500, padding: 30 }}>
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ marginTop: "25px" }}
      >
        {/* Indicators */}
        <div className="carousel-indicators ">
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          {/* First Slide */}
          <div className="carousel-item active" data-bs-interval="2000">
            <img
              src="https://www.shutterstock.com/image-vector/financial-literacy-word-concepts-banner-260nw-1846555432.jpg"
              className="d-block w-100"
              alt="Image One"
              style={{
                height: "300px",
                width: "600px",
                objectFit: "cover",
                borderRadius: "15px",
              }}
            />
          </div>

          {/* Second Slide */}
          <div className="carousel-item" data-bs-interval="2000">
            <img
              src="https://static.vecteezy.com/system/resources/previews/036/059/031/non_2x/icon-insurance-paper-related-to-finance-symbol-color-spot-style-simple-design-editable-simple-illustration-free-vector.jpg"
              className="d-block w-100"
              alt="Image Two"
              style={{
                height: "300px",
                width: "600px",
                objectFit: "cover",
                borderRadius: "15px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
