import { describe, it, expect } from 'vitest';
import { googleMapsUrl, wazeUrl, routeDirectionsUrl } from '../src/utils/maps.js';

const area = 'גליל';

describe('googleMapsUrl', () => {
  it('uses the creator link when it is a safe http(s) URL', () => {
    expect(googleMapsUrl({ name: 'x', mapLink: ' https://maps.app.goo.gl/abc ' }, area)).toBe('https://maps.app.goo.gl/abc');
  });

  it('falls back to a search by name and area for unsafe or missing links', () => {
    const expected = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('חוף דוגית גליל');
    expect(googleMapsUrl({ name: 'חוף דוגית' }, area)).toBe(expected);
    expect(googleMapsUrl({ name: 'חוף דוגית', mapLink: 'javascript:alert(1)' }, area)).toBe(expected);
  });
});

describe('wazeUrl', () => {
  it('searches by name and area', () => {
    const url = new URL(wazeUrl({ name: 'חוף דוגית' }, area));
    expect(url.hostname).toBe('waze.com');
    expect(url.searchParams.get('q')).toBe('חוף דוגית גליל');
    expect(url.searchParams.get('navigate')).toBe('yes');
  });
});

describe('routeDirectionsUrl', () => {
  const stop = (name) => ({ name });

  it('goes from the first to the last stop with the rest as waypoints', () => {
    const url = new URL(routeDirectionsUrl({ area, stops: [stop('א'), stop('ב'), stop('ג'), stop('ד')] }));
    expect(url.searchParams.get('origin')).toBe('א גליל');
    expect(url.searchParams.get('destination')).toBe('ד גליל');
    expect(url.searchParams.get('waypoints')).toBe('ב גליל|ג גליל');
  });

  it('omits waypoints for a two-stop route', () => {
    const url = new URL(routeDirectionsUrl({ area, stops: [stop('א'), stop('ב')] }));
    expect(url.searchParams.has('waypoints')).toBe(false);
  });
});
