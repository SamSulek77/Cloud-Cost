'use client';

import DashboardLayout from '@/components/Layoutpage/SideBarLayout';
import QuoteBox from '@/components/practice/QuoteBox';
import RandomQuote from '@/components/practice/RandomQuote';
import RandomQuote2 from '@/components/practice/RandomQuote2';
import { PracticeAlert } from '@/components/practice/PracticeAlert';
import { CalendarUI } from '@/components/practice/calendarUI';

export default function HomePage() {

  return (
    <DashboardLayout>


      <QuoteBox />
      <RandomQuote />
      <RandomQuote2 />
      <PracticeAlert />
      {/* side by side */}
      <div className="mt-8 flex gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <CalendarUI key={index} />
        ))}
      </div>
    </DashboardLayout>
  );
}