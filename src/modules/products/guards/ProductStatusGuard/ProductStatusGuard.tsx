import { useEffect } from "react";
import { Outlet, Navigate, useParams, useLocation } from "react-router-dom";
import { useGetProductByIdQuery } from "@/services/products";
import {
  useAppDispatch,
  useAppSelector,
  useLangTranslation,
} from "@/modules/common/hooks";
import { setProduct, reset } from "@/modules/products/store";
import { NotFound } from "@/modules/common/components";
import { ProductsRoutesList } from "@/modules/products/routes";
import { PRODUCT_INCLUDES } from "../../constants";

export const ProductStatusGuard = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { translate } = useLangTranslation();

  const { pathname } = useLocation();
  const { product } = useAppSelector((state) => state.products);

  const productId = parseInt(id!, 10);
  const step = pathname.split("/").pop();
  const { PRODUCTS, PRODUCT_STOCKS, EDIT_PRODUCT, PRODUCT_GENERAL } =
    ProductsRoutesList;

  const {
    data: productData,
    isError: isProductDataError,
    isFetching: isProductDataFetching,
  } = useGetProductByIdQuery(
    {
      product: productId,
      include: PRODUCT_INCLUDES,
    },
    { skip: !!product && product.id === productId }
  );

  useEffect(() => {
    if (productData?.data) {
      dispatch(setProduct({ product: productData.data }));
    }
    return () => {
      dispatch(reset());
    };
  }, [productData]);

  if (isProductDataFetching) return <>{`${translate("common.loading")}...`}</>;
  if (isProductDataError) return <NotFound />;
  if (!product) return null;

  if (step === PRODUCT_STOCKS && !product?.is_variable) {
    return (
      <Navigate
        replace
        to={`${PRODUCTS}/${EDIT_PRODUCT}/${productId}/${PRODUCT_GENERAL}`}
      />
    );
  }

  return <Outlet />;
};
