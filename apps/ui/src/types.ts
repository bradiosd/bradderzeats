export interface Card {
  title: string;
  types: string[];
  tagline: string;
  description: string;
  backgroundColor: string;
  backgroundImage: string | null;
  overlayOpacity: number;
  logo: {
    src: string;
    alt: string;
    size: {
      width: string;
      height: string;
    };
    invert: boolean;
  };
  url: string;
}

export interface CardType {
  id: string;
  name: string;
  icon: string;
}

export interface CardData {
  cardTypes: CardType[];
  cards: Card[];
} 