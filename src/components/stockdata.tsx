// components/stock.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import "../stock.css";

// Define the base URL for the Finnhub API
const API_URL = "https://finnhub.io/api/v1/quote";
const API_TOKEN = "cu6g271r01qh2ki5jcqgcu6g271r01qh2ki5jcr0"; // Replace with your API token

const StockData = () => {
  const [stockData, setStockData] = useState<any>(null); // Holds the stock data
  const [loading, setLoading] = useState(true); // Manages loading state
  const [error, setError] = useState<string | null>(null); // Manages error state
  const [symbol, setSymbol] = useState("AAPL"); // Default to Apple stock symbol

  // Fetch stock data when the component mounts or when the symbol changes
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // Make an API request to fetch stock data
        const response = await axios.get(
          `${API_URL}?symbol=${symbol}&token=${API_TOKEN}`
        );
        setStockData(response.data); // Store stock data in the state
        setLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        setError("Failed to fetch stock data."); // Set error message if the request fails
        setLoading(false); // Set loading to false when there is an error
      }
    };

    fetchStockData();
  }, [symbol]); // Re-fetch data when the symbol changes

  // Loading state UI
  if (loading) {
    return <p>Loading stock data...</p>;
  }

  // Error state UI
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="stock-data-container" style={{fontFamily: 'Montserrat'}}>
      <h2 className="stock-title">{symbol} Stock Data</h2>
      
      {/* Display stock data */}
      <div className="stock-info">
        <div className="stock-card">
          <h3>Current Price</h3>
          <p className="price">${stockData.c}</p>
        </div>
        <div className="stock-card">
          <h3>High of the Day</h3>
          <p className="price">${stockData.h}</p>
        </div>
        <div className="stock-card">
          <h3>Low of the Day</h3>
          <p className="price">${stockData.l}</p>
        </div>
        <div className="stock-card">
          <h3>Change</h3>
          <p className={`price ${stockData.d >= 0 ? "positive" : "negative"}`}>
            {stockData.d} ({stockData.dp}%)
          </p>
        </div>
      </div>

      {/* Input field for changing the stock symbol */}
      <div className="symbol-input">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())} // Update symbol in state
          placeholder="Enter stock symbol (e.g., AAPL, TSLA)"
        />
      </div>
    </div>
  );
};

export default StockData;
