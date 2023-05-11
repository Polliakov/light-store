export interface IProductsCategory {
  id: string
  name: string
  imageUri: string
  parentCategory?: IProductsCategory | null
  childСategories: IProductsCategory[]
}
