export interface FanCardProps {
  imageSrc: string;
  additionalImageSrc?: string;
  iconSrc?: string;
  roundedImageSrc?: string;
}

export interface FanSectionProps {
  title: string;
  fans: FanCardProps[];
}

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