export default function Loading() {
  return (
    <ul className="divide-y divide-gray-200 rounded-b-md bg-white py-4 shadow-md">
      {new Array(3).fill(null).map((_, i) => (
        <li
          key={i}
          className="mx-auto flex w-full animate-pulse space-x-4 px-8 py-4"
        >
          <div className="size-40 rounded-lg bg-gray-300" />
          <div className="w-full flex-1 space-y-4 py-1">
            <div className="h-10 w-full rounded bg-gray-300" />
            <div className="space-y-2">
              <div className="h-4 w-4/5 rounded bg-gray-300" />
              <div className="h-4 w-4/5 rounded bg-gray-300" />
              <div className="h-4 w-4/5 rounded bg-gray-300" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
