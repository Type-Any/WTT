import styled from "@emotion/native";

const Section = styled.View<{ marginTop?: number }>`
  width: 100%;
  margin-top: ${({ marginTop = 0 }) => marginTop}px;
`;

export default Section;
