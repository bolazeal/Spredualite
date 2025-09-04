export interface Movie {
  id: string;
  image: string;
  title: string;
  genre: string;
  year: string;
  duration: string;
  rating: string;
  description: string;
  category: 'original' | 'naija' | 'skit' | 'new' | 'action' | 'documentary';
  featured?: boolean;
}
