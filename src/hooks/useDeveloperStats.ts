import { useQuery } from "@tanstack/react-query";

// Single source of truth for the usernames these stat widgets pull from.
const GITHUB_USERNAME = "ComradeMohan";
const LEETCODE_USERNAME = "ComradeMohan";
const LEETCODE_API_BASE = "https://alfa-leetcode-api.onrender.com";

/**
 * Fetches live GitHub profile stats (followers, public repos, avatar).
 * `queryKeyPrefix` keeps react-query caches distinct per page (e.g. "about", "developer")
 * without duplicating the fetch logic itself.
 */
export function useGithubStats(queryKeyPrefix: string) {
  return useQuery({
    queryKey: [queryKeyPrefix, "githubStats", GITHUB_USERNAME],
    queryFn: async () => {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
      return res.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export interface GithubContributionsData {
  total: Record<string, number>;
  totalLifetime: number;
  totalThisYear: number;
  contributions: Array<{ date: string; count: number; level: number }>;
}

/**
 * Fetches live GitHub contribution calendar and calculates total lifetime & this-year commit stats.
 * Uses cached contributions endpoint with 1-hour staleTime to prevent rate limiting.
 */
export function useGithubContributions(queryKeyPrefix: string = "global") {
  return useQuery<GithubContributionsData>({
    queryKey: [queryKeyPrefix, "githubContributions", GITHUB_USERNAME],
    queryFn: async () => {
      const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`);
      if (!res.ok) throw new Error(`GitHub contributions API error: ${res.status}`);
      const data = await res.json();

      const totalMap: Record<string, number> = data.total || {};
      const totalLifetime = Object.values(totalMap).reduce((acc: number, val: any) => acc + (typeof val === "number" ? val : 0), 0);
      const currentYear = new Date().getFullYear().toString();
      const totalThisYear = totalMap[currentYear] || Object.values(totalMap)[Object.values(totalMap).length - 1] || 2388;

      return {
        total: totalMap,
        totalLifetime: totalLifetime > 0 ? totalLifetime : 4532,
        totalThisYear: totalThisYear > 0 ? totalThisYear : 2388,
        contributions: data.contributions || [],
      };
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

/**
 * Fetches live LeetCode profile, solved-count, contest, and language stats with fallback support.
 */
export function useLeetcodeStats(queryKeyPrefix: string) {
  return useQuery({
    queryKey: [queryKeyPrefix, "leetcodeStats", LEETCODE_USERNAME],
    queryFn: async () => {
      try {
        const [baseProfileRes, profileRes, contestRes, skillRes] = await Promise.all([
          fetch(`${LEETCODE_API_BASE}/${LEETCODE_USERNAME}`).catch(() => null),
          fetch(`${LEETCODE_API_BASE}/${LEETCODE_USERNAME}/solved`).catch(() => null),
          fetch(`${LEETCODE_API_BASE}/${LEETCODE_USERNAME}/contest`).catch(() => null),
          fetch(`${LEETCODE_API_BASE}/${LEETCODE_USERNAME}/language`).catch(() => null),
        ]);

        const [baseProfile, profile, contest, skill] = await Promise.all([
          baseProfileRes?.ok ? baseProfileRes.json() : null,
          profileRes?.ok ? profileRes.json() : null,
          contestRes?.ok ? contestRes.json() : null,
          skillRes?.ok ? skillRes.json() : null,
        ]);

        if (profile) {
          return { baseProfile, profile, contest, skill };
        }

        // Direct fallback to leetcode-stats-api
        const fallbackRes = await fetch(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`).catch(() => null);
        if (fallbackRes?.ok) {
          const fb = await fallbackRes.json();
          return {
            baseProfile: { realName: "Mohan Reddy", userAvatar: "" },
            profile: {
              solvedProblem: fb.totalSolved || 467,
              easySolved: fb.easySolved || 178,
              mediumSolved: fb.mediumSolved || 254,
              hardSolved: fb.hardSolved || 35,
            },
            contest: {
              contestRating: 1512,
              contestTopPercentage: 32.4,
            },
            skill: null,
          };
        }

        return {
          baseProfile: null,
          profile: { solvedProblem: 467, easySolved: 178, mediumSolved: 254, hardSolved: 35 },
          contest: { contestRating: 1512, contestTopPercentage: 32.4 },
          skill: null,
        };
      } catch {
        return {
          baseProfile: null,
          profile: { solvedProblem: 467, easySolved: 178, mediumSolved: 254, hardSolved: 35 },
          contest: { contestRating: 1512, contestTopPercentage: 32.4 },
          skill: null,
        };
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

const LANGUAGE_DEFAULTS = [
  { name: "Java", color: "bg-orange-500", defaultCount: 413 },
  { name: "MySQL", color: "bg-blue-400", defaultCount: 40 },
  { name: "Python3", color: "bg-emerald-500", defaultCount: 14 },
];

/**
 * Derives the Java/MySQL/Python3 solved-problem breakdown (count + percent of total)
 * from raw LeetCode API data, falling back to last-known-good numbers while loading
 * or if the API is unavailable.
 */
export function deriveLanguageStats(leetcodeData: any, totalSolved: number) {
  const rawLangData = leetcodeData?.skill?.languageProblemCount;
  return LANGUAGE_DEFAULTS.map((lang) => {
    const count = rawLangData
      ? rawLangData.find((l: any) => l.languageName === lang.name)?.problemsSolved ?? 0
      : lang.defaultCount;
    const percent = totalSolved > 0 ? `${Math.round((count / totalSolved) * 100)}%` : "0%";
    return { name: lang.name, color: lang.color, count, percent };
  });
}
