export type FirstArgOf<T> = T extends (first: infer FirstArg, ...args: unknown[]) => unknown
	? FirstArg
	: never;
