import { format } from "date-fns";

export default {
  name: "business",
  title: "Negocios",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Nombre del negocio",
      type: "string"
    },
    {
      name: "categories",
      title: "Tipo de Negocio",
      type: "array",
      description: "Un negocio puede pertenecer a varios tipos de negocio",
      of: [{ type: "reference", to: { type: "category" } }]
    },
    {
      name: "slug",
      title: "URL del Negocio",
      type: "slug",
      description:
        "Cuando clickas en el negocio, es la ruta que aparecerá en el buscador. No usar espacios, usar guiones en su lugar. Por ejemplo, acipmar.com/negocio/URL-DEL-NEGOCIO",
      options: {
        source: "title",
        maxLength: 96
      }
    },
    {
      name: "location",
      title: "Localización/Dirección",
      type: "string",
      description:
        "Recomendado usar siempre mismo formato. Ejemplo: Calle Número, Código Postal Ciudad"
    },
    {
      name: "phoneNumber",
      title: "Número de teléfono",
      type: "number",
      description: "Sólo números, sin carácteres especiales"
    },
    {
      name: "mainImage",
      title: "Imagen",
      type: "figure",
      description:
        "Imagen principal del negocio. Puedes usar Ctrl + C y Ctrl + V para copiar y pegar imagen directamente aquí"
    },
    {
      name: "excerpt",
      title: "Breve descripción",
      type: "simplePortableText",
      description:
        "Es la descripción que aparecerá debajo de la imágen del negocio en la primera pág de bienvenida"
    },
    {
      name: "body",
      title: "Descripción",
      type: "projectPortableText",
      description:
        "Descripción del negocio. No hay límite de carácteres. Es el contenido principal que aparecerá en la pág del propio negocio"
    },
    {
      name: "facebook",
      title: "Facebook URL",
      type: "url"
    },
    {
      name: "instagram",
      title: "Instagram URL",
      type: "url"
    },
    {
      name: "twitter",
      title: "Twitter URL",
      type: "url"
    }
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug",
      media: "mainImage"
    },
    prepare({ title = "No title", slug = {}, media }) {
      const path = `/${slug.current}/`;
      return {
        title,
        media,
        subtitle: path
      };
    }
  }
};
