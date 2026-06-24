function NewsCard({ article }) {
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg">

      <img
        src={
          article.urlToImage ||
          "https://via.placeholder.com/400"
        }
        alt=""
        className="w-full h-48 object-cover"
      />

      <div className="p-4">

        <h2 className="font-bold text-lg">
          {article.title}
        </h2>

        <p className="text-gray-400 mt-2">
          {article.description}
        </p>

        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-400"
        >
          Read More →
        </a>

      </div>

    </div>
  )
}

export default NewsCard