export default function SidebarHeader({ title }) {
  return (
    <div className="px-4 py-2">
      <h3 className="text-sm font-semibold text-gray-600">
        {title}
      </h3>
    </div>
  );
}
