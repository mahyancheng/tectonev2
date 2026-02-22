// src/services/quoteService.ts
import { getDb } from "@/lib/firebase";

/**
 * 各产品 -> 报价编号前缀
 */
const PRODUCT_PREFIX: Record<string, string> = {
  "107-security-swing-door": "SSD",
  "104-security-folding-door": "SFD",
  "105-security-sliding-door": "SLD",
  "103-security-casement-window": "SCW",
  "106-security-sliding-window": "SSW",
  "102-fixed-screen": "FS",
  "108-security-top-hung": "STH",
};

const COLLECTIONS = {
  COUNTERS: "quote_counters",
  QUOTES: "quotes",
} as const;

const pad = (n: number, w = 4) => String(n).padStart(w, "0");
const clampId = (s: string) => s.trim().toLowerCase();

function ensureProductPrefix(productType: string): string {
  const key = clampId(productType);
  return PRODUCT_PREFIX[key] ?? "Q";
}

function coerceNumberFromCurrency(s: string): number {
  const n = Number((s || "").replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

/**
 * 生成新的报价编号（按产品类型分别自增）
 * e.g. SSD0001 / SLD0002 ...
 *
 * ⚠️ 注意：你目前是「getDoc → setDoc(increment) → getDoc」
 * 在并发情况下可能会有重复风险（两个人同时读到相同 seq）。
 * 最稳是用 runTransaction（我下面也给你交易版）。
 */
export async function getNewQuoteCode(rawProductType: string): Promise<string> {
  const productType = clampId(rawProductType);
  const prefix = ensureProductPrefix(productType);

  const db = await getDb();
  const {
    doc,
    getDoc,
    setDoc,
    serverTimestamp,
    increment,
  } = await import("firebase/firestore");

  const counterRef = doc(db, COLLECTIONS.COUNTERS, productType);

  // 若文档不存在，先初始化；再自增
  const existing = await getDoc(counterRef);
  if (!existing.exists()) {
    await setDoc(counterRef, { seq: 0, updatedAt: serverTimestamp() }, { merge: true });
  }

  // 原子自增 +1
  await setDoc(counterRef, { seq: increment(1), updatedAt: serverTimestamp() }, { merge: true });

  // 读取最新值
  const snap = await getDoc(counterRef);
  const seq = (snap.data()?.seq as number) ?? 1;

  return `${prefix}${pad(seq)}`;
}

/**
 * ✅ 交易版（更安全，推荐你用这个替换上面那个）
 * 并发时不会重复号
 */
export async function getNewQuoteCodeTx(rawProductType: string): Promise<string> {
  const productType = clampId(rawProductType);
  const prefix = ensureProductPrefix(productType);

  const db = await getDb();
  const {
    doc,
    runTransaction,
    serverTimestamp,
  } = await import("firebase/firestore");

  const counterRef = doc(db, COLLECTIONS.COUNTERS, productType);

  const seq = await runTransaction(db, async (tx) => {
    const snap = await tx.get(counterRef);
    const current = (snap.data()?.seq as number) ?? 0;
    const next = current + 1;

    tx.set(
      counterRef,
      { seq: next, updatedAt: serverTimestamp() },
      { merge: true }
    );

    return next;
  });

  return `${prefix}${pad(seq)}`;
}

/**
 * 仅写入需要的字段到 quotes 集合：
 * - quoteCode
 * - productType
 * - priceFormatted
 * - priceNumber
 * - createdAt
 */
export async function createQuoteDoc(input: {
  quoteCode: string;
  productType: string;
  priceFormatted: string;
}): Promise<void> {
  const db = await getDb();
  const {
    doc,
    setDoc,
    serverTimestamp,
    collection,
  } = await import("firebase/firestore");

  const payload = {
    quoteCode: input.quoteCode,
    productType: clampId(input.productType),
    priceFormatted: input.priceFormatted,
    priceNumber: coerceNumberFromCurrency(input.priceFormatted),
    createdAt: serverTimestamp(),
  };

  const ref = doc(collection(db, COLLECTIONS.QUOTES), input.quoteCode);

  try {
    await setDoc(ref, payload, { merge: true });
  } catch (e: any) {
    // 不依赖 FirestoreError 类型（避免顶层 import 把 firestore 拉进来）
    throw new Error(e?.message || "Failed to create quote");
  }
}
