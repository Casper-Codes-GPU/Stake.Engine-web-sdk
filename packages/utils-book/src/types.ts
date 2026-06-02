export type BaseBookEvent = { index: number; type: string };
type BookEventUnionTypeToBookEventHandlerUnionType<
	TBookEvent extends object,
	THandlerContext extends object,
> = TBookEvent extends object
	? (bookEvent: TBookEvent, context: THandlerContext) => Promise<void>
	: never;
export type BookEventHandler<
	TBookEvent extends BaseBookEvent,
	THandlerContext extends object,
> = BookEventUnionTypeToBookEventHandlerUnionType<TBookEvent, THandlerContext>;
export type BookEventHandlerMap<
	TBookEvent extends BaseBookEvent,
	THandlerContext extends object,
> = Record<string, BookEventHandler<TBookEvent, THandlerContext>>;
export type GetBookEventFromMap<T extends BookEventHandlerMap<object, object>> =
	T extends BookEventHandlerMap<infer U, object> ? U : never;
export type GetBookEventContextFromMap<T extends BookEventHandlerMap<object, object>> =
	T extends BookEventHandlerMap<object, infer U> ? U : never;
