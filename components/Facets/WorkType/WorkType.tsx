import { useEffect, useState } from "react";
import { FACETS_WORK_TYPE } from "@/lib/constants/facets-model";
import RadioGroup from "./RadioGroup";
import { UserFacets } from "@/types/context/search-context";
import { WorkTypeOptions } from "@/types/components/facets";
// import useFetchApiData from "@/hooks/useFetchApiData";
import { useSearchState } from "@/context/search-context";

const WorkType: React.FC = () => {
  const [currentValue, setCurrentValue] = useState<WorkTypeOptions>("All");
  const { id } = FACETS_WORK_TYPE.facets[0];

  const { searchDispatch, searchState } = useSearchState();
  const { userFacets } = searchState;

  const workTypeFacet = userFacets[id];

  /**
   * set non-context search request params
   */
  // const size = 0;
  // const activeFacets = FACETS_WORK_TYPE.facets;
  // const searchTerm = q;

  // const { data } = useFetchApiData({
  //   activeFacets,
  //   searchTerm,
  //   size,
  //   userFacets,
  // });

  useEffect(() => {
    if (workTypeFacet && workTypeFacet.length > 0) {
      setCurrentValue(workTypeFacet[0] as WorkTypeOptions);
    } else {
      setCurrentValue("All");
    }
  }, [workTypeFacet]);

  const handleValueChange = (value: string) => {
    const newObj: UserFacets = { ...userFacets };

    switch (value) {
      case "All":
        newObj[id] = [];
        break;
      default:
        newObj[id] = [value];
        break;
    }

    searchDispatch({
      type: "updateUserFacets",
      userFacets: newObj,
    });

    return;
  };

  return (
    <RadioGroup
      currentValue={currentValue}
      handleValueChange={handleValueChange}
    />
  );
};

export default WorkType;
