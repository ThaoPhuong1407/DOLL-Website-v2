import type { Schema, Struct } from '@strapi/strapi';

export interface ProjectSection extends Struct.ComponentSchema {
  collectionName: 'components_project_sections';
  info: {
    displayName: 'Section';
  };
  attributes: {
    body: Schema.Attribute.Blocks;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    imageUrl: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'project.section': ProjectSection;
    }
  }
}
