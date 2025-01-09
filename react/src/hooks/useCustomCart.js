import { useDispatch, useSelector } from "react-redux"
import { getCartItemsAsync, changeCartAsync, removeFromCartAsync } from "../slice/cartSlice"

const useCustomCart = () => {
    const cartItem = useSelector(state => state.cartSlice?.items || []);
    const status = useSelector(state => state.cartSlice?.status || 'idle');
    const error = useSelector(state => state.cartSlice?.error || null);
    const dispatch = useDispatch()

    const refreshCart = async (memberId) => {
        try {
            dispatch(getCartItemsAsync(memberId)).unwrap(); // 결과를 기다림
            console.log("Cart refreshed successfully");
        } catch (error) {
            console.error("Failed to refresh cart:", error.message);
        }
    };
    
    const changeCart = async (cartDTO) => {
        try {
            const result = await dispatch(changeCartAsync(cartDTO)).unwrap();  // unwrap으로 결과값 얻기
            console.log("Change Cart Result:", result);
            return result;  // 제대로 반환된 결과
        } catch (error) {
            console.error("Error in changeCart:", error);  // 에러 처리
            return undefined;  // 실패 시 undefined 반환
        }
    };
    
    const deleteCart = async (cartId) => {
        try {
            dispatch(removeFromCartAsync(cartId)).unwrap(); // 결과를 기다림
            console.log("Cart item removed successfully");
        } catch (error) {
            console.error("Failed to remove cart item:", error.message);
        }
    };

    return { cartItem, status, error, refreshCart, changeCart, deleteCart }
}

export default useCustomCart