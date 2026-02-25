import { Link } from 'react-router';

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: '❤️',
      title: '用心挑選',
      desc: '每一件商品都經過嚴格篩選，確保品質與安全性',
    },
    {
      icon: '🌟',
      title: '專業服務',
      desc: '提供專業的寵物照護建議與商品推薦',
    },
    {
      icon: '🤝',
      title: '貼心售後',
      desc: '完善的售後服務，讓您購物無後顧之憂',
    },
    {
      icon: '🌱',
      title: '永續經營',
      desc: '支持環保理念，選用對環境友善的材質',
    },
  ];

  const milestones = [
    { year: '2020', event: '品牌創立，開始線上經營' },
    { year: '2022', event: '突破 5,000 位會員，獲得好評' },
    { year: '2024', event: '擴大商品線，新增營養品系列' },
    { year: '2026', event: '服務超過 20,000 位毛孩家長' },
  ];

  const team = [
    {
      icon: '👩‍💼',
      name: '商品選品團隊',
      desc: '精選全球優質寵物用品',
    },
    {
      icon: '📦',
      name: '物流配送團隊',
      desc: '確保快速且安全的配送服務',
    },
    {
      icon: '💬',
      name: '客服支援團隊',
      desc: '隨時為您解答疑問',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-orange-50 via-pink-50 to-white p-10 md:p-16 mb-16">
        <div className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-orange-200/50 blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-pink-200/50 blur-3xl animate-pulse" />

        <div className="relative z-10 text-center">
          <div className="text-6xl mb-4 animate-bounce">🐾</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            關於 <span className="text-orange-500">PetShop</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            我們是一群熱愛毛孩的團隊，致力於為每位寵物家長提供最優質、安全的寵物用品。
            從創立至今，我們始終堅持「用心對待每一位毛孩」的理念。
          </p>
        </div>
      </section>

      {/* 品牌故事 */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="bg-linear-to-br from-orange-100 to-pink-100 rounded-3xl p-10 shadow-lg">
            <div className="text-5xl mb-6">📖</div>
            <h2 className="text-3xl font-bold mb-4">我們的故事</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              PetShop 創立於 2020 年，起源於創辦人對自家毛孩的深厚情感。
              我們發現市面上許多寵物用品品質參差不齊，於是決定親自挑選、測試每一件商品。
            </p>
            <p className="text-gray-700 leading-relaxed">
              經過多年的努力，我們建立了完整的供應鏈與品質控管系統， 如今已服務超過 20,000
              個家庭，成為毛孩家長最信賴的購物平台。
            </p>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-center">品牌里程碑</h3>
            <div className="space-y-6">
              {milestones.map((item, index) => (
                <div
                  key={item.year}
                  className="flex items-start gap-4 transition hover:translate-x-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="shrink-0 w-16 h-16 rounded-full bg-linear-to-br from-orange-400 to-pink-400 text-white flex items-center justify-center font-bold shadow-lg">
                    {item.year}
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-gray-700">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 核心價值 */}
      <section className="mb-16" ref={sectionRef}>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">我們的核心價值</h2>
          <p className="text-gray-600 text-lg">堅持品質，用心服務每一位毛孩</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, index) => (
            <div
              key={item.title}
              className={`bg-white rounded-2xl shadow-lg p-8 transition-all duration-700 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-5xl mb-4 animate-bounce">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 團隊介紹 */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">專業團隊</h2>
          <p className="text-gray-600 text-lg">各領域的專家，為您的毛孩把關</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 px-20">
          {team.map((member, index) => (
            <div
              key={member.name}
              className="bg-linear-to-br from-white to-orange-50 rounded-2xl shadow-lg p-8 text-center transition hover:shadow-xl hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl mb-4">{member.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 統計數據 */}
      <section className="mb-16">
        <div className="bg-linear-to-r from-orange-400 to-pink-400 rounded-3xl p-10 md:p-14 text-white shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="transition hover:scale-110">
              <div className="text-4xl md:text-5xl font-bold mb-2">20,000+</div>
              <div className="text-white/90 text-sm md:text-base">服務家庭</div>
            </div>
            <div className="transition hover:scale-110">
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-white/90 text-sm md:text-base">精選商品</div>
            </div>
            <div className="transition hover:scale-110">
              <div className="text-4xl md:text-5xl font-bold mb-2">99%</div>
              <div className="text-white/90 text-sm md:text-base">滿意度</div>
            </div>
            <div className="transition hover:scale-110">
              <div className="text-4xl md:text-5xl font-bold mb-2">24H</div>
              <div className="text-white/90 text-sm md:text-base">快速出貨</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white rounded-3xl shadow-xl p-10 md:p-14 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">準備好為毛孩選購了嗎？</h2>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          立即加入我們，探索超過 500 件精選商品，給您的毛孩最好的照顧
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/products" className="cart-btn">
            開始選購
          </Link>
          <Link
            to="/cart"
            className="px-6 py-3 rounded-lg border border-orange-200 text-orange-500 font-medium hover:bg-orange-50 transition"
          >
            查看購物車
          </Link>
        </div>
      </section>
    </div>
  );
};
