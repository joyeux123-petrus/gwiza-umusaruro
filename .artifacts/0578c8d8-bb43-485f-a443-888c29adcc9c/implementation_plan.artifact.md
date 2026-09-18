# Implementation Plan - AgriMerge Product Catalog Update

This plan outlines the steps to add new agricultural and livestock products to the AgriMerge website, ensuring consistent design, professional representation, and functional category/subcategory navigation.

## User Review Required

> [!IMPORTANT]
> The product catalog will be updated via a database seed script. This will involve modifying the Prisma schema to support subcategories and other product details requested.

## Proposed Changes

### Database & Schema

#### [MODIFY] [schema.prisma](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/prisma/schema.prisma)
- Add `subCategory`, `productType`, and `variant` fields to the `Product` model to support the requested catalog structure.
- Add `subCategoryEn` and `subCategoryRw` to provide localized subcategory names.

#### [MODIFY] [seed.ts](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/prisma/seed.ts)
- Update existing categories and add new ones: `Seeds`, `Crop Protection`, `Fertilizers & Soil Inputs`, `Livestock`.
- Populate the database with the complete list of 30+ new products, including their respective categories and subcategories.
- Include placeholder or verified online image URLs for the new products.

### UI Components

#### [MODIFY] [ProductCard.tsx](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/src/components/ProductCard.tsx)
- Update the card to display the `subCategory` if available, providing more specific context to the user.
- Ensure variants (e.g., "250g", "100g") are clearly visible.

#### [MODIFY] [products/page.tsx](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/src/app/[locale]/products/page.tsx)
- Implement subcategory filtering. When a category is selected, show its subcategories as secondary filters.
- Update the product fetching logic to handle subcategory filtering.

### Localization & Content

#### [MODIFY] [en.json](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/src/messages/en.json) & [rw.json](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/src/messages/rw.json)
- Add translations for new categories and subcategories.
- Add labels for new product fields (variant, subcategory).

## Verification Plan

### Automated Tests
- Run `npm run build` to ensure no TypeScript or build errors.
- Run `npx prisma generate` to update the client.

### Manual Verification
- **Search Verification**: Search for "carrot", "Warrior", "Wormicid" and verify correct results appear.
- **Filter Verification**: Click through each category and subcategory to ensure products are correctly grouped.
- **Responsiveness**: Check the catalog on mobile, tablet, and desktop views.
- **Image Check**: Verify that images load correctly or show appropriate fallbacks.
