import { ZodTypeDef, z } from "zod";

const logIfDevelopment = (log: string) => {
  if (process.env.NODE_ENV === "development") console.log(log);
};

export function parseEnv<
  TOutput,
  TDef extends ZodTypeDef = ZodTypeDef,
  TInput = TOutput,
>(
  envSchema: z.Schema<TOutput, TDef, TInput>,
  appName = "APP",
  envObject = process.env as any,
) {
  try {
    logIfDevelopment(`${appName} ENV Validation Started!`);
    const parsedEnv = envSchema.parse(envObject);

    logIfDevelopment(`${appName} ENV Validation Finished!`);
    logIfDevelopment(`ENV: ${JSON.stringify(parsedEnv, null, 4)}`);

    return parsedEnv;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
