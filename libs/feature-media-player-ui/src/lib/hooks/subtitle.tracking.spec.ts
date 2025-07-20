import { Subtitle } from '@immersion-player/shared-types';
import { getSubtitleByDirection } from './useRegisterHotkeys.js';

it('skips overlapping subtitles and returns the next non-overlapping subtitle', () => {
  const subtitles: Subtitle[] = [
    { index: 1, startTime: '00:00:01,000', endTime: '00:00:05,000', text: ['First'], lookupResult: [] },
    { index: 2, startTime: '00:00:03,000', endTime: '00:00:07,000', text: ['Second'], lookupResult: [] },
    { index: 3, startTime: '00:00:06,000', endTime: '00:00:10,000', text: ['Third'], lookupResult: [] },
  ];

  const next = getSubtitleByDirection(0, 'forward', subtitles);
  expect(next).toEqual(subtitles[2]);

  const previous = getSubtitleByDirection(2, 'backward', subtitles);
  expect(previous).toEqual(subtitles[0]);
});
