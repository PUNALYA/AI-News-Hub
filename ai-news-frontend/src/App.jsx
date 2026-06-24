import { useEffect, useState } from "react";

function App() {
  const [articles, setArticles] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const fetchNews = async () => {
    try {
      const response = await fetch(
           "http://127.0.0.1:8000/api/news/"
            );

      const data = await response.json();

      console.log("Status:", response.status);
      console.log("Data:", data);

      if (data.articles) {
        setArticles(data.articles);
      }

      setLastUpdated(
        new Date().toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchNews();

    const interval = setInterval(() => {
      fetchNews();
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="bg-slate-900 py-6 shadow-lg">
        <h1 className="text-5xl font-bold text-center">
          AI News Hub
        </h1>

        <p className="text-center text-blue-400 mt-2">
          Last Updated: {lastUpdated}
        </p>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">

        <h2 className="text-3xl font-bold mb-6">
          Latest AI News
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
            >
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-52 object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              )}

              <div className="p-5">

                <div className="mb-3">
                  <span className="bg-blue-600 px-3 py-1 rounded-full text-xs">
                    {article.source?.name}
                  </span>
                </div>

                <h3 className="font-bold text-lg mb-3">
                  {article.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4">
                  {article.description}
                </p>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Read Full Article →
                </a>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default App;