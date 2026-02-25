import { Link } from 'react-router';

export const Home = () => {
  const [isRevealVisible, setIsRevealVisible] = useState(false);
  const revealRef = useRef(null);

  useEffect(() => {
    if (!revealRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(revealRef.current);
    return () => observer.disconnect();
  }, []);

  const introList = [
    { icon: '🚚', title: '快速出貨', desc: '下單後 24 小時內寄出' },
    { icon: '🛡️', title: '安心材質', desc: '精選安全無毒材質' },
    { icon: '⭐', title: '高評價', desc: '超過 10,000 筆好評' },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
      {/* Hero Section - 主視覺區塊 */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-r from-orange-50 via-pink-50 to-white p-6 sm:p-8 md:p-10 xl:p-14">
        {/* 背景裝飾球 - 手機版隱藏 */}
        <div className="hidden sm:block absolute -top-12 -left-12 h-32 w-32 md:h-40 md:w-40 rounded-full bg-orange-200/60 blur-2xl animate-pulse" />
        <div className="hidden sm:block absolute -bottom-16 -right-16 h-40 w-40 md:h-48 md:w-48 rounded-full bg-pink-200/60 blur-2xl animate-pulse" />

        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">
          {/* 左側文字區 */}
          <div>
            <p className="inline-flex items-center gap-2 bg-white/70 text-orange-600 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-sm">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-orange-400 animate-ping" />
              熱門新品上架中
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold mt-3 sm:mt-4 leading-tight">
              給毛孩的日常好物
              <span className="block text-orange-500 mt-1">一站式挑選完成</span>
            </h1>
            <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg">
              精選安全材質、實用設計與高評價商品，讓毛孩的生活更舒適。
            </p>
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
              <Link to="/products" className="cart-btn text-center text-sm sm:text-base">
                立即選購
              </Link>
              <Link
                to="/cart"
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-orange-200 text-orange-500 font-medium hover:bg-orange-50 transition text-center text-sm sm:text-base"
              >
                查看購物車
              </Link>
            </div>
          </div>

          {/* 右側卡片區 */}
          <div className="relative mt-6 xl:mt-0">
            <div className="hidden sm:block absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-white/80 rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg animate-bounce text-sm sm:text-base">
              🐾 熱銷排行
            </div>
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 md:p-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-xl sm:rounded-2xl bg-orange-100 flex items-center justify-center text-xl sm:text-2xl animate-spin">
                  🐶
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base">狗狗舒壓玩具</div>
                  <div className="text-xs sm:text-sm text-gray-500">限時 8 折</div>
                </div>
              </div>
              <div className="mt-4 sm:mt-6 h-2.5 sm:h-3 w-full rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full w-2/3 bg-linear-to-r from-orange-400 to-pink-400 animate-pulse" />
              </div>
              <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
                本週熱度 <span className="text-orange-500 font-semibold">+32%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 特色介紹區 */}
      <section className="mt-8 sm:mt-12 md:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {introList.map((item, index) => (
            <div
              key={item.title}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 transition hover:-translate-y-1"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 animate-bounce">{item.icon}</div>
              <div className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">{item.title}</div>
              <p className="text-gray-500 text-xs sm:text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 推薦商品區 */}
      <section className="mt-8 sm:mt-12 md:mt-16" ref={revealRef}>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          <div
            className={`bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 transition-all duration-700 ${
              isRevealVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
            }`}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">本月人氣推薦</h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              依據購買與評價排行，挑選最受歡迎的毛孩必備好物。
            </p>
            <ul className="space-y-2.5 sm:space-y-3 text-gray-700 text-sm sm:text-base">
              <li className="flex items-center gap-2.5 sm:gap-3">
                <span className="h-2 w-2 rounded-full bg-orange-400 shrink-0" />
                高蛋白零食組合
              </li>
              <li className="flex items-center gap-2.5 sm:gap-3">
                <span className="h-2 w-2 rounded-full bg-orange-400 shrink-0" />
                貓咪舒眠窩
              </li>
              <li className="flex items-center gap-2.5 sm:gap-3">
                <span className="h-2 w-2 rounded-full bg-orange-400 shrink-0" />
                防滑外出牽繩
              </li>
            </ul>
            <div className="mt-5 sm:mt-6">
              <Link to="/products" className="cart-btn inline-block text-center w-full sm:w-auto text-sm sm:text-base">
                查看更多商品
              </Link>
            </div>
          </div>

          <div
            className={`bg-linear-to-r from-orange-100 to-pink-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg transition-all duration-700 delay-150 ${
              isRevealVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
            }`}
          >
            <div className="text-4xl sm:text-5xl">🎁</div>
            <h4 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4">新客首購禮</h4>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">完成首次下單，立即獲得限定小禮物。</p>
            <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-orange-500 font-medium">活動進行中</div>
          </div>
        </div>
      </section>

      {/* 訂閱區塊 */}
      <section className="mt-8 sm:mt-12 md:mt-16">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="w-full md:w-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">加入會員享專屬優惠</h2>
            <p className="text-gray-600 mt-1.5 sm:mt-2 text-sm sm:text-base">每月精選折扣與毛孩新鮮資訊</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="輸入 Email"
              className="flex-1 sm:flex-none sm:w-56 md:w-72 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm sm:text-base"
            />
            <button className="cart-btn whitespace-nowrap text-sm sm:text-base">立即訂閱</button>
          </div>
        </div>
      </section>
    </div>
  );
};
