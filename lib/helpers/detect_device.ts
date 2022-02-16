const mobileMatch: RegExp[] = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

export const isMobileDevice = (): boolean => mobileMatch.some((match) => navigator.userAgent.match(match));
