---
sidebar_position: 1
---

# ApiResponse

```JSON title="ApiResponse"
{
  success: boolean;
  data?: T;
  error?: {
    code: number;
    message: string;
    details: string;
  };
}
```

- **success**: boolean - وضعیت موفقیت درخواست
- **data**: T - داده از نوع متغییر
- **error**: object
  - **code**: number - کد خطا
  - **message**: string - پیام خطا
  - **details**: string - جزئیات خطا
