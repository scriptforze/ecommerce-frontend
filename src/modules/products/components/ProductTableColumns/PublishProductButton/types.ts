export interface PublishProductButtonProps {
  recordId: number;
  loading: boolean;
  handlePublish: (recordId: number) => void;
}
