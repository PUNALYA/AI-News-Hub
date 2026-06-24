function ConceptCard({ title, description }) {
  return (
    <div className="bg-slate-800 p-5 rounded-xl">

      <h2 className="font-bold">
        {title}
      </h2>

      <p className="text-gray-400 mt-2">
        {description}
      </p>

    </div>
  )
}

export default ConceptCard