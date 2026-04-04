/**
 * SavedReadings — localStorage store for user reading history.
 *
 * Reading shape:
 *   {
 *     id:             string    — timestamp-based unique id
 *     savedAt:        string    — ISO date string
 *     type:           'birth-card' | 'compatibility' | 'geolocation' | 'greeting-card'
 *     label:          string    — human-readable reading type
 *     eyebrow:        string    — context (name, names, "Name · Location")
 *     cardId:         number
 *     cardName:       string
 *     cardSuit:       string
 *     cardSuitSymbol: string
 *   }
 */

const STORAGE_KEY = 'magi_readings';

export function getSavedReadings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

/**
 * Save a new reading entry. Returns the saved reading with id + savedAt.
 * @param {Omit<Reading, 'id'|'savedAt'>} reading
 */
export function saveReading(reading) {
  const readings = getSavedReadings();
  const entry = {
    id:      Date.now().toString(),
    savedAt: new Date().toISOString(),
    ...reading,
  };
  readings.unshift(entry); // newest first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(readings));
  return entry;
}

/**
 * Remove a reading by id.
 * @param {string} id
 */
export function deleteReading(id) {
  const readings = getSavedReadings().filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(readings));
}
