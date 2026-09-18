# Implementation Plan - Rename "Amatungo" Category to "Imiti"

This plan details the steps to rename the "Amatungo" (Livestock) category to "Imiti" (Medicine) in Kinyarwanda and "Medicine" or "Drugs" in English. It also ensures that the category links correctly filter products on the products page.

## User Review Required

> [!IMPORTANT]
> I will use "Medicine" for the English name of the category. If you prefer "Drugs", please let me know.
> I will also unify the slug usage. Currently, there is a discrepancy between `livestock` (in `seed.ts`) and `veterinary` (in `page.tsx`). I will standardize on `medicine` or `veterinary` if you prefer, but I'll update all references to ensure the links work.

## Proposed Changes

### Translations
Update the translation files to reflect the new category name.

#### [MODIFY] [rw.json](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/src/messages/rw.json)
- Change `"veterinary": "Amatungo"` to `"veterinary": "Imiti"`
- Change `"livestock": "Amatungo"` to `"livestock": "Imiti"`

#### [MODIFY] [en.json](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/src/messages/en.json)
- Change `"veterinary": "Livestock"` to `"veterinary": "Medicine"`
- Change `"livestock": "Livestock"` to `"livestock": "Medicine"`

### Database and Seed
Update the database seeding logic to create the category with the new names.

#### [MODIFY] [seed.ts](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/prisma/seed.ts)
- Update `catLivestock` (or rename to `catMedicine`) to use `nameEn: "Medicine"` and `nameRw: "Imiti"`.
- Consider updating the slug to `medicine` or `veterinary` for consistency.

### UI Components
Update hardcoded checks and links to ensure the "Medicine" category is correctly displayed and linked.

#### [MODIFY] [page.tsx](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/src/app/[locale]/page.tsx)
- Update the hardcoded logic in the Categories section to display the correct name from the database instead of using a hardcoded switch statement.
- Update the "Animal Health" label in the hero section to "Medicine".

#### [MODIFY] [Footer.tsx](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/src/components/Footer.tsx)
- Ensure the link to the veterinary/livestock category uses the correct slug.

## Verification Plan

### Automated Tests
- Run `npx prisma db seed` to update the database.
- Verify the build passes.

### Manual Verification
- Open the home page and check if "Amatungo" has been replaced by "Imiti".
- Click on the "Imiti" category and verify it opens the products page filtered by that category.
- Toggle between English and Kinyarwanda to verify "Medicine" appears correctly.
