import { useState } from "react";

interface Video {
  id: string;
  title: string;
  url: string;
  tags: string[]; // New field for tags
}

const FinanceVideos = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false); // Track if search was performed

  const allVideos: Video[] = [
    {
      id: "1",
      title: "Basics of Financial Literacy",
      url: "https://www.youtube.com/embed/ouvbeb2wSGA?si=nJHTLsYfppRoDV5n",
      tags: ["financial literacy", "finance", "money", "budget"],
    },
    {
      id: "2",
      title: "Saving and Budgeting Tips",
      url: "https://www.youtube.com/embed/UcAY6qRHlw0?si=GWqKo7er5m1p-6JZ",
      tags: ["investing", "stock market", "finance", "wealth"],
    },
    {
      id: "3",
      title: "Investing for Beginners",
      url: "https://www.youtube.com/embed/lNdOtlpmH5U?si=Ck4e0dMSD6qgInH4",
      tags: ["financial literacy", "finance", "money", "budget"],
    },
    {
      id: "4",
      title: "Understanding Credit Scores",
      url: "https://www.youtube.com/embed/f2ortkJfTKw?si=03opWMOs_LHFdBAf",
      tags: ["investing", "stock market", "finance", "wealth"],
    },
  ];

  const fetchVideos = (query: string): Video[] => {
    if (!query.trim()) return [];
    return allVideos.filter(
      (video) =>
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.tags.some((tag) =>
          tag.toLowerCase().includes(query.toLowerCase())
        )
    );
  };

  const handleSearch = () => {
    const results = fetchVideos(searchTerm);
    setVideos(results);
    setSearchPerformed(true); // Mark that a search was performed
  };

  const handleSuggestedSearch = (suggestion: string) => {
    setSearchTerm(suggestion); // Update the search term
    const results = fetchVideos(suggestion);
    setVideos(results);
    setSearchPerformed(true); // Mark that a search was performed
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Montserrat" }}>
      <h1>Financial Literacy Videos</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search for financial topics..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            const results = fetchVideos(e.target.value);
            setVideos(results);
            setSearchPerformed(true); // Mark search as performed
          }}
          style={{
            padding: "10px",
            width: "300px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            backgroundColor: "#036704",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>
      {/* Suggested Words */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Suggested Searches</h2>
        {["Financial Literacy", "Budget", "Investing", "Credit Scores"].map(
          (suggestion) => (
            <span
              key={suggestion}
              onClick={() => handleSuggestedSearch(suggestion)}
              style={{
                display: "inline-block",
                padding: "8px 16px",
                margin: "5px",
                backgroundColor: "#f0f0f0",
                borderRadius: "20px",
                fontSize: "14px",
                color: "#333",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              {suggestion}
            </span>
          )
        )}
      </div>

      {searchPerformed && videos.length === 0 && (
        <p>No videos found. Try searching for something else!</p>
      )}

      {videos.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap", // Ensures videos wrap to the next line
              gap: "20px", // Adds spacing between videos
            }}
          >
            {videos.map((video) => (
              <div
                key={video.id}
                style={{
                  flex: "0 1 calc(33.333% - 20px)", // 3 videos per row
                  boxSizing: "border-box",
                }}
              >
                <iframe
                  width="100%"
                  height="245"
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
                <h3 style={{ fontSize: "16px", textAlign: "center" }}>
                  {video.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceVideos;
