export default {
  name: "figure",
  title: "Image",
  type: "image",
  options: {
    hotspot: true
  },
  fields: [
    {
      name: "alt",
      type: "string",
      title: "Texto alternativo a la imágen",
      validation: Rule => Rule.error("Campo obligatorio").required(),
      description:
        "Al añadir nombre a la imágen le otorga más visibilidad para ser encontrado en búsquedas de Google",
      options: {
        isHighlighted: true
      }
    }
  ],
  preview: {
    select: {
      imageUrl: "asset.url",
      title: "caption"
    }
  }
};
