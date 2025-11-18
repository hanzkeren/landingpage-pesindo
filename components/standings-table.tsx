// app/components/standings-table.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { cn } from "@/lib/utils";

type TeamStanding = {
  teamName: string;
  logoUrl: string;
  matchPoint: number;
  matchWL: string;
  netGameWin: number;
  gameWL: string;
};

const standingsData: TeamStanding[] = [
  { teamName: "REAL MADRID", logoUrl: "/realmadrid.png", matchPoint: 2, matchWL: "2", netGameWin: 4, gameWL: "10" },
  { teamName: "SHAOLIN SOCCER", logoUrl: "/chelsea.png", matchPoint: 1, matchWL: "10", netGameWin: 2, gameWL: "7" },
  { teamName: "PELER FC", logoUrl: "/realmadrid.png", matchPoint: 1, matchWL: "1", netGameWin: 1, gameWL: "3" },
  { teamName: "CHELSEA", logoUrl: "/chelsea.png", matchPoint: 0, matchWL: "0", netGameWin: -2, gameWL: "1" },
];

export function StandingsTable() {
  return (
    <div className="w-full font-sans">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* --- Judul --- */}
        <div className="relative mb-4 w-fit">
          <h1 className="font-anton text-5xl md:text-6xl lg:text-8xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-black to-white text-neutral-800 dark:text-neutral-200">STANDINGS</h1>
          {/* Elemen dekoratif merah di belakang teks */}
          <div className="absolute right-[-10px] top-[8px] h-3 w-10 bg-red-600 z-[-1]"></div>
        </div>

        {/* --- Tabel --- */}
        <div className="overflow-hidden">
          <Table>
            <TableHeader>
              {/* Header dengan warna latar belakang gelap */}
              <TableRow className="bg-neutral-900 hover:bg-neutral-800">
                <TableHead className="w-[60px] h-[60px] text-center text-white font-bold">NO.</TableHead>
                <TableHead className="text-center text-white font-bold">TEAM</TableHead>
                <TableHead className="text-center text-white font-bold">W</TableHead>
                <TableHead className="text-center text-white font-bold">L</TableHead>
                <TableHead className="text-center text-white font-bold">D</TableHead>
                <TableHead className="text-center text-white font-bold">PTS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standingsData.map((team, index) => (
                <TableRow key={team.teamName} className="dark:border-neutral-800">
                  <TableCell className="font-medium text-center">{index + 1}.</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image src={team.logoUrl} alt={`${team.teamName} logo`} width={24} height={24} className="object-contain" />
                      <span className="font-semibold text-sm">{team.teamName}</span>
                    </div>
                  </TableCell>
                  {/* Kolom W - Win */}
                  <TableCell className="text-center text-black font-bold">{team.matchWL}</TableCell>
                  {/* Kolom L - Lose */}
                  <TableCell className="text-center text-red-500 font-bold">{team.netGameWin}</TableCell>
                  {/* Kolom D - Draw */}
                  <TableCell className="text-center text-neutral-500 font-bold">{team.gameWL}</TableCell>
                  {/* Kolom PTS - Points */}
                  <TableCell className="text-center text-blue-600 font-bold">{team.matchPoint}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
