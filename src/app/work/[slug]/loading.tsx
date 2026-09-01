import { T } from "@/i18n/T";

export default function Loading() {
  return (
    <div className="flex h-[100svh] items-center justify-center">
      <span className="label animate-pulse">
        <T es="Cargando" en="Loading" />
      </span>
    </div>
  );
}
