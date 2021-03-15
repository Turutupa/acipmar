import { format, isFuture } from "date-fns";

export function cn(...args) {
  return args.filter(Boolean).join(" ");
}

export function mapEdgesToNodes(data) {
  if (!data.edges) return [];
  return data.edges.map(edge => edge.node);
}

export function filterOutDocsWithoutSlugs({ slug }) {
  return (slug || {}).current;
}

export function filterOutDocsPublishedInTheFuture({ publishedAt }) {
  return !isFuture(publishedAt);
}

export function getBlogUrl(publishedAt, slug) {
  return `/blog/${format(publishedAt, "YYYY/MM")}/${slug.current || slug}/`;
}

export function buildImageObj(source) {
  const imageObj = {
    asset: { _ref: source.asset._ref || source.asset._id }
  };

  if (source.crop) imageObj.crop = source.crop;
  if (source.hotspot) imageObj.hotspot = source.hotspot;

  return imageObj;
}

export function phoneNumberBuilder(number) {
  let phoneNumber = "";
  number = String(number);
  for (let i = 0; i < number.length - 3; i = i + 3) {
    phoneNumber = phoneNumber + " " + number.slice(i, i + 3);
  }
  return phoneNumber;
}

export function groupBusinessesByCategories(data) {
  const categoriesMap = {};

  for (let business of data) {
    for (let category of business.categories) {
      const categoryTitle = category.title;
      if (categoriesMap[categoryTitle]) {
        categoriesMap[categoryTitle] = [...categoriesMap[categoryTitle], business];
      } else {
        categoriesMap[categoryTitle] = [business];
        // categoriesMap[categoryTitle] = [...categoriesMap[categoryTitle], business];
        // categoriesMap[categoryTitle] = [...categoriesMap[categoryTitle], business];
        // categoriesMap[categoryTitle] = [...categoriesMap[categoryTitle], business];
        // categoriesMap[categoryTitle] = [...categoriesMap[categoryTitle], business];
        // categoriesMap[categoryTitle] = [...categoriesMap[categoryTitle], business];
        // categoriesMap[categoryTitle] = [...categoriesMap[categoryTitle], business];
        // categoriesMap[categoryTitle] = [...categoriesMap[categoryTitle], business];
      }
    }
  }

  return categoriesMap;
}
