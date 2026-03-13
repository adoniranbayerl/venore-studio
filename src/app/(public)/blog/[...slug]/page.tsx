export default function BlogPage({ params }: { params: { slug: string } }) {
  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-semibold">Blog</h1>
      <p className="text-lg">Página de blog com slug: {params.slug}</p>
    </div>
  );
}
