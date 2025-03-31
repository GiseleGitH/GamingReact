import { useState } from "react";
import GameBoard from "./components/GameBoard";
import { Container, Title, ResetButton } from "./styles";

const App = () => {
  const [reset, setReset] = useState(false);

  const handleReset = () => {
    setReset(true);
    setTimeout(() => setReset(false), 100);
  };

  return (
    <Container>
      <Title>Memory Game</Title>
      <GameBoard reset={reset} setReset={setReset} />
      <ResetButton onClick={handleReset}>Réinitialiser</ResetButton>
    </Container>
  );
};

export default App;