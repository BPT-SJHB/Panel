export interface PagingResponse<T> {
  items: T[]; // paged items
  total: number; // total number of items
  page: number; // current page
  pageSize?: number; // number of items per page
  page_size?: number;
  totalPages?: number; // total pages
  total_pages?: number;
}
