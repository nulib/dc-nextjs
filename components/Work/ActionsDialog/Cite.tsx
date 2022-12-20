import {
  ActionsDialogStyled,
  Content,
} from "@/components/Work/ActionsDialog/ActionsDialog.styled";
import ActionsDialogAside from "@/components/Work/ActionsDialog/Aside";
import CopyText from "@/components/Shared/CopyText";
import { DefinitionListWrapper } from "@/components/Shared/DefinitionList.styled";
import React from "react";
import { useWorkState } from "@/context/work-context";

const nul = "Northwestern University Libraries";
const today = new Date().toDateString();

const WorkDialogCite: React.FC = () => {
  const { workState } = useWorkState();

  if (!workState?.work) return <></>;

  const {
    ark,
    collection: { title: collection_title },
    create_date,
    id,
    identifier,
    library_unit,
    terms_of_use,
    title,
  } = workState.work;

  const dateObj: Date = new Date(create_date);
  const formattedDate = dateObj.toDateString();
  const itemLink = `${window.location.origin}/items/${id}`;
  const apaFormat = `${library_unit}, ${nul}. (${formattedDate}). ${title}, Retrieved from ${itemLink}`;
  const chicagoTurabianFormat = `${library_unit}, ${nul}. "${title}", ${collection_title} Accessed ${today}. ${itemLink}`;
  const mlaFormat = `${library_unit}, ${nul}. "${title}", ${collection_title} ${formattedDate}. ${window.location.origin}/items/${id}`;
  const wikiCitation = `<ref name=NUL>{{cite web | url=${itemLink} | title= ${title} (${formattedDate}) }} |author=Digital Collections, ${nul} |accessdate=${today} |publisher=${nul}, ${library_unit}}}</ref>`;

  const metadata = [
    ["Identifier", identifier.join(", ")],
    ["Title", title],
    ["Use Statement", terms_of_use],
    ["Ark", ark],
    ["APA Format", apaFormat],
    ["Chicago/Turabian Format", chicagoTurabianFormat],
    ["MLA Format", mlaFormat],
  ];
  return (
    <ActionsDialogStyled>
      <ActionsDialogAside />
      <Content>
        <DefinitionListWrapper>
          <dl data-testid="metadata" style={{ marginTop: "0" }}>
            {metadata.map((item) => (
              <React.Fragment key={item[0]}>
                <dt>{item[0]}</dt>
                <dd>
                  {item[1]}{" "}
                  {item[1] && (
                    <>
                      {" |"}
                      <CopyText textPrompt="Copy" textToCopy={item[1]} />
                    </>
                  )}
                </dd>
              </React.Fragment>
            ))}
            <dt>Wiki Citation</dt>
            <dd>
              <code>{wikiCitation}</code>
              <>
                {" |"}
                <CopyText textPrompt="Copy" textToCopy={wikiCitation} />
              </>
            </dd>
          </dl>
        </DefinitionListWrapper>
      </Content>
    </ActionsDialogStyled>
  );
};

export default WorkDialogCite;
