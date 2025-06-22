import LiquidButton from "@/components/LiquidButton";

export default function Home() {
  return (
    <main
      className="flex h-screen flex-col items-center justify-center p-8"
      style={{
        WebkitMaskImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 32'><path fill='white' d='M32 4C18 4 8 16 8 16s10 12 24 12 24-12 24-12-10-12-24-12z'/><circle fill='black' cx='32' cy='16' r='6'/></svg>")`,
        maskImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 32'><path fill='white' d='M32 4C18 4 8 16 8 16s10 12 24 12 24-12 24-12-10-12-24-12z'/><circle fill='black' cx='32' cy='16' r='6'/></svg>")`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        backgroundColor: "#000",
      }}>
      <h1 className="text-5xl font-extrabold mb-4">onirium</h1>
      <p className="mb-8 text-xl text-secondary">
        what have you dreamed today?
      </p>
      <LiquidButton label="Start dreaming" />
    </main>
  );
}
