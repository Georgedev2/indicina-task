import { timeAgo } from '..';

describe('util ', () => {
  it('timeAgo', () => {
    const pastDate = Date.now() - 11 * 60 * 1000;
    expect(timeAgo(pastDate)).toBe('11 minutes ago');
  });
});
