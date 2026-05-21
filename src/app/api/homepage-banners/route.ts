import { NextResponse } from "next/server";

const HOME_BANNERS_API =
  "https://dinesh-sagel-backend.onrender.com/api/banners?bannerfor=home";

const TRANSFORMATION_BANNERS_API =
  "https://dinesh-sagel-backend.onrender.com/api/banners?bannerfor=transformation";

type BannerPayload = unknown[] | { value?: unknown[] };

function getBannerItems(payload: BannerPayload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  return Array.isArray(payload.value) ? payload.value : [];
}

export async function GET() {
  try {
    const [homeResponse, transformationResponse] = await Promise.all([
      fetch(HOME_BANNERS_API, {
        cache: "no-store",
      }),
      fetch(TRANSFORMATION_BANNERS_API, {
        cache: "no-store",
      }),
    ]);

    const [homePayload, transformationPayload] = await Promise.all([
      homeResponse.json(),
      transformationResponse.json(),
    ]);

    const value = [
      ...getBannerItems(homePayload),
      ...getBannerItems(transformationPayload),
    ];

    return NextResponse.json({
      value,
      Count: value.length,
    });
  } catch {
    return NextResponse.json({
      value: [],
      Count: 0,
    }, {
      status: 200,
    });
  }
}
