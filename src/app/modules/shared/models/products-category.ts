export interface IProductsCategory {
  id: string
  name: string
  imageUri: string
  parentCategoryId?: string | null
  parentCategory?: IProductsCategory | null
  childСategories: IProductsCategory[]
}
