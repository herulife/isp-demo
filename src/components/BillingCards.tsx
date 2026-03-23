import { Clock, CheckCircle } from "lucide-react";

const pending = [
  { name: 'CV. Karya Abadi', note: '(bisnis)', amount: 'Rp 1.250k' },
  { name: 'Rumah Kost Bu Ani', note: '', amount: 'Rp 890k' },
  { name: 'Waroeng SS', note: '', amount: 'Rp 420k' },
];

const payments = [
  { name: 'Andre Saputra', amount: 'Rp 289k', time: '10 menit lalu' },
  { name: 'PT. Cahaya Net', amount: 'Rp 2.100k', time: '1 jam lalu' },
  { name: 'Linda Wijaya', amount: 'Rp 459k', time: '3 jam lalu' },
];

export default function BillingCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="glass-card rounded-2xl p-5">
        <h3 className="text-md font-semibold text-foreground flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-warning" /> Tagihan Tertunda
        </h3>
        <ul className="space-y-3">
          {pending.map((p) => (
            <li key={p.name} className="flex justify-between items-center">
              <span className="text-sm text-foreground">{p.name} {p.note && <span className="text-muted-foreground text-xs">{p.note}</span>}</span>
              <span className="font-mono text-warning">{p.amount}</span>
            </li>
          ))}
          <li className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">+4 lainnya</span>
            <span className="text-xs text-muted-foreground">total tunggakan Rp 3,2jt</span>
          </li>
        </ul>
        <div className="mt-4 pt-3 border-t border-border flex justify-between text-sm">
          <span className="text-muted-foreground">Piutang total</span>
          <span className="font-bold text-foreground">Rp 6.450k</span>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-5">
        <h3 className="text-md font-semibold text-foreground flex items-center gap-2 mb-3">
          <CheckCircle className="w-4 h-4 text-success" /> Pembayaran Terkini
        </h3>
        <ul className="space-y-3">
          {payments.map((p) => (
            <li key={p.name} className="flex justify-between items-center gap-2">
              <span className="text-sm text-foreground">{p.name}</span>
              <span className="text-success text-sm">{p.amount}</span>
              <span className="text-muted-foreground text-xs whitespace-nowrap">{p.time}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-3 border-t border-border flex justify-between text-sm">
          <span className="text-muted-foreground">Pemasukan hari ini</span>
          <span className="font-bold text-foreground">Rp 3.762k</span>
        </div>
      </div>
    </div>
  );
}

