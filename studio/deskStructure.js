import S from "@sanity/desk-tool/structure-builder";
import { MdSettings } from "react-icons/md";

const hiddenDocTypes = listItem =>
  !["category", "person", "business", "siteSettings"].includes(listItem.getId());

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Settings")
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings")
        )
        .icon(MdSettings),
      S.listItem()
        .title("Negocios")
        .schemaType("business")
        .child(S.documentTypeList("business").title("Negocios")),
      S.listItem()
        .title("Categorías")
        .schemaType("category")
        .child(S.documentTypeList("category").title("Categorías")),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ]);
