export interface ActionReturnType<T> {
  success: boolean
  item?: T | null
  message?: string
}
