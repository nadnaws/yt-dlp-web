'use client';

import { useRef } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { Card } from '@/components/ui/card';
import { VideoListHeader } from '@/components/video-list/VideoListHeader';
import { VideoListBody } from '@/components/video-list/VideoListBody';
import { GetVideoList } from '@/server/yt-dlp-web';

const MAX_INTERVAL_Time = 120 * 1000;
const MIN_INTERVAL_Time = 3 * 1000;

export type VideoListProps = GetVideoList;

export function VideoList(props: VideoListProps) {
  const refreshIntervalTimeRef = useRef(MIN_INTERVAL_Time);

  const handleClickReloadButton = () => {
    mutate();
  };

  const { data, isValidating, mutate } = useSWR<GetVideoList>(
    '/api/list',
    async () => {
      const data = await axios.get<GetVideoList>('/api/list').then((res) => res.data);

      if (!data) {
        return {
          orders: [],
          items: {}
        };
      }

      let nextIntervalTime = Math.min(
        Math.max(MIN_INTERVAL_Time, refreshIntervalTimeRef.current * 2),
        MAX_INTERVAL_Time
      );
      const { items } = data;
      const videos = Object.values(items);
      for (const video of videos) {
        if (
          video.download &&
          ['downloading', 'recording', 'merging', 'standby'].includes(video.status)
        ) {
          nextIntervalTime = 3 * 1000;
          break;
        }
      }
      refreshIntervalTimeRef.current = nextIntervalTime;
      return data;
    },
    {
      refreshInterval: refreshIntervalTimeRef.current,
      errorRetryCount: 1,
      fallbackData: props
    }
  );

  if (!data) {
    return null;
  }
  const { items, orders } = data;

  return (
    <Card className='my-8 p-4 overflow-hidden border-none shadow-md'>
      <VideoListHeader
        orders={orders}
        isValidating={isValidating}
        onClickReloadButton={handleClickReloadButton}
      />
      <VideoListBody orders={orders} items={items} />
    </Card>
  );
}