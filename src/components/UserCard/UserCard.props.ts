export interface UserCardProps {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  email?: string;
  isFavorite: boolean;
  onAddToFavorite: (id: number) => void;
}