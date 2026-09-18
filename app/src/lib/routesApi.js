import { supabase } from './supabase.js';

export async function fetchRoutes() {
  const { data, error } = await supabase
    .from('routes')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function insertRoute(route) {
  const { error } = await supabase.from('routes').insert(route);
  if (error) throw error;
}

export async function updateRoute(id, fields) {
  const { error } = await supabase.from('routes').update(fields).eq('id', id);
  if (error) throw error;
}
