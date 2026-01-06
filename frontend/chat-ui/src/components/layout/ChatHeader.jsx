export default function ChatHeader({ title }) {
  return (
    <div className="h-16 px-6 bg-headerBg border-b flex items-center">
      <h2 className="text-lg font-semibold text-headerText">{title}</h2>
    </div>
  );
}
