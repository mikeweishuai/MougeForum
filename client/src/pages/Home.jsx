import React from 'react';
import { DateTime } from "luxon";

export default function Home() {
  const d1 = DateTime.fromISO('2021-06-18T08:39:46.270Z');
  let date = new Date('2021-06-18T08:39:46.270Z');

  return (
    <div>
      {d1.toRelative()}
    </div>
  )
}