const API_BASE_URL = "https://dinesh-sagel-backend.onrender.com";
const CURRENT_USER_KEY = "fitness-current-user";

type PurchasePayload = {
  course_id: string;
  full_name: string;
  age: number;
  sex: string;
  email: string;
  mobile_number: string;
  description: string;
  past_injury: string;
  goal: string;
  currencyCode: string;
};

type PurchaseResult = {
  paymentId: string;
  amount?: string;
  currency?: string;
  data: unknown;
};

type PlanCurrencySource = {
  currencyCode?: string;
  allprice?: { currencyCode: string }[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function findString(value: unknown, keys: string[]): string | undefined {
  if (!isRecord(value) && !Array.isArray(value)) return undefined;

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findString(item, keys);
      if (found) return found;
    }
    return undefined;
  }

  for (const key of keys) {
    const direct = value[key];
    if (typeof direct === "string" && direct.trim()) return direct;
    if (typeof direct === "number") return String(direct);
  }

  for (const item of Object.values(value)) {
    const found = findString(item, keys);
    if (found) return found;
  }

  return undefined;
}

function getStoredAuthToken() {
  if (typeof window === "undefined") return "";

  const directToken = window.localStorage.getItem("token");
  if (directToken) return directToken;

  try {
    const storedUser = window.localStorage.getItem(CURRENT_USER_KEY);
    if (!storedUser) return "";

    const parsed = JSON.parse(storedUser);
    return isRecord(parsed) && typeof parsed.token === "string"
      ? parsed.token
      : "";
  } catch {
    return "";
  }
}

function getMessage(data: unknown, fallback: string) {
  return findString(data, ["message", "msg", "error"]) ?? fallback;
}

async function readJsonResponse(response: Response) {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

function authHeaders() {
  const token = getStoredAuthToken();
  if (!token) {
    throw new Error("Please login first, then submit the form.");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function createPlanPurchase(
  payload: PurchasePayload
): Promise<PurchaseResult> {
  const response = await fetch(`${API_BASE_URL}/api/purchase/plan`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await readJsonResponse(response);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        getMessage(
          data,
          "Plan not found for purchase. Please use a purchasable plan id from the plans API, or update the backend to accept this plan."
        )
      );
    }

    throw new Error(getMessage(data, "Could not create payment id."));
  }

  const paymentId = findString(data, [
    "paymentId",
    "payment_id",
    "paymentID",
    "payment",
    "id",
    "_id",
  ]);

  if (!paymentId) {
    throw new Error("Payment id was not returned by the server.");
  }

  return {
    paymentId,
    amount: findString(data, ["amount"]),
    currency: findString(data, ["currency", "currencyCode"]),
    data,
  };
}

export function getPlanCurrencyOptions(plan: PlanCurrencySource) {
  const currencies =
    plan.allprice
      ?.map((price) => price.currencyCode)
      .filter((currencyCode) => currencyCode.trim()) ?? [];

  if (plan.currencyCode?.trim()) {
    currencies.push(plan.currencyCode);
  }

  const uniqueCurrencies = Array.from(
    new Set(currencies.map((currencyCode) => currencyCode.toUpperCase()))
  );

  return uniqueCurrencies.length ? uniqueCurrencies : ["INR"];
}

export async function initiatePlanPayment(paymentId: string) {
  if (!paymentId.trim()) {
    throw new Error("Payment id is missing. Please submit the form again.");
  }

  const response = await fetch(
    `${API_BASE_URL}/api/payment/initiate/${encodeURIComponent(paymentId)}`,
    {
      method: "POST",
      headers: authHeaders(),
    }
  );
  const data = await readJsonResponse(response);

  if (!response.ok) {
    throw new Error(getMessage(data, "Could not initiate payment."));
  }

  return data;
}
