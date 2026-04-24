import { FileSetAnnotation, FileSetSearchResult } from "@/types/api/response";

export type FileSetMatch = {
  id: string;
  representative_image_url: string;
  label: string;
  annotation: FileSetAnnotation;
  visibility: string;
};

export type WorkGroup = {
  work_id: string;
  work_title: string;
  collection: { id: string; title: string };
  accession_number: string;
  fileCount: number;
  fileSets: FileSetMatch[];
};

export function groupByWork(results: FileSetSearchResult[]): WorkGroup[] {
  const map = new Map<string, WorkGroup>();
  for (const r of results) {
    const ann = r.annotations.find((a) => a.type === "transcription");
    if (!ann) continue;
    if (!map.has(r.work_id)) {
      map.set(r.work_id, {
        work_id: r.work_id,
        work_title: r.work_title,
        collection: r.collection,
        accession_number: r.accession_number,
        fileCount: 1,
        fileSets: [
          {
            id: r.id,
            representative_image_url: r.representative_image_url,
            label: r.label,
            annotation: ann,
            visibility: r.visibility,
          },
        ],
      });
    } else {
      const g = map.get(r.work_id)!;
      g.fileCount++;
      g.fileSets.push({
        id: r.id,
        representative_image_url: r.representative_image_url,
        label: r.label,
        annotation: ann,
        visibility: r.visibility,
      });
    }
  }
  return Array.from(map.values());
}
