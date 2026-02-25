import { Link } from 'react-router';
import { getCartList, updateCartItem, deleteCartItem } from '@/api/server/cart';
import TipsModal from '@/component/TipsModal';
import { useBtnLoading } from '@/utils/util';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { refreshCartCount } from '@/slices/cartSlice';

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { btnLoading, withBtnLoading } = useBtnLoading();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      setLoading(true);
      const {
        data: { data },
      } = await getCartList();
      setItems(data);
      // 同步更新 header 的購物車數量
      dispatch(refreshCartCount());
    } catch (err) {
      console.error(err);
      message.error('載入購物車失敗');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const changeQty = async (item, qty) => {
    if (qty === 0) {
      return handleOpenTipsModal(item);
    }
    await withBtnLoading(`cart_${item.id}`, async () => {
      try {
        await updateCartItem(item.id, { product_id: item.product.id, qty });
        message.success('已更新數量');
        await loadCart();
      } catch (err) {
        console.error(err);
        message.error('更新數量失敗');
      }
    });
  };

  const [isTipsModalOpen, setIsTipsModalOpen] = useState(false);
  const [deleteItemTitle, setDeleteItemTitle] = useState('');
  const [deletingProductId, setDeletingProductId] = useState(null);
  const handleOpenTipsModal = (item) => {
    setIsTipsModalOpen(true);
    setDeleteItemTitle(item.product.title);
    setDeletingProductId(item.id);
  };

  const handleCloseTipsModal = () => {
    setIsTipsModalOpen(false);
    setDeleteItemTitle('');
  };

  const handleRemove = async () => {
    await withBtnLoading(`delete_${deletingProductId}`, async () => {
      try {
        await deleteCartItem(deletingProductId);
        message.success('刪除成功');
        handleCloseTipsModal();
        await loadCart();
      } catch (err) {
        console.error(err);
        message.error('刪除失敗');
      }
    });
  };

  const subtotal = items.total;
  const shipping = subtotal > 2000 || subtotal === 0 ? 0 : 120;
  const total = items.final_total;
  const isCartEmpty = !items?.carts?.length;

  const goCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-8 py-6 md:py-8 xl:py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">購物車</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <section className="lg:col-span-2">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 space-y-3 md:space-y-4">
            {items.carts.length === 0 ? (
              <div className="text-center py-8 md:py-10">
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">🛒</div>
                <div className="text-base md:text-lg font-semibold">您的購物車是空的</div>
                <div className="mt-3 md:mt-4">
                  <Link to="/products" className="text-orange-500 hover:underline text-sm md:text-base">
                    去逛逛商品
                  </Link>
                </div>
              </div>
            ) : (
              items.carts.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 md:gap-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 xl:w-28 xl:h-28 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.product.imageUrl || 'https://via.placeholder.com/200?text=No+Image'}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm md:text-base xl:text-lg truncate">{item.product.title}</div>
                        <div className="text-gray-500 text-xs md:text-sm mt-1">NT${item.product.price}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-base md:text-lg font-semibold text-orange-500">NT${item.final_total}</div>
                        <button
                          type="button"
                          onClick={() => handleOpenTipsModal(item)}
                          className="text-xs md:text-sm text-gray-400 hover:text-red-500 mt-1 md:mt-2 cursor-pointer"
                        >
                          刪除
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 md:mt-4 flex items-center gap-2 md:gap-3">
                      <div className="flex items-center gap-1 md:gap-2">
                        <button
                          type="button"
                          onClick={() => changeQty(item, item.qty - 1)}
                          disabled={btnLoading[`cart_${item.id}`]}
                          className="cart-btn px-2! md:px-3! py-1! text-sm! md:text-base!"
                        >
                          -
                        </button>
                        <div className="px-2 min-w-8 md:min-w-10 text-center text-sm md:text-base">{item.qty}</div>
                        <button
                          type="button"
                          onClick={() => changeQty(item, item.qty + 1)}
                          disabled={btnLoading[`cart_${item.id}`]}
                          className="cart-btn px-2! md:px-3! py-1! text-sm! md:text-base!"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <aside>
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 sticky top-4">
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">訂單摘要</h2>
            <div className="flex justify-between text-gray-600 mb-2 text-sm md:text-base">
              <div>小計</div>
              <div>NT${subtotal}</div>
            </div>
            <div className="flex justify-between text-gray-600 mb-2 text-sm md:text-base">
              <div>運費</div>
              <div>{shipping === 0 ? '免運' : `NT${shipping}`}</div>
            </div>
            <div className="border-t mt-3 md:mt-4 pt-3 md:pt-4 flex justify-between items-center">
              <div className="text-base md:text-lg font-bold">總計</div>
              <div className="text-xl md:text-2xl font-bold text-orange-500">NT${total}</div>
            </div>

            <button
              disabled={isCartEmpty}
              className="py-3 px-4 md:px-6 mt-4 md:mt-6 w-full cart-btn block text-center text-sm md:text-base"
              onClick={() => goCheckout()}
            >
              前往結帳
            </button>
          </div>
        </aside>
      </div>

      {/* 刪除產品 Modal */}
      <TipsModal
        isOpen={isTipsModalOpen}
        onClose={handleCloseTipsModal}
        title={`是否要刪除「${deleteItemTitle}」?`}
        loading={btnLoading[`delete_${deletingProductId}`]}
        onConfirm={handleRemove}
      />
    </div>
  );
};
