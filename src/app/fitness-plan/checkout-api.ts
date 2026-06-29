const API_BASE_URL = "https://api.dineshsehgal.com";
const CURRENT_USER_KEY = "fitness-current-user";

type PurchasePayload = {
  course_id: string;
  plantype: string;
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
  amount: number;
  currency: string;
  data: unknown;
};

type PlanCurrencySource = {
  currencyCode?: string;
  allprice?: { currencyCode: string }[];
};

// ================= HELPER FUNCTIONS =================

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

// ✅ Improved token retrieval
function getStoredAuthToken() {
  if (typeof window === "undefined") return "";

  // 1. Check direct token
  const directToken = window.localStorage.getItem("token");
  if (directToken) return directToken;

  // 2. Check user object
  try {
    const storedUser = window.localStorage.getItem(CURRENT_USER_KEY);
    if (!storedUser) return "";

    const parsed = JSON.parse(storedUser);
    if (isRecord(parsed) && typeof parsed.token === "string") {
      return parsed.token;
    }
  } catch {
    // Ignore
  }

  return "";
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

// ✅ Improved authHeaders with clear error
function authHeaders() {
  const token = getStoredAuthToken();

  if (!token) {
    throw new Error("Please login first. No authentication token found.");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// ================= API FUNCTIONS =================

export async function createPlanPurchase(
  payload: PurchasePayload
): Promise<PurchaseResult> {
  console.log("🔄 Calling /api/purchase/plan with payload:", payload);
  
  try {
    const headers = authHeaders();
    
    const response = await fetch(`${API_BASE_URL}/api/purchase/plan`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    const data = await readJsonResponse(response);
    console.log("📦 Purchase API Response:", data);

    // ✅ Handle 403 Forbidden - Invalid token
    if (response.status === 403) {
      // Clear invalid token
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem(CURRENT_USER_KEY);
      }
      throw new Error("Your session has expired. Please login again.");
    }

    if (!response.ok) {
      throw new Error(getMessage(data, "Could not create payment."));
    }

    const paymentId = findString(data, [
      "paymentId",
      "payment_id",
      "payment",
      "id",
      "_id",
    ]);

    if (!paymentId) {
      throw new Error("Payment id missing from response.");
    }

    return {
      paymentId,
      amount: Number(findString(data, ["amount"]) ?? 0),
      currency: findString(data, ["currency"]) ?? "INR",
      data,
    };
  } catch (error) {
    console.error("❌ createPlanPurchase error:", error);
    throw error;
  }
}

export async function initiatePlanPayment(paymentId: string) {
  console.log(`🔄 Calling /api/payment/initiate/${paymentId}`);
  
  try {
    const headers = authHeaders();
    
    const response = await fetch(
      `${API_BASE_URL}/api/payment/initiate/${paymentId}`,
      {
        method: "POST",
        headers: headers,
      }
    );

    const data = await readJsonResponse(response);
    console.log("📦 Initiate Payment Response:", data);

    // ✅ Handle 403 Forbidden - Invalid token
    if (response.status === 403) {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem(CURRENT_USER_KEY);
      }
      throw new Error("Your session has expired. Please login again.");
    }

    if (!response.ok) {
      throw new Error(getMessage(data, "Payment initiation failed."));
    }

    if (!data.key || !data.razorpayOrderId || !data.amount) {
      throw new Error("Invalid payment initiation response - missing required fields");
    }

    return data;
  } catch (error) {
    console.error("❌ initiatePlanPayment error:", error);
    throw error;
  }
}

export async function verifyPayment(data: {
  paymentId: string;
  orderId: string;
  signature: string;
}) {
  console.log("🔄 Calling /api/payment/verify with:", data);
  
  try {
    const headers = authHeaders();
    
    const response = await fetch(`${API_BASE_URL}/api/payment/verify`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    const result = await readJsonResponse(response);
    console.log("📦 Verify Payment Response:", result);

    if (response.status === 403) {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem(CURRENT_USER_KEY);
      }
      throw new Error("Your session has expired. Please login again.");
    }

    if (!response.ok) {
      throw new Error(getMessage(result, "Payment verification failed."));
    }

    return result;
  } catch (error) {
    console.error("❌ verifyPayment error:", error);
    throw error;
  }
}

export function getPlanCurrencyOptions(plan: PlanCurrencySource) {
  const currencies =
    plan.allprice?.map((p) => p.currencyCode).filter(Boolean) ?? [];

  if (plan.currencyCode) {
    currencies.push(plan.currencyCode);
  }

  return Array.from(new Set(currencies.map((c) => c.toUpperCase())));
}