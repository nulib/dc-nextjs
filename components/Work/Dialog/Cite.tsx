import { CiteStyled, ContentCol } from "@/components/Work/Dialog/Cite.styled";
import { DefinitionListWrapper } from "@/components/Shared/DefinitionList.styled";
import React from "react";
import { WorkShape } from "types/components/works";

const nul = "Northwestern University Libraries";
const today = new Date().toDateString();
export interface WorkDialogCiteProps {
  work: WorkShape;
}

const WorkDialogCite: React.FC<WorkDialogCiteProps> = ({ work }) => {
  const {
    ark,
    collection_title,
    create_date,
    id,
    identifiers,
    library_unit,
    terms_of_use,
    thumbnail,
    title,
    work_type_labels,
  } = work;

  const dateObj: Date = new Date(create_date);
  const formattedDate = dateObj.toDateString();
  const itemLink = `${window.location.origin}/works/${id}`;
  const apaFormat = `${library_unit}, ${nul}. (${formattedDate}). ${title}, Retrieved from ${itemLink}`;
  const chicagoTurabianFormat = `${library_unit}, ${nul}. "${title}", ${collection_title} Accessed ${today}. ${itemLink}`;
  const mlaFormat = `${library_unit}, ${nul}. "${title}", ${collection_title} ${formattedDate}. ${window.location.origin}/items/${id}`;
  const wikiCitation = `<ref name=NUL>{{cite web | url=${itemLink} | title= ${title} (${formattedDate}) }} |author=Digital Collections, ${nul} |accessdate=${today} |publisher=${nul}, ${library_unit}}}</ref>`;

  const metadata = [
    ["Identifier", identifiers.join(", ")],
    ["Title", title],
    ["Use Statement", terms_of_use],
    ["Ark", ark],
    ["APA Format", apaFormat],
    ["Chicago/Turabian Format", chicagoTurabianFormat],
    ["MLA Format", mlaFormat],
  ];
  return (
    <CiteStyled>
      <div data-testid="thumbnail-col-wrapper">
        <img src={thumbnail} alt={`${title} thumbnail`} />
        <h2>{title}</h2>
        <p>{work_type_labels}</p>
      </div>
      <ContentCol>
        <DefinitionListWrapper>
          <dl data-testid="metadata" style={{ marginTop: "0" }}>
            {metadata.map((item) => (
              <React.Fragment key={item[0]}>
                <dt>{item[0]}</dt>
                <dd>{item[1]}</dd>
              </React.Fragment>
            ))}
            <dt>Wiki Citation</dt>
            <dd>
              <code>{wikiCitation}</code>
            </dd>
          </dl>
        </DefinitionListWrapper>
      </ContentCol>
    </CiteStyled>
  );
};

export default WorkDialogCite;
