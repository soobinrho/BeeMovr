import { getTodayYearMonthUTC } from '@/app/api/v1/components/open-meteo-api';
import ApiLimitInfoBox from '@/components/api-limit-info-box';
import ConditionalRendering from '@/components/conditional-rendering';
import InformationConsole from '@/components/information-console';
import Mapbox from '@/components/mapbox';
import MapboxLngLatControl from '@/components/mapbox-lng-lat-control';
import Searchbox from '@/components/searchbox';
import SocialMedia from '@/components/social-media';
import Database from 'better-sqlite3';
import { unstable_noStore as noStore } from 'next/cache';
import React from 'react';

function IncrementAndGetCurrentAPILoadCount() {
  // Necessary because otherwise this function not be called after initialization.
  noStore();

  // "Creates a new database connection. If the database file does not exist, it is created."
  // This creates `main.db` at ../BeeMovr/ directory.
  // Source:
  //   https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#new-databasepath-options
  const db = new Database('database/main.db');
  const todayYearMonthUTC = getTodayYearMonthUTC();

  // Configs for improving performance.
  // Source:
  //   https://github.com/WiseLibs/better-sqlite3
  db.pragma('journal_mode = WAL');

  const db_create = db.prepare(`
CREATE TABLE IF NOT EXISTS usage_stats(
  usage_stats_date  TEXT NOT NULL PRIMARY KEY,
  usage_stats_count INT  NOT NULL DEFAULT 0
);
`);
  db_create.run();

  const db_incrementByOne = db.prepare(`
INSERT INTO usage_stats VALUES('${todayYearMonthUTC}', 0)
  ON CONFLICT(usage_stats_date)
  DO UPDATE SET usage_stats_count = usage_stats_count + 1;
`);
  db_incrementByOne.run();

  const db_getCurrentCount = db.prepare(`
SELECT usage_stats_count FROM usage_stats WHERE usage_stats_date = '${todayYearMonthUTC}';
`);
  const currentCount = Number(db_getCurrentCount.pluck().get());

  db.close();
  return currentCount;
}

export default function Home() {
  // ------------------------------------------------------------------
  // API rate limit (50,000 loads per month) for Mapbox free tier.
  // ------------------------------------------------------------------
  const APILoadCount = IncrementAndGetCurrentAPILoadCount();
  let isMapboxAPIUnderRateLimit = APILoadCount < 49900 ? true : false;

  return (
    <main className='relative min-h-screen min-w-full overflow-hidden whitespace-nowrap bg-background-space text-font-console'>
      <SocialMedia />
      <ConditionalRendering condition={!isMapboxAPIUnderRateLimit}>
        <MapboxLngLatControl />
        <Searchbox />
        <ApiLimitInfoBox />
        <InformationConsole api_lng='' api_lat='' />
      </ConditionalRendering>
      <ConditionalRendering condition={isMapboxAPIUnderRateLimit}>
        <Mapbox />
      </ConditionalRendering>
    </main>
  );
}
