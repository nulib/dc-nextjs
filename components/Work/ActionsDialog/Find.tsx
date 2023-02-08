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
    box_name,
    box_number,
    catalog_key,
    folder_name,
    folder_number,
  } = workState.work;

  const primoLink =
    catalog_key.length > 0
      ? `https://search.library.northwestern.edu/primo-explore/search?field=any&query=any,contains,${catalog_key[0]}&query=&institution=01NWU&vid=NULVNEW&search_scope=NWU`
      : "";

  const metadata = [
    ["Accession", accession_number],
    ["Box Name", box_name.join(", ")],
    ["Box Number", box_number.join(", ")],
    ["Folder Name", folder_name.join(", ")],
    ["Folder Number", folder_number.join(", ")],
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
                  <a href={primoLink}>{catalog_key[0]}</a>
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
