import { Link } from 'react-router';
import { getPublicProducts } from '@/api/server/products';
import { categories } from '@/utils/enum';
import { useBtnLoading } from '@/utils/util';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/slices/cartSlice';

const sortOptions = [
  { value: 'default', label: '預設排序' },
  { value: 'price-low', label: '價格：低到高' },
  { value: 'price-high', label: '價格：高到低' },
  { value: 'name', label: '名稱排序' },
];

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const { btnLoading, withBtnLoading } = useBtnLoading();

  // 用於水平滾動置中
  const scrollContainerRef = useRef(null);
  const categoryButtonsRef = useRef({});

  const pageSize = 10;

  // 載入產品資料
  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await getPublicProducts({
        category: selectedCategory === 'all' ? null : selectedCategory,
        page: currentPage,
      });

      let filteredProducts = response.data.products || [];

      // 搜尋篩選
      if (searchTerm) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        console.log('搜尋結果:', filteredProducts);
      }

      // 排序
      switch (sortBy) {
        case 'price-low':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          break;
      }

      setProducts(filteredProducts);

      const length =
        filteredProducts.length < response.data.products?.length ? 1 : response.data.pagination?.total_pages * pageSize;
      // 設定數量來顯示分頁
      setTotalProducts(length);
    } catch (error) {
      console.error('載入產品失敗:', error);
      message.error('載入產品失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [currentPage, selectedCategory, sortBy]);

  const horizontalScroll = (value) => {
    // 將選中的分類滾動到置中位置
    const button = categoryButtonsRef.current[value];
    const container = scrollContainerRef.current;

    if (button && container) {
      // 計算按鈕相對於容器的位置
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
      const containerWidth = container.offsetWidth;

      // 計算置中所需的滾動位置
      const scrollPosition = buttonLeft - containerWidth / 2 + buttonWidth / 2;

      // 平滑滾動到置中位置
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleSelectedCategory = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
    horizontalScroll(value);
  };

  // 搜尋處理
  const handleSearch = () => {
    setCurrentPage(1);
    loadProducts();
  };

  // 加入購物車
  const dispatch = useDispatch();
  const handleAddToCart = async (product) => {
    await withBtnLoading(`cart_${product.id}`, async () => {
      try {
        const data = { product_id: product.id, qty: 1 };
        await dispatch(addToCart(data));
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        {/* 搜尋和篩選區 */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {/* 搜尋框 */}
            <div className="col-span-1 md:col-span-2">
              <Input
                size="large"
                placeholder="搜尋商品名稱或描述..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onPressEnter={handleSearch}
                allowClear
                className="rounded-lg"
              />
            </div>

            {/* 排序選擇 */}
            <Select size="large" value={sortBy} onChange={setSortBy} className="w-full" options={sortOptions}></Select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* 側邊欄分類篩選 - 桌面版 */}
          <aside className="hidden lg:block lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4 text-gray-800">商品分類</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    type="button"
                    key={category.value}
                    onClick={() => handleSelectedCategory(category.value)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                      selectedCategory === category.value
                        ? 'bg-linear-to-r from-orange-400 to-pink-400 text-white shadow-md transform scale-105'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-medium">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* 移動端分類篩選 - 水平滾動 */}
          <div className="lg:hidden">
            <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
              <h2 className="text-base sm:text-lg font-bold mb-3 text-gray-800">商品分類</h2>
              <div ref={scrollContainerRef} className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    type="button"
                    key={category.value}
                    ref={(el) => (categoryButtonsRef.current[category.value] = el)}
                    onClick={() => handleSelectedCategory(category.value)}
                    className={`shrink-0 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm sm:text-base ${
                      selectedCategory === category.value
                        ? 'bg-linear-to-r from-orange-400 to-pink-400 text-white shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                    }`}
                  >
                    <span className="text-lg sm:text-xl">{category.icon}</span>
                    <span className="font-medium whitespace-nowrap">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 產品網格 */}
          <main className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Spin size="large" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 sm:py-16 md:py-20">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🔍</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">沒有找到商品</h3>
                <p className="text-sm sm:text-base text-gray-500">請嘗試其他搜尋條件</p>
              </div>
            ) : (
              <>
                <div className="mb-4 sm:mb-6 text-gray-600 text-sm sm:text-base">
                  找到 <span className="font-bold text-orange-500">{products.length}</span> 件商品
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                    >
                      {/* 產品圖片 */}
                      <Link to={`/product/${product.id}`} className="block relative group overflow-hidden">
                        <div className="aspect-square bg-gray-100">
                          <img
                            src={product.imageUrl || 'https://via.placeholder.com/400?text=No+Image'}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        {product.price < product.origin_price && (
                          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-linear-to-r from-orange-500 to-pink-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                            特價
                          </div>
                        )}
                      </Link>

                      {/* 產品資訊 */}
                      <div className="p-4 sm:p-5">
                        <div className="mb-2">
                          <span className="inline-block bg-orange-100 text-orange-600 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold">
                            {categories.find((c) => c.value === product.category)?.label || '其他'}
                          </span>
                        </div>

                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-800 hover:text-orange-500 transition-colors line-clamp-2 min-h-12 sm:min-h-14">
                            {product.title}
                          </h3>
                        </Link>

                        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 min-h-8 sm:min-h-10">
                          {product.description || '暫無描述'}
                        </p>

                        {/* 價格 */}
                        <div className="flex items-baseline gap-2 mb-3 sm:mb-4">
                          <span className="text-xl sm:text-2xl font-bold text-orange-500">
                            ${product.price?.toLocaleString()}
                          </span>
                          {product.origin_price > product.price && (
                            <span className="text-xs sm:text-sm text-gray-400 line-through">
                              ${product.origin_price?.toLocaleString()}
                            </span>
                          )}
                        </div>

                        {/* 星級評分 */}
                        <div className="flex items-center gap-1 mb-3 sm:mb-4">
                          {[...Array(5)].map((_, index) => (
                            <span key={index} className="text-yellow-400 text-sm sm:text-lg">
                              ★
                            </span>
                          ))}
                          <span className="text-gray-500 text-xs sm:text-sm ml-1 sm:ml-2">(4.8)</span>
                        </div>

                        {/* 按鈕 */}
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Link
                            to={`/product/${product.id}`}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-medium transition-colors text-center text-sm sm:text-base"
                          >
                            查看詳情
                          </Link>
                          <button
                            type="button"
                            disabled={btnLoading[`cart_${product.id}`]}
                            onClick={() => handleAddToCart(product)}
                            className="cart-btn text-sm sm:text-base py-2 sm:py-2.5 px-3 sm:px-4"
                          >
                            加入購物車
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 分頁 */}
                <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center">
                  <Pagination
                    current={currentPage}
                    total={totalProducts}
                    pageSize={pageSize}
                    onChange={setCurrentPage}
                    showSizeChanger={false}
                    className="custom-pagination"
                  />
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
