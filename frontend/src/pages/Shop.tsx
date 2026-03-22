import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import SignIn from "../components/SignIn";

import { useAuth } from "../hooks/useAuth";
import { usePayments } from "../hooks/usePayments";
import { axiosClient } from "../lib/axiosClient.ts";

const Shop = () => {
  const {
    user,
    isAuthenticated,
    showSignIn,
    signIn,
    signOut,
    closeSignIn,
    requireAuth,
    isLoading: isAuthLoading,
  } = useAuth();

  const { orderProduct, isLoading } = usePayments({
    isAuthenticated,
    onRequireAuth: requireAuth,
  });

  const onSendTestNotification = () => {
    const notification = {
      title: "Bonsai pi99 Thông Báo",
      body: "Đơn hàng của bạn đang được xử lý!",
      user_uid: user?.uid,
      subroute: "/shop",
    };
    axiosClient.post("/notifications/send", { notifications: [notification] });
  };

  return (
    <>
      <Header
        user={user}
        onSignIn={signIn}
        onSignOut={signOut}
        onSendTestNotification={onSendTestNotification}
        isLoading={isAuthLoading}
      />

      {/* Món hàng số 1 */}
      <ProductCard
        name="Thuốc Kích Rễ Siêu Cấp"
        description="Giúp cây Bonsai ra rễ cực mạnh, phục hồi cây suy yếu."
        price={0.1}
        pictureURL="https://bonsai-pi99.vercel.app/logo192.png" 
        onClickBuy={() => orderProduct("Mua Thuốc Kích Rễ", 0.1, { productId: "kich_re_01" })}
        disabled={isLoading}
      />

      {/* Món hàng số 2 */}
      <ProductCard
        name="Phân Bón Lá Hữu Cơ"
        description="Dinh dưỡng toàn diện cho lá xanh mướt, dáng cây đẹp."
        price={0.1}
        pictureURL="https://bonsai-pi99.vercel.app/logo192.png"
        onClickBuy={() => orderProduct("Mua Phân Bón Lá", 0.1, { productId: "phan_bon_01" })}
        disabled={isLoading}
      />

      {/* Món hàng số 3 */}
      <ProductCard
        name="Dịch Vụ Đăng Bài Bán Cây"
        description="Thanh toán 0.1 Pi để được đăng bài bán cây của mầy lên chợ."
        price={0.1}
        pictureURL="https://bonsai-pi99.vercel.app/logo192.png"
        onClickBuy={() => orderProduct("Thanh toán đăng bài", 0.1, { productId: "dang_bai_01" })}
        disabled={isLoading}
      />

      {showSignIn && <SignIn onSignIn={signIn} onModalClose={closeSignIn} disabled={isAuthLoading} />}
    </>
  );
};

export default Shop;
