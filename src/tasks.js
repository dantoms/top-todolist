export function task(
  title,
  description,
  due,
  priority = null,
  project = "Inbox",
) {
  const id = crypto.randomUUID();
  const isCompleted = false;
  const createdAt = new Date().toISOString();

  return {
    id,
    title,
    description,
    due,
    priority,
    project,
    isCompleted,
    createdAt,
  };
}
