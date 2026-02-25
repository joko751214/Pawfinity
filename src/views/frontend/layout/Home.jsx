import { Link, Outlet } from 'react-router';
import { refreshCartCount } from '@/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import crossIcon from '@/assets/cross-icon.svg';
import hamburgerIcon from '@/assets/hamburger.svg';

const LayoutInner = () => {
  const [query, setQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery('');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const cartCount = useSelector((state) => state.cart.cartCount);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshCartCount());
  }, []);

  // 鎖定背景滾動當選單開啟時
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header 導航列 */}
      <header className="bg-linear-to-r from-orange-400 to-pink-400 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              <div className="text-2xl sm:text-3xl">🐾</div>
              <div className="font-bold text-lg sm:text-xl">PetShop</div>
            </Link>
          </div>

          {/* 導航選單 - 平板以上顯示 */}
          <nav className="hidden md:flex items-center gap-4 xl:gap-6 text-white/90 text-base xl:text-lg">
            <Link to="/" className="hover:underline hover:text-white transition">
              首頁
            </Link>
            <Link to="/products" className="hover:underline hover:text-white transition">
              商品列表
            </Link>
            <Link to="/about" className="hover:underline hover:text-white transition">
              關於我們
            </Link>
            <Link to="/cart" className="hover:underline hover:text-white transition">
              購物車
            </Link>
          </nav>

          {/* 搜尋和購物車 */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* 搜尋框 - 手機版隱藏 */}
            <form onSubmit={handleSearch} className="hidden sm:flex items-center">
              <input
                className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-gray-700 w-32 sm:w-40 md:w-48 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                placeholder="搜尋商品..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>

            {/* 購物車圖示 */}
            <Link to="/cart" className="relative">
              <div className="bg-white/20 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg hover:bg-white/30 transition">
                <span className="text-lg sm:text-xl">🛒</span>
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 min-w-5 h-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* 漢堡選單按鈕 - 平板以下顯示 */}
            <button
              onClick={toggleMenu}
              className="md:hidden bg-white/20 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg hover:bg-white/30 transition"
            >
              <img src={hamburgerIcon} alt="選單" />
            </button>
          </div>
        </div>

        {/* 移動端選單 - 側邊滑出 */}
        {/* 遮罩層 */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden z-40 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeMenu}
        />

        {/* 側邊選單 */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden z-50 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* 選單標題 */}
          <div className="bg-linear-to-r from-orange-400 to-pink-400 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              <span className="font-bold text-lg">選單</span>
            </div>
            <button onClick={closeMenu} className="p-1 hover:bg-white/20 rounded-lg transition">
              <img className="w-6 h-6" src={crossIcon} alt="關閉選單" />
            </button>
          </div>

          {/* 選單項目 */}
          <nav className="flex flex-col p-4">
            <Link
              to="/"
              onClick={closeMenu}
              className="py-3 px-4 text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition font-medium"
            >
              🏠 首頁
            </Link>
            <Link
              to="/products"
              onClick={closeMenu}
              className="py-3 px-4 text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition font-medium"
            >
              🛍️ 商品列表
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className="py-3 px-4 text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition font-medium"
            >
              ℹ️ 關於我們
            </Link>
            <Link
              to="/cart"
              onClick={closeMenu}
              className="py-3 px-4 text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition font-medium flex items-center justify-between"
            >
              <span>🛒 購物車</span>
              {cartCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 font-bold">{cartCount}</span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      {/* 頁面橫幅 */}
      <div className="bg-linear-to-r from-orange-400 to-pink-400 text-white py-8 sm:py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 drop-shadow-lg">
            🐾 寵物周邊商城
          </h1>
          <p className="text-base sm:text-lg md:text-xl opacity-90">為您的毛孩挑選最優質的商品</p>
        </div>
      </div>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer 頁尾 */}
      <footer className="bg-linear-to-r from-orange-400 to-pink-400 mt-8 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-5 sm:py-6 text-xs sm:text-sm flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-2">
          <div className="text-center md:text-left">© {new Date().getFullYear()} PetShop — 為毛孩挑選最好的商品</div>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/about" className="hover:underline transition">
              關於我們
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const Layout = () => {
  return <LayoutInner />;
};
