import { TopicsStyled } from "./Topics.styled";

export default function Topics() {
  return (
    <TopicsStyled>
      {/* <label>Of Interest</label> */}
      <ul>
        <li>
          <a>Apartheid</a>
        </li>
        <li>
          <a>Baez, Joan</a>
        </li>
        <li>
          <a>Historical maps</a>
        </li>
        <li>
          <a>Navajo (Navaho)</a>
        </li>
        <li>
          <a>Washington, D.C.</a>
        </li>
      </ul>
    </TopicsStyled>
  );
}
