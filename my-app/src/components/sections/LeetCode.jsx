
"use client";

import { useCallback, useEffect, useState } from "react";


const USERNAME = "Dineshjangra";
const API = "https://leetcode-stats.tashif.codes";
const CACHE_KEY = `leetcode-stats-${USERNAME}`;
const CACHE_TIME = 30 * 60 * 1000;

const initialStats = {
  name: USERNAME,
  avatar: "",
  totalSolved: null,
  totalQuestions: null,
  easy: null,
  medium: null,
  hard: null,
  activeDays: null,
  totalContests: null,
  contestRating: null,
  maxRating: null,
  rank: "—",
  badges: null,
  acceptanceRate: null,
  currentStreak: null,
  longestStreak: null,
  submissions: null,
};

async function fetchLeetCode(endpoint) {
  const response = await fetch(`${API}/${USERNAME}${endpoint}`);

  const result = await response.json();

  if (!response.ok || result.status !== "success") {
    throw new Error(
      result.message || `API error: ${response.status}`
    );
  }

  return result.data;
}

// Optional APIs should never break the complete component.
async function optionalFetch(endpoint) {
  try {
    return await fetchLeetCode(endpoint);
  } catch (error) {
    console.warn(`Optional LeetCode API failed (${endpoint}):`, error.message);
    return null;
  }
}

async function getLeetCodeStats() {
  // Required APIs
  const [summary, profile, solvedStats] = await Promise.all([
    fetchLeetCode(""),
    fetchLeetCode("/profile"),
    fetchLeetCode("/stats"),
  ]);

  // Optional APIs
  const [heatmap, contests, badges] = await Promise.all([
    optionalFetch("/heatmap"),
    optionalFetch("/contests"),
    optionalFetch("/badges"),
  ]);

  const difficulty =
    solvedStats?.byDifficulty ||
    solvedStats?.submitStats?.acSubmissionNum?.reduce((acc, item) => {
      acc[item.difficulty?.toLowerCase()] = item.count;
      return acc;
    }, {}) ||
    {};

  const contestData = contests || {};
  const heatmapData = heatmap || {};
  const badgeData = badges || {};

  return {
    name: profile?.displayName || USERNAME,
    avatar: profile?.avatar || "",

    totalSolved:
      summary?.totalSolved ??
      solvedStats?.totalSolved ??
      null,

    totalQuestions:
      solvedStats?.totalQuestions ??
      null,

    easy:
      difficulty.easy ??
      solvedStats?.easySolved ??
      null,

    medium:
      difficulty.medium ??
      solvedStats?.mediumSolved ??
      null,

    hard:
      difficulty.hard ??
      solvedStats?.hardSolved ??
      null,

    activeDays:
      summary?.totalActiveDays ??
      heatmapData?.totalActiveDays ??
      null,

    totalContests:
      summary?.totalContests ??
      contestData?.totalContests ??
      null,

    contestRating:
      summary?.currentRating ??
      contestData?.currentRating ??
      contestData?.rating ??
      null,

    maxRating:
      summary?.maxRating ??
      contestData?.maxRating ??
      null,

    rank: summary?.rank ?? "—",

    badges:
      summary?.badgesCount ??
      badgeData?.badgesCount ??
      null,

    acceptanceRate:
      solvedStats?.acceptanceRate ??
      null,

    currentStreak:
      heatmapData?.currentStreak ??
      null,

    longestStreak:
      heatmapData?.longestStreak ??
      null,

    submissions:
      heatmapData?.totalSubmissions ??
      null,
  };
}

function StatCard({ label, value, suffix = "" }) {
  return (
    <div className="leetcode-stat-card">
      <span className="leetcode-stat-label">{label}</span>
      <strong className="leetcode-stat-value">
        {value ?? "—"}{value !== null ? suffix : ""}
      </strong>
    </div>
  );
}

export default function LeetCode() {
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const loadStats = useCallback(async (manual = false) => {
    if (manual) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const updated = await getLeetCodeStats();

      setStats(updated);
      setError("");

      const timestamp = Date.now();

      if (typeof window !== "undefined") {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            stats: updated,
            timestamp,
          })
        );
      }

      setLastUpdated(new Date(timestamp).toLocaleTimeString());
    } catch (err) {
      console.error("LeetCode fetch error:", err);

      setError(
        "Unable to refresh LeetCode data. Showing saved data if available."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function initialize() {
      try {
        const saved = localStorage.getItem(CACHE_KEY);

        if (saved && active) {
          const parsed = JSON.parse(saved);

          if (parsed.stats) {
            setStats({
              ...initialStats,
              ...parsed.stats,
            });

            setLastUpdated(
              new Date(parsed.timestamp).toLocaleTimeString()
            );

            if (Date.now() - parsed.timestamp < CACHE_TIME) {
              setLoading(false);
              return;
            }
          }
        }
      } catch (err) {
        console.warn("LeetCode cache error:", err);
      }

      if (active) {
        await loadStats();
      }
    }

    initialize();

    const interval = setInterval(() => {
      if (active) loadStats();
    }, CACHE_TIME);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [loadStats]);

  const total =
    (stats.easy || 0) +
    (stats.medium || 0) +
    (stats.hard || 0);

  const progress = (value) =>
    total > 0 ? `${(value / total) * 100}%` : "0%";

  return (
    <section id="leetcode" className="leetcode-section">
      <div className="container">

        <div className="leetcode-heading">
          <span className="eyebrow">CODING PROFILE</span>
          <h2 className="section-title">
            LeetCode <span className="text-accent">Journey</span>
          </h2>
          <p>My problem-solving progress and coding activity.</p>
        </div>

        <div className="leetcode-main-card">

          <div className="leetcode-profile">
            <div className="leetcode-profile-left">
              {stats.avatar ? (
                <img
                  src={stats.avatar}
                  alt="LeetCode profile"
                  className="leetcode-avatar"
                />
              ) : (
                <div className="leetcode-avatar-placeholder">
                  LC
                </div>
              )}

              <div>
                <h3>{stats.name}</h3>
                <a
                  href={`https://leetcode.com/u/${USERNAME}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{USERNAME} ↗
                </a>
              </div>
            </div>

            <div className="leetcode-live">
              <span />
              LIVE PROFILE
            </div>
          </div>

          {loading && (
            <p className="leetcode-loading">
              Loading LeetCode statistics...
            </p>
          )}

          {error && (
            <p className="leetcode-error">{error}</p>
          )}

          <div className="leetcode-solved">
            <div>
              <span className="leetcode-stat-label">
                TOTAL QUESTIONS SOLVED
              </span>

              <h2>
                {stats.totalSolved ?? "—"}
                <small>
                  {" / "}
                  {stats.totalQuestions ?? "—"}
                </small>
              </h2>
            </div>

            <div className="leetcode-solved-icon">⌘</div>
          </div>

          <div className="leetcode-difficulty">
            <div className="leetcode-difficulty-item">
              <div>
                <span>Easy</span>
                <strong>{stats.easy ?? "—"}</strong>
              </div>
              <div className="leetcode-progress">
                <span
                  style={{ width: progress(stats.easy || 0) }}
                  className="easy-progress"
                />
              </div>
            </div>

            <div className="leetcode-difficulty-item">
              <div>
                <span>Medium</span>
                <strong>{stats.medium ?? "—"}</strong>
              </div>
              <div className="leetcode-progress">
                <span
                  style={{ width: progress(stats.medium || 0) }}
                  className="medium-progress"
                />
              </div>
            </div>

            <div className="leetcode-difficulty-item">
              <div>
                <span>Hard</span>
                <strong>{stats.hard ?? "—"}</strong>
              </div>
              <div className="leetcode-progress">
                <span
                  style={{ width: progress(stats.hard || 0) }}
                  className="hard-progress"
                />
              </div>
            </div>
          </div>

          <div className="leetcode-stats-grid">
            <StatCard label="Active Days" value={stats.activeDays} />
            <StatCard label="Submissions" value={stats.submissions} />
            <StatCard label="Current Streak" value={stats.currentStreak} />
            <StatCard label="Longest Streak" value={stats.longestStreak} />
            <StatCard label="Contest Rating" value={stats.contestRating} />
            <StatCard label="Contests" value={stats.totalContests} />
            <StatCard label="Badges" value={stats.badges} />
            <StatCard label="Acceptance Rate" value={stats.acceptanceRate} suffix="%" />
          </div>

          <div className="leetcode-footer">
            <div>
              <span>Global Rank</span>
              <strong>{stats.rank}</strong>
            </div>

            <div className="leetcode-updated">
              <span>
                {lastUpdated
                  ? `Updated: ${lastUpdated}`
                  : "Live statistics"}
              </span>

              <button
                type="button"
                onClick={() => loadStats(true)}
                disabled={refreshing}
              >
                {refreshing ? "Refreshing..." : "↻ Refresh"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
