// src/data/destinationData.js

// =======================
// GOA
// =======================
import goaCover from "../assets/goa_cover.jpg";
import goaPlace1 from "../assets/goa_place1.jpg";
import goaPlace2 from "../assets/goa_place2.jpg";
import goaPlace3 from "../assets/goa_place3.jpg";
import goaFood1 from "../assets/goa_food_1.jpg";
import goaFood2 from "../assets/goa_food_2.jpg";
import goaFood3 from "../assets/goa_food_3.jpg";
import goaDress from "../assets/goa_dress.jpg";

// =======================
// JAMMU & KASHMIR
// =======================
import jkCover from "../assets/jammu_cover.jpg";
import jkPlace1 from "../assets/jammu_place1.jpg";
import jkPlace2 from "../assets/jammu_place2.jpg";
import jkPlace3 from "../assets/jammu_place3.jpg";
import jkFood1 from "../assets/jammu_food1.jpg";
import jkFood2 from "../assets/jammu_food2.jpg";
import jkFood3 from "../assets/jammu_food3.jpg";
import jkDress from "../assets/cloth_jammu3.jpg";

// =======================
// RAJASTHAN
// =======================
import rjCover from "../assets/rajasthan_cover.jpg";
import rjPlace1 from "../assets/rajasthan_place1.jpg";
import rjPlace2 from "../assets/rajasthan_place2.jpg";
import rjPlace3 from "../assets/rajasthan_place3.jpg";
import rjFood1 from "../assets/rajasthan_food1.jpg";
import rjFood2 from "../assets/rajasthan_food2.jpg";
import rjFood3 from "../assets/rajasthan_food3.jpg";
import rjDress from "../assets/rajasthan_dress.jpg";

// =======================
// KERALA
// =======================
import klCover from "../assets/kerala_cover.jpg";
import klPlace1 from "../assets/kerala_place1.jpg";
import klPlace2 from "../assets/kerala_place2.jpg";
import klPlace3 from "../assets/kerala_place3.jpg";
import klFood1 from "../assets/kerala_food1.jpg";
import klFood2 from "../assets/kerala_food2.jpg";
import klFood3 from "../assets/kerala_food3.jpg";
import klDress from "../assets/kerala_dress.jpg";

// =======================
// DARJEELING
// =======================
import dzCover from "../assets/Darjeeling_cover.jpg";
import dzPlace1 from "../assets/Tiger Hill_dargl.jpg";
import dzPlace2 from "../assets/Tea_Gardens.jpg";
import dzPlace3 from "../assets/Darjeeling_Toy Train.jpg";
import dzFood1 from "../assets/dar_food1.jpg";
import dzFood2 from "../assets/dar_food2.jpg";
import dzFood3 from "../assets/dar_food3.jpg";
import dzDress from "../assets/dar_dress.jpg";

// =======================
// DATA
// =======================
export const destinationData = {
  goa: {
    title: "Goa",
    coverImage: goaCover,
    places: [
      { name: "Baga Beach", image: goaPlace1 },
      { name: "Anjuna Beach", image: goaPlace2 },
      { name: "Old Goa", image: goaPlace3 },
    ],
    foods: [
      { name: "Fish Curry", image: goaFood1 },
      { name: "Vindaloo", image: goaFood2 },
      { name: "Bebinca", image: goaFood3 },
    ],
    cultureImage: goaDress,
  },

  "jammu-kashmir": {
    title: "Jammu & Kashmir",
    coverImage: jkCover,
    places: [
      { name: "Dal Lake", image: jkPlace1 },
      { name: "Gulmarg", image: jkPlace2 },
      { name: "Pahalgam", image: jkPlace3 },
    ],
    foods: [
      { name: "Rogan Josh", image: jkFood1 },
      { name: "Dum Aloo", image: jkFood2 },
      { name: "Kahwa", image: jkFood3 },
    ],
    cultureImage: jkDress,
  },

  rajasthan: {
    title: "Rajasthan",
    coverImage: rjCover,
    places: [
      { name: "Jaipur", image: rjPlace1 },
      { name: "Udaipur", image: rjPlace2 },
      { name: "Jaisalmer", image: rjPlace3 },
    ],
    foods: [
      { name: "Dal Bati", image: rjFood1 },
      { name: "Laal Maas", image: rjFood2 },
      { name: "Ghewar", image: rjFood3 },
    ],
    cultureImage: rjDress,
  },

  kerala: {
    title: "Kerala",
    coverImage: klCover,
    places: [
      { name: "Alleppey", image: klPlace1 },
      { name: "Munnar", image: klPlace2 },
      { name: "Varkala", image: klPlace3 },
    ],
    foods: [
      { name: "Sadya", image: klFood1 },
      { name: "Appam", image: klFood2 },
      { name: "Puttu", image: klFood3 },
    ],
    cultureImage: klDress,
  },

  darjeeling: {
    title: "Darjeeling",
    coverImage: dzCover,
    places: [
      { name: "Tiger Hill", image: dzPlace1 },
      { name: "Tea Gardens", image: dzPlace2 },
      { name: "Toy Train", image: dzPlace3 },
    ],
    foods: [
      { name: "Momos", image: dzFood1 },
      { name: "Thukpa", image: dzFood2 },
      { name: "Tea", image: dzFood3 },
    ],
    cultureImage: dzDress,
  },
};

export const getDestinationBySlug = (slug) => destinationData[slug];
