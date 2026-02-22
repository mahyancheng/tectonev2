import { initializeApp } from "firebase/app";
import type { Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);

/**
 * ✅ Firestore 延迟初始化 + 更耐打网络配置
 */
let _db: Firestore | null = null;

export async function getDb(): Promise<Firestore> {
  if (_db) return _db;

  const { initializeFirestore } = await import("firebase/firestore");

  const DB_ID = import.meta.env.VITE_FIREBASE_DB_ID || "(default)";

  // ✅ 更耐打：强制走 long-polling（对公司网络 / 某些 ISP 更友好）
  const options = {
    experimentalForceLongPolling: true,
    useFetchStreams: false,
  } as const;

  _db =
    DB_ID === "(default)"
      ? initializeFirestore(app, options)
      : initializeFirestore(app, options, DB_ID);

  return _db;
}
