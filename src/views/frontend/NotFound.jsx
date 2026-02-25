import { Link } from 'react-router';

export const NotFound = () => {
  return (
    <div className="min-h-[60vh] bg-linear-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-8 py-8 md:py-12 xl:py-16">
        <section className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-linear-to-r from-orange-50 via-pink-50 to-white p-8 md:p-12 xl:p-14 text-center shadow-lg">
          <div className="absolute -top-8 -left-8 md:-top-10 md:-left-10 h-24 w-24 md:h-36 md:w-36 rounded-full bg-orange-200/60 blur-2xl" />
          <div className="absolute -bottom-10 -right-10 md:-bottom-12 md:-right-12 h-28 w-28 md:h-40 md:w-40 rounded-full bg-pink-200/60 blur-2xl" />

          <div className="relative z-10">
            <p className="inline-flex items-center gap-2 bg-white/80 text-orange-600 px-2.5 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium shadow-sm">
              <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-orange-400" />
              找不到頁面
            </p>
            <h2 className="text-5xl md:text-6xl xl:text-7xl font-bold mt-4 md:mt-5 xl:mt-6 leading-none text-orange-500">
              404
            </h2>
            <h1 className="text-xl md:text-2xl xl:text-3xl font-bold mt-3 md:mt-4 text-gray-800">這個頁面走失了 🐾</h1>
            <p className="text-sm md:text-base text-gray-600 mt-2 md:mt-3 max-w-xl mx-auto px-4 md:px-0">
              你造訪的網址不存在或已被移動，回到首頁繼續幫毛孩挑選好物吧！
            </p>

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
              <Link to="/" className="cart-btn w-full sm:w-auto text-sm md:text-base">
                回到首頁
              </Link>
              <Link
                to="/products"
                className="w-full sm:w-auto px-4 md:px-6 py-3 rounded-lg border border-orange-200 text-orange-500 font-medium hover:bg-orange-50 transition text-sm md:text-base"
              >
                前往商品列表
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
