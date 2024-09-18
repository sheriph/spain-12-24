"use client"

import dynamic from 'next/dynamic';

export default function Page() {
  const ConferenceWebsite = dynamic(
    () => import('@/components/conference-website').then((mod) => mod.ConferenceWebsite),
    { ssr: false }
  );

  return <ConferenceWebsite />
}
