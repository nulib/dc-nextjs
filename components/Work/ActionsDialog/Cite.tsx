import citeStyles from "@/components/Work/ActionsDialog/Cite.module.css";
import definitionListStyles from "@/components/Shared/DefinitionList.module.css";
import actionsDialogStyles from "@/components/Work/ActionsDialog/ActionsDialog.module.css";
import ActionsDialogAside from "@/components/Work/ActionsDialog/Aside";
import CopyText from "@/components/Shared/CopyText";
import React from "react";
import { useWorkState } from "@/context/work-context";
const nul = "Northwestern University Libraries";
const today = new Date().toDateString();
const WorkDialogCite: React.FC = () => {
  const { workState } = useWorkState();
  if (!workState?.work) return <></>;
  const {
    ark,
    collection,
    create_date,
    id,
    library_unit,
    terms_of_use,
    title,
  } = workState.work;
  const collection_title = collection?.title;
  const dateObj: Date = new Date(create_date);
  const formattedDate = dateObj.toDateString();
  const itemLink = `${window.location.origin}/items/${id}`;
  const apaFormat = `${library_unit}, ${nul}. (${today}). ${title}, Retrieved from ${itemLink}`;
  const chicagoTurabianFormat = `${library_unit}, ${nul}. "${title}", ${collection_title} Accessed ${today}. ${itemLink}`;
  const mlaFormat = `${library_unit}, ${nul}. "${title}", ${collection_title} ${today}. ${window.location.origin}/items/${id}`;
  const wikiCitation = `<ref name=NUL>{{cite web | url=${itemLink} | title= ${title} (${formattedDate}) }} |author=Digital Collections, ${nul} |accessdate=${today} |publisher=${nul}, ${library_unit}}}</ref>`;
  const metadata = [
    ["Title", title],
    ["Use Statement", terms_of_use],
    ["Ark", ark],
    ["APA Format", apaFormat],
    ["Chicago/Turabian Format", chicagoTurabianFormat],
    ["MLA Format", mlaFormat],
  ];
  return (
    <div className={actionsDialogStyles.actionsDialogStyled}>
      <ActionsDialogAside />
      <div className={actionsDialogStyles.content}>
        <div className={definitionListStyles.definitionListWrapper}>
          <dl data-testid="metadata" className={citeStyles.override0}>
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
        </div>
      </div>
    </div>
  );
};
export default WorkDialogCite;
