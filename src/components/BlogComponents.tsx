interface ProTipProps {
  title: string;
  content: string;
}

export function ProTip({ title, content }: ProTipProps) {
  return (
    <div className="bg-blue-900 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg shadow-lg">
      <h3 className="text-xl font-semibold text-blue-300 mb-2">{title}</h3>
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
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <div>
            <strong className="text-gray-100">{item.title}</strong>: {item.description}
          </div>
        </li>
      ))}
    </ul>
  );
}
