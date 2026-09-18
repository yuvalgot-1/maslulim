import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalStorageState } from './hooks/useLocalStorageState.js';
import { supabase } from './lib/supabase.js';
import { fetchRoutes, insertRoute, updateRoute, deleteRoute } from './lib/routesApi.js';
import { fetchStats, setReaction } from './lib/reactionsApi.js';
import { COLLECTIONS } from './data/routes.js';
import Header from './components/Header.jsx';
import BottomNav from './components/BottomNav.jsx';
import FeedScreen from './components/FeedScreen.jsx';
import SavedScreen from './components/SavedScreen.jsx';
import RouteDetailScreen from './components/RouteDetailScreen.jsx';
import MyRoutesScreen from './components/MyRoutesScreen.jsx';
import BuilderScreen from './components/BuilderScreen.jsx';
import LoginScreen from './components/LoginScreen.jsx';
import OnboardingModal from './components/OnboardingModal.jsx';
import TermsScreen from './components/TermsScreen.jsx';

const ROUTE_HASH = /^#\/route\/(.+)$/;

const DEFAULT_DRAFT = {
  editingId: null,
  title: '',
  area: 'שרון',
  duration: '',
  collections: [],
  stops: [
    { name: 'בריכת המעיין', cat: 'nature', spend: 'שעה', travel: '10 דק׳ נסיעה', hours: '', note: '' },
    { name: 'קפה בשוק', cat: 'cafe', spend: '40 דק׳', travel: '', hours: '', note: '' },
  ],
};

export default function App() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [routes, setRoutes] = useState([]);
  const [routesLoading, setRoutesLoading] = useState(true);
  const [routesError, setRoutesError] = useState(null);

  const [saved, setSaved] = useLocalStorageState('saved', {});
  const [mode, setMode] = useLocalStorageState('mode', 'public');
  const [reactions, setReactions] = useLocalStorageState('reactions', {});
  const [stats, setStats] = useState({});
  const [draft, setDraft] = useLocalStorageState('draft', DEFAULT_DRAFT);
  const [onboardingSeen, setOnboardingSeen] = useLocalStorageState('onboardingSeen', false);

  const [screen, setScreen] = useState('feed');
  const [openId, setOpenId] = useState(null);
  const [query, setQuery] = useState('');
  const [collection, setCollection] = useState('all');
  const [areaFilter, setAreaFilter] = useState('all');
  const [sort, setSort] = useState('new');
  const [stopCat, setStopCat] = useState('all');
  const [justPublished, setJustPublished] = useState(false);
  const [toast, setToast] = useState('');

  const isCreator = mode === 'creator';
  const creatorReady = isCreator && !!session;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const loadRoutes = useCallback(async () => {
    setRoutesLoading(true);
    setRoutesError(null);
    try {
      const data = await fetchRoutes();
      setRoutes(data);
    } catch (e) {
      setRoutesError(e.message || 'שגיאה בטעינת המסלולים');
    } finally {
      setRoutesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading) loadRoutes();
  }, [authLoading, session, loadRoutes]);

  const loadStats = useCallback(async () => {
    try {
      setStats(await fetchStats());
    } catch {
      // ratings are optional - the app works without them
    }
  }, []);

  useEffect(() => { loadStats(); }, [loadStats]);

  // open a shared link (#/route/<id>) once routes have loaded
  const [linkHandled, setLinkHandled] = useState(false);
  useEffect(() => {
    if (routesLoading || linkHandled) return;
    setLinkHandled(true);
    const match = ROUTE_HASH.exec(window.location.hash);
    if (!match) return;
    const id = decodeURIComponent(match[1]);
    if (routes.some((r) => r.id === id)) {
      setOpenId(id);
      setScreen('detail');
    }
  }, [routesLoading, linkHandled, routes]);

  function toggleMode() {
    const next = isCreator ? 'public' : 'creator';
    setMode(next);
    setScreen(next === 'creator' ? 'mine' : 'feed');
  }

  function cancelLogin() {
    setMode('public');
    setScreen('feed');
  }

  async function logout() {
    await supabase.auth.signOut();
    setMode('public');
    setScreen('feed');
  }

  function openRoute(id) {
    setOpenId(id);
    setScreen('detail');
    window.history.replaceState(null, '', '#/route/' + encodeURIComponent(id));
  }

  function clearRouteHash() {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }

  function navigate(id) {
    clearRouteHash();
    if (id === 'saved') { setScreen('saved'); return; }
    setScreen(id);
  }

  function openTerms() {
    setScreen('terms');
  }

  function react(routeId, change) {
    const prev = reactions[routeId];
    const next = { rating: 0, liked: false, ...prev, ...change };
    setReactions((r) => ({ ...r, [routeId]: next }));
    setReaction(routeId, next)
      .then(loadStats)
      .catch(() => {
        setReactions((r) => ({ ...r, [routeId]: prev }));
        setToast('לא הצלחנו לשמור את התגובה');
        setTimeout(() => setToast(''), 1800);
      });
  }

  function toggleSave(id) {
    setSaved((s) => ({ ...s, [id]: !s[id] }));
  }

  async function togglePublish(id) {
    const route = routes.find((r) => r.id === id);
    if (!route) return;
    try {
      await updateRoute(id, { published: !route.published });
      await loadRoutes();
    } catch {
      setToast('העדכון נכשל');
      setTimeout(() => setToast(''), 1800);
    }
  }

  async function deleteRouteHandler(id) {
    const route = routes.find((r) => r.id === id);
    if (!route) return;
    const ok = window.confirm(`למחוק לצמיתות את "${route.title}"? לא ניתן לשחזר את זה.`);
    if (!ok) return;
    try {
      await deleteRoute(id);
    } catch {
      setToast('המחיקה נכשלה');
      setTimeout(() => setToast(''), 1800);
      return;
    }
    try {
      const imagePaths = ['cover-' + id, ...route.stops.map((_, i) => 'stop-' + id + '-' + i)];
      await supabase.storage.from('route-images').remove(imagePaths);
    } catch {
      // route is already deleted - leftover images are harmless
    }
    await loadRoutes();
  }

  async function markCoverUploaded(id) {
    try {
      await updateRoute(id, { has_cover: true });
      await loadRoutes();
    } catch {
      // the image itself already uploaded fine - the flag is just an optimization
    }
  }

  async function markStopImageUploaded(routeId, stopIndex) {
    const route = routes.find((r) => r.id === routeId);
    if (!route) return;
    const stops = route.stops.map((s, i) => (i === stopIndex ? { ...s, image: true } : s));
    try {
      await updateRoute(routeId, { stops });
      await loadRoutes();
    } catch {
      // the image itself already uploaded fine - the flag is just an optimization
    }
  }

  function toggleDraftCollection(id) {
    setDraft((d) => ({
      ...d,
      collections: d.collections.includes(id)
        ? d.collections.filter((c) => c !== id)
        : [...d.collections, id],
    }));
  }

  function addDraftStop(stop) {
    setDraft((d) => ({ ...d, stops: [...d.stops, stop] }));
  }

  function removeDraftStop(index) {
    setDraft((d) => ({ ...d, stops: d.stops.filter((_, i) => i !== index) }));
  }

  function moveDraftStop(index, dir) {
    setDraft((d) => {
      const target = index + dir;
      if (target < 0 || target >= d.stops.length) return d;
      const stops = [...d.stops];
      [stops[index], stops[target]] = [stops[target], stops[index]];
      return { ...d, stops };
    });
  }

  function startEdit(route) {
    setDraft({
      editingId: route.id,
      title: route.title,
      area: route.area,
      duration: route.duration === 'לא צוין' ? '' : route.duration,
      collections: route.collections,
      stops: route.stops,
    });
    setScreen('build');
  }

  function cancelEdit() {
    setDraft(DEFAULT_DRAFT);
    setScreen('mine');
  }

  async function publishDraft() {
    if (draft.stops.length < 2) return;
    const isEdit = !!draft.editingId;
    const routeFields = {
      title: draft.title.trim() || 'מסלול ללא שם',
      area: draft.area,
      duration: draft.duration.trim() || 'לא צוין',
      collections: draft.collections,
      stops: draft.stops,
    };
    try {
      if (isEdit) {
        await updateRoute(draft.editingId, routeFields);
      } else {
        const id = 'custom-' + Date.now();
        await insertRoute({ id, blurb: '', published: true, ...routeFields });
        const { error: moveError } = await supabase.storage.from('route-images').move('draft-cover', 'cover-' + id);
        if (!moveError) {
          await updateRoute(id, { has_cover: true });
        }
      }
    } catch {
      setToast(isEdit ? 'השמירה נכשלה' : 'הפרסום נכשל');
      setTimeout(() => setToast(''), 1800);
      return;
    }
    await loadRoutes();
    setDraft(DEFAULT_DRAFT);
    setJustPublished(true);
    setTimeout(() => {
      setJustPublished(false);
      setScreen('mine');
    }, 900);
  }

  async function shareRoute(route) {
    const url = window.location.origin + window.location.pathname + '#/route/' + encodeURIComponent(route.id);
    const text = `${route.title}\n${route.area}\n` + route.stops.map((s, i) => `${i + 1}. ${s.name}`).join('\n');
    try {
      if (navigator.share) {
        await navigator.share({ title: route.title, text, url });
      } else {
        await navigator.clipboard.writeText(`${text}\n\n${url}`);
        setToast('הקישור הועתק ללוח');
        setTimeout(() => setToast(''), 1800);
      }
    } catch {
      // user cancelled the share sheet — nothing to do
    }
  }

  const q = query.trim();
  const visibleRoutes = useMemo(() => routes.filter((r) => r.published), [routes]);
  const matched = useMemo(() => visibleRoutes.filter((r) => {
    const hay = r.title + ' ' + r.area + ' ' + r.stops.map((x) => x.name).join(' ');
    const okQ = !q || hay.indexOf(q) > -1;
    const okC = collection === 'all' || r.collections.indexOf(collection) > -1;
    const okA = areaFilter === 'all' || r.area.indexOf(areaFilter) > -1;
    const okS = stopCat === 'all' || r.stops.some((x) => x.cat === stopCat);
    return okQ && okC && okA && okS;
  }), [visibleRoutes, q, collection, areaFilter, stopCat]);

  const sorted = useMemo(() => {
    if (sort === 'new') return matched;
    const st = (r) => stats[r.id] || {};
    return [...matched].sort((a, b) => (st(b).likes || 0) - (st(a).likes || 0));
  }, [matched, sort, stats]);

  const hasFilters = !!q || collection !== 'all' || areaFilter !== 'all' || stopCat !== 'all' || sort !== 'new';
  function resetFilters() {
    setQuery('');
    setCollection('all');
    setAreaFilter('all');
    setStopCat('all');
    setSort('new');
  }

  const feedTitle = q
    ? 'תוצאות חיפוש'
    : (collection === 'all' ? 'כל המסלולים' : COLLECTIONS.find((c) => c.id === collection).label);

  const openRouteData = routes.find((r) => r.id === openId);
  const savedRoutes = routes.filter((r) => saved[r.id]);

  if (authLoading || (routesLoading && routes.length === 0 && !routesError)) {
    return (
      <div className="app-shell-outer">
        <div className="app-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
          <span style={{ color: 'var(--text-muted)' }}>טוען מסלולים...</span>
        </div>
      </div>
    );
  }

  if (routesError) {
    return (
      <div className="app-shell-outer">
        <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, gap: 12 }}>
          <span style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '0 24px' }}>
            לא הצלחנו לטעון את המסלולים. בדקו את החיבור לאינטרנט.
          </span>
          <span className="link-action" onClick={loadRoutes}>נסה שוב</span>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell-outer">
      <div className="app-shell">
        <Header
          mode={mode}
          onToggleMode={toggleMode}
          showSearch={screen === 'feed'}
          query={query}
          onQuery={setQuery}
          collection={collection}
          onCollection={setCollection}
          areaFilter={areaFilter}
          onAreaFilter={setAreaFilter}
          sort={sort}
          onSort={setSort}
          stopCat={stopCat}
          onStopCat={setStopCat}
          hasFilters={hasFilters}
          onReset={resetFilters}
        />

        <div className="app-body">
          {screen === 'feed' && (
            <FeedScreen
              title={feedTitle}
              count={sorted.length}
              routes={sorted}
              stats={stats}
              saved={saved}
              onOpen={openRoute}
              onToggleSave={toggleSave}
              empty={sorted.length === 0}
              onReset={hasFilters ? resetFilters : null}
              onOpenTerms={openTerms}
            />
          )}

          {screen === 'terms' && <TermsScreen onBack={() => setScreen('feed')} />}

          {screen === 'saved' && (
            <SavedScreen routes={savedRoutes} stats={stats} saved={saved} onOpen={openRoute} onToggleSave={toggleSave} />
          )}

          {screen === 'detail' && openRouteData && (
            <RouteDetailScreen
              route={openRouteData}
              saved={!!saved[openRouteData.id]}
              onToggleSave={toggleSave}
              stats={stats[openRouteData.id]}
              reaction={reactions[openRouteData.id]}
              onReact={(change) => react(openRouteData.id, change)}
              onBack={() => { clearRouteHash(); setScreen('feed'); }}
              onShare={shareRoute}
              editable={creatorReady}
              onCoverUploaded={() => markCoverUploaded(openRouteData.id)}
              onStopImageUploaded={(i) => markStopImageUploaded(openRouteData.id, i)}
            />
          )}

          {screen === 'mine' && (
            creatorReady ? (
              <MyRoutesScreen
                routes={routes}
                onTogglePublish={togglePublish}
                onEdit={startEdit}
                onDelete={deleteRouteHandler}
                onLogout={logout}
                onCoverUploaded={markCoverUploaded}
              />
            ) : (
              <LoginScreen onCancel={cancelLogin} />
            )
          )}

          {screen === 'build' && (
            creatorReady ? (
              <BuilderScreen
                draft={draft}
                onTitleChange={(title) => setDraft((d) => ({ ...d, title }))}
                onAreaChange={(area) => setDraft((d) => ({ ...d, area }))}
                onDurationChange={(duration) => setDraft((d) => ({ ...d, duration }))}
                onToggleCollection={toggleDraftCollection}
                onAddStop={addDraftStop}
                onRemoveStop={removeDraftStop}
                onMoveStop={moveDraftStop}
                onPublish={publishDraft}
                onCancelEdit={cancelEdit}
                onCoverUploaded={() => markCoverUploaded(draft.editingId)}
                justPublished={justPublished}
              />
            ) : (
              <LoginScreen onCancel={cancelLogin} />
            )
          )}
        </div>

        <BottomNav mode={mode} screen={screen} onNavigate={navigate} />

        {toast && <div className="toast">{toast}</div>}

        {!isCreator && !onboardingSeen && screen !== 'terms' && (
          <OnboardingModal
            onDismiss={() => setOnboardingSeen(true)}
            onOpenTerms={openTerms}
          />
        )}
      </div>
    </div>
  );
}
