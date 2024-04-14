export type Paginate<T> = {
    offset: number,
    limit: number,
    results: T[],
}