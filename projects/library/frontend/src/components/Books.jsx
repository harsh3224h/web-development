import React, { useState, useEffect } from "react";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Mock API call simulation - Replace the URL with your actual backend endpoint
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        // const response = await fetch("YOUR_API_ENDPOINT_HERE");
        // const data = await response.json();

        // Simulating API behavior and structure
        await new Promise((resolve) => setTimeout(resolve, 800));
        const mockData = [
          {
            id: 1,
            title: "The Architecture of Open Source Applications",
            author: "Amy Brown",
            category: "Engineering",
            releaseDate: "2012-05-14",
            rating: 4.7,
            coverPage:
              "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400",
          },
          {
            id: 2,
            title: "Designing Data-Intensive Applications",
            author: "Martin Kleppmann",
            category: "Engineering",
            releaseDate: "2017-03-16",
            rating: 4.9,
            coverPage:
              "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
          },
          {
            id: 3,
            title: "The Psychology of Money",
            author: "Morgan Housel",
            category: "Finance",
            releaseDate: "2020-09-08",
            rating: 4.8,
            coverPage:
              "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&q=80&w=400",
          },
          {
            id: 4,
            title: "Atomic Habits",
            author: "James Clear",
            category: "Self-Improvement",
            releaseDate: "2018-10-16",
            rating: 4.8,
            coverPage:
              "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400",
          },
        ];

        setBooks(mockData);
      } catch (err) {
        setError("Failed to fetch library inventory data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const categories = ["All", ...new Set(books.map((b) => b.category))];

  const filteredBooks =
    selectedCategory === "All"
      ? books
      : books.filter((book) => book.category === selectedCategory);

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6 flex flex-col items-center">
      <div className="w-[98%] max-w-[1400px] border border-zinc-400 bg-white rounded-[60px] shadow-xl py-12 px-12 flex flex-col gap-8 mt-4">
        {/* Title and Top Layout Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-zinc-200">
          <div>
            <h1 className="text-5xl text-slate-900 font-stylish font-normal">
              Library Inventory
            </h1>
            <p className="text-zinc-500 font-sans mt-1 text-lg">
              Explore available volumes, structural catalogs, and asset
              releases.
            </p>
          </div>

          {/* Filter Pill Row */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`p-2 border rounded-2xl px-5 font-stylish text-lg transition-all cursor-pointer ${
                  selectedCategory === category
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-zinc-200 text-slate-800 border-zinc-300 hover:bg-zinc-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Error Handling State */}
        {error && (
          <div className="w-full text-center py-12 text-xl text-red-500 font-sans">
            {error}
          </div>
        )}

        {/* Loading Skeleton States */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="border border-zinc-200 rounded-[32px] p-4 flex flex-col gap-4 animate-pulse"
              >
                <div className="w-full aspect-[3/4] bg-zinc-200 rounded-[20px]" />
                <div className="h-6 bg-zinc-200 rounded w-3/4" />
                <div className="h-4 bg-zinc-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Books Shelf Grid Layout */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="group border border-zinc-300 bg-zinc-50 p-4 rounded-[32px] flex flex-col justify-between transition-all hover:shadow-md hover:border-zinc-400"
              >
                {/* Cover Image Wrapper */}
                <div className="w-full aspect-[3/4] bg-zinc-200 rounded-[20px] overflow-hidden border border-zinc-300 relative">
                  <img
                    src={book.coverPage}
                    alt={`${book.title} cover`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-xs font-mono border border-zinc-300 px-2.5 py-1 rounded-full text-slate-900 shadow-xs">
                    ★ {book.rating.toFixed(1)}
                  </span>
                </div>

                {/* Info Text Stack */}
                <div className="flex flex-col gap-1 mt-4 px-1 flex-grow">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    {book.category}
                  </span>
                  <h3 className="text-xl font-stylish font-normal text-slate-900 line-clamp-2 leading-snug mt-0.5">
                    {book.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-sans mt-0.5">
                    By {book.author}
                  </p>
                </div>

                {/* Card Base Metadata */}
                <div className="mt-4 pt-3 border-t border-zinc-200/80 flex items-center justify-between text-xs text-zinc-500 font-mono px-1">
                  <span>Released:</span>
                  <span>{new Date(book.releaseDate).getFullYear()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty Collection Prompt */}
        {!loading && filteredBooks.length === 0 && (
          <div className="w-full text-center py-20 text-xl text-zinc-400 font-sans">
            No matching books found under this category filter.
          </div>
        )}
      </div>
    </div>
  );
}

export default Books;
