import { CardContainer, CardInner, CardFront, CardBack } from "../styles";

interface CardProps {
  emoji: string;
  isFlipped: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ emoji, isFlipped, onClick }) => {
  return (
    <CardContainer onClick={onClick}>
      <CardInner $flipped={isFlipped}>
        <CardFront>{isFlipped ? emoji : "?"}</CardFront> 
        <CardBack />
      </CardInner>
    </CardContainer>
  );
};

export default Card;
