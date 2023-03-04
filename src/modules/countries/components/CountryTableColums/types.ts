import { Country } from "@/services/countries";

export interface CountryTableColumnsProps {
  isDeleteCountryLoading: boolean;
  handleDelete: (record: Country) => void;
}
