import { fetchPageData } from "@/lib/fetchPageData";
import PageHeader from "@/components/PageHeader";

export default async function AboutLayout({ children }) {
  const page = await fetchPageData("about");

  return (
    <div className="container mx-auto px-4">
      {page && (
        <PageHeader
        title={page.acf?.page_name || page.title.rendered}
        description={page.acf?.page_desc || null}
        />
    )}
      <main>{children}</main>
    </div>
  );
}
