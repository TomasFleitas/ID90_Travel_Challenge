
export interface HotelI {
  id: string;
  name: string;
  location: Location;
  chain: string;
  subtotal?: any;
  checkin: string;
  checkout: string;
  promotions?: Promotion[];
  feature: Feature;
  amenities: number[];
  nights: number;
  position: number;
  id90: string;
  displayable_id: string;
  ratings: Ratings;
  star_rating: number;
  review_rating: number;
  display_rate: number;
  display_rate_with_promo?: any;
  total: number;
  image: string;
  images: string[];
  description?: any;
  location_description: string;
  discount_promotion?: any;
  accommodation_type: Accommodationtype;
  neighborhood_ids: number[];
  retail_rate?: number;
  savings_amount?: number;
  savings_percent?: number;
  other_sites_prices?: Othersitesprice;
  distance: number;
  distance_to_airport?: any;
  distance_to_airports: Distancetoairports;
  number_of_rooms: number;
  total_discount_amount?: any;
  surcharges?: any;
  taxes_and_fees?: any;
  payment_date?: string;
  payment_option?: any;
  token_store?: any;
  supplier_special_rate_type?: any;
  experiment_variation?: any;
}

interface Distancetoairports {
  CUN: number;
  CZM: number;
}

interface Othersitesprice {
  EPS: number;
}

interface Accommodationtype {
  id: number;
  type: string;
}

interface Ratings {
  property: Property;
  guest: Guest;
}

interface Guest {
  overallRating: OverallRating2;
  ratings: Rating[];
}

interface Rating {
  overall: number;
  overallCategory: string;
  provider: string;
  count?: number;
}

interface OverallRating2 {
  count: number;
  overall: number;
  overallCategory: string;
  provider: string;
}

interface Property {
  overallRating: OverallRating;
  ratings: OverallRating[];
}

interface OverallRating {
  type: string;
  value: number;
  provider: string;
}

interface Feature {
  booking_count: number;
  latest_booking_date: string;
  viewing_count: number;
  latest_viewing_date: string;
  conversion_score: number;
  ranking_score: number;
  revenue_score: number;
  geography_score: number;
  rate_stats_factor?: number;
  best_seller_rank?: number;
  hotelAttributes?: HotelAttributes;
}

interface HotelAttributes {
  adultsOnly: boolean;
}

interface Promotion {
  key: string;
  type: string;
  name: string;
  message: string;
  discountPromotion: boolean;
}

interface Location {
  city: string;
  country: string;
  state?: string;
  region?: any;
  latitude: number;
  longitude: number;
  description: string;
}
