export interface CardI {
    brand: string | null;
    id: string;
    price: number;
    product: string;
}

export type Param = "product" | "brand" | "id" | "price"