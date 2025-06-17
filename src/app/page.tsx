import SolutionsShowcase from '@/components/solutions/SolutionsShowcase';
import SectionWrapper from '@/components/common/SectionWrapper';
import Image from 'next/image';
import { homepageContent } from '@/lib/data/homepageContent'; // Importar el contenido

export default function HomePage() {
  return (
    <>
      <SectionWrapper className="pt-12 pb-16 md:pt-16 md:pb-24 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-4">
              {homepageContent.welcomeTitle}
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-3xl mx-auto">
              {homepageContent.welcomeSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-headline text-accent mb-3">
                  {homepageContent.missionTitle}
                </h2>
                <p className="text-lg text-primary-foreground/90 leading-relaxed">
                  {homepageContent.missionText}
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold font-headline text-accent mb-3">
                  {homepageContent.visionTitle}
                </h2>
                <p className="text-lg text-primary-foreground/90 leading-relaxed">
                  {homepageContent.visionText}
                </p>
              </div>
            </div>
            <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden shadow-2xl group">
              <Image
                src={homepageContent.mainImageUrl}
                alt={homepageContent.mainImageAlt}
                layout="fill"
                objectFit="cover"
                className="transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                data-ai-hint={homepageContent.mainImageAiHint}
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-75 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Solutions Showcase Section */}
      <SectionWrapper id="soluciones">
        <SolutionsShowcase />
      </SectionWrapper>
    </>
  );
}
