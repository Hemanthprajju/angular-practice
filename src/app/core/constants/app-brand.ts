/** Central branding — use everywhere for consistent naming */
export const APP_NAME = 'Angular Practice';
export const APP_EMAIL_DOMAIN = 'angularpractice.com';

export function appEmail(localPart: string): string {
  return `${localPart}@${APP_EMAIL_DOMAIN}`;
}
