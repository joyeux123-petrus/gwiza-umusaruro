# Admin Dashboard - Product & Category Management System

Improve the Admin Dashboard to provide a complete and reliable management system for products and categories, ensuring the public website stays in sync with admin changes.

## User Review Required

> [!IMPORTANT]
> This update involves changes to the database schema and public product listing logic. Existing products will be migrated to the new hierarchical category system where possible.

## Proposed Changes

### Database Layer

#### [MODIFY] [schema.prisma](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/prisma/schema.prisma)
- Update `Category` model to support hierarchy (`parentId`), `displayOrder`, and `active` status.
- Update `Product` model with new fields: `published`, `promoted`, `displayOrder`, `activeIngredients`, `usagePurpose`, `price`.

---

### API Layer

#### [NEW] [admin/products/route.ts](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/src/app/api/admin/products/route.ts)
- `GET`: Fetch products with search, filter, pagination.
- `POST`: Create a new product.

#### [NEW] [admin/products/[id]/route.ts](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/src/app/api/admin/products/[id]/route.ts)
- `PUT`: Update an existing product.
- `DELETE`: Delete a product.

#### [NEW] [admin/products/bulk/route.ts](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/src/app/api/admin/products/bulk/route.ts)
- `PATCH`: Bulk update products (publish, unpublish, delete, category assignment).

#### [NEW] [admin/categories/route.ts](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/src/app/api/admin/categories/route.ts)
- `GET`: Fetch all categories (hierarchical).
- `POST`: Create a new category/subcategory.

#### [NEW] [admin/categories/[id]/route.ts](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/src/app/api/admin/categories/[id]/route.ts)
- `PUT`: Update a category.
- `DELETE`: Delete a category.

---

### Admin Dashboard UI

#### [MODIFY] [AdminSidebar.tsx](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/src/components/AdminSidebar.tsx)
- Add "Categories" link to the sidebar.

#### [MODIFY] [products/page.tsx](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/src/app/admin/products/page.tsx)
- Replace basic table with an advanced product table including:
    - Search bar and advanced filters (Category, Status, Animal Type).
    - Pagination.
    - Bulk action checkboxes.
    - Status toggles (Published, Featured, Promoted).
    - Image previews.

#### [NEW] [categories/page.tsx](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/src/app/admin/categories/page.tsx)
- New page to manage categories and subcategories in a hierarchical view.
- Support for reordering (Display Order).

#### [MODIFY] [ProductForm.tsx](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/src/components/ProductForm.tsx)
- Add fields for `price`, `activeIngredients`, `usagePurpose`, `published`, `promoted`, and `displayOrder`.
- Improve category/subcategory selection.

#### [NEW] [CategoryForm.tsx](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/src/components/CategoryForm.tsx)
- Form to add/edit categories and subcategories.

#### [MODIFY] [admin/page.tsx](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/src/app/admin/page.tsx)
- Update statistics to show real database counts (Published vs Unpublished, Categories, etc.).

---

### Public Website Integration

#### [MODIFY] [products/page.tsx](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/src/app/[locale]/products/page.tsx)
- Filter products by `published: true`.
- Update subcategory filtering to use the new `Category` hierarchy instead of distinct strings.

#### [MODIFY] [home/page.tsx](file:///C:/Users/Joyeux/Documents/gwiza%20umusaruro/src/app/[locale]/page.tsx)
- Filter featured products by `published: true`.
- Order by `displayOrder`.

---

## Verification Plan

### Automated Tests
- I'll rely on manual verification as the current project doesn't have a test suite visible in the root.

### Manual Verification
1.  **Product Management**:
    - Create a product, upload an image, set categories.
    - Verify it appears on the public site if published.
    - Toggle published status and verify visibility.
    - Perform bulk actions (e.g., mark multiple as featured).
    - Search and filter the admin product list.
2.  **Category Management**:
    - Create a category and a subcategory.
    - Assign products to the new category.
    - Verify the public products page correctly displays the new category and its products.
3.  **Responsive Design**:
    - Check the admin dashboard on mobile and desktop viewports.
