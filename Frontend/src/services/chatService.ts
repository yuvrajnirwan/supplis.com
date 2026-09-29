const CHAT_URL = 'http://localhost:3003';

export interface ChatMessage {
  id: string;
  body: string;
  channelId: string;
  createdBy: string;
  createdOn?: string;
}

const getHeaders = (token: string | null): HeadersInit => ({
  'Content-Type': 'application/json',
  ...(token ? {Authorization: `Bearer ${token}`} : {}),
});

type TokenRefresh = () => Promise<string | null>;

const authorizedRequest = async (
  url: string,
  init: RequestInit,
  token: string | null,
  refreshAccessToken: TokenRefresh,
) => {
  const request = (accessToken: string | null) =>
    fetch(url, {...init, headers: getHeaders(accessToken)});
  let response = await request(token);
  if (response.status === 401) {
    const refreshedToken = await refreshAccessToken();
    if (refreshedToken) response = await request(refreshedToken);
  }
  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Chat request failed (${response.status})${details ? `: ${details}` : ''}`,
    );
  }
  return response;
};

export const getSupportChannelId = (userId: string) => userId;

const normalizeChannelId = (channelId: string) =>
  channelId.replace(
    /^support-([0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i,
    '$1',
  );

export const fetchMessages = async (
  channelId: string | null,
  token: string | null,
  refreshAccessToken: TokenRefresh,
): Promise<ChatMessage[]> => {
  const filter = channelId
    ? `?filter=${encodeURIComponent(
        JSON.stringify({where: {channelId: normalizeChannelId(channelId)}}),
      )}`
    : '';
  const response = await authorizedRequest(`${CHAT_URL}/messages${filter}`, {
    method: 'GET',
  }, token, refreshAccessToken);
  return response.json();
};

export const sendMessage = async (
  channelId: string,
  body: string,
  toUserId: string,
  token: string | null,
  refreshAccessToken: TokenRefresh,
): Promise<void> => {
  await authorizedRequest(`${CHAT_URL}/messages`, {
    method: 'POST',
    body: JSON.stringify({
      channelId: normalizeChannelId(channelId),
      channelType: 'support',
      body,
      toUserId,
    }),
  }, token, refreshAccessToken);
};
