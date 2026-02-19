export type ApplicationStatus = "pending" | "accepted" | "rejected";

export interface Application {
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
  status: ApplicationStatus;
  notes: string;
  dateAdded: string;
}


export interface AddApplicationDto {
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
