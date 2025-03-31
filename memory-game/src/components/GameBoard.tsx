import { useState, useEffect } from "react";
import Card from "./Card";
import { Board } from "../styles";

interface GameBoardProps {
  reset: boolean;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
}

const emojis = ["🍕", "🍔", "🍟", "🌭", "🍎", "🍉", "🍩", "🍪"];
const cardsData = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

const GameBoard: React.FC<GameBoardProps> = ({ reset, setReset }) => {
  const [cards, setCards] = useState<string[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  useEffect(() => {
    setCards(cardsData);
  }, []);

  useEffect(() => {
    if (reset) {
      setMatched([]);
      setSelected([]);
      setCards([...emojis, ...emojis].sort(() => Math.random() - 0.5));
      setReset(false);
    }
  }, [reset, setReset]);

  const handleCardClick = (index: number) => {
    if (selected.length === 2 || matched.includes(index)) return;

    setSelected([...selected, index]);

    if (selected.length === 1) {
      const [firstIndex] = selected;
      if (cards[firstIndex] === cards[index]) {
        setMatched([...matched, firstIndex, index]);
      }
      setTimeout(() => setSelected([]), 1000);
    }
  };

  return (
    <Board>
      {cards.map((emoji, index) => (
        <Card
          key={index}
          emoji={emoji}
         index={index}
          isFlipped={selected.includes(index) || matched.includes(index)}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </Board>
  );
};

export default GameBoard;
