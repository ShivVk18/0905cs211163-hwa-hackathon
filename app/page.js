import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { SetupSteps } from '@/components/SetupSteps';
import { CalmCurve } from '@/components/CalmCurve';
import { DayReport } from '@/components/DayReport';
import { WhatsInside } from '@/components/WhatsInside';

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <SetupSteps />
      <CalmCurve />
      <DayReport />
      <WhatsInside />
    </>
  );
}
