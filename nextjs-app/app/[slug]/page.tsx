// app/[slug]/page.tsx

import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";

const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    name,
    pageBuilder[]->{
      _type,
      headline,
      subheadline,
      ctaLabel,
      ctaUrl,
      text,
      buttonText,
      buttonUrl,
      heading,
      recipes[]->{
        title,
        description,
        portionSize,
        price
      }
    }
  }
`;

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await sanityFetch({
    query: pageQuery,
    params: { slug: params.slug },
  });

  if (!page) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-12 space-y-12">
      <h1 className="text-4xl font-bold text-center">{page.name}</h1>

      {page.pageBuilder?.map((block: any, i: number) => {
        if (block._type === "heroBlock") {
          return (
            <section key={i} className="text-center space-y-4 bg-gray-50 py-10">
              <h2 className="text-3xl font-semibold">{block.headline}</h2>
              <p className="text-lg">{block.subheadline}</p>
              {block.ctaUrl && (
                <a
                  href={block.ctaUrl}
                  className="inline-block mt-4 text-red-600 underline"
                >
                  {block.ctaLabel}
                </a>
              )}
            </section>
          );
        }

        if (block._type === "ctaBanner") {
          return (
            <section key={i} className="text-center bg-red-100 py-8">
              <p className="text-lg mb-4">{block.text}</p>
              <a
                href={block.buttonUrl}
                className="inline-block bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
              >
                {block.buttonText}
              </a>
            </section>
          );
        }

        if (block._type === "recipeList") {
          return (
            <section key={i}>
              <h2 className="text-2xl font-semibold mb-4">{block.heading}</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {block.recipes?.map((recipe: any, j: number) => (
                  <li key={j} className="border rounded-lg p-4 shadow-sm bg-white">
                    <h3 className="text-xl font-bold">{recipe.title}</h3>
                    <p className="text-sm text-gray-600">{recipe.description}</p>
                    <p className="text-sm mt-1">Portion: {recipe.portionSize}</p>
                    <p className="text-sm">Price: ${recipe.price}</p>
                  </li>
                ))}
              </ul>
            </section>
          );
        }

        return null;
      })}
    </main>
  );
}
