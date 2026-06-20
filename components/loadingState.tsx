import { Loader } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="flex">
      <span className="animate-spin m-auto">
        <Loader />
      </span>
    </div>
  );
}
