import { useParams, Link } from 'react-router';
import { getPublicProduct } from '@/api/server/products';
import { useBtnLoading } from '@/utils/util';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/slices/cartSlice';

export const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { btnLoading, withBtnLoading } = useBtnLoading();

  const loadProduct = async () => {
    try {
      setLoading(true);
      const res = await getPublicProduct(id);
      setProduct(res.data.product);
    } catch (err) {
      console.error(err);
      message.error('載入商品失敗');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadProduct();
  }, [id]);

  const dispatch = useDispatch();
  const handleAddToCart = async () => {
    if (!product) return;
    await withBtnLoading(`cart_${product.id}`, async () => {
      try {
        const data = { product_id: product.id, qty: 1 };
        await dispatch(addToCart(data));
      } catch (err) {
        console.log(err);
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-bold">找不到商品</h3>
        <p className="text-gray-500">請確認商品是否存在或返回商品列表</p>
        <div className="mt-6">
          <Link to="/products" className="text-orange-500 hover:underline">
            返回商品列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 xl:py-10">
      <div className="bg-white rounded-lg md:rounded-xl xl:rounded-2xl shadow-lg p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 xl:gap-8">
          {/* 圖片區塊 - 375px: 全寬, 768px: 左半邊, 1280px: 左側 1/3 */}
          <div className="md:col-span-1 xl:col-span-1">
            <div className="aspect-square bg-gray-100 rounded-lg md:rounded-xl overflow-hidden">
              <img
                src={product.imageUrl || 'https://via.placeholder.com/600?text=No+Image'}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 內容區塊 - 375px: 全寬, 768px: 右半邊, 1280px: 右側 2/3 */}
          <div className="md:col-span-1 xl:col-span-2">
            {/* 標題和價格區塊 */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
              <div className="flex-1">
                <h1 className="text-xl md:text-2xl xl:text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
                <div className="mb-2 md:mb-3">
                  <span className="inline-block bg-orange-100 text-orange-600 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                    {product.category || '其他'}
                  </span>
                </div>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 line-clamp-2 md:line-clamp-3">
                  {product.description || '暫無描述'}
                </p>
              </div>

              {/* 價格區塊 */}
              <div className="text-left md:text-right flex md:flex-col gap-2 md:gap-0 items-center md:items-end">
                <div className="text-2xl md:text-3xl font-bold text-orange-500">${product.price?.toLocaleString()}</div>
                {product.origin_price > product.price && (
                  <div className="text-xs md:text-sm text-gray-400 line-through">
                    ${product.origin_price?.toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            {/* 按鈕區塊 */}
            <div className="mt-4 md:mt-6 flex flex-col sm:flex-row gap-3 md:gap-4">
              <button
                type="button"
                onClick={() => handleAddToCart()}
                disabled={btnLoading[`cart_${product.id}`]}
                className="cart-btn w-full sm:w-auto flex-1 sm:flex-none py-3 px-4 md:px-6 text-sm md:text-base"
              >
                加入購物車
              </button>

              <Link
                to="/products"
                className="w-full sm:w-auto py-3 px-4 md:px-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-center text-sm md:text-base"
              >
                回到列表
              </Link>
            </div>

            {/* 商品詳情區塊 */}
            <div className="mt-6 md:mt-8">
              <h3 className="text-base md:text-lg font-semibold mb-2">商品詳情</h3>
              <div className="prose prose-sm md:prose max-w-none text-gray-700">
                {product.content || product.description || '此商品尚無額外內容'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
