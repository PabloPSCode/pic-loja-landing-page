export interface IProductDocumentDTO {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  imageScale: number;
  userId: string;
  bgColor: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IProductDTO = IProductDocumentDTO;

export interface ICreateProductDTO {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  imageScale: number;
  userId: string;
  bgColor: string;
}

export interface IUpdateProductDTO {
  title?: string;
  description?: string;
  price?: number;
  imageScale?: number;
  bgColor?: string;
}
