export function isSafeHttpUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return false;
  try {
    const url = new URL(value.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

// Stops with an imgId keep their photo under that id, so reordering or deleting
// stops can't shift photos between them. Older stops use their position.
export function stopImagePath(routeId, stop, index) {
  return stop.imgId ? 'stop-img-' + stop.imgId : 'stop-' + routeId + '-' + index;
}
