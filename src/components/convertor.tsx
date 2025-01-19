import React, { useState } from "react";

const Converter = () => {
  const API_KEY = "fca_live_cp3OEjWmZeeiVvVb8l2Bw7zZI1xAbVsp4RdsyWKU"; // Your API Key
  const API_URL = "https://api.freecurrencyapi.com/v1/latest?apikey=" + API_KEY;

  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);

  const handleConvert = async () => {
    if (amount <= 0 || isNaN(amount)) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      // Debugging the API response structure
      console.log(data); // Log the response to check its structure

      // Check if the response has the data field
      if (data.data) {
        // Assuming the rates are inside `data.data`, check its structure:
        const rate = data.data[toCurrency] / data.data[fromCurrency];
        const result = (amount * rate).toFixed(2); // Calculating converted amount

        setConvertedAmount(result); // Set the result
        setError(null); // Clear any previous errors
      } else {
        setError("Error fetching conversion data: Invalid data structure.");
      }
    } catch (error) {
      setError("Error fetching conversion data");
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "400px",
        marginTop: "50px",
        backgroundColor: "#f8f9fa",
        padding: "20px",
        borderRadius: "8px",
        fontFamily: "Montserrat",
      }}
    >
      <h3 className="text-center">Currency Converter</h3>

      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="fromCurrency" className="form-label">
          From Currency
        </label>
        <select
          id="fromCurrency"
          className="form-select"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
          {/* Add more currencies as needed */}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="toCurrency" className="form-label">
          To Currency
        </label>
        <select
          id="toCurrency"
          className="form-select"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
          {/* Add more currencies as needed */}
        </select>
      </div>

      <button className="btn btn-primary w-100" onClick={handleConvert}>
        Convert
      </button>

      {/* Show error if any */}
      {error && <p className="text-danger mt-3">{error}</p>}

      {/* Show conversion result */}
      {convertedAmount !== null && (
        <div className="mt-4">
          <h4 className="text-center">
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </h4>
        </div>
      )}
    </div>
  );
};

export default Converter;
