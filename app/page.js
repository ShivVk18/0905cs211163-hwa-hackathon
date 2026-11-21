import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { SetupSteps } from '@/components/SetupSteps';
import { CalmCurve } from '@/components/CalmCurve';

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <SetupSteps />
      <CalmCurve />
    </>
  );
}
