import { Wrench, Package } from "lucide-react";

const techs = ["AG", "RD", "SY"];

export default function TechnicianCard() {
  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Teknisi on-duty</span>
        <span className="text-foreground text-sm font-medium">3 orang</span>
      </div>
      <div className="flex gap-2 mt-1">
        {techs.map((t) => (
          <div key={t} className="h-8 w-8 rounded-full bg-secondary/30 flex items-center justify-center text-xs border border-secondary text-secondary-foreground">
            {t}
          </div>
        ))}
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs border border-dashed border-muted-foreground text-muted-foreground">
          +2
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 text-center text-xs">
        <div className="bg-muted p-2 rounded-xl text-muted-foreground">
          <Wrench className="w-3 h-3 inline text-primary mr-1" /> 4 tugas lapangan
        </div>
        <div className="bg-muted p-2 rounded-xl text-muted-foreground">
          <Package className="w-3 h-3 inline text-secondary mr-1" /> stok 23 CPE
        </div>
      </div>
    </div>
  );
}

