export default function Trend() {
  return (
    <>
      <div className="border mt-3 rounded-lg p-3">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Trend</h1>
          <nav className="*:border-2 *:mx-0.5">
            <button>1D</button>
            <button>7D</button>
            <button>1M</button>
            <button>1Y</button>
          </nav>
        </div>
      </div>
    </>
  );
}
