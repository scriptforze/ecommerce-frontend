export const currentMenuKey = (key: string) => {
  if (window.location.pathname.search(key) >= 0) {
    return window.location.pathname;
  }
  return key;
};
