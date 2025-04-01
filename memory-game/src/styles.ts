import styled from "styled-components";



export const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

export const ResetButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 100px);
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

export const CardContainer = styled.div`
  width: 100px;
  height: 100px;
  perspective: 1000px;
`;

export const CardInner = styled.div<{ flipped: number }>` 
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  transform: ${({ flipped }) => (flipped ? "rotateY(180deg)" : "rotateY(0)")}; 
`;

export const CardFront = styled.div`
   position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* ✅ Cache la face avant lorsqu'elle est retournée */
  background: #4caf50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

export const CardBack = styled.div`
    position: absolute;
  width: 100%;
  height: 100%;
  background: #333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  backface-visibility: hidden;
  transform: rotateY(180deg); /* ✅ La face arrière est retournée par défaut */
`;

export const Timer = styled.div`
  font-size: 1.2rem;
  margin-top: 10px;
  color: #007bff;
  font-weight: bold;
`;
