.headers on

CREATE TABLE IF NOT EXISTS usage_stats(
  usage_stats_date  TEXT NOT NULL PRIMARY KEY,
  usage_stats_count INT  NOT NULL DEFAULT 0
);

INSERT INTO usage_stats VALUES("2024-10", 0)
  ON CONFLICT(usage_stats_date)
  DO UPDATE SET usage_stats_count = usage_stats_count + 1;

SELECT usage_stats_count FROM usage_stats WHERE usage_stats_date = "2024-10";
