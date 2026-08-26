import type { FieldValues, Resolver } from "react-hook-form";
import type { ZodType } from "zod";

export function zodResolver<T extends FieldValues>(
  schema: ZodType<T>,
): Resolver<T> {
  return async (values) => {
    const result = schema.safeParse(values);

    if (result.success) {
      return {
        values: result.data,
        errors: {},
      };
    }

    const errors: Record<string, { type: string; message: string }> = {};

    for (const issue of result.error.issues) {
      const field = String(issue.path[0] || "");
      if (field && !errors[field]) {
        errors[field] = {
          type: issue.code,
          message: issue.message,
        };
      }
    }

    return {
      values: {} as T,
      errors: errors as any,
    };
  };
}
