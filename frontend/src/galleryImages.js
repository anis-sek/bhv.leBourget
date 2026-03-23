// Fichier centralisé pour toutes les images de la galerie
// Pour remplacer une photo : copiez le fichier dans public/images/ et mettez à jour le chemin ici
// Format: { url: "chemin/vers/image", alt: "description", span: "col-span-1 ou col-span-2", rowSpan: "row-span-1 ou row-span-2" }

export const galleryImages = [
  {
    url: "/images/côte-beauf.webp",
    alt: "Côte de bœuf",
    span: "col-span-2",
    rowSpan: "row-span-2",
  },
  {
    url: "/images/couscous-mixte.webp",
    alt: "Couscous mixte",
    span: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    url: "/images/salle2.webp",
    alt: "Salle du restaurant",
    span: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    url: "/images/terrase.webp",
    alt: "Terrasse du restaurant",
    span: "col-span-1",
    rowSpan: "row-span-2",
  },
  {
    url: "/images/tagliatelle.webp",
    alt: "Tagliatelles maison",
    span: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    url: "/images/steack.webp",
    alt: "Steak grillé",
    span: "col-span-2",
    rowSpan: "row-span-1",
  },
];

// Image Hero (façade du restaurant)
export const heroImage = "/images/facade.webp";

// Image About (intérieur de la salle)
export const aboutImage = "/images/salle1.webp";

export default galleryImages;