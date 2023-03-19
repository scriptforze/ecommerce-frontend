import { useEffect } from "react";
import { Outlet, Navigate, useParams, useLocation } from "react-router-dom";
import { useGetProductByIdQuery } from "@/services/products";
import { useAppDispatch, useAppSelector } from "@/modules/common/hooks";
import { setProduct, reset } from "@/modules/products/store";
import { NotFound } from "@/modules/common/components";
import { ProductsRoutesList } from "@/modules/products/routes";

export const ProductStatusGuard = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

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
      include:
        "category,tags,product_attribute_options,product_stocks,images,stock_images",
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

  if (isProductDataFetching) return <>Loading..</>;
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
