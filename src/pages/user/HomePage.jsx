import { useMemo, useState } from "react";

const HOME_DATA = [
  {
    id: "LT01",
    name: "MacBook Pro M1 2020",
    brand: "Apple",
    category: "Laptop",
    stock: 5,
  },
  {
    id: "LT02",
    name: "Dell XPS 13 9310",
    brand: "Dell",
    category: "Laptop",
    stock: 3,
  },
  {
    id: "LT03",
    name: "HP Spectre x360",
    brand: "HP",
    category: "Laptop",
    stock: 4,
  },
  {
    id: "LT04",
    name: "ASUS ZenBook UX425",
    brand: "ASUS",
    category: "Laptop",
    stock: 6,
  },
  {
    id: "LT05",
    name: "Lenovo ThinkPad X1 Carbon Gen 9",
    brand: "Lenovo",
    category: "Laptop",
    stock: 2,
  },
  {
    id: "LT06",
    name: "Acer Swift 5",
    brand: "Acer",
    category: "Laptop",
    stock: 7,
  },
  {
    id: "LT07",
    name: "Microsoft Surface Laptop 4",
    brand: "Microsoft",
    category: "Laptop",
    stock: 0,
  },
  {
    id: "LT08",
    name: "LG Gram 17 2021",
    brand: "LG",
    category: "Laptop",
    stock: 5,
  },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const filteredProducts = useMemo(() => {
    return HOME_DATA.filter((item) => {
      const matchesText = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = category ? item.category === category : true;
      const matchesBrand = brand ? item.brand === brand : true;
      return matchesText && matchesCategory && matchesBrand;
    });
  }, [search, category, brand]);

  return (
    <div className="min-h-screen bg-blue-50 pb-10">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#eaf4ff] via-[#dcefff] to-[#f4f7ff]" />
        <div className="absolute -top-20 -left-32 w-96 h-96 rounded-full bg-blue-200/70 blur-3xl" />
        <div className="absolute -bottom-20 -right-32 w-96 h-96 rounded-full bg-blue-300/50 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-5xl md:text-6xl font-black text-blue-900 text-center">
            Hỗ trợ mượn
          </h1>
          <p className="mt-3 text-center text-blue-700/80 text-lg">
            Quản lý mượn trả nhanh chóng.
          </p>
        </div>
      </section>

      <section className="px-4 mt-5">
        <div className="max-w-7xl mx-auto bg-white border border-blue-100 rounded-2xl shadow-lg p-4 md:p-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full md:w-60 border border-slate-200 bg-white rounded-lg px-4 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Tìm kiếm theo loại</option>
              <option value="Laptop">Laptop</option>
              <option value="Tablet">Máy tính bảng</option>
              <option value="Phụ kiện">Phụ kiện</option>
            </select>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full md:w-60 border border-slate-200 bg-white rounded-lg px-4 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Tìm kiếm theo hãng</option>
              <option value="Apple">Apple</option>
              <option value="Dell">Dell</option>
              <option value="HP">HP</option>
              <option value="Lenovo">Lenovo</option>
              <option value="ASUS">ASUS</option>
              <option value="Acer">Acer</option>
              <option value="Microsoft">Microsoft</option>
              <option value="LG">LG</option>
            </select>
            <div className="relative w-full md:w-72">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm theo tên thiết bị"
                className="w-full border border-slate-200 bg-white rounded-lg px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500">
                🔍
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setSearch("");
              setCategory("");
              setBrand("");
            }}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white text-sm font-semibold hover:bg-blue-700 transition"
          >
            Tìm lại
          </button>
        </div>
      </section>

      <main className="px-4 mt-6">
        <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {(filteredProducts.length ? filteredProducts : HOME_DATA).map(
            (item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition overflow-hidden"
              >
                <div className="h-40 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex items-center justify-center text-white text-6xl">
                  ⬜
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    Serial number
                  </p>
                  <h2
                    className="mt-1 text-xl font-bold text-slate-900 truncate"
                    title={item.name}
                  >
                    {item.name}
                  </h2>
                  <p className="text-sm text-slate-600">{item.brand}</p>
                  <p className="text-sm text-slate-600 mb-3">{item.category}</p>

                  <div className="flex justify-between items-center mb-3">
                    <span
                      className={`font-bold ${item.stock > 0 ? "text-emerald-600" : "text-rose-500"}`}
                    >
                      {item.stock > 0 ? "Available" : "Out of stock"}
                    </span>
                    <span className="text-xs text-slate-400">
                      {item.stock} còn lại
                    </span>
                  </div>

                  <button
                    disabled={item.stock === 0}
                    className={`w-full py-2 rounded-lg font-semibold ${item.stock > 0 ? "text-white bg-blue-600 hover:bg-blue-700" : "text-slate-500 bg-slate-200 cursor-not-allowed"}`}
                  >
                    {item.stock > 0 ? "Mượn" : "Hết"}
                  </button>
                </div>
              </article>
            ),
          )}
        </div>
      </main>

      <footer className="px-4 pt-6">
        <div className="max-w-7xl mx-auto flex justify-center gap-2">
          <button className="px-3 py-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50">
            1
          </button>
          <button className="px-3 py-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50">
            2
          </button>
          <button className="px-3 py-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50">
            3
          </button>
        </div>
      </footer>
    </div>
  );
}
