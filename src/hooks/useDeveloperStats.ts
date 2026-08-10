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

/**
 * Fetches live LeetCode profile, solved-count, contest, and language stats in parallel.
 */
export function useLeetcodeStats(queryKeyPrefix: string) {
  return useQuery({
    queryKey: [queryKeyPrefix, "leetcodeStats", LEETCODE_USERNAME],
    queryFn: async () => {
      const [baseProfileRes, profileRes, contestRes, skillRes] = await Promise.all([
        fetch(`${LEETCODE_API_BASE}/${LEETCODE_USERNAME}`),
        fetch(`${LEETCODE_API_BASE}/${LEETCODE_USERNAME}/solved`),
        fetch(`${LEETCODE_API_BASE}/${LEETCODE_USERNAME}/contest`),
        fetch(`${LEETCODE_API_BASE}/${LEETCODE_USERNAME}/language`),
      ]);
      const [baseProfile, profile, contest, skill] = await Promise.all([
        baseProfileRes.json(),
        profileRes.json(),
        contestRes.json(),
        skillRes.json(),
      ]);
      return { baseProfile, profile, contest, skill };
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
