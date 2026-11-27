/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("books", {
    id: { type: "VARCHAR(50)", primaryKey: true },
    name: { type: "TEXT", notNull: true },
    year: { type: "INTEGER" },
    author: { type: "TEXT" },
    summary: { type: "TEXT" },
    publisher: { type: "TEXT" },
    page_count: { type: "INTEGER", notNull: true },
    read_page: { type: "INTEGER", notNull: true },
    finished: { type: "BOOLEAN", notNull: true },
    reading: { type: "BOOLEAN", notNull: true },
    inserted_at: {
      type: "TEXT",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "TEXT",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("books");
};
