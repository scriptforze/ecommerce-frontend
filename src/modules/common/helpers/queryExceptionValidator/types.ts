interface IBaseServiceException {
  error?: object | string;
  code?: number;
}

export type ErrorDataType = {
  data: IBaseServiceException;
};
