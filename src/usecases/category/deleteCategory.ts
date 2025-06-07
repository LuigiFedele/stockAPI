export interface DeleteCategoryModel {
  id: string;
}

export interface DeleteCategory {
  delete(category: DeleteCategoryModel): Promise<Error | void>;
}
