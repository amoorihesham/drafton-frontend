/**
 * Device ID — client-side only.
 *
 * Generates a stable, random UUID the first time it is called and persists it
 * to localStorage so the same device always sends the same identifier.
 *
 * ⚠️  Must only be called in client components or browser event handlers.
 *     Server actions and RSCs cannot access localStorage.
 */

const DEVICE_ID_KEY = "drafton_device_id";

export function getDeviceId(): string {
  if (typeof window === "undefined") {
    throw new Error(
      "[getDeviceId] must be called on the client. " +
        "Read the deviceId in your form component and pass it to the server action."
    );
  }

  const stored = localStorage.getItem(DEVICE_ID_KEY);
  if (stored) return stored;

  // crypto.randomUUID() is available in all modern browsers and Node ≥ 14.17
  const id = crypto.randomUUID();
  localStorage.setItem(DEVICE_ID_KEY, id);
  return id;
}
