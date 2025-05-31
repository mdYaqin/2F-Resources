export interface Image {
  id?: string;
  url: string;
  projectId?: string;
  publicId?: string;
  isPreview: boolean;
  file?: File;
  previewData?: string;
  _removed?: boolean;
}

export interface Project {
  id?: string;
  title?: string;
  description: string;
  summary: string;
  location: string;
  jobScope: string;
  style: string;
  timeline: string;
  isFeatured: boolean;
  featureTitle: string;
  projectValue: string;
  tags: string[];
  images: Image[];
  createdAt?: string;
  updatedAt?: string;
}
