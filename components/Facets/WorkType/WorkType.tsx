import { useEffect, useState } from "react";
import { FACETS_WORK_TYPE } from "@/lib/constants/facets-model";
import RadioGroup from "./RadioGroup";
import { type WorkType } from "@nulib/dcapi-types";
import useQueryParams from "@/hooks/useQueryParams";
import { useRouter } from "next/router";

export type WorkTypeWithAll = WorkType | "All";

const WorkType: React.FC = () => {
  const router = useRouter();
  const [currentValue, setCurrentValue] = useState<WorkTypeWithAll>("All");
  const { id } = FACETS_WORK_TYPE.facets[0];
  const { urlFacets } = useQueryParams();
  const { query: q } = router;

  const workTypeFacet = urlFacets[id];

  useEffect(() => {
    if (workTypeFacet && workTypeFacet.length > 0) {
      setCurrentValue(workTypeFacet[0] as WorkType);
    } else {
      setCurrentValue("All");
    }
  }, [workTypeFacet]);

  const handleValueChange = (value: string) => {
    const newObj = { ...urlFacets };

    switch (value) {
      case "All":
        newObj[id] = [];
        break;
      default:
        newObj[id] = [value];
        break;
    }

    router.push({
      pathname: "/search",
      query: { ...(q && q), ...newObj },
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
