import { ErrorDataType } from "./types";

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(
  errorData: unknown
): errorData is ErrorDataType {
  if (errorData && typeof errorData === "object" && "data" in errorData) {
    const {
      data: { error },
    } = errorData as ErrorDataType;
    return (
      (typeof error === "string" || typeof error === "object") && error != null
    );
  }

  return false;
}
