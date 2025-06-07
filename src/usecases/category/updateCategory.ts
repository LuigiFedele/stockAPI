export interface UpdateCategoryModel {
  id: string;
  name?: string;
}

export interface UpdateCategory {
  update: (category: UpdateCategoryModel) => Promise<Error | void>;
}
