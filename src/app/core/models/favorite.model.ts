export interface Favorite {
  id: number;
  userId: number;
  offerId: string;
  title: string;
  company: string;
  location: string;
  postedDate?: string;
  description?: string;
  url?: string;
  apiSource?: string;
  dateAdded: string;
}


export interface AddFavoriteDto {
  userId: number;
  offerId: string;
  title: string;
  company: string;
  location: string;
  postedDate?: string;
  description?: string;
  url?: string;
  apiSource?: string;
}
