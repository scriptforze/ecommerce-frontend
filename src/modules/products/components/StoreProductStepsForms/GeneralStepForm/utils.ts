export const characterCount = {
  formatter: (info: { value: string; count: number; maxLength?: number }) =>
    `${info.count} of ${info.maxLength} characters`,
};
