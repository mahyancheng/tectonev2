// Verified Google reviews — transcribed from screenshots of the
// Tectone Renex Steel Pte Ltd Google Business profile.
// Source listing: 4.8 ★ across 59 reviews (current at time of capture).
// Reviewer names and timing preserved as-is for authenticity.

export type FieldReview = {
  id: string;
  name: string;
  /** Mono attribution badge, e.g. "LOCAL GUIDE · 39 REVIEWS". */
  reviewerMeta?: string;
  /** Relative date as shown on Google (e.g. "6 months ago"). */
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  /** Short surface tag rendered as a chip, e.g. "Mesh design". */
  tag?: string;
  verified: true;
};

export const fieldReviews: FieldReview[] = [
  {
    id: "raymond-han",
    name: "Raymond Han",
    reviewerMeta: "LOCAL GUIDE · 39 REVIEWS",
    date: "4 months ago",
    rating: 5,
    quote:
      "A fantastic experience with Tectone Renex. Charlie was an absolute pleasure to deal with — professional, responsive, and very knowledgeable. Highly recommend.",
    tag: "Service",
    verified: true,
  },
  {
    id: "yu-ren-tan",
    name: "Yu Ren Tan",
    date: "6 months ago",
    rating: 5,
    quote:
      "Charlie Lau and his team made the process smooth and stress-free. The solid stainless-steel mesh feels reassuring and the workmanship is excellent — everything sits flush, nothing rattles.",
    tag: "Mesh design",
    verified: true,
  },
  {
    id: "benedict-ng",
    name: "Benedict Ng",
    reviewerMeta: "7 REVIEWS · 3 PHOTOS",
    date: "6 months ago",
    rating: 5,
    quote:
      "Visited a few vendors before deciding on the security mesh from Tectone. A pest-free home with added safety features — and their service recovery when we had a question was excellent. Thanks to the team for the great workmanship.",
    tag: "Security mesh",
    verified: true,
  },
  {
    id: "je-yap",
    name: "JE Yap",
    reviewerMeta: "10 REVIEWS",
    date: "a month ago",
    rating: 5,
    quote:
      "Just had my mesh windows and door installed and I'm completely satisfied. Credit goes to the workers too — fast and speedy installation, very tidy on site.",
    tag: "Tidy install",
    verified: true,
  },
  {
    id: "jean-k",
    name: "Jean K.",
    reviewerMeta: "7 REVIEWS",
    date: "2 months ago",
    rating: 5,
    quote:
      "Very happy with the mesh sliding door and window mesh from Tectone Renex. Charlie and his team are very down to earth. Recommended for those looking for insect screens with added security.",
    tag: "Sliding door",
    verified: true,
  },
  {
    id: "chai-wei-loon",
    name: "Chai Wei Loon",
    date: "a year ago",
    rating: 5,
    quote:
      "Charlie and his team did a great job from start to finish. Money well spent on their security mesh and gate — and it's aesthetically pleasing too.",
    tag: "Security gate",
    verified: true,
  },
  {
    id: "jair-ng",
    name: "Jair Ng",
    reviewerMeta: "3 REVIEWS",
    date: "4 months ago",
    rating: 5,
    quote:
      "Insect mesh with child-protection functionality. Good service and fuss-free installation.",
    tag: "Child-safe",
    verified: true,
  },
];

/** Aggregate stats shown on the public Google listing. */
export const reviewStats = {
  rating: 4.8,
  count: 59,
  source: "Google Business Profile",
} as const;
