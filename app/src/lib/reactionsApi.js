import { supabase } from './supabase.js';

export async function fetchStats() {
  const { data, error } = await supabase.from('route_stats').select('*');
  if (error) throw error;
  const map = {};
  for (const row of data) {
    map[row.route_id] = { ratingAvg: row.rating_avg, ratingCount: row.rating_count, likes: row.likes };
  }
  return map;
}

const DEVICE_KEY = 'maslulim:deviceId';
let memoryId = null;

function getDeviceId() {
  try {
    let id = window.localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id = globalThis.crypto?.randomUUID?.() ?? 'd' + Math.random().toString(36).slice(2) + Date.now().toString(36);
      window.localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    memoryId = memoryId || 'd' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    return memoryId;
  }
}

export async function setReaction(routeId, { rating, liked }) {
  const { error } = await supabase.rpc('set_reaction', {
    p_route_id: routeId,
    p_device_id: getDeviceId(),
    p_rating: rating || null,
    p_liked: !!liked,
  });
  if (error) throw error;
}
