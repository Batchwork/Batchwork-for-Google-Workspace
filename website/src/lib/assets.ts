/** Public assets under website/public — respects Vite base on GitHub Pages. */
export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}
