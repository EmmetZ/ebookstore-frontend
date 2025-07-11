const BASEURL = import.meta.env.VITE_BACKEND_ENDPOINT;
export const PREFIX = `${BASEURL}/api`;
export const AVATAR_UPLOAD_URL = `${PREFIX}/user/me/avatar`;
export const AVATAR_URL = `${PREFIX}/user/avatars`;
export const BOOK_COVER_URL = `${PREFIX}/book/covers`;
