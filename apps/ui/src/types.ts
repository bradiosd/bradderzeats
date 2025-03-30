export interface Card {
  title: string;
  types: string[];
  tagline: string;
  description: string;
  background: string;
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
  name: string;
  icon: string;
}

export interface CardData {
  cardTypes: CardType[];
  cards: Card[];
} 