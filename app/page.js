import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { SetupSteps } from '@/components/SetupSteps';
import { CalmCurve } from '@/components/CalmCurve';
import { DayReport } from '@/components/DayReport';
import { WhatsInside } from '@/components/WhatsInside';
import { FlavourCups } from '@/components/FlavourCups';
import { PickYourPack } from '@/components/PickYourPack';
import { WelcomeHomeBanner } from '@/components/WelcomeHomeBanner';
import { SafeByDesign } from '@/components/SafeByDesign';

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <SetupSteps />
      <CalmCurve />
      <DayReport />
      <WhatsInside />
      <FlavourCups />
      <PickYourPack />
      <WelcomeHomeBanner />
      <SafeByDesign />
    </>
  );
}
