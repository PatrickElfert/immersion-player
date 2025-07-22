import { loadLibrary } from './feature-content-provider';
import { jest } from '@jest/globals';
import * as fs from 'fs/promises';
import { existsSync } from 'fs';

// Mock dependencies
jest.mock('fs/promises');
jest.mock('fs');
jest.mock('fluent-ffmpeg');
jest.mock('electron-store');
jest.mock('node:os');
jest.mock('uuid');

const mockReaddir = fs.readdir as jest.MockedFunction<typeof fs.readdir>;
const mockLstat = fs.lstat as jest.MockedFunction<typeof fs.lstat>;
const mockExistsSync = existsSync as jest.MockedFunction<typeof existsSync>;

describe('loadLibrary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock Store
    jest.doMock('electron-store', () => {
      return jest.fn().mockImplementation(() => ({
        get: jest.fn().mockReturnValue('/test/media/folder')
      }));
    });

    // Mock os
    jest.doMock('node:os', () => ({
      homedir: jest.fn().mockReturnValue('/home/user')
    }));

    // Mock uuid
    jest.doMock('uuid', () => ({
      v4: jest.fn().mockReturnValue('test-uuid')
    }));
  });

  it('should return library items immediately with placeholder thumbnails when thumbnails do not exist', async () => {
    // Mock filesystem structure
    mockReaddir
      .mockResolvedValueOnce(['folder1'] as any) // main folder
      .mockResolvedValueOnce(['video.mp4', 'subtitle.ja.srt'] as any); // folder content

    mockLstat.mockResolvedValue({ isDirectory: () => true } as any);
    mockExistsSync.mockReturnValue(false); // No existing thumbnail

    const startTime = Date.now();
    const result = await loadLibrary();
    const endTime = Date.now();

    // Should return quickly (less than 100ms since no thumbnail creation is awaited)
    expect(endTime - startTime).toBeLessThan(100);

    // Should return library items with placeholder thumbnails
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      name: 'video',
      path: 'media:///test/media/folder/folder1/video.mp4',
      thumbnail: expect.stringContaining('data:image/svg+xml;base64'), // placeholder
      id: 'test-uuid'
    });
  });

  it('should use existing thumbnails when they exist', async () => {
    // Mock filesystem structure
    mockReaddir
      .mockResolvedValueOnce(['folder1'] as any)
      .mockResolvedValueOnce(['video.mp4', 'thumbnail.png'] as any);

    mockLstat.mockResolvedValue({ isDirectory: () => true } as any);
    mockExistsSync.mockReturnValue(true); // Existing thumbnail

    const result = await loadLibrary();

    expect(result).toHaveLength(1);
    expect(result[0].thumbnail).toBe('media:///test/media/folder/folder1/thumbnail.png');
  });
});