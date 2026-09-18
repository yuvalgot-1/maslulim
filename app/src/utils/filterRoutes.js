export function filterRoutes(routes, { query = '', collection = 'all', area = 'all', stopCat = 'all' }) {
  const q = query.trim().toLowerCase();
  return routes.filter((r) => {
    if (!r.published) return false;
    const hay = (r.title + ' ' + r.area + ' ' + r.stops.map((x) => x.name).join(' ')).toLowerCase();
    return (
      (!q || hay.includes(q)) &&
      (collection === 'all' || r.collections.includes(collection)) &&
      (area === 'all' || r.area.includes(area)) &&
      (stopCat === 'all' || r.stops.some((x) => x.cat === stopCat))
    );
  });
}

export function hasActiveFilters({ query = '', collection = 'all', area = 'all', stopCat = 'all' }) {
  return !!query.trim() || collection !== 'all' || area !== 'all' || stopCat !== 'all';
}
