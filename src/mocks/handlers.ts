import { rest } from "msw";

export const handlers = [
  rest.get("/api/product/:productId", (req, res, ctx) => {
    const { productId } = req.params;

    // Mock the product detail data
    const mockProductDetail = {
      id: productId,
      title: "街口工程獅官方商城",
      lowPrice: 2999,
      highPrice: 3999,
      originalLowPrice: 3699,
      originalHighPrice: 4699,
      events: ["街口結帳享九折優惠", "訂單滿 399 免運費"],
      descriptions: [
        "請於訂單備註填寫您需要的材質",
        "請於訂單備註填寫您需要的國家",
        "客製化需要十四個工作天",
      ],
      details: [
        {
          title: "商品分類",
          description: "這邊可以填寫文字內容",
        },
        {
          title: "商品分類",
          description: "這邊可以填寫文字內容",
        },
        {
          title: "商品分類",
          description: "這邊可以填寫文字內容",
        },
      ],
    };

    // Return a mock response
    return res(ctx.status(200), ctx.json(mockProductDetail));
  }),

  rest.get("/api/product/:productId/selection", (req, res, ctx) => {
    const { productId } = req.params;

    // Mock the product selection data
    const mockProductSelection = {
      id: productId,
      title: "新竹街口工程師台灣封城褐色炫風聯名款限定發售復古包包系列",
      price: 3999,
      groups: [
        {
          id: 1,
          name: "尺寸",
          options: [
            {
              id: 1,
              name: "S",
            },
            {
              id: 2,
              name: "M",
            },
          ],
        },
        {
          id: 2,
          name: "顏色",
          options: [
            {
              id: 1,
              name: "黃色",
            },
            {
              id: 2,
              name: "綠色",
            },
          ],
        },
      ],
    };

    // Return a mock response
    return res(ctx.status(200), ctx.json(mockProductSelection));
  }),

  rest.post("/api/cart", (_req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get("/api/cart/quantity", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ quantity: 1 }));
  }),
];
