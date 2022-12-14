export type BreadCrumbItem = {
  link?: string;
  title: string;
};

export interface PageHeaderProps {
  title: string;
  breadCrumbItems?: BreadCrumbItem[];
}
