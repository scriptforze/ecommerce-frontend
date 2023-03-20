export interface ProductTableColumnsProps {
  handleDelete: (recordId: number) => void;
  handlePublish: (recordId: number) => void;
  isProductDeleteLoading: boolean;
  isProductPublishLoading: boolean;
}
