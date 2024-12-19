import { MilanTransitDashboard } from '@/components/MilanTransitDashboard';
import { SpeedInsights } from "@vercel/speed-insights/next"
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <MilanTransitDashboard />
	<SpeedInsights />
    </main>
  );
}