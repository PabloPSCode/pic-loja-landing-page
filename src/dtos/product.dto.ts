export interface IProductDocumentDTO {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  userId: string;
  bgColor: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type IProductDTO = IProductDocumentDTO;

export interface ICreateProductDTO {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  userId: string;
  bgColor: string;
}

export interface IUpdateProductDTO {
  title?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  bgColor?: string;
}
