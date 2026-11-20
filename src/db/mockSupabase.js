import crypto from 'crypto';
import { logger } from '../config/logger.js';

/**
 * In-memory Supabase fallback for environments without SUPABASE_URL / SUPABASE_KEY
 * (e.g. AI Studio preview before configuring external Supabase credentials).
 */

function createSeedDatabase() {
  const now = new Date();
  const daysAgo = (d) => new Date(now.getTime() - d * 86400_000).toISOString();
  const daysAhead = (d) => new Date(now.getTime() + d * 86400_000).toISOString();

  // Precomputed bcryptjs hashes for 'Admin123!' and 'Pilot123!'
  const adminPassHash = '$2b$10$NzFV7MJapaRctaQKZbcV2OADX0RCZHLpSCfnkHXQ2t30pTqfpOhx.';
  const pilotPassHash = '$2b$10$EUKZH6lxSM1Afw9LCxe8zucaN6gpBGYsdXX3YpZSstZ7Padzjao72';

  const ownerId = '3658df3a-3d15-4669-a595-dca33ec86fd3';
  const adminId = 'a1111111-1111-4111-8111-111111111111';
  const veteranId = 'b2222222-2222-4222-8222-222222222222';
  const memberId = 'c3333333-3333-4333-8333-333333333333';

  const sqEventId = 'e1111111-1111-4111-8111-111111111111';
  const bmEventId = 'e2222222-2222-4222-8222-222222222222';
  const prevSqEventId = 'e3333333-3333-4333-8333-333333333333';

  const tournamentId = 'f1111111-1111-4111-8111-111111111111';
  const teamAId = 'f2222222-2222-4222-8222-222222222222';
  const teamBId = 'f3333333-3333-4333-8333-333333333333';

  const users = [
    {
      id: ownerId,
      user_id: 1,
      nick: 'PJPIROVANI',
      email: 'owner@ffaa.py',
      email_institucional: 'pjpirovani@ffaa.py',
      password_hash: adminPassHash,
      role: 'OWNER',
      status: 'ACTIVE',
      must_change_password: false,
      token_version: 1,
      avg_tokens: 235,
      weeks_evaluated: 12,
      perf_status: 'VERDE',
      google_linked: false,
      last_activity: now.toISOString(),
      created_at: daysAgo(120),
      updated_at: now.toISOString(),
    },
    {
      id: adminId,
      user_id: 2,
      nick: 'Condor_01',
      email: 'condor@ffaa.py',
      email_institucional: 'condor@ffaa.py',
      password_hash: adminPassHash,
      role: 'ADMIN',
      status: 'ACTIVE',
      must_change_password: false,
      token_version: 1,
      avg_tokens: 210,
      weeks_evaluated: 10,
      perf_status: 'VERDE',
      google_linked: false,
      last_activity: now.toISOString(),
      created_at: daysAgo(90),
      updated_at: now.toISOString(),
    },
    {
      id: veteranId,
      user_id: 3,
      nick: 'Halcon_Vet',
      email: 'veterano@ffaa.py',
      email_institucional: 'veterano@ffaa.py',
      password_hash: pilotPassHash,
      role: 'VETERANO',
      status: 'ACTIVE',
      must_change_password: false,
      token_version: 1,
      avg_tokens: 192,
      weeks_evaluated: 8,
      perf_status: 'VERDE',
      google_linked: false,
      last_activity: daysAgo(1),
      created_at: daysAgo(60),
      updated_at: now.toISOString(),
    },
    {
      id: memberId,
      user_id: 100,
      nick: 'Viper_PY',
      email: 'viper@ffaa.py',
      email_institucional: 'viper@ffaa.py',
      password_hash: pilotPassHash,
      role: 'MIEMBRO',
      status: 'ACTIVE',
      must_change_password: false,
      token_version: 1,
      avg_tokens: 165,
      weeks_evaluated: 4,
      perf_status: 'NARANJA',
      google_linked: false,
      last_activity: daysAgo(1),
      created_at: daysAgo(30),
      updated_at: now.toISOString(),
    },
  ];

  const events_master = [
    {
      id: sqEventId,
      type: 'SQUADRON',
      name: 'Squadron Event Activo',
      legacy_event_id: '2026-11 · SEM 47 - SQ',
      start_date: daysAgo(1),
      end_date: daysAhead(3),
      submission_opens_at: daysAgo(1),
      submission_closes_at: daysAhead(6),
      status: 'OPEN',
      metadata: {
        target_members: 27,
        target_tokens: 200,
        min_tokens_required: 175,
        auto_created: true,
      },
      created_at: daysAgo(1),
      updated_at: now.toISOString(),
      closed_at: null,
    },
    {
      id: prevSqEventId,
      type: 'SQUADRON',
      name: 'Squadron Event Anterior',
      legacy_event_id: '2026-11 · SEM 46 - SQ',
      start_date: daysAgo(8),
      end_date: daysAgo(4),
      submission_opens_at: daysAgo(8),
      submission_closes_at: daysAgo(1),
      status: 'CLOSED',
      metadata: {
        target_members: 27,
        target_tokens: 200,
        min_tokens_required: 175,
      },
      created_at: daysAgo(8),
      updated_at: daysAgo(4),
      closed_at: daysAgo(4),
    },
    {
      id: bmEventId,
      type: 'BLACK_MARKET',
      name: 'Black Market · F-22 Prototype',
      legacy_event_id: 'BM-2026-11',
      start_date: daysAgo(1),
      end_date: daysAhead(4),
      submission_opens_at: daysAgo(1),
      submission_closes_at: daysAhead(5),
      status: 'OPEN',
      metadata: {
        target_aircraft: 'F-22 Raptor',
        base_price_gold: 2500,
        days: 5,
        missions_per_day: 3,
      },
      created_at: daysAgo(1),
      updated_at: now.toISOString(),
      closed_at: null,
    },
  ];

  const events = [
    {
      id: sqEventId,
      event_id: '2026-11 · SEM 47 - SQ',
      name: 'Squadron Event Activo',
      type: 'SQUADRON',
      start_date: daysAgo(1),
      end_date: daysAhead(3),
      is_open: true,
      status: 'OPEN',
    },
  ];

  const event_participations = [
    {
      id: 'd1111111-1111-4111-8111-111111111111',
      event_id: sqEventId,
      user_id: ownerId,
      nick: 'PJPIROVANI',
      status: 'VERDE',
      computed_points: 235,
      data: { tokens: 235, days_connected: 4, flew_in_group: true, notes: 'Escuadrilla Alfa' },
      created_at: daysAgo(0),
      updated_at: now.toISOString(),
    },
    {
      id: 'd2222222-2222-4222-8222-222222222222',
      event_id: sqEventId,
      user_id: adminId,
      nick: 'Condor_01',
      status: 'VERDE',
      computed_points: 210,
      data: { tokens: 210, days_connected: 4, flew_in_group: true, notes: 'Vuelo nocturno' },
      created_at: daysAgo(0),
      updated_at: now.toISOString(),
    },
    {
      id: 'd3333333-3333-4333-8333-333333333333',
      event_id: sqEventId,
      user_id: veteranId,
      nick: 'Halcon_Vet',
      status: 'VERDE',
      computed_points: 192,
      data: { tokens: 192, days_connected: 4, flew_in_group: true, notes: '' },
      created_at: daysAgo(0),
      updated_at: now.toISOString(),
    },
    {
      id: 'd4444444-4444-4444-8444-444444444444',
      event_id: sqEventId,
      user_id: memberId,
      nick: 'Viper_PY',
      status: 'NARANJA',
      computed_points: 165,
      data: { tokens: 165, days_connected: 3, flew_in_group: false, notes: '' },
      created_at: daysAgo(0),
      updated_at: now.toISOString(),
    },
  ];

  const performances = [
    {
      id: 1,
      user_id: 1,
      nick: 'PJPIROVANI',
      role: 'OWNER',
      event_id: '2026-11 · SEM 47 - SQ',
      tokens: 235,
      days_connected: 4,
      flew_in_group: true,
      notes: 'Escuadrilla Alfa',
      status: 'VERDE',
      created_at: daysAgo(0),
    },
    {
      id: 2,
      user_id: 2,
      nick: 'Condor_01',
      role: 'ADMIN',
      event_id: '2026-11 · SEM 47 - SQ',
      tokens: 210,
      days_connected: 4,
      flew_in_group: true,
      notes: '',
      status: 'VERDE',
      created_at: daysAgo(0),
    },
  ];

  const planes = [
    {
      id: 'p1111111-1111-4111-8111-111111111111',
      user_id: 1,
      avion_id: '1',
      nivel: 20,
      especial_nombre: 'Vector Thrust BVR',
      pasiva_nombre: 'Sigilo Avanzado RAM',
      mod1_id: 'm1',
      mod1_lvl: 5,
      mod2_id: 'm6',
      mod2_lvl: 5,
      created_at: daysAgo(30),
      updated_at: now.toISOString(),
    },
    {
      id: 'p2222222-2222-4222-8222-222222222222',
      user_id: 100,
      avion_id: '4',
      nivel: 16,
      especial_nombre: 'Supercrucero Mach 1.5',
      pasiva_nombre: null,
      mod1_id: 'm2',
      mod1_lvl: 3,
      mod2_id: null,
      mod2_lvl: null,
      created_at: daysAgo(15),
      updated_at: now.toISOString(),
    },
  ];

  const mentorships = [
    {
      id: 'm1111111-1111-4111-8111-111111111111',
      mentor_id: veteranId,
      mentee_id: memberId,
      assigned_by: ownerId,
      status: 'ACTIVE',
      started_at: daysAgo(14),
      created_at: daysAgo(14),
    },
  ];

  const tournaments = [
    {
      id: tournamentId,
      name: 'Copa Guaraní 2v2',
      format: '2v2',
      scope: 'INTERNAL',
      status: 'REGISTRATION',
      starts_at: daysAhead(7),
      ends_at: daysAhead(14),
      min_teams: 4,
      max_teams: 8,
      moderator_id: ownerId,
      created_by: ownerId,
      created_at: daysAgo(2),
      updated_at: now.toISOString(),
    },
  ];

  const tournament_participants = [
    {
      id: teamAId,
      tournament_id: tournamentId,
      team_name: 'Escuadrilla Ñandutí',
      captain_user_id: ownerId,
      roster: [ownerId, adminId],
      registered_at: daysAgo(1),
      status: 'CONFIRMED',
    },
    {
      id: teamBId,
      tournament_id: tournamentId,
      team_name: 'Halcones del Chaco',
      captain_user_id: veteranId,
      roster: [veteranId, memberId],
      registered_at: daysAgo(1),
      status: 'CONFIRMED',
    },
  ];

  return {
    users,
    performances,
    events,
    events_master,
    event_participations,
    plane_models: [],
    planes,
    plane_mods: [],
    mod_effects: [],
    plane_upgrades: [],
    upgrade_nodes_v2: [],
    upgrade_effects: [],
    upgrade_effects_history: [],
    normativas: [],
    tournaments,
    tournament_participants,
    tournament_matches: [],
    tournament_drafts: [],
    tournament_moderator_history: [],
    mentorships,
    mentorship_logs: [],
    mentor_evaluations: [],
    presence: [],
    user_settings: [],
    audit_logs: [],
    security_events: [],
    password_resets: [],
    recovery_codes: [],
    backups: [],
    discord_webhooks: [],
    user_nick_changes: [],
    error_logs: [],
    _nextUserId: 101,
  };
}

function buildAdminParticipationsView(DB) {
  const usersById = new Map();
  const usersByNumericId = new Map();
  for (const u of DB.users) {
    if (u.id) usersById.set(String(u.id), u);
    if (u.user_id != null) usersByNumericId.set(String(u.user_id), u);
  }
  const eventsById = new Map(DB.events_master.map((e) => [String(e.id), e]));

  return DB.event_participations.map((ep) => {
    const u = usersById.get(String(ep.user_id)) || usersByNumericId.get(String(ep.user_id)) || {};
    const em = eventsById.get(String(ep.event_id)) || {};
    const data = ep.data || {};
    return {
      id: ep.id,
      event_id: ep.event_id,
      user_id: ep.user_id,
      event_name: em.name || 'Evento',
      event_type: em.type || 'SQUADRON',
      event_status: em.status || 'OPEN',
      event_start_date: em.start_date || null,
      event_end_date: em.end_date || null,
      nick: (u.nick && String(u.nick).trim()) || (ep.nick && String(ep.nick).trim()) || 'Desconocido',
      role: u.role || 'MIEMBRO',
      tokens: Number(data.tokens) || 0,
      days_connected: Number(data.days_connected) || 0,
      flew_in_group: Boolean(data.flew_in_group),
      notes: data.notes ?? null,
      computed_points: Number(ep.computed_points) || 0,
      status: ep.status || 'PENDING',
      created_at: ep.created_at,
      updated_at: ep.updated_at,
    };
  });
}

function getTable(table, DB) {
  if (table === 'v_admin_participations') {
    return buildAdminParticipationsView(DB);
  }
  if (!Array.isArray(DB[table])) {
    DB[table] = [];
  }
  return DB[table];
}

function compareValues(a, b) {
  if (a === b) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  const sa = String(a);
  const sb = String(b);
  return sa < sb ? -1 : sa > sb ? 1 : 0;
}

function matchSingleCondition(itemVal, op, targetVal) {
  if (op === 'eq') return String(itemVal) === String(targetVal);
  if (op === 'neq') return String(itemVal) !== String(targetVal);
  if (op === 'gt') return itemVal != null && compareValues(itemVal, targetVal) > 0;
  if (op === 'gte') return itemVal != null && compareValues(itemVal, targetVal) >= 0;
  if (op === 'lt') return itemVal != null && compareValues(itemVal, targetVal) < 0;
  if (op === 'lte') return itemVal != null && compareValues(itemVal, targetVal) <= 0;
  if (op === 'ilike') {
    const pattern = String(targetVal).replace(/%/g, '').toLowerCase();
    return String(itemVal || '').toLowerCase().includes(pattern);
  }
  if (op === 'like') {
    const pattern = String(targetVal).replace(/%/g, '');
    return String(itemVal || '').includes(pattern);
  }
  if (op === 'is') {
    if (targetVal === null || targetVal === 'null') return itemVal === null || itemVal === undefined;
    return itemVal === targetVal;
  }
  return false;
}

function applyFilters(data, filters) {
  if (!Array.isArray(data)) return [];
  let result = [...data];

  for (const f of filters) {
    if (f.op === 'in') {
      const set = new Set((f.val || []).map((v) => String(v)));
      result = result.filter((item) => set.has(String(item[f.col])));
    } else if (f.op === 'not') {
      if (f.innerOp === 'is' && f.val === null) {
        result = result.filter((item) => item[f.col] !== null && item[f.col] !== undefined);
      } else {
        result = result.filter((item) => !matchSingleCondition(item[f.col], f.innerOp, f.val));
      }
    } else if (f.op === 'or') {
      const clauses = String(f.val).split(',').map((s) => s.trim()).filter(Boolean);
      result = result.filter((item) =>
        clauses.some((clause) => {
          const m = clause.match(/^([a-z0-9_]+)\.(eq|neq|gt|gte|lt|lte|ilike|like|is)\.(.+)$/i);
          if (!m) return false;
          const [, col, op, val] = m;
          return matchSingleCondition(item[col], op.toLowerCase(), val);
        })
      );
    } else {
      result = result.filter((item) => matchSingleCondition(item[f.col], f.op, f.val));
    }
  }

  return result;
}

function executeQuery(state, DB) {
  try {
    const tableData = getTable(state.table, DB);

    if (state.method === 'INSERT' || state.method === 'UPSERT') {
      const nowIso = new Date().toISOString();
      const conflictCols = state.upsertOpts?.onConflict
        ? String(state.upsertOpts.onConflict).split(',').map((s) => s.trim()).filter(Boolean)
        : [];

      const records = [];
      for (const raw of state.body) {
        if (state.method === 'UPSERT' && conflictCols.length > 0 && Array.isArray(tableData)) {
          const existing = tableData.find((row) =>
            conflictCols.every((c) => String(row[c]) === String(raw[c]))
          );
          if (existing) {
            Object.assign(existing, raw, { updated_at: nowIso });
            records.push(existing);
            continue;
          }
        }
        const rec = {
          ...raw,
          id: raw.id || crypto.randomUUID(),
          created_at: raw.created_at || nowIso,
          updated_at: raw.updated_at || nowIso,
        };
        if (Array.isArray(tableData)) tableData.push(rec);
        records.push(rec);
      }
      return Promise.resolve({
        data: state.isSingle ? records[0] || null : records,
        error: null,
        count: records.length,
      });
    }

    if (state.method === 'UPDATE') {
      const matched = applyFilters(tableData, state.filters);
      matched.forEach((item) => Object.assign(item, state.body));
      return Promise.resolve({
        data: state.isSingle ? matched[0] || null : matched,
        error: null,
        count: matched.length,
      });
    }

    if (state.method === 'DELETE') {
      const matched = applyFilters(tableData, state.filters);
      const matchedSet = new Set(matched);
      const remaining = tableData.filter((item) => !matchedSet.has(item));
      if (Array.isArray(tableData)) {
        tableData.length = 0;
        tableData.push(...remaining);
      }
      return Promise.resolve({ data: matched, error: null, count: matched.length });
    }

    // SELECT
    let result = applyFilters(tableData, state.filters);
    const totalCount = result.length;

    if (state.isHeadMode) {
      return Promise.resolve({
        data: null,
        error: null,
        count: state.isCountMode ? totalCount : null,
      });
    }

    if (state.orders.length > 0) {
      result = [...result].sort((a, b) => {
        for (const ord of state.orders) {
          const va = a[ord.col];
          const vb = b[ord.col];
          if (va === vb) continue;
          if (va == null) return 1;
          if (vb == null) return -1;
          const cmp = compareValues(va, vb);
          if (cmp !== 0) return cmp * (ord.asc ? 1 : -1);
        }
        return 0;
      });
    }

    if (state.range) {
      result = result.slice(state.range.from, state.range.to + 1);
    }

    if (state.limit !== null) {
      result = result.slice(0, state.limit);
    }

    if (state.isSingle) {
      return Promise.resolve({
        data: result[0] || null,
        error: null,
        count: state.isCountMode ? totalCount : null,
      });
    }

    return Promise.resolve({
      data: result,
      error: null,
      count: state.isCountMode ? totalCount : result.length,
    });
  } catch (err) {
    return Promise.resolve({ data: null, error: { message: err.message }, count: null });
  }
}

export function createInMemorySupabase() {
  const DB = createSeedDatabase();
  logger.info('🧪 [Supabase Mock] Usando base de datos en memoria (demo cuentas: owner@ffaa.py / Admin123!, condor@ffaa.py / Admin123!, viper@ffaa.py / Pilot123!)');

  function makeBuilder(table) {
    const state = {
      table,
      method: 'GET',
      select: '*',
      filters: [],
      isCountMode: false,
      isHeadMode: false,
      isSingle: false,
      limit: null,
      range: null,
      orders: [],
      body: null,
      upsertOpts: null,
    };

    const builder = {
      select(fields, opts) {
        state.select = fields;
        if (opts?.count === 'exact') state.isCountMode = true;
        if (opts?.head === true) state.isHeadMode = true;
        return builder;
      },
      eq(col, val) { state.filters.push({ op: 'eq', col, val }); return builder; },
      neq(col, val) { state.filters.push({ op: 'neq', col, val }); return builder; },
      gt(col, val) { state.filters.push({ op: 'gt', col, val }); return builder; },
      gte(col, val) { state.filters.push({ op: 'gte', col, val }); return builder; },
      lt(col, val) { state.filters.push({ op: 'lt', col, val }); return builder; },
      lte(col, val) { state.filters.push({ op: 'lte', col, val }); return builder; },
      like(col, val) { state.filters.push({ op: 'like', col, val }); return builder; },
      ilike(col, val) { state.filters.push({ op: 'ilike', col, val }); return builder; },
      in(col, val) { state.filters.push({ op: 'in', col, val }); return builder; },
      is(col, val) { state.filters.push({ op: 'is', col, val }); return builder; },
      not(col, op, val) { state.filters.push({ op: 'not', col, innerOp: op, val }); return builder; },
      or(filterStr) { state.filters.push({ op: 'or', val: filterStr }); return builder; },
      order(col, opts) { state.orders.push({ col, asc: opts?.ascending !== false }); return builder; },
      limit(n) { state.limit = n; return builder; },
      range(from, to) { state.range = { from, to }; return builder; },
      single() { state.isSingle = true; return builder; },
      maybeSingle() { state.isSingle = true; return builder; },

      insert(payload) {
        state.method = 'INSERT';
        state.body = Array.isArray(payload) ? payload : [payload];
        return builder;
      },
      update(payload) {
        state.method = 'UPDATE';
        state.body = payload;
        return builder;
      },
      upsert(payload, opts) {
        state.method = 'UPSERT';
        state.body = Array.isArray(payload) ? payload : [payload];
        state.upsertOpts = opts || null;
        return builder;
      },
      delete() {
        state.method = 'DELETE';
        return builder;
      },

      then(onF, onR) { return executeQuery(state, DB).then(onF, onR); },
      catch(onR) { return executeQuery(state, DB).catch(onR); },
      finally(onFinally) { return executeQuery(state, DB).finally(onFinally); },
    };

    return builder;
  }

  return {
    from: (table) => makeBuilder(table),

    rpc: async (fn, args = {}) => {
      if (fn === 'get_next_user_id') {
        const id = DB._nextUserId++;
        return { data: id, error: null };
      }
      if (fn === 'acquire_scheduler_lock' || fn === 'release_scheduler_lock') {
        return { data: true, error: null };
      }
      if (fn === 'reset_password_atomic') {
        const reset = DB.password_resets.find((r) => r.token === args.p_token);
        if (!reset) return { data: [{ success: false, error_code: 'TOKEN_NOT_FOUND' }], error: null };
        if (reset.used) return { data: [{ success: false, error_code: 'TOKEN_ALREADY_USED' }], error: null };
        if (new Date() > new Date(reset.expires_at)) return { data: [{ success: false, error_code: 'TOKEN_EXPIRED' }], error: null };
        const user = DB.users.find((u) => u.id === reset.user_id);
        if (!user) return { data: [{ success: false, error_code: 'USER_NOT_FOUND' }], error: null };
        user.password_hash = args.p_new_password_hash;
        user.must_change_password = false;
        user.token_version = (user.token_version || 0) + 1;
        reset.used = true;
        return {
          data: [{ success: true, user_id: user.id, nick: user.nick, token_version: user.token_version }],
          error: null,
        };
      }
      if (fn === 'change_event_status_atomic') {
        const ev = DB.events_master.find((e) => e.id === args.p_event_id);
        if (!ev) return { data: [{ success: false, error_code: 'EVENT_NOT_FOUND' }], error: null };
        const key = `${ev.status}->${args.p_new_status}`;
        const valid = ['SCHEDULED->OPEN', 'SCHEDULED->CANCELLED', 'OPEN->CLOSED', 'OPEN->CANCELLED'];
        if (!valid.includes(key)) {
          return { data: [{ success: false, error_code: 'INVALID_TRANSITION', event_id: ev.id, event_name: ev.name, event_type: ev.type, old_status: ev.status }], error: null };
        }
        let replaced = null;
        if (args.p_new_status === 'OPEN') {
          replaced = DB.events_master.find((e) => e.status === 'OPEN' && e.id !== ev.id) || null;
          if (replaced) {
            replaced.status = 'CLOSED';
            replaced.closed_at = new Date().toISOString();
          }
        }
        const oldStatus = ev.status;
        ev.status = args.p_new_status;
        ev.updated_at = new Date().toISOString();
        if (args.p_new_status === 'CLOSED') {
          ev.closed_at = ev.updated_at;
          ev.closed_by = args.p_actor_id;
        }
        return {
          data: [{
            success: true,
            error_code: null,
            event_id: ev.id,
            event_name: ev.name,
            event_type: ev.type,
            old_status: oldStatus,
            new_status: args.p_new_status,
            replaced_event_id: replaced?.id || null,
            replaced_event_name: replaced?.name || null,
          }],
          error: null,
        };
      }
      return { data: null, error: null };
    },

    storage: {
      from: () => ({
        download: async () => ({ data: null, error: { message: 'Storage no configurado en modo memoria' } }),
        upload: async () => ({ data: { path: 'mock-upload' }, error: null }),
        getPublicUrl: (path) => ({ data: { publicUrl: path } }),
      }),
    },
  };
}
