-- ─── Messages from the Magi — Initial Schema ─────────────────────────────────

-- Users (Clerk user ID as primary key)
CREATE TABLE IF NOT EXISTS users (
  id                TEXT        PRIMARY KEY,              -- Clerk user ID (e.g. user_2abc...)
  email             TEXT        UNIQUE NOT NULL,
  birth_date        DATE,                                 -- set by user after signup
  subscription_tier TEXT        NOT NULL DEFAULT 'free',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Cards (the 52 + Joker deck)
CREATE TABLE IF NOT EXISTS cards (
  id        SERIAL PRIMARY KEY,
  name      TEXT    NOT NULL,
  number    INTEGER,
  suit      TEXT,
  symbol    TEXT,
  image_url TEXT
);

-- Card meanings (one card can have meanings across multiple contexts)
CREATE TABLE IF NOT EXISTS card_meanings (
  id          SERIAL  PRIMARY KEY,
  card_id     INTEGER NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  context     TEXT    NOT NULL CHECK (context IN ('birth', 'daily', 'compatibility', 'spread')),
  meaning_text TEXT   NOT NULL
);

-- Birth card lookup rules (month + day range → card)
CREATE TABLE IF NOT EXISTS birth_card_rules (
  id        SERIAL  PRIMARY KEY,
  month     INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
  day_start INTEGER NOT NULL CHECK (day_start BETWEEN 1 AND 31),
  day_end   INTEGER NOT NULL CHECK (day_end BETWEEN 1 AND 31),
  card_id   INTEGER NOT NULL REFERENCES cards(id) ON DELETE CASCADE
);

-- ─── Indexes ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_card_meanings_card_id  ON card_meanings(card_id);
CREATE INDEX IF NOT EXISTS idx_card_meanings_context  ON card_meanings(context);
CREATE INDEX IF NOT EXISTS idx_birth_card_rules_month ON birth_card_rules(month);
