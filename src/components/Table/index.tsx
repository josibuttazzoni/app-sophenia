import { ReactNode } from 'react';

export default function Table({ sections, children }: { sections: string[]; children: ReactNode }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          {sections.map(section => (
            <th key={section} className="p-6 text-left text-sm font-semibold text-black">
              {section}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
    </table>
  );
}
