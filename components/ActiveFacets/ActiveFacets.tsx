import { UserFacets } from "types";

interface ActiveFacetsProps {
  userFacets: UserFacets;
}

const ActiveFacets: React.FC<ActiveFacetsProps> = ({ userFacets }) => {
  return (
    <ul>
      {Object.keys(userFacets).map((name) =>
        userFacets[name].map((item) => (
          <li key={item}>
            {name}: {item}
          </li>
        ))
      )}
    </ul>
  );
};

export default ActiveFacets;
