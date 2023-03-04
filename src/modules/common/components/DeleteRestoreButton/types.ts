export interface StatusModel {
  id: number;
  name: string;
  type: string;
}

export interface DeleteRestoreButtonProps<T extends StatusModel> {
  status: T;
  recordId: number;
  loading: boolean;
  handleDelete: (recordId: number) => void;
}
