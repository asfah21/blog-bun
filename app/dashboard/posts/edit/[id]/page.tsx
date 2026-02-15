import EditPostForm from "./EditPostForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage(props: PageProps) {
  const params = await props.params;

  return <EditPostForm id={params.id} />;
}
