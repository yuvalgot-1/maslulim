import { useMemo, useState } from 'react';
import { useLocalStorageState, moveLocalStorageValue } from './hooks/useLocalStorageState.js';
import { INITIAL_ROUTES, INITIAL_PUBLISHED, COLLECTIONS } from './data/routes.js';
import Header from './components/Header.jsx';
import BottomNav from './components/BottomNav.jsx';
import FeedScreen from './components/FeedScreen.jsx';
import SavedScreen from './components/SavedScreen.jsx';
import RouteDetailScreen from './components/RouteDetailScreen.jsx';
import MyRoutesScreen from './components/MyRoutesScreen.jsx';
import BuilderScreen from './components/BuilderScreen.jsx';

const DEFAULT_DRAFT = {
  editingId: null,
  title: '',
  area: 'שרון',
  distance: '',
  duration: '',
  collections: [],
  stops: [
    { name: 'בריכת המעיין', cat: 'nature', spend: 'שעה', travel: '10 דק׳ נסיעה', hours: '', note: '' },
    { name: 'קפה בשוק', cat: 'cafe', spend: '40 דק׳', travel: '', hours: '', note: '' },
  ],
};

export default function App() {
  const [routes, setRoutes] = useLocalStorageState('routes', INITIAL_ROUTES);
  const [published, setPublished] = useLocalStorageState('published', INITIAL_PUBLISHED);
  const [saved, setSaved] = useLocalStorageState('saved', {});
  const [mode, setMode] = useLocalStorageState('mode', 'public');
  const [draft, setDraft] = useLocalStorageState('draft', DEFAULT_DRAFT);

  const [screen, setScreen] = useState('feed');
  const [openId, setOpenId] = useState(null);
  const [query, setQuery] = useState('');
  const [collection, setCollection] = useState('all');
  const [areaFilter, setAreaFilter] = useState('all');
  const [justPublished, setJustPublished] = useState(false);
  const [toast, setToast] = useState('');

  const isCreator = mode === 'creator';

  function toggleMode() {
    const next = isCreator ? 'public' : 'creator';
    setMode(next);
    setScreen(next === 'creator' ? 'mine' : 'feed');
  }

  function openRoute(id) {
    setOpenId(id);
    setScreen('detail');
  }

  function navigate(id) {
    if (id === 'saved') { setScreen('saved'); return; }
    setScreen(id);
  }

  function toggleSave(id) {
    setSaved((s) => ({ ...s, [id]: !s[id] }));
  }

  function togglePublish(id) {
    setPublished((p) => ({ ...p, [id]: !p[id] }));
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
      distance: route.distance === 'לא צוין' ? '' : route.distance,
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

  function publishDraft() {
    if (draft.stops.length < 2) return;
    const isEdit = !!draft.editingId;
    const id = draft.editingId || 'custom-' + Date.now();
    const routeFields = {
      title: draft.title.trim() || 'מסלול ללא שם',
      area: draft.area,
      distance: draft.distance.trim() || 'לא צוין',
      duration: draft.duration.trim() || 'לא צוין',
      collections: draft.collections,
      stops: draft.stops,
    };
    if (isEdit) {
      setRoutes((r) => r.map((route) => (route.id === id ? { ...route, ...routeFields } : route)));
    } else {
      setRoutes((r) => [{ id, author: 'יואב', saves: 0, blurb: '', ...routeFields }, ...r]);
      setPublished((p) => ({ ...p, [id]: true }));
      moveLocalStorageValue('img:draft-cover', 'img:cover-' + id);
    }
    setDraft(DEFAULT_DRAFT);
    setJustPublished(true);
    setTimeout(() => {
      setJustPublished(false);
      setScreen('mine');
    }, 900);
  }

  async function shareRoute(route) {
    const text = `${route.title}\n${route.area}\n` + route.stops.map((s, i) => `${i + 1}. ${s.name}`).join('\n');
    try {
      if (navigator.share) {
        await navigator.share({ title: route.title, text });
      } else {
        await navigator.clipboard.writeText(text);
        setToast('הועתק ללוח');
        setTimeout(() => setToast(''), 1800);
      }
    } catch {
      // user cancelled the share sheet — nothing to do
    }
  }

  const q = query.trim();
  const visibleRoutes = useMemo(() => routes.filter((r) => published[r.id]), [routes, published]);
  const matched = useMemo(() => visibleRoutes.filter((r) => {
    const hay = r.title + ' ' + r.area + ' ' + r.stops.map((x) => x.name).join(' ');
    const okQ = !q || hay.indexOf(q) > -1;
    const okC = collection === 'all' || r.collections.indexOf(collection) > -1;
    const okA = areaFilter === 'all' || r.area.indexOf(areaFilter) > -1;
    return okQ && okC && okA;
  }), [visibleRoutes, q, collection, areaFilter]);

  const feedTitle = q
    ? 'תוצאות חיפוש'
    : (collection === 'all' ? 'מומלץ באזור שלך' : COLLECTIONS.find((c) => c.id === collection).label);

  const openRouteData = routes.find((r) => r.id === openId);
  const savedRoutes = routes.filter((r) => saved[r.id]);

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
        />

        <div className="app-body">
          {screen === 'feed' && (
            <FeedScreen
              title={feedTitle}
              count={matched.length}
              routes={matched}
              saved={saved}
              onOpen={openRoute}
              onToggleSave={toggleSave}
              empty={matched.length === 0}
            />
          )}

          {screen === 'saved' && (
            <SavedScreen routes={savedRoutes} saved={saved} onOpen={openRoute} onToggleSave={toggleSave} />
          )}

          {screen === 'detail' && openRouteData && (
            <RouteDetailScreen
              route={openRouteData}
              saved={!!saved[openRouteData.id]}
              onToggleSave={toggleSave}
              onBack={() => setScreen('feed')}
              onShare={shareRoute}
            />
          )}

          {screen === 'mine' && (
            <MyRoutesScreen routes={routes} published={published} onTogglePublish={togglePublish} onEdit={startEdit} />
          )}

          {screen === 'build' && (
            <BuilderScreen
              draft={draft}
              onTitleChange={(title) => setDraft((d) => ({ ...d, title }))}
              onAreaChange={(area) => setDraft((d) => ({ ...d, area }))}
              onDistanceChange={(distance) => setDraft((d) => ({ ...d, distance }))}
              onDurationChange={(duration) => setDraft((d) => ({ ...d, duration }))}
              onToggleCollection={toggleDraftCollection}
              onAddStop={addDraftStop}
              onRemoveStop={removeDraftStop}
              onMoveStop={moveDraftStop}
              onPublish={publishDraft}
              onCancelEdit={cancelEdit}
              justPublished={justPublished}
            />
          )}
        </div>

        <BottomNav mode={mode} screen={screen} onNavigate={navigate} />

        {toast && <div className="toast">{toast}</div>}
      </div>
    </div>
  );
}
