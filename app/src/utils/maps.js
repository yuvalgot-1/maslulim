import { isSafeHttpUrl } from './url.js';

function placeQuery(stop, area) {
  return [stop.name, area].filter(Boolean).join(' ');
}

// Prefer the creator's own Google Maps link; otherwise search by name + area.
export function googleMapsUrl(stop, area) {
  if (isSafeHttpUrl(stop.mapLink)) return stop.mapLink.trim();
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(placeQuery(stop, area));
}

export function wazeUrl(stop, area) {
  return 'https://waze.com/ul?navigate=yes&q=' + encodeURIComponent(placeQuery(stop, area));
}

// Whole route as one Google Maps drive: first stop -> last, the rest as waypoints.
export function routeDirectionsUrl(route) {
  const q = (s) => placeQuery(s, route.area);
  const stops = route.stops;
  const params = new URLSearchParams({
    api: '1',
    origin: q(stops[0]),
    destination: q(stops[stops.length - 1]),
    travelmode: 'driving',
  });
  const middle = stops.slice(1, -1).map(q);
  if (middle.length) params.set('waypoints', middle.join('|'));
  return 'https://www.google.com/maps/dir/?' + params.toString();
}
