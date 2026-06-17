export function validateYouTubeUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;

  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.*$/;
  const embedRegex = /https?:\/\/.*youtube\.com\/embed\//;
  const shortRegex = /https?:\/\/youtu\.be\/[^\s]+/;

  return youtubeRegex.test(url) && !embedRegex.test(url) && !shortRegex.test(url);
}

export function validateTikTokUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;

  const tiktokRegex =
    /^(https?:\/\/)?(www\.)?tiktok\.com\/(@[a-zA-Z0-9_.]+\/video\/\d+|t\/\w+|embed\/\d+|.*\/video\/\d+)/;

  return tiktokRegex.test(url);
}