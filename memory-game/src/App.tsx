import { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";
import { Container, Title, ResetButton, Timer } from "./styles";

// Importer les effets sonores
//import flipSound from "./assets/sounds/flip.mp3";
//import matchSound from "./assets/sounds/match.mp3";
//import wrongSound from "./assets/sounds/wrong.mp3";
//import winSound from "./assets/sounds/win.mp3";

const App: React.FC = () => {
  const [reset, setReset] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [moves, setMoves] = useState(0);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [playerTurn, setPlayerTurn] = useState<1 | 2>(1);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });

  // Récupérer le meilleur temps depuis localStorage
  const storedBestTime = localStorage.getItem("bestTime");
  const initialBestTime = storedBestTime ? parseInt(storedBestTime, 10) : null;
  const [bestTime, setBestTime] = useState<number | null>(initialBestTime);

  // Fonction pour jouer un son
  const playSound = (sound: string) => {
    const audio = new Audio(sound);
    audio.play();
  };

  // Met à jour le chrono si le jeu est en cours
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (running) {
      interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [running]);

  // Mise à jour du meilleur temps quand le jeu est terminé
  useEffect(() => {
    if (!running && time > 0) {
      if (bestTime === null || time < bestTime) {
        setBestTime(time);
        localStorage.setItem("bestTime", time.toString());
      }
    }
  }, [running, time, bestTime]);

  return (
    <Container>
      <Title>Détendez-vous</Title>

      {/* Sélecteur de difficulté */}
      <select onChange={(e) => setDifficulty(e.target.value as "easy" | "medium" | "hard")} value={difficulty}>
        <option value="easy">Facile (4 paires)</option>
        <option value="medium">Moyen (6 paires)</option>
        <option value="hard">Difficile (8 paires)</option>
      </select>

      <Timer>⏱️ Temps: {time} sec</Timer>
      <Timer>🔢 Coups: {moves}</Timer>
      <Timer>🎮 Joueur Actuel: {playerTurn}</Timer>
      <Timer>🔵 Joueur 1: {scores.player1} paires</Timer>
      <Timer>🔴 Joueur 2: {scores.player2} paires</Timer>
      {bestTime !== null && <Timer>🏆 Meilleur Temps: {bestTime} sec</Timer>}

      <GameBoard
        reset={reset}
        setReset={setReset}
        setRunning={setRunning}
        setTime={setTime}
        setMoves={setMoves}
        playerTurn={playerTurn}
        setPlayerTurn={setPlayerTurn}
        scores={scores}
        setScores={setScores}
        difficulty={difficulty}
        playSound={playSound}
      />

      <ResetButton onClick={() => { 
        setReset(true);
        setTime(0);
        setRunning(true);
        setMoves(0);
        setScores({ player1: 0, player2: 0 });
        setPlayerTurn(1);
      }}>
        Recommencer
      </ResetButton>
    </Container>
  );
};

export default App;
