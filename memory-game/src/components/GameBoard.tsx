import { useState, useEffect } from "react"; 
import Card from "./Card";
import { Board } from "../styles";

// Définition des props attendues
interface GameBoardProps {
  reset: boolean;
  setReset: (value: boolean) => void;
  setRunning: (value: boolean) => void;
  setTime: (value: number) => void;
  setMoves: (value: (prev: number) => number) => void;
  playerTurn: number;
  setPlayerTurn: (value: 1 | 2) => void;
  scores: { player1: number; player2: number };
  setScores: (value: (prev: { player1: number; player2: number }) => { player1: number; player2: number }) => void;
  difficulty: "easy" | "medium" | "hard";
  playSound: (sound: string) => void;
}

const emojis = ["🍕", "🍔", "🍟", "🌭", "🍎", "🍉", "🍩", "🍪"];

const getCards = (difficulty: "easy" | "medium" | "hard") => {
  let emojiSet: string[] = [];
  if (difficulty === "easy") emojiSet = emojis.slice(0, 4);
  else if (difficulty === "medium") emojiSet = emojis.slice(0, 6);
  else emojiSet = emojis;

  return [...emojiSet, ...emojiSet].sort(() => Math.random() - 0.5);
};

const GameBoard: React.FC<GameBoardProps> = ({
  reset,
  setReset,
  setRunning,
  setTime,
  setMoves,
  playerTurn,
  setPlayerTurn,
  scores,
  setScores,
  difficulty,
  playSound,
}) => {
  const [cards, setCards] = useState<string[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    setCards(getCards(difficulty));
    setRunning(true);
  }, [difficulty, setRunning]);

  // Réinitialisation du jeu
  useEffect(() => {
    if (reset) {
      setMatched([]);
      setSelected([]);
      setCards(getCards(difficulty));
      setReset(false);
      setRunning(true);
      setTime(0);
      setMoves(() => 0);
      setScores(() => ({ player1: 0, player2: 0 }));
      setPlayerTurn(1);
      setGameOver(false);
    }
  }, [reset, difficulty, setReset, setRunning, setTime, setMoves, setScores, setPlayerTurn]);

  useEffect(() => {
    if (!gameOver && matched.length === cards.length && cards.length > 0) {
      setGameOver(true);
      playSound("win");
      const winner =
        scores.player1 > scores.player2
          ? "Joueur 1 🏆"
          : scores.player1 < scores.player2
          ? "Joueur 2 🏆"
          : "Égalité 🎉";
      alert(`Félicitations ! ${winner} a gagné !`);
      setRunning(false);
    }
  }, [matched, cards, setRunning, scores, playSound, gameOver]);

  // Fonction pour gérer le clic sur une carte
  const handleCardClick = (index: number) => {
    if (selected.length === 2 || matched.includes(index)) return;

    playSound("flip");
    setSelected([...selected, index]);

    if (selected.length === 1) {
      setMoves((prev) => prev + 1);
      const [firstIndex] = selected;

      if (cards[firstIndex] === cards[index]) {
        playSound("match");
        setMatched([...matched, firstIndex, index]);

        setScores((prev) => ({
          ...prev,
          [playerTurn === 1 ? "player1" : "player2"]:
            prev[playerTurn === 1 ? "player1" : "player2"] + 1,
        }));
        setSelected([]); // Réinitialise les cartes sélectionnées
      } else {
        playSound("wrong");
        setTimeout(() => {
          setSelected([]); // Retourne les cartes après 1 seconde
          setPlayerTurn(playerTurn === 1 ? 2 : 1); // Change de joueur
        }, 1000);
      }
     // setTimeout(() => setSelected([]), 1000);
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
