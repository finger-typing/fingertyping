interface ProTipProps {
  title: string;
  content: string;
}

export function ProTip({ title, content }: ProTipProps) {
  return (
    <div className="my-8 rounded-r-lg border-l-4 border-blue-500 bg-blue-900 p-6 shadow-lg">
      <h3 className="mb-2 text-xl font-semibold text-blue-300">{title}</h3>
      <p className="text-gray-300">{content}</p>
    </div>
  );
}

interface TipItem {
  title: string;
  description: string;
}

interface TipsListProps {
  items: TipItem[];
}

export function TipsList({ items }: TipsListProps) {
  return (
    <ul className="space-y-4 text-gray-300">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="mr-3 mt-2 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></span>
          <div>
            <strong className="text-gray-100">{item.title}</strong>:{" "}
            {item.description}
          </div>
        </li>
      ))}
    </ul>
  );
}
