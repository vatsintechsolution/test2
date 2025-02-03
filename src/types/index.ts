export interface FeatureCardProps {
  icon: string;
  title: string;
  alt: string;
}

export interface FAQItemProps {
  question: string;
  answer?: string;
  isOpen?: boolean;
}

export interface FooterLinkGroupProps {
  title: string;
  links: string[];
}
