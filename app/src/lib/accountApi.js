import { supabase } from './supabase.js';

// The creators table only lets a creator read their own row, so a row here
// means "this logged-in account is an allowed creator".
export async function fetchCreatorName() {
  const { data, error } = await supabase.from('creators').select('name').maybeSingle();
  if (error) throw error;
  return data ? data.name : null;
}

export async function fetchSavedIds() {
  const { data, error } = await supabase.from('saved_routes').select('route_id');
  if (error) throw error;
  return data.map((row) => row.route_id);
}

export async function addSavedRoutes(routeIds) {
  if (routeIds.length === 0) return;
  const { error } = await supabase
    .from('saved_routes')
    .upsert(routeIds.map((route_id) => ({ route_id })), { onConflict: 'user_id,route_id', ignoreDuplicates: true });
  if (error) throw error;
}

export async function removeSavedRoute(routeId) {
  const { error } = await supabase.from('saved_routes').delete().eq('route_id', routeId);
  if (error) throw error;
}

export async function signUp(email, password) {
  return supabase.auth.signUp({ email, password });
}

export async function signIn(email, password) {
  return supabase.auth.signInWithPassword({ email, password });
}
