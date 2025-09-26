export interface PagingResponse<T> {
  items: T[]; // paged items
  total: number; // total number of items
  page: number; // current page
  page_size: number; // number of items per page
  total_pages: number; // total pages
}
