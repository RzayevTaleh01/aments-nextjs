This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## API Data Architecture (SSR Route → Query → Mapper → UI)

Goal in this repo: **UI components must always read stable keys**. Even if backend JSON keys change, UI should not use fallbacks and should not access “raw API keys”.

Flow:

1. **Route (server `page.jsx`)** calls a query (or directly calls the API)
2. **Query** requests via `ApiService` and passes raw results into the mapper
3. **Mapper** converts raw JSON into a stable shape that UI reads
4. **UI components** read only those stable keys (no fallback logic)

### Folder structure

```text
src/
  utils/
    lang.js
  queries/
    popularCategories.query.js
  mappers/
    popular-category.mapper.js
```

### Example: Home → Popular Categories

#### 1) Mapper (raw → UI shape)

The mapper returns only the keys the UI needs.

- File: [popular-category.mapper.js](file:///c:/Users/Cyborg/Desktop/aments/src/mappers/popular-category.mapper.js)

```js
// src/mappers/popular-category.mapper.js
const PopularCategoryDefaults = {
  id: null,
  name: "",
  image: "",
  items: "(0 Items)",
  href: "/products",
};

export function mapPopularCategory(raw = {}) {
  return {
    ...PopularCategoryDefaults,
    id: raw?.id ?? PopularCategoryDefaults.id,
    name: raw?.name ?? PopularCategoryDefaults.name,
    image: raw?.image ?? PopularCategoryDefaults.image,
    items: `(${Number(raw?.orderCount ?? 0) || 0} Items)`,
    href: raw?.id != null ? `/products?categoryId=${encodeURIComponent(String(raw.id))}` : PopularCategoryDefaults.href,
  };
}
```

#### 2) Query (request + map)

The query removes repeated code for the same endpoint: request + extract `res.data.data` + apply mapper.

- File: [popularCategories.query.js](file:///c:/Users/Cyborg/Desktop/aments/src/queries/popularCategories.query.js)

```js
// src/queries/popularCategories.query.js
import ApiService from "@/services/api/ApiService";
import { STATISTICS_CATEGORY_POPULAR_ROUTE } from "@/configs/apiRoutes";
import { mapPopularCategory } from "@/mappers/popular-category.mapper";

export async function getPopularCategories({ lang } = {}) {
  const res = await ApiService.get(STATISTICS_CATEGORY_POPULAR_ROUTE, { params: { lang } });
  const list = Array.isArray(res?.data?.data) ? res.data.data : [];
  return list.map((x) => mapPopularCategory(x)).filter((x) => x?.id != null && x?.name);
}
```

#### 3) SSR Route (`page.jsx`) (fetch data + pass props)

- File: [(main)/page.jsx](file:///c:/Users/Cyborg/Desktop/aments/src/app/(main)/page.jsx)

```jsx
// src/app/(main)/page.jsx
import HomePage from "@/components/pages/HomePage";
import { getPopularCategories } from "@/queries/popularCategories.query";
import { getServerLang } from "@/utils/lang";

export const dynamic = "force-dynamic";

export default async function Page() {
  const lang = await getServerLang();

  let popularCategories = [];
  try {
    popularCategories = await getPopularCategories({ lang });
  } catch {
    popularCategories = [];
  }

  return <HomePage popularCategories={popularCategories} />;
}
```

#### 4) UI: receive via props and read stable keys only

- HomePage: [HomePage.jsx](file:///c:/Users/Cyborg/Desktop/aments/src/components/pages/HomePage/HomePage.jsx)
- Section: [PopularCategoriesSection.jsx](file:///c:/Users/Cyborg/Desktop/aments/src/components/sections/home/PopularCategoriesSection/PopularCategoriesSection.jsx)

UI goal: read only `cat.name`, `cat.image`, `cat.items`, `cat.href` — nothing else.

```jsx
// src/components/sections/home/PopularCategoriesSection/PopularCategoriesSection.jsx
{categories.map((cat, idx) => (
  <div key={String(cat?.id ?? idx)} className="col-lg-3 col-md-4 col-sm-6 col-12">
    <ProductCategorySingle
      href={cat?.href}
      imageSrc={cat?.image}
      title={cat?.name}
      items={cat?.items}
    />
  </div>
))}
```
