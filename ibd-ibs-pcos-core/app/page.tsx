import Link from "next/link";
import Button from "../ibd-ibs-pcos-core/components/ui/Button";
import Card from "../ibd-ibs-pcos-core/components/ui/Card";
import StatTile from "../ibd-ibs-pcos-core/components/ui/StatTile";

export default function Home() {
  return (
    <div className="space-y-6 p-4">
      <div className="text-left">
        <h1 className="text-2xl font-semibold">🥗 NutriSignal</h1>
        <p className="text-sm text-[var(--muted)]">Din personlige guide til mage-vennlig kosthold</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3">📊 Stat 1</Card>
        <Card className="p-3">🍽️ Stat 2</Card>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Kom i gang</h2>
        <div className="flex gap-2">
          <Link href="/recipes"><Button>Utforsk oppskrifter</Button></Link>
          <Link href="/plan"><Button variant="secondary">Se ukeplan</Button></Link>
        </div>
      </div>
    </div>
  );
}
