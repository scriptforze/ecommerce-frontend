import { City, StoreCityRequest } from "@/services/cities";

export interface CustomCityRequest extends StoreCityRequest {
  country_id: number;
}

export interface CityFormProps {
  city?: City;
}
