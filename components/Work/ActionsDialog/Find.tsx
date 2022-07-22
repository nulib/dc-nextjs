import {
  ActionsDialogStyled,
  Content,
} from "@/components/Work/ActionsDialog/ActionsDialog.styled";
import ActionsDialogAside from "@/components/Work/ActionsDialog/Aside";
import { DefinitionListWrapper } from "@/components/Shared/DefinitionList.styled";
import React from "react";
import { useWorkState } from "@/context/work-context";

const WorkDialogFind: React.FC = () => {
  const { workState } = useWorkState();
  if (!workState?.work) return <></>;

  const {
    accession_number,
    box_names,
    box_numbers,
    catalog_keys,
    folder_names,
    folder_numbers,
  } = workState.work;

  const primoLink =
    catalog_keys.length > 0
      ? `https://search.library.northwestern.edu/primo-explore/search?field=any&query=any,contains,${catalog_keys[0]}&query=&institution=01NWU&vid=NULVNEW&search_scope=NWU`
      : "";

  const metadata = [
    ["Accession", accession_number],
    ["Box Name", box_names.join(", ")],
    ["Box Number", box_numbers.join(", ")],
    ["Citation", "not on the API"],
    ["Folder Name", folder_names.join(", ")],
    ["Folder Number", folder_numbers.join(", ")],
  ];

  return (
    <ActionsDialogStyled>
      <ActionsDialogAside data-testid="image-preview-col" />
      <Content>
        <DefinitionListWrapper>
          <dl data-testid="metadata" style={{ marginTop: "0" }}>
            {metadata.map((item) => (
              <React.Fragment key={item[0]}>
                <dt>{item[0]}</dt>
                <dd>{item[1]}</dd>
              </React.Fragment>
            ))}
            {primoLink && (
              <>
                <dt>NUsearch</dt>
                <dd>
                  <a href={primoLink}>{catalog_keys[0]}</a>
                </dd>
              </>
            )}
          </dl>
        </DefinitionListWrapper>
      </Content>
    </ActionsDialogStyled>
  );
};

export default WorkDialogFind;
