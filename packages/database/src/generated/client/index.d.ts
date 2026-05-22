
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Post
 * 
 */
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>
/**
 * Model Wallet
 * 
 */
export type Wallet = $Result.DefaultSelection<Prisma.$WalletPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model Gift
 * 
 */
export type Gift = $Result.DefaultSelection<Prisma.$GiftPayload>
/**
 * Model Stream
 * 
 */
export type Stream = $Result.DefaultSelection<Prisma.$StreamPayload>
/**
 * Model LiveRoom
 * 
 */
export type LiveRoom = $Result.DefaultSelection<Prisma.$LiveRoomPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model Follow
 * 
 */
export type Follow = $Result.DefaultSelection<Prisma.$FollowPayload>
/**
 * Model StreamBattle
 * 
 */
export type StreamBattle = $Result.DefaultSelection<Prisma.$StreamBattlePayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model ModerationReport
 * 
 */
export type ModerationReport = $Result.DefaultSelection<Prisma.$ModerationReportPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  STREAMER: 'STREAMER',
  ADMIN: 'ADMIN',
  MODERATOR: 'MODERATOR'
};

export type Role = (typeof Role)[keyof typeof Role]


export const PostType: {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO'
};

export type PostType = (typeof PostType)[keyof typeof PostType]


export const TransactionType: {
  DEPOSIT: 'DEPOSIT',
  WITHDRAWAL: 'WITHDRAWAL',
  GIFT_SENT: 'GIFT_SENT',
  GIFT_RECEIVED: 'GIFT_RECEIVED'
};

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]


export const BattleStatus: {
  PENDING: 'PENDING',
  ONGOING: 'ONGOING',
  FINISHED: 'FINISHED',
  CANCELLED: 'CANCELLED'
};

export type BattleStatus = (typeof BattleStatus)[keyof typeof BattleStatus]


export const NotificationType: {
  NEW_FOLLOWER: 'NEW_FOLLOWER',
  STREAM_STARTED: 'STREAM_STARTED',
  GIFT_RECEIVED: 'GIFT_RECEIVED',
  BATTLE_INVITE: 'BATTLE_INVITE',
  SYSTEM: 'SYSTEM'
};

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType]


export const ReportStatus: {
  PENDING: 'PENDING',
  REVIEWED: 'REVIEWED',
  ACTION_TAKEN: 'ACTION_TAKEN',
  DISMISSED: 'DISMISSED'
};

export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type PostType = $Enums.PostType

export const PostType: typeof $Enums.PostType

export type TransactionType = $Enums.TransactionType

export const TransactionType: typeof $Enums.TransactionType

export type BattleStatus = $Enums.BattleStatus

export const BattleStatus: typeof $Enums.BattleStatus

export type NotificationType = $Enums.NotificationType

export const NotificationType: typeof $Enums.NotificationType

export type ReportStatus = $Enums.ReportStatus

export const ReportStatus: typeof $Enums.ReportStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wallet`: Exposes CRUD operations for the **Wallet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wallets
    * const wallets = await prisma.wallet.findMany()
    * ```
    */
  get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gift`: Exposes CRUD operations for the **Gift** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Gifts
    * const gifts = await prisma.gift.findMany()
    * ```
    */
  get gift(): Prisma.GiftDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stream`: Exposes CRUD operations for the **Stream** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Streams
    * const streams = await prisma.stream.findMany()
    * ```
    */
  get stream(): Prisma.StreamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.liveRoom`: Exposes CRUD operations for the **LiveRoom** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LiveRooms
    * const liveRooms = await prisma.liveRoom.findMany()
    * ```
    */
  get liveRoom(): Prisma.LiveRoomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.follow`: Exposes CRUD operations for the **Follow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Follows
    * const follows = await prisma.follow.findMany()
    * ```
    */
  get follow(): Prisma.FollowDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.streamBattle`: Exposes CRUD operations for the **StreamBattle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StreamBattles
    * const streamBattles = await prisma.streamBattle.findMany()
    * ```
    */
  get streamBattle(): Prisma.StreamBattleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.moderationReport`: Exposes CRUD operations for the **ModerationReport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ModerationReports
    * const moderationReports = await prisma.moderationReport.findMany()
    * ```
    */
  get moderationReport(): Prisma.ModerationReportDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Post: 'Post',
    Wallet: 'Wallet',
    Transaction: 'Transaction',
    Gift: 'Gift',
    Stream: 'Stream',
    LiveRoom: 'LiveRoom',
    Message: 'Message',
    Follow: 'Follow',
    StreamBattle: 'StreamBattle',
    Notification: 'Notification',
    ModerationReport: 'ModerationReport'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "post" | "wallet" | "transaction" | "gift" | "stream" | "liveRoom" | "message" | "follow" | "streamBattle" | "notification" | "moderationReport"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      Wallet: {
        payload: Prisma.$WalletPayload<ExtArgs>
        fields: Prisma.WalletFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WalletFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WalletFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findFirst: {
            args: Prisma.WalletFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WalletFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findMany: {
            args: Prisma.WalletFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          create: {
            args: Prisma.WalletCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          createMany: {
            args: Prisma.WalletCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WalletCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          delete: {
            args: Prisma.WalletDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          update: {
            args: Prisma.WalletUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          deleteMany: {
            args: Prisma.WalletDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WalletUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WalletUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          upsert: {
            args: Prisma.WalletUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          aggregate: {
            args: Prisma.WalletAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWallet>
          }
          groupBy: {
            args: Prisma.WalletGroupByArgs<ExtArgs>
            result: $Utils.Optional<WalletGroupByOutputType>[]
          }
          count: {
            args: Prisma.WalletCountArgs<ExtArgs>
            result: $Utils.Optional<WalletCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      Gift: {
        payload: Prisma.$GiftPayload<ExtArgs>
        fields: Prisma.GiftFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GiftFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GiftFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>
          }
          findFirst: {
            args: Prisma.GiftFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GiftFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>
          }
          findMany: {
            args: Prisma.GiftFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>[]
          }
          create: {
            args: Prisma.GiftCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>
          }
          createMany: {
            args: Prisma.GiftCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GiftCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>[]
          }
          delete: {
            args: Prisma.GiftDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>
          }
          update: {
            args: Prisma.GiftUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>
          }
          deleteMany: {
            args: Prisma.GiftDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GiftUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GiftUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>[]
          }
          upsert: {
            args: Prisma.GiftUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>
          }
          aggregate: {
            args: Prisma.GiftAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGift>
          }
          groupBy: {
            args: Prisma.GiftGroupByArgs<ExtArgs>
            result: $Utils.Optional<GiftGroupByOutputType>[]
          }
          count: {
            args: Prisma.GiftCountArgs<ExtArgs>
            result: $Utils.Optional<GiftCountAggregateOutputType> | number
          }
        }
      }
      Stream: {
        payload: Prisma.$StreamPayload<ExtArgs>
        fields: Prisma.StreamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StreamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StreamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          findFirst: {
            args: Prisma.StreamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StreamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          findMany: {
            args: Prisma.StreamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>[]
          }
          create: {
            args: Prisma.StreamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          createMany: {
            args: Prisma.StreamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StreamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>[]
          }
          delete: {
            args: Prisma.StreamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          update: {
            args: Prisma.StreamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          deleteMany: {
            args: Prisma.StreamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StreamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StreamUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>[]
          }
          upsert: {
            args: Prisma.StreamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          aggregate: {
            args: Prisma.StreamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStream>
          }
          groupBy: {
            args: Prisma.StreamGroupByArgs<ExtArgs>
            result: $Utils.Optional<StreamGroupByOutputType>[]
          }
          count: {
            args: Prisma.StreamCountArgs<ExtArgs>
            result: $Utils.Optional<StreamCountAggregateOutputType> | number
          }
        }
      }
      LiveRoom: {
        payload: Prisma.$LiveRoomPayload<ExtArgs>
        fields: Prisma.LiveRoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LiveRoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveRoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LiveRoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveRoomPayload>
          }
          findFirst: {
            args: Prisma.LiveRoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveRoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LiveRoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveRoomPayload>
          }
          findMany: {
            args: Prisma.LiveRoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveRoomPayload>[]
          }
          create: {
            args: Prisma.LiveRoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveRoomPayload>
          }
          createMany: {
            args: Prisma.LiveRoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LiveRoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveRoomPayload>[]
          }
          delete: {
            args: Prisma.LiveRoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveRoomPayload>
          }
          update: {
            args: Prisma.LiveRoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveRoomPayload>
          }
          deleteMany: {
            args: Prisma.LiveRoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LiveRoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LiveRoomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveRoomPayload>[]
          }
          upsert: {
            args: Prisma.LiveRoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveRoomPayload>
          }
          aggregate: {
            args: Prisma.LiveRoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLiveRoom>
          }
          groupBy: {
            args: Prisma.LiveRoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<LiveRoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.LiveRoomCountArgs<ExtArgs>
            result: $Utils.Optional<LiveRoomCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      Follow: {
        payload: Prisma.$FollowPayload<ExtArgs>
        fields: Prisma.FollowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FollowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FollowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          findFirst: {
            args: Prisma.FollowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FollowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          findMany: {
            args: Prisma.FollowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>[]
          }
          create: {
            args: Prisma.FollowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          createMany: {
            args: Prisma.FollowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FollowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>[]
          }
          delete: {
            args: Prisma.FollowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          update: {
            args: Prisma.FollowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          deleteMany: {
            args: Prisma.FollowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FollowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FollowUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>[]
          }
          upsert: {
            args: Prisma.FollowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          aggregate: {
            args: Prisma.FollowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFollow>
          }
          groupBy: {
            args: Prisma.FollowGroupByArgs<ExtArgs>
            result: $Utils.Optional<FollowGroupByOutputType>[]
          }
          count: {
            args: Prisma.FollowCountArgs<ExtArgs>
            result: $Utils.Optional<FollowCountAggregateOutputType> | number
          }
        }
      }
      StreamBattle: {
        payload: Prisma.$StreamBattlePayload<ExtArgs>
        fields: Prisma.StreamBattleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StreamBattleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamBattlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StreamBattleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamBattlePayload>
          }
          findFirst: {
            args: Prisma.StreamBattleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamBattlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StreamBattleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamBattlePayload>
          }
          findMany: {
            args: Prisma.StreamBattleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamBattlePayload>[]
          }
          create: {
            args: Prisma.StreamBattleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamBattlePayload>
          }
          createMany: {
            args: Prisma.StreamBattleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StreamBattleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamBattlePayload>[]
          }
          delete: {
            args: Prisma.StreamBattleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamBattlePayload>
          }
          update: {
            args: Prisma.StreamBattleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamBattlePayload>
          }
          deleteMany: {
            args: Prisma.StreamBattleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StreamBattleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StreamBattleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamBattlePayload>[]
          }
          upsert: {
            args: Prisma.StreamBattleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamBattlePayload>
          }
          aggregate: {
            args: Prisma.StreamBattleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStreamBattle>
          }
          groupBy: {
            args: Prisma.StreamBattleGroupByArgs<ExtArgs>
            result: $Utils.Optional<StreamBattleGroupByOutputType>[]
          }
          count: {
            args: Prisma.StreamBattleCountArgs<ExtArgs>
            result: $Utils.Optional<StreamBattleCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      ModerationReport: {
        payload: Prisma.$ModerationReportPayload<ExtArgs>
        fields: Prisma.ModerationReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ModerationReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ModerationReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationReportPayload>
          }
          findFirst: {
            args: Prisma.ModerationReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ModerationReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationReportPayload>
          }
          findMany: {
            args: Prisma.ModerationReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationReportPayload>[]
          }
          create: {
            args: Prisma.ModerationReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationReportPayload>
          }
          createMany: {
            args: Prisma.ModerationReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ModerationReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationReportPayload>[]
          }
          delete: {
            args: Prisma.ModerationReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationReportPayload>
          }
          update: {
            args: Prisma.ModerationReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationReportPayload>
          }
          deleteMany: {
            args: Prisma.ModerationReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ModerationReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ModerationReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationReportPayload>[]
          }
          upsert: {
            args: Prisma.ModerationReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationReportPayload>
          }
          aggregate: {
            args: Prisma.ModerationReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateModerationReport>
          }
          groupBy: {
            args: Prisma.ModerationReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<ModerationReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ModerationReportCountArgs<ExtArgs>
            result: $Utils.Optional<ModerationReportCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    post?: PostOmit
    wallet?: WalletOmit
    transaction?: TransactionOmit
    gift?: GiftOmit
    stream?: StreamOmit
    liveRoom?: LiveRoomOmit
    message?: MessageOmit
    follow?: FollowOmit
    streamBattle?: StreamBattleOmit
    notification?: NotificationOmit
    moderationReport?: ModerationReportOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    posts: number
    following: number
    followers: number
    notifications: number
    reportsMade: number
    reports: number
    messages: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | UserCountOutputTypeCountPostsArgs
    following?: boolean | UserCountOutputTypeCountFollowingArgs
    followers?: boolean | UserCountOutputTypeCountFollowersArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    reportsMade?: boolean | UserCountOutputTypeCountReportsMadeArgs
    reports?: boolean | UserCountOutputTypeCountReportsArgs
    messages?: boolean | UserCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFollowingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFollowersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReportsMadeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModerationReportWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModerationReportWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }


  /**
   * Count Type WalletCountOutputType
   */

  export type WalletCountOutputType = {
    transactions: number
  }

  export type WalletCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | WalletCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * WalletCountOutputType without action
   */
  export type WalletCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletCountOutputType
     */
    select?: WalletCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WalletCountOutputType without action
   */
  export type WalletCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Count Type GiftCountOutputType
   */

  export type GiftCountOutputType = {
    transactions: number
  }

  export type GiftCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | GiftCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * GiftCountOutputType without action
   */
  export type GiftCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftCountOutputType
     */
    select?: GiftCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GiftCountOutputType without action
   */
  export type GiftCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Count Type StreamCountOutputType
   */

  export type StreamCountOutputType = {
    messages: number
    battles1: number
    battles2: number
    reports: number
  }

  export type StreamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | StreamCountOutputTypeCountMessagesArgs
    battles1?: boolean | StreamCountOutputTypeCountBattles1Args
    battles2?: boolean | StreamCountOutputTypeCountBattles2Args
    reports?: boolean | StreamCountOutputTypeCountReportsArgs
  }

  // Custom InputTypes
  /**
   * StreamCountOutputType without action
   */
  export type StreamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamCountOutputType
     */
    select?: StreamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StreamCountOutputType without action
   */
  export type StreamCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * StreamCountOutputType without action
   */
  export type StreamCountOutputTypeCountBattles1Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StreamBattleWhereInput
  }

  /**
   * StreamCountOutputType without action
   */
  export type StreamCountOutputTypeCountBattles2Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StreamBattleWhereInput
  }

  /**
   * StreamCountOutputType without action
   */
  export type StreamCountOutputTypeCountReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModerationReportWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    avatar: string | null
    bio: string | null
    cover: string | null
    tiktokActive: boolean | null
    tiktokUrl: string | null
    instagramActive: boolean | null
    instagramUrl: string | null
    youtubeActive: boolean | null
    youtubeUrl: string | null
    facebookActive: boolean | null
    facebookUrl: string | null
    isLive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    avatar: string | null
    bio: string | null
    cover: string | null
    tiktokActive: boolean | null
    tiktokUrl: string | null
    instagramActive: boolean | null
    instagramUrl: string | null
    youtubeActive: boolean | null
    youtubeUrl: string | null
    facebookActive: boolean | null
    facebookUrl: string | null
    isLive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password: number
    role: number
    avatar: number
    bio: number
    cover: number
    tiktokActive: number
    tiktokUrl: number
    instagramActive: number
    instagramUrl: number
    youtubeActive: number
    youtubeUrl: number
    facebookActive: number
    facebookUrl: number
    isLive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    role?: true
    avatar?: true
    bio?: true
    cover?: true
    tiktokActive?: true
    tiktokUrl?: true
    instagramActive?: true
    instagramUrl?: true
    youtubeActive?: true
    youtubeUrl?: true
    facebookActive?: true
    facebookUrl?: true
    isLive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    role?: true
    avatar?: true
    bio?: true
    cover?: true
    tiktokActive?: true
    tiktokUrl?: true
    instagramActive?: true
    instagramUrl?: true
    youtubeActive?: true
    youtubeUrl?: true
    facebookActive?: true
    facebookUrl?: true
    isLive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    role?: true
    avatar?: true
    bio?: true
    cover?: true
    tiktokActive?: true
    tiktokUrl?: true
    instagramActive?: true
    instagramUrl?: true
    youtubeActive?: true
    youtubeUrl?: true
    facebookActive?: true
    facebookUrl?: true
    isLive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    email: string
    password: string
    role: $Enums.Role
    avatar: string | null
    bio: string | null
    cover: string | null
    tiktokActive: boolean
    tiktokUrl: string | null
    instagramActive: boolean
    instagramUrl: string | null
    youtubeActive: boolean
    youtubeUrl: string | null
    facebookActive: boolean
    facebookUrl: string | null
    isLive: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    avatar?: boolean
    bio?: boolean
    cover?: boolean
    tiktokActive?: boolean
    tiktokUrl?: boolean
    instagramActive?: boolean
    instagramUrl?: boolean
    youtubeActive?: boolean
    youtubeUrl?: boolean
    facebookActive?: boolean
    facebookUrl?: boolean
    isLive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    stream?: boolean | User$streamArgs<ExtArgs>
    wallet?: boolean | User$walletArgs<ExtArgs>
    posts?: boolean | User$postsArgs<ExtArgs>
    following?: boolean | User$followingArgs<ExtArgs>
    followers?: boolean | User$followersArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    reportsMade?: boolean | User$reportsMadeArgs<ExtArgs>
    reports?: boolean | User$reportsArgs<ExtArgs>
    messages?: boolean | User$messagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    avatar?: boolean
    bio?: boolean
    cover?: boolean
    tiktokActive?: boolean
    tiktokUrl?: boolean
    instagramActive?: boolean
    instagramUrl?: boolean
    youtubeActive?: boolean
    youtubeUrl?: boolean
    facebookActive?: boolean
    facebookUrl?: boolean
    isLive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    avatar?: boolean
    bio?: boolean
    cover?: boolean
    tiktokActive?: boolean
    tiktokUrl?: boolean
    instagramActive?: boolean
    instagramUrl?: boolean
    youtubeActive?: boolean
    youtubeUrl?: boolean
    facebookActive?: boolean
    facebookUrl?: boolean
    isLive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    avatar?: boolean
    bio?: boolean
    cover?: boolean
    tiktokActive?: boolean
    tiktokUrl?: boolean
    instagramActive?: boolean
    instagramUrl?: boolean
    youtubeActive?: boolean
    youtubeUrl?: boolean
    facebookActive?: boolean
    facebookUrl?: boolean
    isLive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password" | "role" | "avatar" | "bio" | "cover" | "tiktokActive" | "tiktokUrl" | "instagramActive" | "instagramUrl" | "youtubeActive" | "youtubeUrl" | "facebookActive" | "facebookUrl" | "isLive" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream?: boolean | User$streamArgs<ExtArgs>
    wallet?: boolean | User$walletArgs<ExtArgs>
    posts?: boolean | User$postsArgs<ExtArgs>
    following?: boolean | User$followingArgs<ExtArgs>
    followers?: boolean | User$followersArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    reportsMade?: boolean | User$reportsMadeArgs<ExtArgs>
    reports?: boolean | User$reportsArgs<ExtArgs>
    messages?: boolean | User$messagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      stream: Prisma.$StreamPayload<ExtArgs> | null
      wallet: Prisma.$WalletPayload<ExtArgs> | null
      posts: Prisma.$PostPayload<ExtArgs>[]
      following: Prisma.$FollowPayload<ExtArgs>[]
      followers: Prisma.$FollowPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      reportsMade: Prisma.$ModerationReportPayload<ExtArgs>[]
      reports: Prisma.$ModerationReportPayload<ExtArgs>[]
      messages: Prisma.$MessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string
      password: string
      role: $Enums.Role
      avatar: string | null
      bio: string | null
      cover: string | null
      tiktokActive: boolean
      tiktokUrl: string | null
      instagramActive: boolean
      instagramUrl: string | null
      youtubeActive: boolean
      youtubeUrl: string | null
      facebookActive: boolean
      facebookUrl: string | null
      isLive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stream<T extends User$streamArgs<ExtArgs> = {}>(args?: Subset<T, User$streamArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    wallet<T extends User$walletArgs<ExtArgs> = {}>(args?: Subset<T, User$walletArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    posts<T extends User$postsArgs<ExtArgs> = {}>(args?: Subset<T, User$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    following<T extends User$followingArgs<ExtArgs> = {}>(args?: Subset<T, User$followingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    followers<T extends User$followersArgs<ExtArgs> = {}>(args?: Subset<T, User$followersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reportsMade<T extends User$reportsMadeArgs<ExtArgs> = {}>(args?: Subset<T, User$reportsMadeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModerationReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reports<T extends User$reportsArgs<ExtArgs> = {}>(args?: Subset<T, User$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModerationReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages<T extends User$messagesArgs<ExtArgs> = {}>(args?: Subset<T, User$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly bio: FieldRef<"User", 'String'>
    readonly cover: FieldRef<"User", 'String'>
    readonly tiktokActive: FieldRef<"User", 'Boolean'>
    readonly tiktokUrl: FieldRef<"User", 'String'>
    readonly instagramActive: FieldRef<"User", 'Boolean'>
    readonly instagramUrl: FieldRef<"User", 'String'>
    readonly youtubeActive: FieldRef<"User", 'Boolean'>
    readonly youtubeUrl: FieldRef<"User", 'String'>
    readonly facebookActive: FieldRef<"User", 'Boolean'>
    readonly facebookUrl: FieldRef<"User", 'String'>
    readonly isLive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.stream
   */
  export type User$streamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    where?: StreamWhereInput
  }

  /**
   * User.wallet
   */
  export type User$walletArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    where?: WalletWhereInput
  }

  /**
   * User.posts
   */
  export type User$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * User.following
   */
  export type User$followingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    where?: FollowWhereInput
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    cursor?: FollowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * User.followers
   */
  export type User$followersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    where?: FollowWhereInput
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    cursor?: FollowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.reportsMade
   */
  export type User$reportsMadeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationReport
     */
    select?: ModerationReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationReport
     */
    omit?: ModerationReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationReportInclude<ExtArgs> | null
    where?: ModerationReportWhereInput
    orderBy?: ModerationReportOrderByWithRelationInput | ModerationReportOrderByWithRelationInput[]
    cursor?: ModerationReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ModerationReportScalarFieldEnum | ModerationReportScalarFieldEnum[]
  }

  /**
   * User.reports
   */
  export type User$reportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationReport
     */
    select?: ModerationReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationReport
     */
    omit?: ModerationReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationReportInclude<ExtArgs> | null
    where?: ModerationReportWhereInput
    orderBy?: ModerationReportOrderByWithRelationInput | ModerationReportOrderByWithRelationInput[]
    cursor?: ModerationReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ModerationReportScalarFieldEnum | ModerationReportScalarFieldEnum[]
  }

  /**
   * User.messages
   */
  export type User$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostMinAggregateOutputType = {
    id: string | null
    title: string | null
    url: string | null
    type: $Enums.PostType | null
    isPrivate: boolean | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostMaxAggregateOutputType = {
    id: string | null
    title: string | null
    url: string | null
    type: $Enums.PostType | null
    isPrivate: boolean | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    title: number
    url: number
    type: number
    isPrivate: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PostMinAggregateInputType = {
    id?: true
    title?: true
    url?: true
    type?: true
    isPrivate?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    title?: true
    url?: true
    type?: true
    isPrivate?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    title?: true
    url?: true
    type?: true
    isPrivate?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Post to aggregate.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: string
    title: string
    url: string
    type: $Enums.PostType
    isPrivate: boolean
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    url?: boolean
    type?: boolean
    isPrivate?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    url?: boolean
    type?: boolean
    isPrivate?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    url?: boolean
    type?: boolean
    isPrivate?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectScalar = {
    id?: boolean
    title?: boolean
    url?: boolean
    type?: boolean
    isPrivate?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "url" | "type" | "isPrivate" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["post"]>
  export type PostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      url: string
      type: $Enums.PostType
      isPrivate: boolean
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>

  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostFindUniqueArgs>(args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostFindFirstArgs>(args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostFindManyArgs>(args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends PostCreateArgs>(args: SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {PostCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Posts and returns the data saved in the database.
     * @param {PostCreateManyAndReturnArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostCreateManyAndReturnArgs>(args?: SelectSubset<T, PostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends PostDeleteArgs>(args: SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostUpdateArgs>(args: SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts and returns the data updated in the database.
     * @param {PostUpdateManyAndReturnArgs} args - Arguments to update many Posts.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostUpdateManyAndReturnArgs>(args: SelectSubset<T, PostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends PostUpsertArgs>(args: SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Post model
   */
  readonly fields: PostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Post model
   */
  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'String'>
    readonly title: FieldRef<"Post", 'String'>
    readonly url: FieldRef<"Post", 'String'>
    readonly type: FieldRef<"Post", 'PostType'>
    readonly isPrivate: FieldRef<"Post", 'Boolean'>
    readonly userId: FieldRef<"Post", 'String'>
    readonly createdAt: FieldRef<"Post", 'DateTime'>
    readonly updatedAt: FieldRef<"Post", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findFirst
   */
  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findMany
   */
  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post create
   */
  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to create a Post.
     */
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }

  /**
   * Post createMany
   */
  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post createManyAndReturn
   */
  export type PostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Post update
   */
  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to update a Post.
     */
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post updateManyAndReturn
   */
  export type PostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Post upsert
   */
  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The filter to search for the Post to update in case it exists.
     */
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     */
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }

  /**
   * Post delete
   */
  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter which Post to delete.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to delete.
     */
    limit?: number
  }

  /**
   * Post without action
   */
  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
  }


  /**
   * Model Wallet
   */

  export type AggregateWallet = {
    _count: WalletCountAggregateOutputType | null
    _avg: WalletAvgAggregateOutputType | null
    _sum: WalletSumAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  export type WalletAvgAggregateOutputType = {
    balance: number | null
  }

  export type WalletSumAggregateOutputType = {
    balance: number | null
  }

  export type WalletMinAggregateOutputType = {
    id: string | null
    userId: string | null
    balance: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WalletMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    balance: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WalletCountAggregateOutputType = {
    id: number
    userId: number
    balance: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WalletAvgAggregateInputType = {
    balance?: true
  }

  export type WalletSumAggregateInputType = {
    balance?: true
  }

  export type WalletMinAggregateInputType = {
    id?: true
    userId?: true
    balance?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WalletMaxAggregateInputType = {
    id?: true
    userId?: true
    balance?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WalletCountAggregateInputType = {
    id?: true
    userId?: true
    balance?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WalletAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallet to aggregate.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Wallets
    **/
    _count?: true | WalletCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WalletAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WalletSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WalletMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WalletMaxAggregateInputType
  }

  export type GetWalletAggregateType<T extends WalletAggregateArgs> = {
        [P in keyof T & keyof AggregateWallet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWallet[P]>
      : GetScalarType<T[P], AggregateWallet[P]>
  }




  export type WalletGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletWhereInput
    orderBy?: WalletOrderByWithAggregationInput | WalletOrderByWithAggregationInput[]
    by: WalletScalarFieldEnum[] | WalletScalarFieldEnum
    having?: WalletScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WalletCountAggregateInputType | true
    _avg?: WalletAvgAggregateInputType
    _sum?: WalletSumAggregateInputType
    _min?: WalletMinAggregateInputType
    _max?: WalletMaxAggregateInputType
  }

  export type WalletGroupByOutputType = {
    id: string
    userId: string
    balance: number
    createdAt: Date
    updatedAt: Date
    _count: WalletCountAggregateOutputType | null
    _avg: WalletAvgAggregateOutputType | null
    _sum: WalletSumAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  type GetWalletGroupByPayload<T extends WalletGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WalletGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WalletGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WalletGroupByOutputType[P]>
            : GetScalarType<T[P], WalletGroupByOutputType[P]>
        }
      >
    >


  export type WalletSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    balance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    transactions?: boolean | Wallet$transactionsArgs<ExtArgs>
    _count?: boolean | WalletCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    balance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    balance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectScalar = {
    id?: boolean
    userId?: boolean
    balance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WalletOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "balance" | "createdAt" | "updatedAt", ExtArgs["result"]["wallet"]>
  export type WalletInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    transactions?: boolean | Wallet$transactionsArgs<ExtArgs>
    _count?: boolean | WalletCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WalletIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WalletIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WalletPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Wallet"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      balance: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["wallet"]>
    composites: {}
  }

  type WalletGetPayload<S extends boolean | null | undefined | WalletDefaultArgs> = $Result.GetResult<Prisma.$WalletPayload, S>

  type WalletCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WalletFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WalletCountAggregateInputType | true
    }

  export interface WalletDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Wallet'], meta: { name: 'Wallet' } }
    /**
     * Find zero or one Wallet that matches the filter.
     * @param {WalletFindUniqueArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WalletFindUniqueArgs>(args: SelectSubset<T, WalletFindUniqueArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Wallet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WalletFindUniqueOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WalletFindUniqueOrThrowArgs>(args: SelectSubset<T, WalletFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WalletFindFirstArgs>(args?: SelectSubset<T, WalletFindFirstArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WalletFindFirstOrThrowArgs>(args?: SelectSubset<T, WalletFindFirstOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Wallets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wallets
     * const wallets = await prisma.wallet.findMany()
     * 
     * // Get first 10 Wallets
     * const wallets = await prisma.wallet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const walletWithIdOnly = await prisma.wallet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WalletFindManyArgs>(args?: SelectSubset<T, WalletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Wallet.
     * @param {WalletCreateArgs} args - Arguments to create a Wallet.
     * @example
     * // Create one Wallet
     * const Wallet = await prisma.wallet.create({
     *   data: {
     *     // ... data to create a Wallet
     *   }
     * })
     * 
     */
    create<T extends WalletCreateArgs>(args: SelectSubset<T, WalletCreateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Wallets.
     * @param {WalletCreateManyArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WalletCreateManyArgs>(args?: SelectSubset<T, WalletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Wallets and returns the data saved in the database.
     * @param {WalletCreateManyAndReturnArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Wallets and only return the `id`
     * const walletWithIdOnly = await prisma.wallet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WalletCreateManyAndReturnArgs>(args?: SelectSubset<T, WalletCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Wallet.
     * @param {WalletDeleteArgs} args - Arguments to delete one Wallet.
     * @example
     * // Delete one Wallet
     * const Wallet = await prisma.wallet.delete({
     *   where: {
     *     // ... filter to delete one Wallet
     *   }
     * })
     * 
     */
    delete<T extends WalletDeleteArgs>(args: SelectSubset<T, WalletDeleteArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Wallet.
     * @param {WalletUpdateArgs} args - Arguments to update one Wallet.
     * @example
     * // Update one Wallet
     * const wallet = await prisma.wallet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WalletUpdateArgs>(args: SelectSubset<T, WalletUpdateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Wallets.
     * @param {WalletDeleteManyArgs} args - Arguments to filter Wallets to delete.
     * @example
     * // Delete a few Wallets
     * const { count } = await prisma.wallet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WalletDeleteManyArgs>(args?: SelectSubset<T, WalletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WalletUpdateManyArgs>(args: SelectSubset<T, WalletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets and returns the data updated in the database.
     * @param {WalletUpdateManyAndReturnArgs} args - Arguments to update many Wallets.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Wallets and only return the `id`
     * const walletWithIdOnly = await prisma.wallet.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WalletUpdateManyAndReturnArgs>(args: SelectSubset<T, WalletUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Wallet.
     * @param {WalletUpsertArgs} args - Arguments to update or create a Wallet.
     * @example
     * // Update or create a Wallet
     * const wallet = await prisma.wallet.upsert({
     *   create: {
     *     // ... data to create a Wallet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wallet we want to update
     *   }
     * })
     */
    upsert<T extends WalletUpsertArgs>(args: SelectSubset<T, WalletUpsertArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletCountArgs} args - Arguments to filter Wallets to count.
     * @example
     * // Count the number of Wallets
     * const count = await prisma.wallet.count({
     *   where: {
     *     // ... the filter for the Wallets we want to count
     *   }
     * })
    **/
    count<T extends WalletCountArgs>(
      args?: Subset<T, WalletCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WalletCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WalletAggregateArgs>(args: Subset<T, WalletAggregateArgs>): Prisma.PrismaPromise<GetWalletAggregateType<T>>

    /**
     * Group by Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WalletGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WalletGroupByArgs['orderBy'] }
        : { orderBy?: WalletGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WalletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Wallet model
   */
  readonly fields: WalletFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Wallet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WalletClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transactions<T extends Wallet$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Wallet$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Wallet model
   */
  interface WalletFieldRefs {
    readonly id: FieldRef<"Wallet", 'String'>
    readonly userId: FieldRef<"Wallet", 'String'>
    readonly balance: FieldRef<"Wallet", 'Int'>
    readonly createdAt: FieldRef<"Wallet", 'DateTime'>
    readonly updatedAt: FieldRef<"Wallet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Wallet findUnique
   */
  export type WalletFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findUniqueOrThrow
   */
  export type WalletFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findFirst
   */
  export type WalletFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findFirstOrThrow
   */
  export type WalletFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findMany
   */
  export type WalletFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallets to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet create
   */
  export type WalletCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to create a Wallet.
     */
    data: XOR<WalletCreateInput, WalletUncheckedCreateInput>
  }

  /**
   * Wallet createMany
   */
  export type WalletCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Wallet createManyAndReturn
   */
  export type WalletCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Wallet update
   */
  export type WalletUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to update a Wallet.
     */
    data: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
    /**
     * Choose, which Wallet to update.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet updateMany
   */
  export type WalletUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
  }

  /**
   * Wallet updateManyAndReturn
   */
  export type WalletUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Wallet upsert
   */
  export type WalletUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The filter to search for the Wallet to update in case it exists.
     */
    where: WalletWhereUniqueInput
    /**
     * In case the Wallet found by the `where` argument doesn't exist, create a new Wallet with this data.
     */
    create: XOR<WalletCreateInput, WalletUncheckedCreateInput>
    /**
     * In case the Wallet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
  }

  /**
   * Wallet delete
   */
  export type WalletDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter which Wallet to delete.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet deleteMany
   */
  export type WalletDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallets to delete
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to delete.
     */
    limit?: number
  }

  /**
   * Wallet.transactions
   */
  export type Wallet$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Wallet without action
   */
  export type WalletDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount: number | null
  }

  export type TransactionSumAggregateOutputType = {
    amount: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    amount: number | null
    type: $Enums.TransactionType | null
    walletId: string | null
    giftId: string | null
    referenceId: string | null
    createdAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    amount: number | null
    type: $Enums.TransactionType | null
    walletId: string | null
    giftId: string | null
    referenceId: string | null
    createdAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    amount: number
    type: number
    walletId: number
    giftId: number
    referenceId: number
    createdAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount?: true
  }

  export type TransactionSumAggregateInputType = {
    amount?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    amount?: true
    type?: true
    walletId?: true
    giftId?: true
    referenceId?: true
    createdAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    amount?: true
    type?: true
    walletId?: true
    giftId?: true
    referenceId?: true
    createdAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    amount?: true
    type?: true
    walletId?: true
    giftId?: true
    referenceId?: true
    createdAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    amount: number
    type: $Enums.TransactionType
    walletId: string
    giftId: string | null
    referenceId: string | null
    createdAt: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    type?: boolean
    walletId?: boolean
    giftId?: boolean
    referenceId?: boolean
    createdAt?: boolean
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
    gift?: boolean | Transaction$giftArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    type?: boolean
    walletId?: boolean
    giftId?: boolean
    referenceId?: boolean
    createdAt?: boolean
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
    gift?: boolean | Transaction$giftArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    type?: boolean
    walletId?: boolean
    giftId?: boolean
    referenceId?: boolean
    createdAt?: boolean
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
    gift?: boolean | Transaction$giftArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    amount?: boolean
    type?: boolean
    walletId?: boolean
    giftId?: boolean
    referenceId?: boolean
    createdAt?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amount" | "type" | "walletId" | "giftId" | "referenceId" | "createdAt", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
    gift?: boolean | Transaction$giftArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
    gift?: boolean | Transaction$giftArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
    gift?: boolean | Transaction$giftArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      wallet: Prisma.$WalletPayload<ExtArgs>
      gift: Prisma.$GiftPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      amount: number
      type: $Enums.TransactionType
      walletId: string
      giftId: string | null
      referenceId: string | null
      createdAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    wallet<T extends WalletDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WalletDefaultArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    gift<T extends Transaction$giftArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$giftArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly amount: FieldRef<"Transaction", 'Int'>
    readonly type: FieldRef<"Transaction", 'TransactionType'>
    readonly walletId: FieldRef<"Transaction", 'String'>
    readonly giftId: FieldRef<"Transaction", 'String'>
    readonly referenceId: FieldRef<"Transaction", 'String'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction.gift
   */
  export type Transaction$giftArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    where?: GiftWhereInput
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Model Gift
   */

  export type AggregateGift = {
    _count: GiftCountAggregateOutputType | null
    _avg: GiftAvgAggregateOutputType | null
    _sum: GiftSumAggregateOutputType | null
    _min: GiftMinAggregateOutputType | null
    _max: GiftMaxAggregateOutputType | null
  }

  export type GiftAvgAggregateOutputType = {
    price: number | null
  }

  export type GiftSumAggregateOutputType = {
    price: number | null
  }

  export type GiftMinAggregateOutputType = {
    id: string | null
    name: string | null
    price: number | null
    icon: string | null
    animationUrl: string | null
  }

  export type GiftMaxAggregateOutputType = {
    id: string | null
    name: string | null
    price: number | null
    icon: string | null
    animationUrl: string | null
  }

  export type GiftCountAggregateOutputType = {
    id: number
    name: number
    price: number
    icon: number
    animationUrl: number
    _all: number
  }


  export type GiftAvgAggregateInputType = {
    price?: true
  }

  export type GiftSumAggregateInputType = {
    price?: true
  }

  export type GiftMinAggregateInputType = {
    id?: true
    name?: true
    price?: true
    icon?: true
    animationUrl?: true
  }

  export type GiftMaxAggregateInputType = {
    id?: true
    name?: true
    price?: true
    icon?: true
    animationUrl?: true
  }

  export type GiftCountAggregateInputType = {
    id?: true
    name?: true
    price?: true
    icon?: true
    animationUrl?: true
    _all?: true
  }

  export type GiftAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Gift to aggregate.
     */
    where?: GiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gifts to fetch.
     */
    orderBy?: GiftOrderByWithRelationInput | GiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Gifts
    **/
    _count?: true | GiftCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GiftAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GiftSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GiftMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GiftMaxAggregateInputType
  }

  export type GetGiftAggregateType<T extends GiftAggregateArgs> = {
        [P in keyof T & keyof AggregateGift]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGift[P]>
      : GetScalarType<T[P], AggregateGift[P]>
  }




  export type GiftGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GiftWhereInput
    orderBy?: GiftOrderByWithAggregationInput | GiftOrderByWithAggregationInput[]
    by: GiftScalarFieldEnum[] | GiftScalarFieldEnum
    having?: GiftScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GiftCountAggregateInputType | true
    _avg?: GiftAvgAggregateInputType
    _sum?: GiftSumAggregateInputType
    _min?: GiftMinAggregateInputType
    _max?: GiftMaxAggregateInputType
  }

  export type GiftGroupByOutputType = {
    id: string
    name: string
    price: number
    icon: string
    animationUrl: string | null
    _count: GiftCountAggregateOutputType | null
    _avg: GiftAvgAggregateOutputType | null
    _sum: GiftSumAggregateOutputType | null
    _min: GiftMinAggregateOutputType | null
    _max: GiftMaxAggregateOutputType | null
  }

  type GetGiftGroupByPayload<T extends GiftGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GiftGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GiftGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GiftGroupByOutputType[P]>
            : GetScalarType<T[P], GiftGroupByOutputType[P]>
        }
      >
    >


  export type GiftSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    icon?: boolean
    animationUrl?: boolean
    transactions?: boolean | Gift$transactionsArgs<ExtArgs>
    _count?: boolean | GiftCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gift"]>

  export type GiftSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    icon?: boolean
    animationUrl?: boolean
  }, ExtArgs["result"]["gift"]>

  export type GiftSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    icon?: boolean
    animationUrl?: boolean
  }, ExtArgs["result"]["gift"]>

  export type GiftSelectScalar = {
    id?: boolean
    name?: boolean
    price?: boolean
    icon?: boolean
    animationUrl?: boolean
  }

  export type GiftOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "price" | "icon" | "animationUrl", ExtArgs["result"]["gift"]>
  export type GiftInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | Gift$transactionsArgs<ExtArgs>
    _count?: boolean | GiftCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GiftIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GiftIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GiftPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Gift"
    objects: {
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      price: number
      icon: string
      animationUrl: string | null
    }, ExtArgs["result"]["gift"]>
    composites: {}
  }

  type GiftGetPayload<S extends boolean | null | undefined | GiftDefaultArgs> = $Result.GetResult<Prisma.$GiftPayload, S>

  type GiftCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GiftFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GiftCountAggregateInputType | true
    }

  export interface GiftDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Gift'], meta: { name: 'Gift' } }
    /**
     * Find zero or one Gift that matches the filter.
     * @param {GiftFindUniqueArgs} args - Arguments to find a Gift
     * @example
     * // Get one Gift
     * const gift = await prisma.gift.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GiftFindUniqueArgs>(args: SelectSubset<T, GiftFindUniqueArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Gift that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GiftFindUniqueOrThrowArgs} args - Arguments to find a Gift
     * @example
     * // Get one Gift
     * const gift = await prisma.gift.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GiftFindUniqueOrThrowArgs>(args: SelectSubset<T, GiftFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Gift that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftFindFirstArgs} args - Arguments to find a Gift
     * @example
     * // Get one Gift
     * const gift = await prisma.gift.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GiftFindFirstArgs>(args?: SelectSubset<T, GiftFindFirstArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Gift that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftFindFirstOrThrowArgs} args - Arguments to find a Gift
     * @example
     * // Get one Gift
     * const gift = await prisma.gift.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GiftFindFirstOrThrowArgs>(args?: SelectSubset<T, GiftFindFirstOrThrowArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Gifts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Gifts
     * const gifts = await prisma.gift.findMany()
     * 
     * // Get first 10 Gifts
     * const gifts = await prisma.gift.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const giftWithIdOnly = await prisma.gift.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GiftFindManyArgs>(args?: SelectSubset<T, GiftFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Gift.
     * @param {GiftCreateArgs} args - Arguments to create a Gift.
     * @example
     * // Create one Gift
     * const Gift = await prisma.gift.create({
     *   data: {
     *     // ... data to create a Gift
     *   }
     * })
     * 
     */
    create<T extends GiftCreateArgs>(args: SelectSubset<T, GiftCreateArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Gifts.
     * @param {GiftCreateManyArgs} args - Arguments to create many Gifts.
     * @example
     * // Create many Gifts
     * const gift = await prisma.gift.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GiftCreateManyArgs>(args?: SelectSubset<T, GiftCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Gifts and returns the data saved in the database.
     * @param {GiftCreateManyAndReturnArgs} args - Arguments to create many Gifts.
     * @example
     * // Create many Gifts
     * const gift = await prisma.gift.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Gifts and only return the `id`
     * const giftWithIdOnly = await prisma.gift.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GiftCreateManyAndReturnArgs>(args?: SelectSubset<T, GiftCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Gift.
     * @param {GiftDeleteArgs} args - Arguments to delete one Gift.
     * @example
     * // Delete one Gift
     * const Gift = await prisma.gift.delete({
     *   where: {
     *     // ... filter to delete one Gift
     *   }
     * })
     * 
     */
    delete<T extends GiftDeleteArgs>(args: SelectSubset<T, GiftDeleteArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Gift.
     * @param {GiftUpdateArgs} args - Arguments to update one Gift.
     * @example
     * // Update one Gift
     * const gift = await prisma.gift.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GiftUpdateArgs>(args: SelectSubset<T, GiftUpdateArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Gifts.
     * @param {GiftDeleteManyArgs} args - Arguments to filter Gifts to delete.
     * @example
     * // Delete a few Gifts
     * const { count } = await prisma.gift.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GiftDeleteManyArgs>(args?: SelectSubset<T, GiftDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Gifts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Gifts
     * const gift = await prisma.gift.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GiftUpdateManyArgs>(args: SelectSubset<T, GiftUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Gifts and returns the data updated in the database.
     * @param {GiftUpdateManyAndReturnArgs} args - Arguments to update many Gifts.
     * @example
     * // Update many Gifts
     * const gift = await prisma.gift.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Gifts and only return the `id`
     * const giftWithIdOnly = await prisma.gift.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GiftUpdateManyAndReturnArgs>(args: SelectSubset<T, GiftUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Gift.
     * @param {GiftUpsertArgs} args - Arguments to update or create a Gift.
     * @example
     * // Update or create a Gift
     * const gift = await prisma.gift.upsert({
     *   create: {
     *     // ... data to create a Gift
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Gift we want to update
     *   }
     * })
     */
    upsert<T extends GiftUpsertArgs>(args: SelectSubset<T, GiftUpsertArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Gifts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftCountArgs} args - Arguments to filter Gifts to count.
     * @example
     * // Count the number of Gifts
     * const count = await prisma.gift.count({
     *   where: {
     *     // ... the filter for the Gifts we want to count
     *   }
     * })
    **/
    count<T extends GiftCountArgs>(
      args?: Subset<T, GiftCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GiftCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Gift.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GiftAggregateArgs>(args: Subset<T, GiftAggregateArgs>): Prisma.PrismaPromise<GetGiftAggregateType<T>>

    /**
     * Group by Gift.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GiftGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GiftGroupByArgs['orderBy'] }
        : { orderBy?: GiftGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GiftGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGiftGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Gift model
   */
  readonly fields: GiftFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Gift.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GiftClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transactions<T extends Gift$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Gift$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Gift model
   */
  interface GiftFieldRefs {
    readonly id: FieldRef<"Gift", 'String'>
    readonly name: FieldRef<"Gift", 'String'>
    readonly price: FieldRef<"Gift", 'Int'>
    readonly icon: FieldRef<"Gift", 'String'>
    readonly animationUrl: FieldRef<"Gift", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Gift findUnique
   */
  export type GiftFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * Filter, which Gift to fetch.
     */
    where: GiftWhereUniqueInput
  }

  /**
   * Gift findUniqueOrThrow
   */
  export type GiftFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * Filter, which Gift to fetch.
     */
    where: GiftWhereUniqueInput
  }

  /**
   * Gift findFirst
   */
  export type GiftFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * Filter, which Gift to fetch.
     */
    where?: GiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gifts to fetch.
     */
    orderBy?: GiftOrderByWithRelationInput | GiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Gifts.
     */
    cursor?: GiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Gifts.
     */
    distinct?: GiftScalarFieldEnum | GiftScalarFieldEnum[]
  }

  /**
   * Gift findFirstOrThrow
   */
  export type GiftFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * Filter, which Gift to fetch.
     */
    where?: GiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gifts to fetch.
     */
    orderBy?: GiftOrderByWithRelationInput | GiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Gifts.
     */
    cursor?: GiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Gifts.
     */
    distinct?: GiftScalarFieldEnum | GiftScalarFieldEnum[]
  }

  /**
   * Gift findMany
   */
  export type GiftFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * Filter, which Gifts to fetch.
     */
    where?: GiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gifts to fetch.
     */
    orderBy?: GiftOrderByWithRelationInput | GiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Gifts.
     */
    cursor?: GiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gifts.
     */
    skip?: number
    distinct?: GiftScalarFieldEnum | GiftScalarFieldEnum[]
  }

  /**
   * Gift create
   */
  export type GiftCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * The data needed to create a Gift.
     */
    data: XOR<GiftCreateInput, GiftUncheckedCreateInput>
  }

  /**
   * Gift createMany
   */
  export type GiftCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Gifts.
     */
    data: GiftCreateManyInput | GiftCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Gift createManyAndReturn
   */
  export type GiftCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * The data used to create many Gifts.
     */
    data: GiftCreateManyInput | GiftCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Gift update
   */
  export type GiftUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * The data needed to update a Gift.
     */
    data: XOR<GiftUpdateInput, GiftUncheckedUpdateInput>
    /**
     * Choose, which Gift to update.
     */
    where: GiftWhereUniqueInput
  }

  /**
   * Gift updateMany
   */
  export type GiftUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Gifts.
     */
    data: XOR<GiftUpdateManyMutationInput, GiftUncheckedUpdateManyInput>
    /**
     * Filter which Gifts to update
     */
    where?: GiftWhereInput
    /**
     * Limit how many Gifts to update.
     */
    limit?: number
  }

  /**
   * Gift updateManyAndReturn
   */
  export type GiftUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * The data used to update Gifts.
     */
    data: XOR<GiftUpdateManyMutationInput, GiftUncheckedUpdateManyInput>
    /**
     * Filter which Gifts to update
     */
    where?: GiftWhereInput
    /**
     * Limit how many Gifts to update.
     */
    limit?: number
  }

  /**
   * Gift upsert
   */
  export type GiftUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * The filter to search for the Gift to update in case it exists.
     */
    where: GiftWhereUniqueInput
    /**
     * In case the Gift found by the `where` argument doesn't exist, create a new Gift with this data.
     */
    create: XOR<GiftCreateInput, GiftUncheckedCreateInput>
    /**
     * In case the Gift was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GiftUpdateInput, GiftUncheckedUpdateInput>
  }

  /**
   * Gift delete
   */
  export type GiftDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * Filter which Gift to delete.
     */
    where: GiftWhereUniqueInput
  }

  /**
   * Gift deleteMany
   */
  export type GiftDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Gifts to delete
     */
    where?: GiftWhereInput
    /**
     * Limit how many Gifts to delete.
     */
    limit?: number
  }

  /**
   * Gift.transactions
   */
  export type Gift$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Gift without action
   */
  export type GiftDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
  }


  /**
   * Model Stream
   */

  export type AggregateStream = {
    _count: StreamCountAggregateOutputType | null
    _min: StreamMinAggregateOutputType | null
    _max: StreamMaxAggregateOutputType | null
  }

  export type StreamMinAggregateOutputType = {
    id: string | null
    title: string | null
    thumbnail: string | null
    isLive: boolean | null
    category: string | null
    userId: string | null
    startedAt: Date | null
    endedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StreamMaxAggregateOutputType = {
    id: string | null
    title: string | null
    thumbnail: string | null
    isLive: boolean | null
    category: string | null
    userId: string | null
    startedAt: Date | null
    endedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StreamCountAggregateOutputType = {
    id: number
    title: number
    thumbnail: number
    isLive: number
    category: number
    userId: number
    startedAt: number
    endedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StreamMinAggregateInputType = {
    id?: true
    title?: true
    thumbnail?: true
    isLive?: true
    category?: true
    userId?: true
    startedAt?: true
    endedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StreamMaxAggregateInputType = {
    id?: true
    title?: true
    thumbnail?: true
    isLive?: true
    category?: true
    userId?: true
    startedAt?: true
    endedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StreamCountAggregateInputType = {
    id?: true
    title?: true
    thumbnail?: true
    isLive?: true
    category?: true
    userId?: true
    startedAt?: true
    endedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StreamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stream to aggregate.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Streams
    **/
    _count?: true | StreamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StreamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StreamMaxAggregateInputType
  }

  export type GetStreamAggregateType<T extends StreamAggregateArgs> = {
        [P in keyof T & keyof AggregateStream]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStream[P]>
      : GetScalarType<T[P], AggregateStream[P]>
  }




  export type StreamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StreamWhereInput
    orderBy?: StreamOrderByWithAggregationInput | StreamOrderByWithAggregationInput[]
    by: StreamScalarFieldEnum[] | StreamScalarFieldEnum
    having?: StreamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StreamCountAggregateInputType | true
    _min?: StreamMinAggregateInputType
    _max?: StreamMaxAggregateInputType
  }

  export type StreamGroupByOutputType = {
    id: string
    title: string
    thumbnail: string | null
    isLive: boolean
    category: string | null
    userId: string
    startedAt: Date | null
    endedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: StreamCountAggregateOutputType | null
    _min: StreamMinAggregateOutputType | null
    _max: StreamMaxAggregateOutputType | null
  }

  type GetStreamGroupByPayload<T extends StreamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StreamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StreamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StreamGroupByOutputType[P]>
            : GetScalarType<T[P], StreamGroupByOutputType[P]>
        }
      >
    >


  export type StreamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    thumbnail?: boolean
    isLive?: boolean
    category?: boolean
    userId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    messages?: boolean | Stream$messagesArgs<ExtArgs>
    liveRoom?: boolean | Stream$liveRoomArgs<ExtArgs>
    battles1?: boolean | Stream$battles1Args<ExtArgs>
    battles2?: boolean | Stream$battles2Args<ExtArgs>
    reports?: boolean | Stream$reportsArgs<ExtArgs>
    _count?: boolean | StreamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stream"]>

  export type StreamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    thumbnail?: boolean
    isLive?: boolean
    category?: boolean
    userId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stream"]>

  export type StreamSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    thumbnail?: boolean
    isLive?: boolean
    category?: boolean
    userId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stream"]>

  export type StreamSelectScalar = {
    id?: boolean
    title?: boolean
    thumbnail?: boolean
    isLive?: boolean
    category?: boolean
    userId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StreamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "thumbnail" | "isLive" | "category" | "userId" | "startedAt" | "endedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["stream"]>
  export type StreamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    messages?: boolean | Stream$messagesArgs<ExtArgs>
    liveRoom?: boolean | Stream$liveRoomArgs<ExtArgs>
    battles1?: boolean | Stream$battles1Args<ExtArgs>
    battles2?: boolean | Stream$battles2Args<ExtArgs>
    reports?: boolean | Stream$reportsArgs<ExtArgs>
    _count?: boolean | StreamCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StreamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type StreamIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $StreamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Stream"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      messages: Prisma.$MessagePayload<ExtArgs>[]
      liveRoom: Prisma.$LiveRoomPayload<ExtArgs> | null
      battles1: Prisma.$StreamBattlePayload<ExtArgs>[]
      battles2: Prisma.$StreamBattlePayload<ExtArgs>[]
      reports: Prisma.$ModerationReportPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      thumbnail: string | null
      isLive: boolean
      category: string | null
      userId: string
      startedAt: Date | null
      endedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["stream"]>
    composites: {}
  }

  type StreamGetPayload<S extends boolean | null | undefined | StreamDefaultArgs> = $Result.GetResult<Prisma.$StreamPayload, S>

  type StreamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StreamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StreamCountAggregateInputType | true
    }

  export interface StreamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Stream'], meta: { name: 'Stream' } }
    /**
     * Find zero or one Stream that matches the filter.
     * @param {StreamFindUniqueArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StreamFindUniqueArgs>(args: SelectSubset<T, StreamFindUniqueArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Stream that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StreamFindUniqueOrThrowArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StreamFindUniqueOrThrowArgs>(args: SelectSubset<T, StreamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stream that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamFindFirstArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StreamFindFirstArgs>(args?: SelectSubset<T, StreamFindFirstArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stream that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamFindFirstOrThrowArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StreamFindFirstOrThrowArgs>(args?: SelectSubset<T, StreamFindFirstOrThrowArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Streams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Streams
     * const streams = await prisma.stream.findMany()
     * 
     * // Get first 10 Streams
     * const streams = await prisma.stream.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const streamWithIdOnly = await prisma.stream.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StreamFindManyArgs>(args?: SelectSubset<T, StreamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Stream.
     * @param {StreamCreateArgs} args - Arguments to create a Stream.
     * @example
     * // Create one Stream
     * const Stream = await prisma.stream.create({
     *   data: {
     *     // ... data to create a Stream
     *   }
     * })
     * 
     */
    create<T extends StreamCreateArgs>(args: SelectSubset<T, StreamCreateArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Streams.
     * @param {StreamCreateManyArgs} args - Arguments to create many Streams.
     * @example
     * // Create many Streams
     * const stream = await prisma.stream.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StreamCreateManyArgs>(args?: SelectSubset<T, StreamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Streams and returns the data saved in the database.
     * @param {StreamCreateManyAndReturnArgs} args - Arguments to create many Streams.
     * @example
     * // Create many Streams
     * const stream = await prisma.stream.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Streams and only return the `id`
     * const streamWithIdOnly = await prisma.stream.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StreamCreateManyAndReturnArgs>(args?: SelectSubset<T, StreamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Stream.
     * @param {StreamDeleteArgs} args - Arguments to delete one Stream.
     * @example
     * // Delete one Stream
     * const Stream = await prisma.stream.delete({
     *   where: {
     *     // ... filter to delete one Stream
     *   }
     * })
     * 
     */
    delete<T extends StreamDeleteArgs>(args: SelectSubset<T, StreamDeleteArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Stream.
     * @param {StreamUpdateArgs} args - Arguments to update one Stream.
     * @example
     * // Update one Stream
     * const stream = await prisma.stream.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StreamUpdateArgs>(args: SelectSubset<T, StreamUpdateArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Streams.
     * @param {StreamDeleteManyArgs} args - Arguments to filter Streams to delete.
     * @example
     * // Delete a few Streams
     * const { count } = await prisma.stream.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StreamDeleteManyArgs>(args?: SelectSubset<T, StreamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Streams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Streams
     * const stream = await prisma.stream.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StreamUpdateManyArgs>(args: SelectSubset<T, StreamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Streams and returns the data updated in the database.
     * @param {StreamUpdateManyAndReturnArgs} args - Arguments to update many Streams.
     * @example
     * // Update many Streams
     * const stream = await prisma.stream.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Streams and only return the `id`
     * const streamWithIdOnly = await prisma.stream.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StreamUpdateManyAndReturnArgs>(args: SelectSubset<T, StreamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Stream.
     * @param {StreamUpsertArgs} args - Arguments to update or create a Stream.
     * @example
     * // Update or create a Stream
     * const stream = await prisma.stream.upsert({
     *   create: {
     *     // ... data to create a Stream
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stream we want to update
     *   }
     * })
     */
    upsert<T extends StreamUpsertArgs>(args: SelectSubset<T, StreamUpsertArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Streams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamCountArgs} args - Arguments to filter Streams to count.
     * @example
     * // Count the number of Streams
     * const count = await prisma.stream.count({
     *   where: {
     *     // ... the filter for the Streams we want to count
     *   }
     * })
    **/
    count<T extends StreamCountArgs>(
      args?: Subset<T, StreamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StreamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Stream.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StreamAggregateArgs>(args: Subset<T, StreamAggregateArgs>): Prisma.PrismaPromise<GetStreamAggregateType<T>>

    /**
     * Group by Stream.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StreamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StreamGroupByArgs['orderBy'] }
        : { orderBy?: StreamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StreamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStreamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Stream model
   */
  readonly fields: StreamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Stream.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StreamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    messages<T extends Stream$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Stream$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    liveRoom<T extends Stream$liveRoomArgs<ExtArgs> = {}>(args?: Subset<T, Stream$liveRoomArgs<ExtArgs>>): Prisma__LiveRoomClient<$Result.GetResult<Prisma.$LiveRoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    battles1<T extends Stream$battles1Args<ExtArgs> = {}>(args?: Subset<T, Stream$battles1Args<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamBattlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    battles2<T extends Stream$battles2Args<ExtArgs> = {}>(args?: Subset<T, Stream$battles2Args<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamBattlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reports<T extends Stream$reportsArgs<ExtArgs> = {}>(args?: Subset<T, Stream$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModerationReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Stream model
   */
  interface StreamFieldRefs {
    readonly id: FieldRef<"Stream", 'String'>
    readonly title: FieldRef<"Stream", 'String'>
    readonly thumbnail: FieldRef<"Stream", 'String'>
    readonly isLive: FieldRef<"Stream", 'Boolean'>
    readonly category: FieldRef<"Stream", 'String'>
    readonly userId: FieldRef<"Stream", 'String'>
    readonly startedAt: FieldRef<"Stream", 'DateTime'>
    readonly endedAt: FieldRef<"Stream", 'DateTime'>
    readonly createdAt: FieldRef<"Stream", 'DateTime'>
    readonly updatedAt: FieldRef<"Stream", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Stream findUnique
   */
  export type StreamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream findUniqueOrThrow
   */
  export type StreamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream findFirst
   */
  export type StreamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Streams.
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Streams.
     */
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[]
  }

  /**
   * Stream findFirstOrThrow
   */
  export type StreamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Streams.
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Streams.
     */
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[]
  }

  /**
   * Stream findMany
   */
  export type StreamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Streams to fetch.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Streams.
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[]
  }

  /**
   * Stream create
   */
  export type StreamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * The data needed to create a Stream.
     */
    data: XOR<StreamCreateInput, StreamUncheckedCreateInput>
  }

  /**
   * Stream createMany
   */
  export type StreamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Streams.
     */
    data: StreamCreateManyInput | StreamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Stream createManyAndReturn
   */
  export type StreamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * The data used to create many Streams.
     */
    data: StreamCreateManyInput | StreamCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Stream update
   */
  export type StreamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * The data needed to update a Stream.
     */
    data: XOR<StreamUpdateInput, StreamUncheckedUpdateInput>
    /**
     * Choose, which Stream to update.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream updateMany
   */
  export type StreamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Streams.
     */
    data: XOR<StreamUpdateManyMutationInput, StreamUncheckedUpdateManyInput>
    /**
     * Filter which Streams to update
     */
    where?: StreamWhereInput
    /**
     * Limit how many Streams to update.
     */
    limit?: number
  }

  /**
   * Stream updateManyAndReturn
   */
  export type StreamUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * The data used to update Streams.
     */
    data: XOR<StreamUpdateManyMutationInput, StreamUncheckedUpdateManyInput>
    /**
     * Filter which Streams to update
     */
    where?: StreamWhereInput
    /**
     * Limit how many Streams to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Stream upsert
   */
  export type StreamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * The filter to search for the Stream to update in case it exists.
     */
    where: StreamWhereUniqueInput
    /**
     * In case the Stream found by the `where` argument doesn't exist, create a new Stream with this data.
     */
    create: XOR<StreamCreateInput, StreamUncheckedCreateInput>
    /**
     * In case the Stream was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StreamUpdateInput, StreamUncheckedUpdateInput>
  }

  /**
   * Stream delete
   */
  export type StreamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter which Stream to delete.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream deleteMany
   */
  export type StreamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Streams to delete
     */
    where?: StreamWhereInput
    /**
     * Limit how many Streams to delete.
     */
    limit?: number
  }

  /**
   * Stream.messages
   */
  export type Stream$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Stream.liveRoom
   */
  export type Stream$liveRoomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRoom
     */
    select?: LiveRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRoom
     */
    omit?: LiveRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRoomInclude<ExtArgs> | null
    where?: LiveRoomWhereInput
  }

  /**
   * Stream.battles1
   */
  export type Stream$battles1Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamBattle
     */
    select?: StreamBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamBattle
     */
    omit?: StreamBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamBattleInclude<ExtArgs> | null
    where?: StreamBattleWhereInput
    orderBy?: StreamBattleOrderByWithRelationInput | StreamBattleOrderByWithRelationInput[]
    cursor?: StreamBattleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StreamBattleScalarFieldEnum | StreamBattleScalarFieldEnum[]
  }

  /**
   * Stream.battles2
   */
  export type Stream$battles2Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamBattle
     */
    select?: StreamBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamBattle
     */
    omit?: StreamBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamBattleInclude<ExtArgs> | null
    where?: StreamBattleWhereInput
    orderBy?: StreamBattleOrderByWithRelationInput | StreamBattleOrderByWithRelationInput[]
    cursor?: StreamBattleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StreamBattleScalarFieldEnum | StreamBattleScalarFieldEnum[]
  }

  /**
   * Stream.reports
   */
  export type Stream$reportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationReport
     */
    select?: ModerationReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationReport
     */
    omit?: ModerationReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationReportInclude<ExtArgs> | null
    where?: ModerationReportWhereInput
    orderBy?: ModerationReportOrderByWithRelationInput | ModerationReportOrderByWithRelationInput[]
    cursor?: ModerationReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ModerationReportScalarFieldEnum | ModerationReportScalarFieldEnum[]
  }

  /**
   * Stream without action
   */
  export type StreamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
  }


  /**
   * Model LiveRoom
   */

  export type AggregateLiveRoom = {
    _count: LiveRoomCountAggregateOutputType | null
    _avg: LiveRoomAvgAggregateOutputType | null
    _sum: LiveRoomSumAggregateOutputType | null
    _min: LiveRoomMinAggregateOutputType | null
    _max: LiveRoomMaxAggregateOutputType | null
  }

  export type LiveRoomAvgAggregateOutputType = {
    activeViewers: number | null
    totalViews: number | null
    likes: number | null
  }

  export type LiveRoomSumAggregateOutputType = {
    activeViewers: number | null
    totalViews: number | null
    likes: number | null
  }

  export type LiveRoomMinAggregateOutputType = {
    id: string | null
    streamId: string | null
    activeViewers: number | null
    totalViews: number | null
    likes: number | null
  }

  export type LiveRoomMaxAggregateOutputType = {
    id: string | null
    streamId: string | null
    activeViewers: number | null
    totalViews: number | null
    likes: number | null
  }

  export type LiveRoomCountAggregateOutputType = {
    id: number
    streamId: number
    activeViewers: number
    totalViews: number
    likes: number
    _all: number
  }


  export type LiveRoomAvgAggregateInputType = {
    activeViewers?: true
    totalViews?: true
    likes?: true
  }

  export type LiveRoomSumAggregateInputType = {
    activeViewers?: true
    totalViews?: true
    likes?: true
  }

  export type LiveRoomMinAggregateInputType = {
    id?: true
    streamId?: true
    activeViewers?: true
    totalViews?: true
    likes?: true
  }

  export type LiveRoomMaxAggregateInputType = {
    id?: true
    streamId?: true
    activeViewers?: true
    totalViews?: true
    likes?: true
  }

  export type LiveRoomCountAggregateInputType = {
    id?: true
    streamId?: true
    activeViewers?: true
    totalViews?: true
    likes?: true
    _all?: true
  }

  export type LiveRoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LiveRoom to aggregate.
     */
    where?: LiveRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiveRooms to fetch.
     */
    orderBy?: LiveRoomOrderByWithRelationInput | LiveRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LiveRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiveRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiveRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LiveRooms
    **/
    _count?: true | LiveRoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LiveRoomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LiveRoomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LiveRoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LiveRoomMaxAggregateInputType
  }

  export type GetLiveRoomAggregateType<T extends LiveRoomAggregateArgs> = {
        [P in keyof T & keyof AggregateLiveRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLiveRoom[P]>
      : GetScalarType<T[P], AggregateLiveRoom[P]>
  }




  export type LiveRoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LiveRoomWhereInput
    orderBy?: LiveRoomOrderByWithAggregationInput | LiveRoomOrderByWithAggregationInput[]
    by: LiveRoomScalarFieldEnum[] | LiveRoomScalarFieldEnum
    having?: LiveRoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LiveRoomCountAggregateInputType | true
    _avg?: LiveRoomAvgAggregateInputType
    _sum?: LiveRoomSumAggregateInputType
    _min?: LiveRoomMinAggregateInputType
    _max?: LiveRoomMaxAggregateInputType
  }

  export type LiveRoomGroupByOutputType = {
    id: string
    streamId: string
    activeViewers: number
    totalViews: number
    likes: number
    _count: LiveRoomCountAggregateOutputType | null
    _avg: LiveRoomAvgAggregateOutputType | null
    _sum: LiveRoomSumAggregateOutputType | null
    _min: LiveRoomMinAggregateOutputType | null
    _max: LiveRoomMaxAggregateOutputType | null
  }

  type GetLiveRoomGroupByPayload<T extends LiveRoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LiveRoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LiveRoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LiveRoomGroupByOutputType[P]>
            : GetScalarType<T[P], LiveRoomGroupByOutputType[P]>
        }
      >
    >


  export type LiveRoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    streamId?: boolean
    activeViewers?: boolean
    totalViews?: boolean
    likes?: boolean
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["liveRoom"]>

  export type LiveRoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    streamId?: boolean
    activeViewers?: boolean
    totalViews?: boolean
    likes?: boolean
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["liveRoom"]>

  export type LiveRoomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    streamId?: boolean
    activeViewers?: boolean
    totalViews?: boolean
    likes?: boolean
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["liveRoom"]>

  export type LiveRoomSelectScalar = {
    id?: boolean
    streamId?: boolean
    activeViewers?: boolean
    totalViews?: boolean
    likes?: boolean
  }

  export type LiveRoomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "streamId" | "activeViewers" | "totalViews" | "likes", ExtArgs["result"]["liveRoom"]>
  export type LiveRoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }
  export type LiveRoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }
  export type LiveRoomIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }

  export type $LiveRoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LiveRoom"
    objects: {
      stream: Prisma.$StreamPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      streamId: string
      activeViewers: number
      totalViews: number
      likes: number
    }, ExtArgs["result"]["liveRoom"]>
    composites: {}
  }

  type LiveRoomGetPayload<S extends boolean | null | undefined | LiveRoomDefaultArgs> = $Result.GetResult<Prisma.$LiveRoomPayload, S>

  type LiveRoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LiveRoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LiveRoomCountAggregateInputType | true
    }

  export interface LiveRoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LiveRoom'], meta: { name: 'LiveRoom' } }
    /**
     * Find zero or one LiveRoom that matches the filter.
     * @param {LiveRoomFindUniqueArgs} args - Arguments to find a LiveRoom
     * @example
     * // Get one LiveRoom
     * const liveRoom = await prisma.liveRoom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LiveRoomFindUniqueArgs>(args: SelectSubset<T, LiveRoomFindUniqueArgs<ExtArgs>>): Prisma__LiveRoomClient<$Result.GetResult<Prisma.$LiveRoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LiveRoom that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LiveRoomFindUniqueOrThrowArgs} args - Arguments to find a LiveRoom
     * @example
     * // Get one LiveRoom
     * const liveRoom = await prisma.liveRoom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LiveRoomFindUniqueOrThrowArgs>(args: SelectSubset<T, LiveRoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LiveRoomClient<$Result.GetResult<Prisma.$LiveRoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LiveRoom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveRoomFindFirstArgs} args - Arguments to find a LiveRoom
     * @example
     * // Get one LiveRoom
     * const liveRoom = await prisma.liveRoom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LiveRoomFindFirstArgs>(args?: SelectSubset<T, LiveRoomFindFirstArgs<ExtArgs>>): Prisma__LiveRoomClient<$Result.GetResult<Prisma.$LiveRoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LiveRoom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveRoomFindFirstOrThrowArgs} args - Arguments to find a LiveRoom
     * @example
     * // Get one LiveRoom
     * const liveRoom = await prisma.liveRoom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LiveRoomFindFirstOrThrowArgs>(args?: SelectSubset<T, LiveRoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__LiveRoomClient<$Result.GetResult<Prisma.$LiveRoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LiveRooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveRoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LiveRooms
     * const liveRooms = await prisma.liveRoom.findMany()
     * 
     * // Get first 10 LiveRooms
     * const liveRooms = await prisma.liveRoom.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const liveRoomWithIdOnly = await prisma.liveRoom.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LiveRoomFindManyArgs>(args?: SelectSubset<T, LiveRoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiveRoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LiveRoom.
     * @param {LiveRoomCreateArgs} args - Arguments to create a LiveRoom.
     * @example
     * // Create one LiveRoom
     * const LiveRoom = await prisma.liveRoom.create({
     *   data: {
     *     // ... data to create a LiveRoom
     *   }
     * })
     * 
     */
    create<T extends LiveRoomCreateArgs>(args: SelectSubset<T, LiveRoomCreateArgs<ExtArgs>>): Prisma__LiveRoomClient<$Result.GetResult<Prisma.$LiveRoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LiveRooms.
     * @param {LiveRoomCreateManyArgs} args - Arguments to create many LiveRooms.
     * @example
     * // Create many LiveRooms
     * const liveRoom = await prisma.liveRoom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LiveRoomCreateManyArgs>(args?: SelectSubset<T, LiveRoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LiveRooms and returns the data saved in the database.
     * @param {LiveRoomCreateManyAndReturnArgs} args - Arguments to create many LiveRooms.
     * @example
     * // Create many LiveRooms
     * const liveRoom = await prisma.liveRoom.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LiveRooms and only return the `id`
     * const liveRoomWithIdOnly = await prisma.liveRoom.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LiveRoomCreateManyAndReturnArgs>(args?: SelectSubset<T, LiveRoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiveRoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LiveRoom.
     * @param {LiveRoomDeleteArgs} args - Arguments to delete one LiveRoom.
     * @example
     * // Delete one LiveRoom
     * const LiveRoom = await prisma.liveRoom.delete({
     *   where: {
     *     // ... filter to delete one LiveRoom
     *   }
     * })
     * 
     */
    delete<T extends LiveRoomDeleteArgs>(args: SelectSubset<T, LiveRoomDeleteArgs<ExtArgs>>): Prisma__LiveRoomClient<$Result.GetResult<Prisma.$LiveRoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LiveRoom.
     * @param {LiveRoomUpdateArgs} args - Arguments to update one LiveRoom.
     * @example
     * // Update one LiveRoom
     * const liveRoom = await prisma.liveRoom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LiveRoomUpdateArgs>(args: SelectSubset<T, LiveRoomUpdateArgs<ExtArgs>>): Prisma__LiveRoomClient<$Result.GetResult<Prisma.$LiveRoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LiveRooms.
     * @param {LiveRoomDeleteManyArgs} args - Arguments to filter LiveRooms to delete.
     * @example
     * // Delete a few LiveRooms
     * const { count } = await prisma.liveRoom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LiveRoomDeleteManyArgs>(args?: SelectSubset<T, LiveRoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LiveRooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveRoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LiveRooms
     * const liveRoom = await prisma.liveRoom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LiveRoomUpdateManyArgs>(args: SelectSubset<T, LiveRoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LiveRooms and returns the data updated in the database.
     * @param {LiveRoomUpdateManyAndReturnArgs} args - Arguments to update many LiveRooms.
     * @example
     * // Update many LiveRooms
     * const liveRoom = await prisma.liveRoom.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LiveRooms and only return the `id`
     * const liveRoomWithIdOnly = await prisma.liveRoom.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LiveRoomUpdateManyAndReturnArgs>(args: SelectSubset<T, LiveRoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiveRoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LiveRoom.
     * @param {LiveRoomUpsertArgs} args - Arguments to update or create a LiveRoom.
     * @example
     * // Update or create a LiveRoom
     * const liveRoom = await prisma.liveRoom.upsert({
     *   create: {
     *     // ... data to create a LiveRoom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LiveRoom we want to update
     *   }
     * })
     */
    upsert<T extends LiveRoomUpsertArgs>(args: SelectSubset<T, LiveRoomUpsertArgs<ExtArgs>>): Prisma__LiveRoomClient<$Result.GetResult<Prisma.$LiveRoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LiveRooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveRoomCountArgs} args - Arguments to filter LiveRooms to count.
     * @example
     * // Count the number of LiveRooms
     * const count = await prisma.liveRoom.count({
     *   where: {
     *     // ... the filter for the LiveRooms we want to count
     *   }
     * })
    **/
    count<T extends LiveRoomCountArgs>(
      args?: Subset<T, LiveRoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LiveRoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LiveRoom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveRoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LiveRoomAggregateArgs>(args: Subset<T, LiveRoomAggregateArgs>): Prisma.PrismaPromise<GetLiveRoomAggregateType<T>>

    /**
     * Group by LiveRoom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveRoomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LiveRoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LiveRoomGroupByArgs['orderBy'] }
        : { orderBy?: LiveRoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LiveRoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLiveRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LiveRoom model
   */
  readonly fields: LiveRoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LiveRoom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LiveRoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stream<T extends StreamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StreamDefaultArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LiveRoom model
   */
  interface LiveRoomFieldRefs {
    readonly id: FieldRef<"LiveRoom", 'String'>
    readonly streamId: FieldRef<"LiveRoom", 'String'>
    readonly activeViewers: FieldRef<"LiveRoom", 'Int'>
    readonly totalViews: FieldRef<"LiveRoom", 'Int'>
    readonly likes: FieldRef<"LiveRoom", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * LiveRoom findUnique
   */
  export type LiveRoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRoom
     */
    select?: LiveRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRoom
     */
    omit?: LiveRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRoomInclude<ExtArgs> | null
    /**
     * Filter, which LiveRoom to fetch.
     */
    where: LiveRoomWhereUniqueInput
  }

  /**
   * LiveRoom findUniqueOrThrow
   */
  export type LiveRoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRoom
     */
    select?: LiveRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRoom
     */
    omit?: LiveRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRoomInclude<ExtArgs> | null
    /**
     * Filter, which LiveRoom to fetch.
     */
    where: LiveRoomWhereUniqueInput
  }

  /**
   * LiveRoom findFirst
   */
  export type LiveRoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRoom
     */
    select?: LiveRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRoom
     */
    omit?: LiveRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRoomInclude<ExtArgs> | null
    /**
     * Filter, which LiveRoom to fetch.
     */
    where?: LiveRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiveRooms to fetch.
     */
    orderBy?: LiveRoomOrderByWithRelationInput | LiveRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LiveRooms.
     */
    cursor?: LiveRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiveRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiveRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LiveRooms.
     */
    distinct?: LiveRoomScalarFieldEnum | LiveRoomScalarFieldEnum[]
  }

  /**
   * LiveRoom findFirstOrThrow
   */
  export type LiveRoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRoom
     */
    select?: LiveRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRoom
     */
    omit?: LiveRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRoomInclude<ExtArgs> | null
    /**
     * Filter, which LiveRoom to fetch.
     */
    where?: LiveRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiveRooms to fetch.
     */
    orderBy?: LiveRoomOrderByWithRelationInput | LiveRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LiveRooms.
     */
    cursor?: LiveRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiveRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiveRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LiveRooms.
     */
    distinct?: LiveRoomScalarFieldEnum | LiveRoomScalarFieldEnum[]
  }

  /**
   * LiveRoom findMany
   */
  export type LiveRoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRoom
     */
    select?: LiveRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRoom
     */
    omit?: LiveRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRoomInclude<ExtArgs> | null
    /**
     * Filter, which LiveRooms to fetch.
     */
    where?: LiveRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiveRooms to fetch.
     */
    orderBy?: LiveRoomOrderByWithRelationInput | LiveRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LiveRooms.
     */
    cursor?: LiveRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiveRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiveRooms.
     */
    skip?: number
    distinct?: LiveRoomScalarFieldEnum | LiveRoomScalarFieldEnum[]
  }

  /**
   * LiveRoom create
   */
  export type LiveRoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRoom
     */
    select?: LiveRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRoom
     */
    omit?: LiveRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRoomInclude<ExtArgs> | null
    /**
     * The data needed to create a LiveRoom.
     */
    data: XOR<LiveRoomCreateInput, LiveRoomUncheckedCreateInput>
  }

  /**
   * LiveRoom createMany
   */
  export type LiveRoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LiveRooms.
     */
    data: LiveRoomCreateManyInput | LiveRoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LiveRoom createManyAndReturn
   */
  export type LiveRoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRoom
     */
    select?: LiveRoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRoom
     */
    omit?: LiveRoomOmit<ExtArgs> | null
    /**
     * The data used to create many LiveRooms.
     */
    data: LiveRoomCreateManyInput | LiveRoomCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRoomIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LiveRoom update
   */
  export type LiveRoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRoom
     */
    select?: LiveRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRoom
     */
    omit?: LiveRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRoomInclude<ExtArgs> | null
    /**
     * The data needed to update a LiveRoom.
     */
    data: XOR<LiveRoomUpdateInput, LiveRoomUncheckedUpdateInput>
    /**
     * Choose, which LiveRoom to update.
     */
    where: LiveRoomWhereUniqueInput
  }

  /**
   * LiveRoom updateMany
   */
  export type LiveRoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LiveRooms.
     */
    data: XOR<LiveRoomUpdateManyMutationInput, LiveRoomUncheckedUpdateManyInput>
    /**
     * Filter which LiveRooms to update
     */
    where?: LiveRoomWhereInput
    /**
     * Limit how many LiveRooms to update.
     */
    limit?: number
  }

  /**
   * LiveRoom updateManyAndReturn
   */
  export type LiveRoomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRoom
     */
    select?: LiveRoomSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRoom
     */
    omit?: LiveRoomOmit<ExtArgs> | null
    /**
     * The data used to update LiveRooms.
     */
    data: XOR<LiveRoomUpdateManyMutationInput, LiveRoomUncheckedUpdateManyInput>
    /**
     * Filter which LiveRooms to update
     */
    where?: LiveRoomWhereInput
    /**
     * Limit how many LiveRooms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRoomIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LiveRoom upsert
   */
  export type LiveRoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRoom
     */
    select?: LiveRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRoom
     */
    omit?: LiveRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRoomInclude<ExtArgs> | null
    /**
     * The filter to search for the LiveRoom to update in case it exists.
     */
    where: LiveRoomWhereUniqueInput
    /**
     * In case the LiveRoom found by the `where` argument doesn't exist, create a new LiveRoom with this data.
     */
    create: XOR<LiveRoomCreateInput, LiveRoomUncheckedCreateInput>
    /**
     * In case the LiveRoom was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LiveRoomUpdateInput, LiveRoomUncheckedUpdateInput>
  }

  /**
   * LiveRoom delete
   */
  export type LiveRoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRoom
     */
    select?: LiveRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRoom
     */
    omit?: LiveRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRoomInclude<ExtArgs> | null
    /**
     * Filter which LiveRoom to delete.
     */
    where: LiveRoomWhereUniqueInput
  }

  /**
   * LiveRoom deleteMany
   */
  export type LiveRoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LiveRooms to delete
     */
    where?: LiveRoomWhereInput
    /**
     * Limit how many LiveRooms to delete.
     */
    limit?: number
  }

  /**
   * LiveRoom without action
   */
  export type LiveRoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRoom
     */
    select?: LiveRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRoom
     */
    omit?: LiveRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRoomInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    content: string | null
    userId: string | null
    streamId: string | null
    isGift: boolean | null
    giftId: string | null
    createdAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    content: string | null
    userId: string | null
    streamId: string | null
    isGift: boolean | null
    giftId: string | null
    createdAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    content: number
    userId: number
    streamId: number
    isGift: number
    giftId: number
    createdAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    content?: true
    userId?: true
    streamId?: true
    isGift?: true
    giftId?: true
    createdAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    content?: true
    userId?: true
    streamId?: true
    isGift?: true
    giftId?: true
    createdAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    content?: true
    userId?: true
    streamId?: true
    isGift?: true
    giftId?: true
    createdAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    content: string
    userId: string
    streamId: string
    isGift: boolean
    giftId: string | null
    createdAt: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    userId?: boolean
    streamId?: boolean
    isGift?: boolean
    giftId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    userId?: boolean
    streamId?: boolean
    isGift?: boolean
    giftId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    userId?: boolean
    streamId?: boolean
    isGift?: boolean
    giftId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    content?: boolean
    userId?: boolean
    streamId?: boolean
    isGift?: boolean
    giftId?: boolean
    createdAt?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "userId" | "streamId" | "isGift" | "giftId" | "createdAt", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      stream: Prisma.$StreamPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      userId: string
      streamId: string
      isGift: boolean
      giftId: string | null
      createdAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    stream<T extends StreamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StreamDefaultArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly userId: FieldRef<"Message", 'String'>
    readonly streamId: FieldRef<"Message", 'String'>
    readonly isGift: FieldRef<"Message", 'Boolean'>
    readonly giftId: FieldRef<"Message", 'String'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model Follow
   */

  export type AggregateFollow = {
    _count: FollowCountAggregateOutputType | null
    _min: FollowMinAggregateOutputType | null
    _max: FollowMaxAggregateOutputType | null
  }

  export type FollowMinAggregateOutputType = {
    id: string | null
    followerId: string | null
    followingId: string | null
    createdAt: Date | null
  }

  export type FollowMaxAggregateOutputType = {
    id: string | null
    followerId: string | null
    followingId: string | null
    createdAt: Date | null
  }

  export type FollowCountAggregateOutputType = {
    id: number
    followerId: number
    followingId: number
    createdAt: number
    _all: number
  }


  export type FollowMinAggregateInputType = {
    id?: true
    followerId?: true
    followingId?: true
    createdAt?: true
  }

  export type FollowMaxAggregateInputType = {
    id?: true
    followerId?: true
    followingId?: true
    createdAt?: true
  }

  export type FollowCountAggregateInputType = {
    id?: true
    followerId?: true
    followingId?: true
    createdAt?: true
    _all?: true
  }

  export type FollowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Follow to aggregate.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Follows
    **/
    _count?: true | FollowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FollowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FollowMaxAggregateInputType
  }

  export type GetFollowAggregateType<T extends FollowAggregateArgs> = {
        [P in keyof T & keyof AggregateFollow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFollow[P]>
      : GetScalarType<T[P], AggregateFollow[P]>
  }




  export type FollowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowWhereInput
    orderBy?: FollowOrderByWithAggregationInput | FollowOrderByWithAggregationInput[]
    by: FollowScalarFieldEnum[] | FollowScalarFieldEnum
    having?: FollowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FollowCountAggregateInputType | true
    _min?: FollowMinAggregateInputType
    _max?: FollowMaxAggregateInputType
  }

  export type FollowGroupByOutputType = {
    id: string
    followerId: string
    followingId: string
    createdAt: Date
    _count: FollowCountAggregateOutputType | null
    _min: FollowMinAggregateOutputType | null
    _max: FollowMaxAggregateOutputType | null
  }

  type GetFollowGroupByPayload<T extends FollowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FollowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FollowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FollowGroupByOutputType[P]>
            : GetScalarType<T[P], FollowGroupByOutputType[P]>
        }
      >
    >


  export type FollowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    followerId?: boolean
    followingId?: boolean
    createdAt?: boolean
    follower?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["follow"]>

  export type FollowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    followerId?: boolean
    followingId?: boolean
    createdAt?: boolean
    follower?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["follow"]>

  export type FollowSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    followerId?: boolean
    followingId?: boolean
    createdAt?: boolean
    follower?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["follow"]>

  export type FollowSelectScalar = {
    id?: boolean
    followerId?: boolean
    followingId?: boolean
    createdAt?: boolean
  }

  export type FollowOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "followerId" | "followingId" | "createdAt", ExtArgs["result"]["follow"]>
  export type FollowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    follower?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FollowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    follower?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FollowIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    follower?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FollowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Follow"
    objects: {
      follower: Prisma.$UserPayload<ExtArgs>
      following: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      followerId: string
      followingId: string
      createdAt: Date
    }, ExtArgs["result"]["follow"]>
    composites: {}
  }

  type FollowGetPayload<S extends boolean | null | undefined | FollowDefaultArgs> = $Result.GetResult<Prisma.$FollowPayload, S>

  type FollowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FollowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FollowCountAggregateInputType | true
    }

  export interface FollowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Follow'], meta: { name: 'Follow' } }
    /**
     * Find zero or one Follow that matches the filter.
     * @param {FollowFindUniqueArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FollowFindUniqueArgs>(args: SelectSubset<T, FollowFindUniqueArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Follow that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FollowFindUniqueOrThrowArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FollowFindUniqueOrThrowArgs>(args: SelectSubset<T, FollowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Follow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowFindFirstArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FollowFindFirstArgs>(args?: SelectSubset<T, FollowFindFirstArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Follow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowFindFirstOrThrowArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FollowFindFirstOrThrowArgs>(args?: SelectSubset<T, FollowFindFirstOrThrowArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Follows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Follows
     * const follows = await prisma.follow.findMany()
     * 
     * // Get first 10 Follows
     * const follows = await prisma.follow.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const followWithIdOnly = await prisma.follow.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FollowFindManyArgs>(args?: SelectSubset<T, FollowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Follow.
     * @param {FollowCreateArgs} args - Arguments to create a Follow.
     * @example
     * // Create one Follow
     * const Follow = await prisma.follow.create({
     *   data: {
     *     // ... data to create a Follow
     *   }
     * })
     * 
     */
    create<T extends FollowCreateArgs>(args: SelectSubset<T, FollowCreateArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Follows.
     * @param {FollowCreateManyArgs} args - Arguments to create many Follows.
     * @example
     * // Create many Follows
     * const follow = await prisma.follow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FollowCreateManyArgs>(args?: SelectSubset<T, FollowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Follows and returns the data saved in the database.
     * @param {FollowCreateManyAndReturnArgs} args - Arguments to create many Follows.
     * @example
     * // Create many Follows
     * const follow = await prisma.follow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Follows and only return the `id`
     * const followWithIdOnly = await prisma.follow.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FollowCreateManyAndReturnArgs>(args?: SelectSubset<T, FollowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Follow.
     * @param {FollowDeleteArgs} args - Arguments to delete one Follow.
     * @example
     * // Delete one Follow
     * const Follow = await prisma.follow.delete({
     *   where: {
     *     // ... filter to delete one Follow
     *   }
     * })
     * 
     */
    delete<T extends FollowDeleteArgs>(args: SelectSubset<T, FollowDeleteArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Follow.
     * @param {FollowUpdateArgs} args - Arguments to update one Follow.
     * @example
     * // Update one Follow
     * const follow = await prisma.follow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FollowUpdateArgs>(args: SelectSubset<T, FollowUpdateArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Follows.
     * @param {FollowDeleteManyArgs} args - Arguments to filter Follows to delete.
     * @example
     * // Delete a few Follows
     * const { count } = await prisma.follow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FollowDeleteManyArgs>(args?: SelectSubset<T, FollowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Follows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Follows
     * const follow = await prisma.follow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FollowUpdateManyArgs>(args: SelectSubset<T, FollowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Follows and returns the data updated in the database.
     * @param {FollowUpdateManyAndReturnArgs} args - Arguments to update many Follows.
     * @example
     * // Update many Follows
     * const follow = await prisma.follow.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Follows and only return the `id`
     * const followWithIdOnly = await prisma.follow.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FollowUpdateManyAndReturnArgs>(args: SelectSubset<T, FollowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Follow.
     * @param {FollowUpsertArgs} args - Arguments to update or create a Follow.
     * @example
     * // Update or create a Follow
     * const follow = await prisma.follow.upsert({
     *   create: {
     *     // ... data to create a Follow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Follow we want to update
     *   }
     * })
     */
    upsert<T extends FollowUpsertArgs>(args: SelectSubset<T, FollowUpsertArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Follows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowCountArgs} args - Arguments to filter Follows to count.
     * @example
     * // Count the number of Follows
     * const count = await prisma.follow.count({
     *   where: {
     *     // ... the filter for the Follows we want to count
     *   }
     * })
    **/
    count<T extends FollowCountArgs>(
      args?: Subset<T, FollowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FollowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Follow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FollowAggregateArgs>(args: Subset<T, FollowAggregateArgs>): Prisma.PrismaPromise<GetFollowAggregateType<T>>

    /**
     * Group by Follow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FollowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FollowGroupByArgs['orderBy'] }
        : { orderBy?: FollowGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FollowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFollowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Follow model
   */
  readonly fields: FollowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Follow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FollowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    follower<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    following<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Follow model
   */
  interface FollowFieldRefs {
    readonly id: FieldRef<"Follow", 'String'>
    readonly followerId: FieldRef<"Follow", 'String'>
    readonly followingId: FieldRef<"Follow", 'String'>
    readonly createdAt: FieldRef<"Follow", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Follow findUnique
   */
  export type FollowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow findUniqueOrThrow
   */
  export type FollowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow findFirst
   */
  export type FollowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Follows.
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Follows.
     */
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * Follow findFirstOrThrow
   */
  export type FollowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Follows.
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Follows.
     */
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * Follow findMany
   */
  export type FollowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follows to fetch.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Follows.
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * Follow create
   */
  export type FollowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * The data needed to create a Follow.
     */
    data: XOR<FollowCreateInput, FollowUncheckedCreateInput>
  }

  /**
   * Follow createMany
   */
  export type FollowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Follows.
     */
    data: FollowCreateManyInput | FollowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Follow createManyAndReturn
   */
  export type FollowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * The data used to create many Follows.
     */
    data: FollowCreateManyInput | FollowCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Follow update
   */
  export type FollowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * The data needed to update a Follow.
     */
    data: XOR<FollowUpdateInput, FollowUncheckedUpdateInput>
    /**
     * Choose, which Follow to update.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow updateMany
   */
  export type FollowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Follows.
     */
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyInput>
    /**
     * Filter which Follows to update
     */
    where?: FollowWhereInput
    /**
     * Limit how many Follows to update.
     */
    limit?: number
  }

  /**
   * Follow updateManyAndReturn
   */
  export type FollowUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * The data used to update Follows.
     */
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyInput>
    /**
     * Filter which Follows to update
     */
    where?: FollowWhereInput
    /**
     * Limit how many Follows to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Follow upsert
   */
  export type FollowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * The filter to search for the Follow to update in case it exists.
     */
    where: FollowWhereUniqueInput
    /**
     * In case the Follow found by the `where` argument doesn't exist, create a new Follow with this data.
     */
    create: XOR<FollowCreateInput, FollowUncheckedCreateInput>
    /**
     * In case the Follow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FollowUpdateInput, FollowUncheckedUpdateInput>
  }

  /**
   * Follow delete
   */
  export type FollowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter which Follow to delete.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow deleteMany
   */
  export type FollowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Follows to delete
     */
    where?: FollowWhereInput
    /**
     * Limit how many Follows to delete.
     */
    limit?: number
  }

  /**
   * Follow without action
   */
  export type FollowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
  }


  /**
   * Model StreamBattle
   */

  export type AggregateStreamBattle = {
    _count: StreamBattleCountAggregateOutputType | null
    _avg: StreamBattleAvgAggregateOutputType | null
    _sum: StreamBattleSumAggregateOutputType | null
    _min: StreamBattleMinAggregateOutputType | null
    _max: StreamBattleMaxAggregateOutputType | null
  }

  export type StreamBattleAvgAggregateOutputType = {
    points1: number | null
    points2: number | null
  }

  export type StreamBattleSumAggregateOutputType = {
    points1: number | null
    points2: number | null
  }

  export type StreamBattleMinAggregateOutputType = {
    id: string | null
    stream1Id: string | null
    stream2Id: string | null
    points1: number | null
    points2: number | null
    winnerId: string | null
    status: $Enums.BattleStatus | null
    startTime: Date | null
    endTime: Date | null
    createdAt: Date | null
  }

  export type StreamBattleMaxAggregateOutputType = {
    id: string | null
    stream1Id: string | null
    stream2Id: string | null
    points1: number | null
    points2: number | null
    winnerId: string | null
    status: $Enums.BattleStatus | null
    startTime: Date | null
    endTime: Date | null
    createdAt: Date | null
  }

  export type StreamBattleCountAggregateOutputType = {
    id: number
    stream1Id: number
    stream2Id: number
    points1: number
    points2: number
    winnerId: number
    status: number
    startTime: number
    endTime: number
    createdAt: number
    _all: number
  }


  export type StreamBattleAvgAggregateInputType = {
    points1?: true
    points2?: true
  }

  export type StreamBattleSumAggregateInputType = {
    points1?: true
    points2?: true
  }

  export type StreamBattleMinAggregateInputType = {
    id?: true
    stream1Id?: true
    stream2Id?: true
    points1?: true
    points2?: true
    winnerId?: true
    status?: true
    startTime?: true
    endTime?: true
    createdAt?: true
  }

  export type StreamBattleMaxAggregateInputType = {
    id?: true
    stream1Id?: true
    stream2Id?: true
    points1?: true
    points2?: true
    winnerId?: true
    status?: true
    startTime?: true
    endTime?: true
    createdAt?: true
  }

  export type StreamBattleCountAggregateInputType = {
    id?: true
    stream1Id?: true
    stream2Id?: true
    points1?: true
    points2?: true
    winnerId?: true
    status?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    _all?: true
  }

  export type StreamBattleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StreamBattle to aggregate.
     */
    where?: StreamBattleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StreamBattles to fetch.
     */
    orderBy?: StreamBattleOrderByWithRelationInput | StreamBattleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StreamBattleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StreamBattles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StreamBattles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StreamBattles
    **/
    _count?: true | StreamBattleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StreamBattleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StreamBattleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StreamBattleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StreamBattleMaxAggregateInputType
  }

  export type GetStreamBattleAggregateType<T extends StreamBattleAggregateArgs> = {
        [P in keyof T & keyof AggregateStreamBattle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStreamBattle[P]>
      : GetScalarType<T[P], AggregateStreamBattle[P]>
  }




  export type StreamBattleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StreamBattleWhereInput
    orderBy?: StreamBattleOrderByWithAggregationInput | StreamBattleOrderByWithAggregationInput[]
    by: StreamBattleScalarFieldEnum[] | StreamBattleScalarFieldEnum
    having?: StreamBattleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StreamBattleCountAggregateInputType | true
    _avg?: StreamBattleAvgAggregateInputType
    _sum?: StreamBattleSumAggregateInputType
    _min?: StreamBattleMinAggregateInputType
    _max?: StreamBattleMaxAggregateInputType
  }

  export type StreamBattleGroupByOutputType = {
    id: string
    stream1Id: string
    stream2Id: string
    points1: number
    points2: number
    winnerId: string | null
    status: $Enums.BattleStatus
    startTime: Date | null
    endTime: Date | null
    createdAt: Date
    _count: StreamBattleCountAggregateOutputType | null
    _avg: StreamBattleAvgAggregateOutputType | null
    _sum: StreamBattleSumAggregateOutputType | null
    _min: StreamBattleMinAggregateOutputType | null
    _max: StreamBattleMaxAggregateOutputType | null
  }

  type GetStreamBattleGroupByPayload<T extends StreamBattleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StreamBattleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StreamBattleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StreamBattleGroupByOutputType[P]>
            : GetScalarType<T[P], StreamBattleGroupByOutputType[P]>
        }
      >
    >


  export type StreamBattleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stream1Id?: boolean
    stream2Id?: boolean
    points1?: boolean
    points2?: boolean
    winnerId?: boolean
    status?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    stream1?: boolean | StreamDefaultArgs<ExtArgs>
    stream2?: boolean | StreamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["streamBattle"]>

  export type StreamBattleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stream1Id?: boolean
    stream2Id?: boolean
    points1?: boolean
    points2?: boolean
    winnerId?: boolean
    status?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    stream1?: boolean | StreamDefaultArgs<ExtArgs>
    stream2?: boolean | StreamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["streamBattle"]>

  export type StreamBattleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stream1Id?: boolean
    stream2Id?: boolean
    points1?: boolean
    points2?: boolean
    winnerId?: boolean
    status?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    stream1?: boolean | StreamDefaultArgs<ExtArgs>
    stream2?: boolean | StreamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["streamBattle"]>

  export type StreamBattleSelectScalar = {
    id?: boolean
    stream1Id?: boolean
    stream2Id?: boolean
    points1?: boolean
    points2?: boolean
    winnerId?: boolean
    status?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
  }

  export type StreamBattleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "stream1Id" | "stream2Id" | "points1" | "points2" | "winnerId" | "status" | "startTime" | "endTime" | "createdAt", ExtArgs["result"]["streamBattle"]>
  export type StreamBattleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream1?: boolean | StreamDefaultArgs<ExtArgs>
    stream2?: boolean | StreamDefaultArgs<ExtArgs>
  }
  export type StreamBattleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream1?: boolean | StreamDefaultArgs<ExtArgs>
    stream2?: boolean | StreamDefaultArgs<ExtArgs>
  }
  export type StreamBattleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream1?: boolean | StreamDefaultArgs<ExtArgs>
    stream2?: boolean | StreamDefaultArgs<ExtArgs>
  }

  export type $StreamBattlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StreamBattle"
    objects: {
      stream1: Prisma.$StreamPayload<ExtArgs>
      stream2: Prisma.$StreamPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      stream1Id: string
      stream2Id: string
      points1: number
      points2: number
      winnerId: string | null
      status: $Enums.BattleStatus
      startTime: Date | null
      endTime: Date | null
      createdAt: Date
    }, ExtArgs["result"]["streamBattle"]>
    composites: {}
  }

  type StreamBattleGetPayload<S extends boolean | null | undefined | StreamBattleDefaultArgs> = $Result.GetResult<Prisma.$StreamBattlePayload, S>

  type StreamBattleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StreamBattleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StreamBattleCountAggregateInputType | true
    }

  export interface StreamBattleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StreamBattle'], meta: { name: 'StreamBattle' } }
    /**
     * Find zero or one StreamBattle that matches the filter.
     * @param {StreamBattleFindUniqueArgs} args - Arguments to find a StreamBattle
     * @example
     * // Get one StreamBattle
     * const streamBattle = await prisma.streamBattle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StreamBattleFindUniqueArgs>(args: SelectSubset<T, StreamBattleFindUniqueArgs<ExtArgs>>): Prisma__StreamBattleClient<$Result.GetResult<Prisma.$StreamBattlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StreamBattle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StreamBattleFindUniqueOrThrowArgs} args - Arguments to find a StreamBattle
     * @example
     * // Get one StreamBattle
     * const streamBattle = await prisma.streamBattle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StreamBattleFindUniqueOrThrowArgs>(args: SelectSubset<T, StreamBattleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StreamBattleClient<$Result.GetResult<Prisma.$StreamBattlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StreamBattle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamBattleFindFirstArgs} args - Arguments to find a StreamBattle
     * @example
     * // Get one StreamBattle
     * const streamBattle = await prisma.streamBattle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StreamBattleFindFirstArgs>(args?: SelectSubset<T, StreamBattleFindFirstArgs<ExtArgs>>): Prisma__StreamBattleClient<$Result.GetResult<Prisma.$StreamBattlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StreamBattle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamBattleFindFirstOrThrowArgs} args - Arguments to find a StreamBattle
     * @example
     * // Get one StreamBattle
     * const streamBattle = await prisma.streamBattle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StreamBattleFindFirstOrThrowArgs>(args?: SelectSubset<T, StreamBattleFindFirstOrThrowArgs<ExtArgs>>): Prisma__StreamBattleClient<$Result.GetResult<Prisma.$StreamBattlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StreamBattles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamBattleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StreamBattles
     * const streamBattles = await prisma.streamBattle.findMany()
     * 
     * // Get first 10 StreamBattles
     * const streamBattles = await prisma.streamBattle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const streamBattleWithIdOnly = await prisma.streamBattle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StreamBattleFindManyArgs>(args?: SelectSubset<T, StreamBattleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamBattlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StreamBattle.
     * @param {StreamBattleCreateArgs} args - Arguments to create a StreamBattle.
     * @example
     * // Create one StreamBattle
     * const StreamBattle = await prisma.streamBattle.create({
     *   data: {
     *     // ... data to create a StreamBattle
     *   }
     * })
     * 
     */
    create<T extends StreamBattleCreateArgs>(args: SelectSubset<T, StreamBattleCreateArgs<ExtArgs>>): Prisma__StreamBattleClient<$Result.GetResult<Prisma.$StreamBattlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StreamBattles.
     * @param {StreamBattleCreateManyArgs} args - Arguments to create many StreamBattles.
     * @example
     * // Create many StreamBattles
     * const streamBattle = await prisma.streamBattle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StreamBattleCreateManyArgs>(args?: SelectSubset<T, StreamBattleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StreamBattles and returns the data saved in the database.
     * @param {StreamBattleCreateManyAndReturnArgs} args - Arguments to create many StreamBattles.
     * @example
     * // Create many StreamBattles
     * const streamBattle = await prisma.streamBattle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StreamBattles and only return the `id`
     * const streamBattleWithIdOnly = await prisma.streamBattle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StreamBattleCreateManyAndReturnArgs>(args?: SelectSubset<T, StreamBattleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamBattlePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StreamBattle.
     * @param {StreamBattleDeleteArgs} args - Arguments to delete one StreamBattle.
     * @example
     * // Delete one StreamBattle
     * const StreamBattle = await prisma.streamBattle.delete({
     *   where: {
     *     // ... filter to delete one StreamBattle
     *   }
     * })
     * 
     */
    delete<T extends StreamBattleDeleteArgs>(args: SelectSubset<T, StreamBattleDeleteArgs<ExtArgs>>): Prisma__StreamBattleClient<$Result.GetResult<Prisma.$StreamBattlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StreamBattle.
     * @param {StreamBattleUpdateArgs} args - Arguments to update one StreamBattle.
     * @example
     * // Update one StreamBattle
     * const streamBattle = await prisma.streamBattle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StreamBattleUpdateArgs>(args: SelectSubset<T, StreamBattleUpdateArgs<ExtArgs>>): Prisma__StreamBattleClient<$Result.GetResult<Prisma.$StreamBattlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StreamBattles.
     * @param {StreamBattleDeleteManyArgs} args - Arguments to filter StreamBattles to delete.
     * @example
     * // Delete a few StreamBattles
     * const { count } = await prisma.streamBattle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StreamBattleDeleteManyArgs>(args?: SelectSubset<T, StreamBattleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StreamBattles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamBattleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StreamBattles
     * const streamBattle = await prisma.streamBattle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StreamBattleUpdateManyArgs>(args: SelectSubset<T, StreamBattleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StreamBattles and returns the data updated in the database.
     * @param {StreamBattleUpdateManyAndReturnArgs} args - Arguments to update many StreamBattles.
     * @example
     * // Update many StreamBattles
     * const streamBattle = await prisma.streamBattle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StreamBattles and only return the `id`
     * const streamBattleWithIdOnly = await prisma.streamBattle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StreamBattleUpdateManyAndReturnArgs>(args: SelectSubset<T, StreamBattleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamBattlePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StreamBattle.
     * @param {StreamBattleUpsertArgs} args - Arguments to update or create a StreamBattle.
     * @example
     * // Update or create a StreamBattle
     * const streamBattle = await prisma.streamBattle.upsert({
     *   create: {
     *     // ... data to create a StreamBattle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StreamBattle we want to update
     *   }
     * })
     */
    upsert<T extends StreamBattleUpsertArgs>(args: SelectSubset<T, StreamBattleUpsertArgs<ExtArgs>>): Prisma__StreamBattleClient<$Result.GetResult<Prisma.$StreamBattlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StreamBattles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamBattleCountArgs} args - Arguments to filter StreamBattles to count.
     * @example
     * // Count the number of StreamBattles
     * const count = await prisma.streamBattle.count({
     *   where: {
     *     // ... the filter for the StreamBattles we want to count
     *   }
     * })
    **/
    count<T extends StreamBattleCountArgs>(
      args?: Subset<T, StreamBattleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StreamBattleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StreamBattle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamBattleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StreamBattleAggregateArgs>(args: Subset<T, StreamBattleAggregateArgs>): Prisma.PrismaPromise<GetStreamBattleAggregateType<T>>

    /**
     * Group by StreamBattle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamBattleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StreamBattleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StreamBattleGroupByArgs['orderBy'] }
        : { orderBy?: StreamBattleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StreamBattleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStreamBattleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StreamBattle model
   */
  readonly fields: StreamBattleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StreamBattle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StreamBattleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stream1<T extends StreamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StreamDefaultArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    stream2<T extends StreamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StreamDefaultArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StreamBattle model
   */
  interface StreamBattleFieldRefs {
    readonly id: FieldRef<"StreamBattle", 'String'>
    readonly stream1Id: FieldRef<"StreamBattle", 'String'>
    readonly stream2Id: FieldRef<"StreamBattle", 'String'>
    readonly points1: FieldRef<"StreamBattle", 'Int'>
    readonly points2: FieldRef<"StreamBattle", 'Int'>
    readonly winnerId: FieldRef<"StreamBattle", 'String'>
    readonly status: FieldRef<"StreamBattle", 'BattleStatus'>
    readonly startTime: FieldRef<"StreamBattle", 'DateTime'>
    readonly endTime: FieldRef<"StreamBattle", 'DateTime'>
    readonly createdAt: FieldRef<"StreamBattle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StreamBattle findUnique
   */
  export type StreamBattleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamBattle
     */
    select?: StreamBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamBattle
     */
    omit?: StreamBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamBattleInclude<ExtArgs> | null
    /**
     * Filter, which StreamBattle to fetch.
     */
    where: StreamBattleWhereUniqueInput
  }

  /**
   * StreamBattle findUniqueOrThrow
   */
  export type StreamBattleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamBattle
     */
    select?: StreamBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamBattle
     */
    omit?: StreamBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamBattleInclude<ExtArgs> | null
    /**
     * Filter, which StreamBattle to fetch.
     */
    where: StreamBattleWhereUniqueInput
  }

  /**
   * StreamBattle findFirst
   */
  export type StreamBattleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamBattle
     */
    select?: StreamBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamBattle
     */
    omit?: StreamBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamBattleInclude<ExtArgs> | null
    /**
     * Filter, which StreamBattle to fetch.
     */
    where?: StreamBattleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StreamBattles to fetch.
     */
    orderBy?: StreamBattleOrderByWithRelationInput | StreamBattleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StreamBattles.
     */
    cursor?: StreamBattleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StreamBattles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StreamBattles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StreamBattles.
     */
    distinct?: StreamBattleScalarFieldEnum | StreamBattleScalarFieldEnum[]
  }

  /**
   * StreamBattle findFirstOrThrow
   */
  export type StreamBattleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamBattle
     */
    select?: StreamBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamBattle
     */
    omit?: StreamBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamBattleInclude<ExtArgs> | null
    /**
     * Filter, which StreamBattle to fetch.
     */
    where?: StreamBattleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StreamBattles to fetch.
     */
    orderBy?: StreamBattleOrderByWithRelationInput | StreamBattleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StreamBattles.
     */
    cursor?: StreamBattleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StreamBattles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StreamBattles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StreamBattles.
     */
    distinct?: StreamBattleScalarFieldEnum | StreamBattleScalarFieldEnum[]
  }

  /**
   * StreamBattle findMany
   */
  export type StreamBattleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamBattle
     */
    select?: StreamBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamBattle
     */
    omit?: StreamBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamBattleInclude<ExtArgs> | null
    /**
     * Filter, which StreamBattles to fetch.
     */
    where?: StreamBattleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StreamBattles to fetch.
     */
    orderBy?: StreamBattleOrderByWithRelationInput | StreamBattleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StreamBattles.
     */
    cursor?: StreamBattleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StreamBattles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StreamBattles.
     */
    skip?: number
    distinct?: StreamBattleScalarFieldEnum | StreamBattleScalarFieldEnum[]
  }

  /**
   * StreamBattle create
   */
  export type StreamBattleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamBattle
     */
    select?: StreamBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamBattle
     */
    omit?: StreamBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamBattleInclude<ExtArgs> | null
    /**
     * The data needed to create a StreamBattle.
     */
    data: XOR<StreamBattleCreateInput, StreamBattleUncheckedCreateInput>
  }

  /**
   * StreamBattle createMany
   */
  export type StreamBattleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StreamBattles.
     */
    data: StreamBattleCreateManyInput | StreamBattleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StreamBattle createManyAndReturn
   */
  export type StreamBattleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamBattle
     */
    select?: StreamBattleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StreamBattle
     */
    omit?: StreamBattleOmit<ExtArgs> | null
    /**
     * The data used to create many StreamBattles.
     */
    data: StreamBattleCreateManyInput | StreamBattleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamBattleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StreamBattle update
   */
  export type StreamBattleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamBattle
     */
    select?: StreamBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamBattle
     */
    omit?: StreamBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamBattleInclude<ExtArgs> | null
    /**
     * The data needed to update a StreamBattle.
     */
    data: XOR<StreamBattleUpdateInput, StreamBattleUncheckedUpdateInput>
    /**
     * Choose, which StreamBattle to update.
     */
    where: StreamBattleWhereUniqueInput
  }

  /**
   * StreamBattle updateMany
   */
  export type StreamBattleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StreamBattles.
     */
    data: XOR<StreamBattleUpdateManyMutationInput, StreamBattleUncheckedUpdateManyInput>
    /**
     * Filter which StreamBattles to update
     */
    where?: StreamBattleWhereInput
    /**
     * Limit how many StreamBattles to update.
     */
    limit?: number
  }

  /**
   * StreamBattle updateManyAndReturn
   */
  export type StreamBattleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamBattle
     */
    select?: StreamBattleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StreamBattle
     */
    omit?: StreamBattleOmit<ExtArgs> | null
    /**
     * The data used to update StreamBattles.
     */
    data: XOR<StreamBattleUpdateManyMutationInput, StreamBattleUncheckedUpdateManyInput>
    /**
     * Filter which StreamBattles to update
     */
    where?: StreamBattleWhereInput
    /**
     * Limit how many StreamBattles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamBattleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StreamBattle upsert
   */
  export type StreamBattleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamBattle
     */
    select?: StreamBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamBattle
     */
    omit?: StreamBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamBattleInclude<ExtArgs> | null
    /**
     * The filter to search for the StreamBattle to update in case it exists.
     */
    where: StreamBattleWhereUniqueInput
    /**
     * In case the StreamBattle found by the `where` argument doesn't exist, create a new StreamBattle with this data.
     */
    create: XOR<StreamBattleCreateInput, StreamBattleUncheckedCreateInput>
    /**
     * In case the StreamBattle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StreamBattleUpdateInput, StreamBattleUncheckedUpdateInput>
  }

  /**
   * StreamBattle delete
   */
  export type StreamBattleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamBattle
     */
    select?: StreamBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamBattle
     */
    omit?: StreamBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamBattleInclude<ExtArgs> | null
    /**
     * Filter which StreamBattle to delete.
     */
    where: StreamBattleWhereUniqueInput
  }

  /**
   * StreamBattle deleteMany
   */
  export type StreamBattleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StreamBattles to delete
     */
    where?: StreamBattleWhereInput
    /**
     * Limit how many StreamBattles to delete.
     */
    limit?: number
  }

  /**
   * StreamBattle without action
   */
  export type StreamBattleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamBattle
     */
    select?: StreamBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamBattle
     */
    omit?: StreamBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamBattleInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.NotificationType | null
    content: string | null
    isRead: boolean | null
    link: string | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.NotificationType | null
    content: string | null
    isRead: boolean | null
    link: string | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    content: number
    isRead: number
    link: number
    createdAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    content?: true
    isRead?: true
    link?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    content?: true
    isRead?: true
    link?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    content?: true
    isRead?: true
    link?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    userId: string
    type: $Enums.NotificationType
    content: string
    isRead: boolean
    link: string | null
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    content?: boolean
    isRead?: boolean
    link?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    content?: boolean
    isRead?: boolean
    link?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    content?: boolean
    isRead?: boolean
    link?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    content?: boolean
    isRead?: boolean
    link?: boolean
    createdAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "content" | "isRead" | "link" | "createdAt", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: $Enums.NotificationType
      content: string
      isRead: boolean
      link: string | null
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'NotificationType'>
    readonly content: FieldRef<"Notification", 'String'>
    readonly isRead: FieldRef<"Notification", 'Boolean'>
    readonly link: FieldRef<"Notification", 'String'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model ModerationReport
   */

  export type AggregateModerationReport = {
    _count: ModerationReportCountAggregateOutputType | null
    _min: ModerationReportMinAggregateOutputType | null
    _max: ModerationReportMaxAggregateOutputType | null
  }

  export type ModerationReportMinAggregateOutputType = {
    id: string | null
    reporterId: string | null
    reportedId: string | null
    streamId: string | null
    reason: string | null
    details: string | null
    status: $Enums.ReportStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ModerationReportMaxAggregateOutputType = {
    id: string | null
    reporterId: string | null
    reportedId: string | null
    streamId: string | null
    reason: string | null
    details: string | null
    status: $Enums.ReportStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ModerationReportCountAggregateOutputType = {
    id: number
    reporterId: number
    reportedId: number
    streamId: number
    reason: number
    details: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ModerationReportMinAggregateInputType = {
    id?: true
    reporterId?: true
    reportedId?: true
    streamId?: true
    reason?: true
    details?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ModerationReportMaxAggregateInputType = {
    id?: true
    reporterId?: true
    reportedId?: true
    streamId?: true
    reason?: true
    details?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ModerationReportCountAggregateInputType = {
    id?: true
    reporterId?: true
    reportedId?: true
    streamId?: true
    reason?: true
    details?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ModerationReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModerationReport to aggregate.
     */
    where?: ModerationReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModerationReports to fetch.
     */
    orderBy?: ModerationReportOrderByWithRelationInput | ModerationReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModerationReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModerationReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModerationReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ModerationReports
    **/
    _count?: true | ModerationReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModerationReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModerationReportMaxAggregateInputType
  }

  export type GetModerationReportAggregateType<T extends ModerationReportAggregateArgs> = {
        [P in keyof T & keyof AggregateModerationReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModerationReport[P]>
      : GetScalarType<T[P], AggregateModerationReport[P]>
  }




  export type ModerationReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModerationReportWhereInput
    orderBy?: ModerationReportOrderByWithAggregationInput | ModerationReportOrderByWithAggregationInput[]
    by: ModerationReportScalarFieldEnum[] | ModerationReportScalarFieldEnum
    having?: ModerationReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModerationReportCountAggregateInputType | true
    _min?: ModerationReportMinAggregateInputType
    _max?: ModerationReportMaxAggregateInputType
  }

  export type ModerationReportGroupByOutputType = {
    id: string
    reporterId: string
    reportedId: string
    streamId: string | null
    reason: string
    details: string | null
    status: $Enums.ReportStatus
    createdAt: Date
    updatedAt: Date
    _count: ModerationReportCountAggregateOutputType | null
    _min: ModerationReportMinAggregateOutputType | null
    _max: ModerationReportMaxAggregateOutputType | null
  }

  type GetModerationReportGroupByPayload<T extends ModerationReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ModerationReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModerationReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModerationReportGroupByOutputType[P]>
            : GetScalarType<T[P], ModerationReportGroupByOutputType[P]>
        }
      >
    >


  export type ModerationReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reporterId?: boolean
    reportedId?: boolean
    streamId?: boolean
    reason?: boolean
    details?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reporter?: boolean | UserDefaultArgs<ExtArgs>
    reported?: boolean | UserDefaultArgs<ExtArgs>
    stream?: boolean | ModerationReport$streamArgs<ExtArgs>
  }, ExtArgs["result"]["moderationReport"]>

  export type ModerationReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reporterId?: boolean
    reportedId?: boolean
    streamId?: boolean
    reason?: boolean
    details?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reporter?: boolean | UserDefaultArgs<ExtArgs>
    reported?: boolean | UserDefaultArgs<ExtArgs>
    stream?: boolean | ModerationReport$streamArgs<ExtArgs>
  }, ExtArgs["result"]["moderationReport"]>

  export type ModerationReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reporterId?: boolean
    reportedId?: boolean
    streamId?: boolean
    reason?: boolean
    details?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reporter?: boolean | UserDefaultArgs<ExtArgs>
    reported?: boolean | UserDefaultArgs<ExtArgs>
    stream?: boolean | ModerationReport$streamArgs<ExtArgs>
  }, ExtArgs["result"]["moderationReport"]>

  export type ModerationReportSelectScalar = {
    id?: boolean
    reporterId?: boolean
    reportedId?: boolean
    streamId?: boolean
    reason?: boolean
    details?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ModerationReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "reporterId" | "reportedId" | "streamId" | "reason" | "details" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["moderationReport"]>
  export type ModerationReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reporter?: boolean | UserDefaultArgs<ExtArgs>
    reported?: boolean | UserDefaultArgs<ExtArgs>
    stream?: boolean | ModerationReport$streamArgs<ExtArgs>
  }
  export type ModerationReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reporter?: boolean | UserDefaultArgs<ExtArgs>
    reported?: boolean | UserDefaultArgs<ExtArgs>
    stream?: boolean | ModerationReport$streamArgs<ExtArgs>
  }
  export type ModerationReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reporter?: boolean | UserDefaultArgs<ExtArgs>
    reported?: boolean | UserDefaultArgs<ExtArgs>
    stream?: boolean | ModerationReport$streamArgs<ExtArgs>
  }

  export type $ModerationReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ModerationReport"
    objects: {
      reporter: Prisma.$UserPayload<ExtArgs>
      reported: Prisma.$UserPayload<ExtArgs>
      stream: Prisma.$StreamPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reporterId: string
      reportedId: string
      streamId: string | null
      reason: string
      details: string | null
      status: $Enums.ReportStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["moderationReport"]>
    composites: {}
  }

  type ModerationReportGetPayload<S extends boolean | null | undefined | ModerationReportDefaultArgs> = $Result.GetResult<Prisma.$ModerationReportPayload, S>

  type ModerationReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ModerationReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ModerationReportCountAggregateInputType | true
    }

  export interface ModerationReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ModerationReport'], meta: { name: 'ModerationReport' } }
    /**
     * Find zero or one ModerationReport that matches the filter.
     * @param {ModerationReportFindUniqueArgs} args - Arguments to find a ModerationReport
     * @example
     * // Get one ModerationReport
     * const moderationReport = await prisma.moderationReport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ModerationReportFindUniqueArgs>(args: SelectSubset<T, ModerationReportFindUniqueArgs<ExtArgs>>): Prisma__ModerationReportClient<$Result.GetResult<Prisma.$ModerationReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ModerationReport that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ModerationReportFindUniqueOrThrowArgs} args - Arguments to find a ModerationReport
     * @example
     * // Get one ModerationReport
     * const moderationReport = await prisma.moderationReport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ModerationReportFindUniqueOrThrowArgs>(args: SelectSubset<T, ModerationReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ModerationReportClient<$Result.GetResult<Prisma.$ModerationReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ModerationReport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModerationReportFindFirstArgs} args - Arguments to find a ModerationReport
     * @example
     * // Get one ModerationReport
     * const moderationReport = await prisma.moderationReport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ModerationReportFindFirstArgs>(args?: SelectSubset<T, ModerationReportFindFirstArgs<ExtArgs>>): Prisma__ModerationReportClient<$Result.GetResult<Prisma.$ModerationReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ModerationReport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModerationReportFindFirstOrThrowArgs} args - Arguments to find a ModerationReport
     * @example
     * // Get one ModerationReport
     * const moderationReport = await prisma.moderationReport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ModerationReportFindFirstOrThrowArgs>(args?: SelectSubset<T, ModerationReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ModerationReportClient<$Result.GetResult<Prisma.$ModerationReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ModerationReports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModerationReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ModerationReports
     * const moderationReports = await prisma.moderationReport.findMany()
     * 
     * // Get first 10 ModerationReports
     * const moderationReports = await prisma.moderationReport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moderationReportWithIdOnly = await prisma.moderationReport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ModerationReportFindManyArgs>(args?: SelectSubset<T, ModerationReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModerationReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ModerationReport.
     * @param {ModerationReportCreateArgs} args - Arguments to create a ModerationReport.
     * @example
     * // Create one ModerationReport
     * const ModerationReport = await prisma.moderationReport.create({
     *   data: {
     *     // ... data to create a ModerationReport
     *   }
     * })
     * 
     */
    create<T extends ModerationReportCreateArgs>(args: SelectSubset<T, ModerationReportCreateArgs<ExtArgs>>): Prisma__ModerationReportClient<$Result.GetResult<Prisma.$ModerationReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ModerationReports.
     * @param {ModerationReportCreateManyArgs} args - Arguments to create many ModerationReports.
     * @example
     * // Create many ModerationReports
     * const moderationReport = await prisma.moderationReport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ModerationReportCreateManyArgs>(args?: SelectSubset<T, ModerationReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ModerationReports and returns the data saved in the database.
     * @param {ModerationReportCreateManyAndReturnArgs} args - Arguments to create many ModerationReports.
     * @example
     * // Create many ModerationReports
     * const moderationReport = await prisma.moderationReport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ModerationReports and only return the `id`
     * const moderationReportWithIdOnly = await prisma.moderationReport.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ModerationReportCreateManyAndReturnArgs>(args?: SelectSubset<T, ModerationReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModerationReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ModerationReport.
     * @param {ModerationReportDeleteArgs} args - Arguments to delete one ModerationReport.
     * @example
     * // Delete one ModerationReport
     * const ModerationReport = await prisma.moderationReport.delete({
     *   where: {
     *     // ... filter to delete one ModerationReport
     *   }
     * })
     * 
     */
    delete<T extends ModerationReportDeleteArgs>(args: SelectSubset<T, ModerationReportDeleteArgs<ExtArgs>>): Prisma__ModerationReportClient<$Result.GetResult<Prisma.$ModerationReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ModerationReport.
     * @param {ModerationReportUpdateArgs} args - Arguments to update one ModerationReport.
     * @example
     * // Update one ModerationReport
     * const moderationReport = await prisma.moderationReport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ModerationReportUpdateArgs>(args: SelectSubset<T, ModerationReportUpdateArgs<ExtArgs>>): Prisma__ModerationReportClient<$Result.GetResult<Prisma.$ModerationReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ModerationReports.
     * @param {ModerationReportDeleteManyArgs} args - Arguments to filter ModerationReports to delete.
     * @example
     * // Delete a few ModerationReports
     * const { count } = await prisma.moderationReport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ModerationReportDeleteManyArgs>(args?: SelectSubset<T, ModerationReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModerationReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModerationReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ModerationReports
     * const moderationReport = await prisma.moderationReport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ModerationReportUpdateManyArgs>(args: SelectSubset<T, ModerationReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModerationReports and returns the data updated in the database.
     * @param {ModerationReportUpdateManyAndReturnArgs} args - Arguments to update many ModerationReports.
     * @example
     * // Update many ModerationReports
     * const moderationReport = await prisma.moderationReport.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ModerationReports and only return the `id`
     * const moderationReportWithIdOnly = await prisma.moderationReport.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ModerationReportUpdateManyAndReturnArgs>(args: SelectSubset<T, ModerationReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModerationReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ModerationReport.
     * @param {ModerationReportUpsertArgs} args - Arguments to update or create a ModerationReport.
     * @example
     * // Update or create a ModerationReport
     * const moderationReport = await prisma.moderationReport.upsert({
     *   create: {
     *     // ... data to create a ModerationReport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ModerationReport we want to update
     *   }
     * })
     */
    upsert<T extends ModerationReportUpsertArgs>(args: SelectSubset<T, ModerationReportUpsertArgs<ExtArgs>>): Prisma__ModerationReportClient<$Result.GetResult<Prisma.$ModerationReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ModerationReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModerationReportCountArgs} args - Arguments to filter ModerationReports to count.
     * @example
     * // Count the number of ModerationReports
     * const count = await prisma.moderationReport.count({
     *   where: {
     *     // ... the filter for the ModerationReports we want to count
     *   }
     * })
    **/
    count<T extends ModerationReportCountArgs>(
      args?: Subset<T, ModerationReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModerationReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ModerationReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModerationReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ModerationReportAggregateArgs>(args: Subset<T, ModerationReportAggregateArgs>): Prisma.PrismaPromise<GetModerationReportAggregateType<T>>

    /**
     * Group by ModerationReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModerationReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ModerationReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModerationReportGroupByArgs['orderBy'] }
        : { orderBy?: ModerationReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModerationReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModerationReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ModerationReport model
   */
  readonly fields: ModerationReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ModerationReport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ModerationReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reporter<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reported<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    stream<T extends ModerationReport$streamArgs<ExtArgs> = {}>(args?: Subset<T, ModerationReport$streamArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ModerationReport model
   */
  interface ModerationReportFieldRefs {
    readonly id: FieldRef<"ModerationReport", 'String'>
    readonly reporterId: FieldRef<"ModerationReport", 'String'>
    readonly reportedId: FieldRef<"ModerationReport", 'String'>
    readonly streamId: FieldRef<"ModerationReport", 'String'>
    readonly reason: FieldRef<"ModerationReport", 'String'>
    readonly details: FieldRef<"ModerationReport", 'String'>
    readonly status: FieldRef<"ModerationReport", 'ReportStatus'>
    readonly createdAt: FieldRef<"ModerationReport", 'DateTime'>
    readonly updatedAt: FieldRef<"ModerationReport", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ModerationReport findUnique
   */
  export type ModerationReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationReport
     */
    select?: ModerationReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationReport
     */
    omit?: ModerationReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationReportInclude<ExtArgs> | null
    /**
     * Filter, which ModerationReport to fetch.
     */
    where: ModerationReportWhereUniqueInput
  }

  /**
   * ModerationReport findUniqueOrThrow
   */
  export type ModerationReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationReport
     */
    select?: ModerationReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationReport
     */
    omit?: ModerationReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationReportInclude<ExtArgs> | null
    /**
     * Filter, which ModerationReport to fetch.
     */
    where: ModerationReportWhereUniqueInput
  }

  /**
   * ModerationReport findFirst
   */
  export type ModerationReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationReport
     */
    select?: ModerationReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationReport
     */
    omit?: ModerationReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationReportInclude<ExtArgs> | null
    /**
     * Filter, which ModerationReport to fetch.
     */
    where?: ModerationReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModerationReports to fetch.
     */
    orderBy?: ModerationReportOrderByWithRelationInput | ModerationReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModerationReports.
     */
    cursor?: ModerationReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModerationReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModerationReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModerationReports.
     */
    distinct?: ModerationReportScalarFieldEnum | ModerationReportScalarFieldEnum[]
  }

  /**
   * ModerationReport findFirstOrThrow
   */
  export type ModerationReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationReport
     */
    select?: ModerationReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationReport
     */
    omit?: ModerationReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationReportInclude<ExtArgs> | null
    /**
     * Filter, which ModerationReport to fetch.
     */
    where?: ModerationReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModerationReports to fetch.
     */
    orderBy?: ModerationReportOrderByWithRelationInput | ModerationReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModerationReports.
     */
    cursor?: ModerationReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModerationReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModerationReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModerationReports.
     */
    distinct?: ModerationReportScalarFieldEnum | ModerationReportScalarFieldEnum[]
  }

  /**
   * ModerationReport findMany
   */
  export type ModerationReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationReport
     */
    select?: ModerationReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationReport
     */
    omit?: ModerationReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationReportInclude<ExtArgs> | null
    /**
     * Filter, which ModerationReports to fetch.
     */
    where?: ModerationReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModerationReports to fetch.
     */
    orderBy?: ModerationReportOrderByWithRelationInput | ModerationReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ModerationReports.
     */
    cursor?: ModerationReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModerationReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModerationReports.
     */
    skip?: number
    distinct?: ModerationReportScalarFieldEnum | ModerationReportScalarFieldEnum[]
  }

  /**
   * ModerationReport create
   */
  export type ModerationReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationReport
     */
    select?: ModerationReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationReport
     */
    omit?: ModerationReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationReportInclude<ExtArgs> | null
    /**
     * The data needed to create a ModerationReport.
     */
    data: XOR<ModerationReportCreateInput, ModerationReportUncheckedCreateInput>
  }

  /**
   * ModerationReport createMany
   */
  export type ModerationReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ModerationReports.
     */
    data: ModerationReportCreateManyInput | ModerationReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ModerationReport createManyAndReturn
   */
  export type ModerationReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationReport
     */
    select?: ModerationReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationReport
     */
    omit?: ModerationReportOmit<ExtArgs> | null
    /**
     * The data used to create many ModerationReports.
     */
    data: ModerationReportCreateManyInput | ModerationReportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ModerationReport update
   */
  export type ModerationReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationReport
     */
    select?: ModerationReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationReport
     */
    omit?: ModerationReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationReportInclude<ExtArgs> | null
    /**
     * The data needed to update a ModerationReport.
     */
    data: XOR<ModerationReportUpdateInput, ModerationReportUncheckedUpdateInput>
    /**
     * Choose, which ModerationReport to update.
     */
    where: ModerationReportWhereUniqueInput
  }

  /**
   * ModerationReport updateMany
   */
  export type ModerationReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ModerationReports.
     */
    data: XOR<ModerationReportUpdateManyMutationInput, ModerationReportUncheckedUpdateManyInput>
    /**
     * Filter which ModerationReports to update
     */
    where?: ModerationReportWhereInput
    /**
     * Limit how many ModerationReports to update.
     */
    limit?: number
  }

  /**
   * ModerationReport updateManyAndReturn
   */
  export type ModerationReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationReport
     */
    select?: ModerationReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationReport
     */
    omit?: ModerationReportOmit<ExtArgs> | null
    /**
     * The data used to update ModerationReports.
     */
    data: XOR<ModerationReportUpdateManyMutationInput, ModerationReportUncheckedUpdateManyInput>
    /**
     * Filter which ModerationReports to update
     */
    where?: ModerationReportWhereInput
    /**
     * Limit how many ModerationReports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationReportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ModerationReport upsert
   */
  export type ModerationReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationReport
     */
    select?: ModerationReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationReport
     */
    omit?: ModerationReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationReportInclude<ExtArgs> | null
    /**
     * The filter to search for the ModerationReport to update in case it exists.
     */
    where: ModerationReportWhereUniqueInput
    /**
     * In case the ModerationReport found by the `where` argument doesn't exist, create a new ModerationReport with this data.
     */
    create: XOR<ModerationReportCreateInput, ModerationReportUncheckedCreateInput>
    /**
     * In case the ModerationReport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModerationReportUpdateInput, ModerationReportUncheckedUpdateInput>
  }

  /**
   * ModerationReport delete
   */
  export type ModerationReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationReport
     */
    select?: ModerationReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationReport
     */
    omit?: ModerationReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationReportInclude<ExtArgs> | null
    /**
     * Filter which ModerationReport to delete.
     */
    where: ModerationReportWhereUniqueInput
  }

  /**
   * ModerationReport deleteMany
   */
  export type ModerationReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModerationReports to delete
     */
    where?: ModerationReportWhereInput
    /**
     * Limit how many ModerationReports to delete.
     */
    limit?: number
  }

  /**
   * ModerationReport.stream
   */
  export type ModerationReport$streamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    where?: StreamWhereInput
  }

  /**
   * ModerationReport without action
   */
  export type ModerationReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationReport
     */
    select?: ModerationReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationReport
     */
    omit?: ModerationReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationReportInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password: 'password',
    role: 'role',
    avatar: 'avatar',
    bio: 'bio',
    cover: 'cover',
    tiktokActive: 'tiktokActive',
    tiktokUrl: 'tiktokUrl',
    instagramActive: 'instagramActive',
    instagramUrl: 'instagramUrl',
    youtubeActive: 'youtubeActive',
    youtubeUrl: 'youtubeUrl',
    facebookActive: 'facebookActive',
    facebookUrl: 'facebookUrl',
    isLive: 'isLive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PostScalarFieldEnum: {
    id: 'id',
    title: 'title',
    url: 'url',
    type: 'type',
    isPrivate: 'isPrivate',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const WalletScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    balance: 'balance',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WalletScalarFieldEnum = (typeof WalletScalarFieldEnum)[keyof typeof WalletScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    type: 'type',
    walletId: 'walletId',
    giftId: 'giftId',
    referenceId: 'referenceId',
    createdAt: 'createdAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const GiftScalarFieldEnum: {
    id: 'id',
    name: 'name',
    price: 'price',
    icon: 'icon',
    animationUrl: 'animationUrl'
  };

  export type GiftScalarFieldEnum = (typeof GiftScalarFieldEnum)[keyof typeof GiftScalarFieldEnum]


  export const StreamScalarFieldEnum: {
    id: 'id',
    title: 'title',
    thumbnail: 'thumbnail',
    isLive: 'isLive',
    category: 'category',
    userId: 'userId',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StreamScalarFieldEnum = (typeof StreamScalarFieldEnum)[keyof typeof StreamScalarFieldEnum]


  export const LiveRoomScalarFieldEnum: {
    id: 'id',
    streamId: 'streamId',
    activeViewers: 'activeViewers',
    totalViews: 'totalViews',
    likes: 'likes'
  };

  export type LiveRoomScalarFieldEnum = (typeof LiveRoomScalarFieldEnum)[keyof typeof LiveRoomScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    content: 'content',
    userId: 'userId',
    streamId: 'streamId',
    isGift: 'isGift',
    giftId: 'giftId',
    createdAt: 'createdAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const FollowScalarFieldEnum: {
    id: 'id',
    followerId: 'followerId',
    followingId: 'followingId',
    createdAt: 'createdAt'
  };

  export type FollowScalarFieldEnum = (typeof FollowScalarFieldEnum)[keyof typeof FollowScalarFieldEnum]


  export const StreamBattleScalarFieldEnum: {
    id: 'id',
    stream1Id: 'stream1Id',
    stream2Id: 'stream2Id',
    points1: 'points1',
    points2: 'points2',
    winnerId: 'winnerId',
    status: 'status',
    startTime: 'startTime',
    endTime: 'endTime',
    createdAt: 'createdAt'
  };

  export type StreamBattleScalarFieldEnum = (typeof StreamBattleScalarFieldEnum)[keyof typeof StreamBattleScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    content: 'content',
    isRead: 'isRead',
    link: 'link',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const ModerationReportScalarFieldEnum: {
    id: 'id',
    reporterId: 'reporterId',
    reportedId: 'reportedId',
    streamId: 'streamId',
    reason: 'reason',
    details: 'details',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ModerationReportScalarFieldEnum = (typeof ModerationReportScalarFieldEnum)[keyof typeof ModerationReportScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'PostType'
   */
  export type EnumPostTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PostType'>
    


  /**
   * Reference to a field of type 'PostType[]'
   */
  export type ListEnumPostTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PostType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'TransactionType'
   */
  export type EnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType'>
    


  /**
   * Reference to a field of type 'TransactionType[]'
   */
  export type ListEnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType[]'>
    


  /**
   * Reference to a field of type 'BattleStatus'
   */
  export type EnumBattleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BattleStatus'>
    


  /**
   * Reference to a field of type 'BattleStatus[]'
   */
  export type ListEnumBattleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BattleStatus[]'>
    


  /**
   * Reference to a field of type 'NotificationType'
   */
  export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>
    


  /**
   * Reference to a field of type 'NotificationType[]'
   */
  export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>
    


  /**
   * Reference to a field of type 'ReportStatus'
   */
  export type EnumReportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportStatus'>
    


  /**
   * Reference to a field of type 'ReportStatus[]'
   */
  export type ListEnumReportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    avatar?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    cover?: StringNullableFilter<"User"> | string | null
    tiktokActive?: BoolFilter<"User"> | boolean
    tiktokUrl?: StringNullableFilter<"User"> | string | null
    instagramActive?: BoolFilter<"User"> | boolean
    instagramUrl?: StringNullableFilter<"User"> | string | null
    youtubeActive?: BoolFilter<"User"> | boolean
    youtubeUrl?: StringNullableFilter<"User"> | string | null
    facebookActive?: BoolFilter<"User"> | boolean
    facebookUrl?: StringNullableFilter<"User"> | string | null
    isLive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    stream?: XOR<StreamNullableScalarRelationFilter, StreamWhereInput> | null
    wallet?: XOR<WalletNullableScalarRelationFilter, WalletWhereInput> | null
    posts?: PostListRelationFilter
    following?: FollowListRelationFilter
    followers?: FollowListRelationFilter
    notifications?: NotificationListRelationFilter
    reportsMade?: ModerationReportListRelationFilter
    reports?: ModerationReportListRelationFilter
    messages?: MessageListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    avatar?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    cover?: SortOrderInput | SortOrder
    tiktokActive?: SortOrder
    tiktokUrl?: SortOrderInput | SortOrder
    instagramActive?: SortOrder
    instagramUrl?: SortOrderInput | SortOrder
    youtubeActive?: SortOrder
    youtubeUrl?: SortOrderInput | SortOrder
    facebookActive?: SortOrder
    facebookUrl?: SortOrderInput | SortOrder
    isLive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    stream?: StreamOrderByWithRelationInput
    wallet?: WalletOrderByWithRelationInput
    posts?: PostOrderByRelationAggregateInput
    following?: FollowOrderByRelationAggregateInput
    followers?: FollowOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    reportsMade?: ModerationReportOrderByRelationAggregateInput
    reports?: ModerationReportOrderByRelationAggregateInput
    messages?: MessageOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    avatar?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    cover?: StringNullableFilter<"User"> | string | null
    tiktokActive?: BoolFilter<"User"> | boolean
    tiktokUrl?: StringNullableFilter<"User"> | string | null
    instagramActive?: BoolFilter<"User"> | boolean
    instagramUrl?: StringNullableFilter<"User"> | string | null
    youtubeActive?: BoolFilter<"User"> | boolean
    youtubeUrl?: StringNullableFilter<"User"> | string | null
    facebookActive?: BoolFilter<"User"> | boolean
    facebookUrl?: StringNullableFilter<"User"> | string | null
    isLive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    stream?: XOR<StreamNullableScalarRelationFilter, StreamWhereInput> | null
    wallet?: XOR<WalletNullableScalarRelationFilter, WalletWhereInput> | null
    posts?: PostListRelationFilter
    following?: FollowListRelationFilter
    followers?: FollowListRelationFilter
    notifications?: NotificationListRelationFilter
    reportsMade?: ModerationReportListRelationFilter
    reports?: ModerationReportListRelationFilter
    messages?: MessageListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    avatar?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    cover?: SortOrderInput | SortOrder
    tiktokActive?: SortOrder
    tiktokUrl?: SortOrderInput | SortOrder
    instagramActive?: SortOrder
    instagramUrl?: SortOrderInput | SortOrder
    youtubeActive?: SortOrder
    youtubeUrl?: SortOrderInput | SortOrder
    facebookActive?: SortOrder
    facebookUrl?: SortOrderInput | SortOrder
    isLive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    cover?: StringNullableWithAggregatesFilter<"User"> | string | null
    tiktokActive?: BoolWithAggregatesFilter<"User"> | boolean
    tiktokUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    instagramActive?: BoolWithAggregatesFilter<"User"> | boolean
    instagramUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    youtubeActive?: BoolWithAggregatesFilter<"User"> | boolean
    youtubeUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    facebookActive?: BoolWithAggregatesFilter<"User"> | boolean
    facebookUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    isLive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: StringFilter<"Post"> | string
    title?: StringFilter<"Post"> | string
    url?: StringFilter<"Post"> | string
    type?: EnumPostTypeFilter<"Post"> | $Enums.PostType
    isPrivate?: BoolFilter<"Post"> | boolean
    userId?: StringFilter<"Post"> | string
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    type?: SortOrder
    isPrivate?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    title?: StringFilter<"Post"> | string
    url?: StringFilter<"Post"> | string
    type?: EnumPostTypeFilter<"Post"> | $Enums.PostType
    isPrivate?: BoolFilter<"Post"> | boolean
    userId?: StringFilter<"Post"> | string
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    type?: SortOrder
    isPrivate?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PostCountOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Post"> | string
    title?: StringWithAggregatesFilter<"Post"> | string
    url?: StringWithAggregatesFilter<"Post"> | string
    type?: EnumPostTypeWithAggregatesFilter<"Post"> | $Enums.PostType
    isPrivate?: BoolWithAggregatesFilter<"Post"> | boolean
    userId?: StringWithAggregatesFilter<"Post"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
  }

  export type WalletWhereInput = {
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    id?: StringFilter<"Wallet"> | string
    userId?: StringFilter<"Wallet"> | string
    balance?: IntFilter<"Wallet"> | number
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeFilter<"Wallet"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    transactions?: TransactionListRelationFilter
  }

  export type WalletOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    transactions?: TransactionOrderByRelationAggregateInput
  }

  export type WalletWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    balance?: IntFilter<"Wallet"> | number
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeFilter<"Wallet"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    transactions?: TransactionListRelationFilter
  }, "id" | "userId">

  export type WalletOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WalletCountOrderByAggregateInput
    _avg?: WalletAvgOrderByAggregateInput
    _max?: WalletMaxOrderByAggregateInput
    _min?: WalletMinOrderByAggregateInput
    _sum?: WalletSumOrderByAggregateInput
  }

  export type WalletScalarWhereWithAggregatesInput = {
    AND?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    OR?: WalletScalarWhereWithAggregatesInput[]
    NOT?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Wallet"> | string
    userId?: StringWithAggregatesFilter<"Wallet"> | string
    balance?: IntWithAggregatesFilter<"Wallet"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Wallet"> | Date | string
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    amount?: IntFilter<"Transaction"> | number
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    walletId?: StringFilter<"Transaction"> | string
    giftId?: StringNullableFilter<"Transaction"> | string | null
    referenceId?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    wallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
    gift?: XOR<GiftNullableScalarRelationFilter, GiftWhereInput> | null
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    walletId?: SortOrder
    giftId?: SortOrderInput | SortOrder
    referenceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    wallet?: WalletOrderByWithRelationInput
    gift?: GiftOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    amount?: IntFilter<"Transaction"> | number
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    walletId?: StringFilter<"Transaction"> | string
    giftId?: StringNullableFilter<"Transaction"> | string | null
    referenceId?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    wallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
    gift?: XOR<GiftNullableScalarRelationFilter, GiftWhereInput> | null
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    walletId?: SortOrder
    giftId?: SortOrderInput | SortOrder
    referenceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    amount?: IntWithAggregatesFilter<"Transaction"> | number
    type?: EnumTransactionTypeWithAggregatesFilter<"Transaction"> | $Enums.TransactionType
    walletId?: StringWithAggregatesFilter<"Transaction"> | string
    giftId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    referenceId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type GiftWhereInput = {
    AND?: GiftWhereInput | GiftWhereInput[]
    OR?: GiftWhereInput[]
    NOT?: GiftWhereInput | GiftWhereInput[]
    id?: StringFilter<"Gift"> | string
    name?: StringFilter<"Gift"> | string
    price?: IntFilter<"Gift"> | number
    icon?: StringFilter<"Gift"> | string
    animationUrl?: StringNullableFilter<"Gift"> | string | null
    transactions?: TransactionListRelationFilter
  }

  export type GiftOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    icon?: SortOrder
    animationUrl?: SortOrderInput | SortOrder
    transactions?: TransactionOrderByRelationAggregateInput
  }

  export type GiftWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GiftWhereInput | GiftWhereInput[]
    OR?: GiftWhereInput[]
    NOT?: GiftWhereInput | GiftWhereInput[]
    name?: StringFilter<"Gift"> | string
    price?: IntFilter<"Gift"> | number
    icon?: StringFilter<"Gift"> | string
    animationUrl?: StringNullableFilter<"Gift"> | string | null
    transactions?: TransactionListRelationFilter
  }, "id">

  export type GiftOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    icon?: SortOrder
    animationUrl?: SortOrderInput | SortOrder
    _count?: GiftCountOrderByAggregateInput
    _avg?: GiftAvgOrderByAggregateInput
    _max?: GiftMaxOrderByAggregateInput
    _min?: GiftMinOrderByAggregateInput
    _sum?: GiftSumOrderByAggregateInput
  }

  export type GiftScalarWhereWithAggregatesInput = {
    AND?: GiftScalarWhereWithAggregatesInput | GiftScalarWhereWithAggregatesInput[]
    OR?: GiftScalarWhereWithAggregatesInput[]
    NOT?: GiftScalarWhereWithAggregatesInput | GiftScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Gift"> | string
    name?: StringWithAggregatesFilter<"Gift"> | string
    price?: IntWithAggregatesFilter<"Gift"> | number
    icon?: StringWithAggregatesFilter<"Gift"> | string
    animationUrl?: StringNullableWithAggregatesFilter<"Gift"> | string | null
  }

  export type StreamWhereInput = {
    AND?: StreamWhereInput | StreamWhereInput[]
    OR?: StreamWhereInput[]
    NOT?: StreamWhereInput | StreamWhereInput[]
    id?: StringFilter<"Stream"> | string
    title?: StringFilter<"Stream"> | string
    thumbnail?: StringNullableFilter<"Stream"> | string | null
    isLive?: BoolFilter<"Stream"> | boolean
    category?: StringNullableFilter<"Stream"> | string | null
    userId?: StringFilter<"Stream"> | string
    startedAt?: DateTimeNullableFilter<"Stream"> | Date | string | null
    endedAt?: DateTimeNullableFilter<"Stream"> | Date | string | null
    createdAt?: DateTimeFilter<"Stream"> | Date | string
    updatedAt?: DateTimeFilter<"Stream"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    messages?: MessageListRelationFilter
    liveRoom?: XOR<LiveRoomNullableScalarRelationFilter, LiveRoomWhereInput> | null
    battles1?: StreamBattleListRelationFilter
    battles2?: StreamBattleListRelationFilter
    reports?: ModerationReportListRelationFilter
  }

  export type StreamOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    thumbnail?: SortOrderInput | SortOrder
    isLive?: SortOrder
    category?: SortOrderInput | SortOrder
    userId?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    endedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    messages?: MessageOrderByRelationAggregateInput
    liveRoom?: LiveRoomOrderByWithRelationInput
    battles1?: StreamBattleOrderByRelationAggregateInput
    battles2?: StreamBattleOrderByRelationAggregateInput
    reports?: ModerationReportOrderByRelationAggregateInput
  }

  export type StreamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: StreamWhereInput | StreamWhereInput[]
    OR?: StreamWhereInput[]
    NOT?: StreamWhereInput | StreamWhereInput[]
    title?: StringFilter<"Stream"> | string
    thumbnail?: StringNullableFilter<"Stream"> | string | null
    isLive?: BoolFilter<"Stream"> | boolean
    category?: StringNullableFilter<"Stream"> | string | null
    startedAt?: DateTimeNullableFilter<"Stream"> | Date | string | null
    endedAt?: DateTimeNullableFilter<"Stream"> | Date | string | null
    createdAt?: DateTimeFilter<"Stream"> | Date | string
    updatedAt?: DateTimeFilter<"Stream"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    messages?: MessageListRelationFilter
    liveRoom?: XOR<LiveRoomNullableScalarRelationFilter, LiveRoomWhereInput> | null
    battles1?: StreamBattleListRelationFilter
    battles2?: StreamBattleListRelationFilter
    reports?: ModerationReportListRelationFilter
  }, "id" | "userId">

  export type StreamOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    thumbnail?: SortOrderInput | SortOrder
    isLive?: SortOrder
    category?: SortOrderInput | SortOrder
    userId?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    endedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StreamCountOrderByAggregateInput
    _max?: StreamMaxOrderByAggregateInput
    _min?: StreamMinOrderByAggregateInput
  }

  export type StreamScalarWhereWithAggregatesInput = {
    AND?: StreamScalarWhereWithAggregatesInput | StreamScalarWhereWithAggregatesInput[]
    OR?: StreamScalarWhereWithAggregatesInput[]
    NOT?: StreamScalarWhereWithAggregatesInput | StreamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Stream"> | string
    title?: StringWithAggregatesFilter<"Stream"> | string
    thumbnail?: StringNullableWithAggregatesFilter<"Stream"> | string | null
    isLive?: BoolWithAggregatesFilter<"Stream"> | boolean
    category?: StringNullableWithAggregatesFilter<"Stream"> | string | null
    userId?: StringWithAggregatesFilter<"Stream"> | string
    startedAt?: DateTimeNullableWithAggregatesFilter<"Stream"> | Date | string | null
    endedAt?: DateTimeNullableWithAggregatesFilter<"Stream"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Stream"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Stream"> | Date | string
  }

  export type LiveRoomWhereInput = {
    AND?: LiveRoomWhereInput | LiveRoomWhereInput[]
    OR?: LiveRoomWhereInput[]
    NOT?: LiveRoomWhereInput | LiveRoomWhereInput[]
    id?: StringFilter<"LiveRoom"> | string
    streamId?: StringFilter<"LiveRoom"> | string
    activeViewers?: IntFilter<"LiveRoom"> | number
    totalViews?: IntFilter<"LiveRoom"> | number
    likes?: IntFilter<"LiveRoom"> | number
    stream?: XOR<StreamScalarRelationFilter, StreamWhereInput>
  }

  export type LiveRoomOrderByWithRelationInput = {
    id?: SortOrder
    streamId?: SortOrder
    activeViewers?: SortOrder
    totalViews?: SortOrder
    likes?: SortOrder
    stream?: StreamOrderByWithRelationInput
  }

  export type LiveRoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    streamId?: string
    AND?: LiveRoomWhereInput | LiveRoomWhereInput[]
    OR?: LiveRoomWhereInput[]
    NOT?: LiveRoomWhereInput | LiveRoomWhereInput[]
    activeViewers?: IntFilter<"LiveRoom"> | number
    totalViews?: IntFilter<"LiveRoom"> | number
    likes?: IntFilter<"LiveRoom"> | number
    stream?: XOR<StreamScalarRelationFilter, StreamWhereInput>
  }, "id" | "streamId">

  export type LiveRoomOrderByWithAggregationInput = {
    id?: SortOrder
    streamId?: SortOrder
    activeViewers?: SortOrder
    totalViews?: SortOrder
    likes?: SortOrder
    _count?: LiveRoomCountOrderByAggregateInput
    _avg?: LiveRoomAvgOrderByAggregateInput
    _max?: LiveRoomMaxOrderByAggregateInput
    _min?: LiveRoomMinOrderByAggregateInput
    _sum?: LiveRoomSumOrderByAggregateInput
  }

  export type LiveRoomScalarWhereWithAggregatesInput = {
    AND?: LiveRoomScalarWhereWithAggregatesInput | LiveRoomScalarWhereWithAggregatesInput[]
    OR?: LiveRoomScalarWhereWithAggregatesInput[]
    NOT?: LiveRoomScalarWhereWithAggregatesInput | LiveRoomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LiveRoom"> | string
    streamId?: StringWithAggregatesFilter<"LiveRoom"> | string
    activeViewers?: IntWithAggregatesFilter<"LiveRoom"> | number
    totalViews?: IntWithAggregatesFilter<"LiveRoom"> | number
    likes?: IntWithAggregatesFilter<"LiveRoom"> | number
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    userId?: StringFilter<"Message"> | string
    streamId?: StringFilter<"Message"> | string
    isGift?: BoolFilter<"Message"> | boolean
    giftId?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    stream?: XOR<StreamScalarRelationFilter, StreamWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    userId?: SortOrder
    streamId?: SortOrder
    isGift?: SortOrder
    giftId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    stream?: StreamOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    content?: StringFilter<"Message"> | string
    userId?: StringFilter<"Message"> | string
    streamId?: StringFilter<"Message"> | string
    isGift?: BoolFilter<"Message"> | boolean
    giftId?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    stream?: XOR<StreamScalarRelationFilter, StreamWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    userId?: SortOrder
    streamId?: SortOrder
    isGift?: SortOrder
    giftId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    userId?: StringWithAggregatesFilter<"Message"> | string
    streamId?: StringWithAggregatesFilter<"Message"> | string
    isGift?: BoolWithAggregatesFilter<"Message"> | boolean
    giftId?: StringNullableWithAggregatesFilter<"Message"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type FollowWhereInput = {
    AND?: FollowWhereInput | FollowWhereInput[]
    OR?: FollowWhereInput[]
    NOT?: FollowWhereInput | FollowWhereInput[]
    id?: StringFilter<"Follow"> | string
    followerId?: StringFilter<"Follow"> | string
    followingId?: StringFilter<"Follow"> | string
    createdAt?: DateTimeFilter<"Follow"> | Date | string
    follower?: XOR<UserScalarRelationFilter, UserWhereInput>
    following?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FollowOrderByWithRelationInput = {
    id?: SortOrder
    followerId?: SortOrder
    followingId?: SortOrder
    createdAt?: SortOrder
    follower?: UserOrderByWithRelationInput
    following?: UserOrderByWithRelationInput
  }

  export type FollowWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    followerId_followingId?: FollowFollowerIdFollowingIdCompoundUniqueInput
    AND?: FollowWhereInput | FollowWhereInput[]
    OR?: FollowWhereInput[]
    NOT?: FollowWhereInput | FollowWhereInput[]
    followerId?: StringFilter<"Follow"> | string
    followingId?: StringFilter<"Follow"> | string
    createdAt?: DateTimeFilter<"Follow"> | Date | string
    follower?: XOR<UserScalarRelationFilter, UserWhereInput>
    following?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "followerId_followingId">

  export type FollowOrderByWithAggregationInput = {
    id?: SortOrder
    followerId?: SortOrder
    followingId?: SortOrder
    createdAt?: SortOrder
    _count?: FollowCountOrderByAggregateInput
    _max?: FollowMaxOrderByAggregateInput
    _min?: FollowMinOrderByAggregateInput
  }

  export type FollowScalarWhereWithAggregatesInput = {
    AND?: FollowScalarWhereWithAggregatesInput | FollowScalarWhereWithAggregatesInput[]
    OR?: FollowScalarWhereWithAggregatesInput[]
    NOT?: FollowScalarWhereWithAggregatesInput | FollowScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Follow"> | string
    followerId?: StringWithAggregatesFilter<"Follow"> | string
    followingId?: StringWithAggregatesFilter<"Follow"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Follow"> | Date | string
  }

  export type StreamBattleWhereInput = {
    AND?: StreamBattleWhereInput | StreamBattleWhereInput[]
    OR?: StreamBattleWhereInput[]
    NOT?: StreamBattleWhereInput | StreamBattleWhereInput[]
    id?: StringFilter<"StreamBattle"> | string
    stream1Id?: StringFilter<"StreamBattle"> | string
    stream2Id?: StringFilter<"StreamBattle"> | string
    points1?: IntFilter<"StreamBattle"> | number
    points2?: IntFilter<"StreamBattle"> | number
    winnerId?: StringNullableFilter<"StreamBattle"> | string | null
    status?: EnumBattleStatusFilter<"StreamBattle"> | $Enums.BattleStatus
    startTime?: DateTimeNullableFilter<"StreamBattle"> | Date | string | null
    endTime?: DateTimeNullableFilter<"StreamBattle"> | Date | string | null
    createdAt?: DateTimeFilter<"StreamBattle"> | Date | string
    stream1?: XOR<StreamScalarRelationFilter, StreamWhereInput>
    stream2?: XOR<StreamScalarRelationFilter, StreamWhereInput>
  }

  export type StreamBattleOrderByWithRelationInput = {
    id?: SortOrder
    stream1Id?: SortOrder
    stream2Id?: SortOrder
    points1?: SortOrder
    points2?: SortOrder
    winnerId?: SortOrderInput | SortOrder
    status?: SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    stream1?: StreamOrderByWithRelationInput
    stream2?: StreamOrderByWithRelationInput
  }

  export type StreamBattleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StreamBattleWhereInput | StreamBattleWhereInput[]
    OR?: StreamBattleWhereInput[]
    NOT?: StreamBattleWhereInput | StreamBattleWhereInput[]
    stream1Id?: StringFilter<"StreamBattle"> | string
    stream2Id?: StringFilter<"StreamBattle"> | string
    points1?: IntFilter<"StreamBattle"> | number
    points2?: IntFilter<"StreamBattle"> | number
    winnerId?: StringNullableFilter<"StreamBattle"> | string | null
    status?: EnumBattleStatusFilter<"StreamBattle"> | $Enums.BattleStatus
    startTime?: DateTimeNullableFilter<"StreamBattle"> | Date | string | null
    endTime?: DateTimeNullableFilter<"StreamBattle"> | Date | string | null
    createdAt?: DateTimeFilter<"StreamBattle"> | Date | string
    stream1?: XOR<StreamScalarRelationFilter, StreamWhereInput>
    stream2?: XOR<StreamScalarRelationFilter, StreamWhereInput>
  }, "id">

  export type StreamBattleOrderByWithAggregationInput = {
    id?: SortOrder
    stream1Id?: SortOrder
    stream2Id?: SortOrder
    points1?: SortOrder
    points2?: SortOrder
    winnerId?: SortOrderInput | SortOrder
    status?: SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: StreamBattleCountOrderByAggregateInput
    _avg?: StreamBattleAvgOrderByAggregateInput
    _max?: StreamBattleMaxOrderByAggregateInput
    _min?: StreamBattleMinOrderByAggregateInput
    _sum?: StreamBattleSumOrderByAggregateInput
  }

  export type StreamBattleScalarWhereWithAggregatesInput = {
    AND?: StreamBattleScalarWhereWithAggregatesInput | StreamBattleScalarWhereWithAggregatesInput[]
    OR?: StreamBattleScalarWhereWithAggregatesInput[]
    NOT?: StreamBattleScalarWhereWithAggregatesInput | StreamBattleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StreamBattle"> | string
    stream1Id?: StringWithAggregatesFilter<"StreamBattle"> | string
    stream2Id?: StringWithAggregatesFilter<"StreamBattle"> | string
    points1?: IntWithAggregatesFilter<"StreamBattle"> | number
    points2?: IntWithAggregatesFilter<"StreamBattle"> | number
    winnerId?: StringNullableWithAggregatesFilter<"StreamBattle"> | string | null
    status?: EnumBattleStatusWithAggregatesFilter<"StreamBattle"> | $Enums.BattleStatus
    startTime?: DateTimeNullableWithAggregatesFilter<"StreamBattle"> | Date | string | null
    endTime?: DateTimeNullableWithAggregatesFilter<"StreamBattle"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"StreamBattle"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    content?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    link?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    isRead?: SortOrder
    link?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    content?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    link?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    isRead?: SortOrder
    link?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
    type?: EnumNotificationTypeWithAggregatesFilter<"Notification"> | $Enums.NotificationType
    content?: StringWithAggregatesFilter<"Notification"> | string
    isRead?: BoolWithAggregatesFilter<"Notification"> | boolean
    link?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type ModerationReportWhereInput = {
    AND?: ModerationReportWhereInput | ModerationReportWhereInput[]
    OR?: ModerationReportWhereInput[]
    NOT?: ModerationReportWhereInput | ModerationReportWhereInput[]
    id?: StringFilter<"ModerationReport"> | string
    reporterId?: StringFilter<"ModerationReport"> | string
    reportedId?: StringFilter<"ModerationReport"> | string
    streamId?: StringNullableFilter<"ModerationReport"> | string | null
    reason?: StringFilter<"ModerationReport"> | string
    details?: StringNullableFilter<"ModerationReport"> | string | null
    status?: EnumReportStatusFilter<"ModerationReport"> | $Enums.ReportStatus
    createdAt?: DateTimeFilter<"ModerationReport"> | Date | string
    updatedAt?: DateTimeFilter<"ModerationReport"> | Date | string
    reporter?: XOR<UserScalarRelationFilter, UserWhereInput>
    reported?: XOR<UserScalarRelationFilter, UserWhereInput>
    stream?: XOR<StreamNullableScalarRelationFilter, StreamWhereInput> | null
  }

  export type ModerationReportOrderByWithRelationInput = {
    id?: SortOrder
    reporterId?: SortOrder
    reportedId?: SortOrder
    streamId?: SortOrderInput | SortOrder
    reason?: SortOrder
    details?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reporter?: UserOrderByWithRelationInput
    reported?: UserOrderByWithRelationInput
    stream?: StreamOrderByWithRelationInput
  }

  export type ModerationReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ModerationReportWhereInput | ModerationReportWhereInput[]
    OR?: ModerationReportWhereInput[]
    NOT?: ModerationReportWhereInput | ModerationReportWhereInput[]
    reporterId?: StringFilter<"ModerationReport"> | string
    reportedId?: StringFilter<"ModerationReport"> | string
    streamId?: StringNullableFilter<"ModerationReport"> | string | null
    reason?: StringFilter<"ModerationReport"> | string
    details?: StringNullableFilter<"ModerationReport"> | string | null
    status?: EnumReportStatusFilter<"ModerationReport"> | $Enums.ReportStatus
    createdAt?: DateTimeFilter<"ModerationReport"> | Date | string
    updatedAt?: DateTimeFilter<"ModerationReport"> | Date | string
    reporter?: XOR<UserScalarRelationFilter, UserWhereInput>
    reported?: XOR<UserScalarRelationFilter, UserWhereInput>
    stream?: XOR<StreamNullableScalarRelationFilter, StreamWhereInput> | null
  }, "id">

  export type ModerationReportOrderByWithAggregationInput = {
    id?: SortOrder
    reporterId?: SortOrder
    reportedId?: SortOrder
    streamId?: SortOrderInput | SortOrder
    reason?: SortOrder
    details?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ModerationReportCountOrderByAggregateInput
    _max?: ModerationReportMaxOrderByAggregateInput
    _min?: ModerationReportMinOrderByAggregateInput
  }

  export type ModerationReportScalarWhereWithAggregatesInput = {
    AND?: ModerationReportScalarWhereWithAggregatesInput | ModerationReportScalarWhereWithAggregatesInput[]
    OR?: ModerationReportScalarWhereWithAggregatesInput[]
    NOT?: ModerationReportScalarWhereWithAggregatesInput | ModerationReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ModerationReport"> | string
    reporterId?: StringWithAggregatesFilter<"ModerationReport"> | string
    reportedId?: StringWithAggregatesFilter<"ModerationReport"> | string
    streamId?: StringNullableWithAggregatesFilter<"ModerationReport"> | string | null
    reason?: StringWithAggregatesFilter<"ModerationReport"> | string
    details?: StringNullableWithAggregatesFilter<"ModerationReport"> | string | null
    status?: EnumReportStatusWithAggregatesFilter<"ModerationReport"> | $Enums.ReportStatus
    createdAt?: DateTimeWithAggregatesFilter<"ModerationReport"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ModerationReport"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    avatar?: string | null
    bio?: string | null
    cover?: string | null
    tiktokActive?: boolean
    tiktokUrl?: string | null
    instagramActive?: boolean
    instagramUrl?: string | null
    youtubeActive?: boolean
    youtubeUrl?: string | null
    facebookActive?: boolean
    facebookUrl?: string | null
    isLive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stream?: StreamCreateNestedOneWithoutUserInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    followers?: FollowCreateNestedManyWithoutFollowingInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    reportsMade?: ModerationReportCreateNestedManyWithoutReporterInput
    reports?: ModerationReportCreateNestedManyWithoutReportedInput
    messages?: MessageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    avatar?: string | null
    bio?: string | null
    cover?: string | null
    tiktokActive?: boolean
    tiktokUrl?: string | null
    instagramActive?: boolean
    instagramUrl?: string | null
    youtubeActive?: boolean
    youtubeUrl?: string | null
    facebookActive?: boolean
    facebookUrl?: string | null
    isLive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stream?: StreamUncheckedCreateNestedOneWithoutUserInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    reportsMade?: ModerationReportUncheckedCreateNestedManyWithoutReporterInput
    reports?: ModerationReportUncheckedCreateNestedManyWithoutReportedInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokActive?: BoolFieldUpdateOperationsInput | boolean
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramActive?: BoolFieldUpdateOperationsInput | boolean
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeActive?: BoolFieldUpdateOperationsInput | boolean
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookActive?: BoolFieldUpdateOperationsInput | boolean
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUpdateOneWithoutUserNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    followers?: FollowUpdateManyWithoutFollowingNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    reportsMade?: ModerationReportUpdateManyWithoutReporterNestedInput
    reports?: ModerationReportUpdateManyWithoutReportedNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokActive?: BoolFieldUpdateOperationsInput | boolean
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramActive?: BoolFieldUpdateOperationsInput | boolean
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeActive?: BoolFieldUpdateOperationsInput | boolean
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookActive?: BoolFieldUpdateOperationsInput | boolean
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUncheckedUpdateOneWithoutUserNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    reportsMade?: ModerationReportUncheckedUpdateManyWithoutReporterNestedInput
    reports?: ModerationReportUncheckedUpdateManyWithoutReportedNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    avatar?: string | null
    bio?: string | null
    cover?: string | null
    tiktokActive?: boolean
    tiktokUrl?: string | null
    instagramActive?: boolean
    instagramUrl?: string | null
    youtubeActive?: boolean
    youtubeUrl?: string | null
    facebookActive?: boolean
    facebookUrl?: string | null
    isLive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokActive?: BoolFieldUpdateOperationsInput | boolean
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramActive?: BoolFieldUpdateOperationsInput | boolean
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeActive?: BoolFieldUpdateOperationsInput | boolean
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookActive?: BoolFieldUpdateOperationsInput | boolean
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokActive?: BoolFieldUpdateOperationsInput | boolean
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramActive?: BoolFieldUpdateOperationsInput | boolean
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeActive?: BoolFieldUpdateOperationsInput | boolean
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookActive?: BoolFieldUpdateOperationsInput | boolean
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCreateInput = {
    id?: string
    title: string
    url: string
    type: $Enums.PostType
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPostsInput
  }

  export type PostUncheckedCreateInput = {
    id?: string
    title: string
    url: string
    type: $Enums.PostType
    isPrivate?: boolean
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumPostTypeFieldUpdateOperationsInput | $Enums.PostType
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumPostTypeFieldUpdateOperationsInput | $Enums.PostType
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCreateManyInput = {
    id?: string
    title: string
    url: string
    type: $Enums.PostType
    isPrivate?: boolean
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumPostTypeFieldUpdateOperationsInput | $Enums.PostType
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumPostTypeFieldUpdateOperationsInput | $Enums.PostType
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletCreateInput = {
    id?: string
    balance?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWalletInput
    transactions?: TransactionCreateNestedManyWithoutWalletInput
  }

  export type WalletUncheckedCreateInput = {
    id?: string
    userId: string
    balance?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutWalletInput
  }

  export type WalletUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWalletNestedInput
    transactions?: TransactionUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type WalletCreateManyInput = {
    id?: string
    userId: string
    balance?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WalletUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateInput = {
    id?: string
    amount: number
    type: $Enums.TransactionType
    referenceId?: string | null
    createdAt?: Date | string
    wallet: WalletCreateNestedOneWithoutTransactionsInput
    gift?: GiftCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    amount: number
    type: $Enums.TransactionType
    walletId: string
    giftId?: string | null
    referenceId?: string | null
    createdAt?: Date | string
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: WalletUpdateOneRequiredWithoutTransactionsNestedInput
    gift?: GiftUpdateOneWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    walletId?: StringFieldUpdateOperationsInput | string
    giftId?: NullableStringFieldUpdateOperationsInput | string | null
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyInput = {
    id?: string
    amount: number
    type: $Enums.TransactionType
    walletId: string
    giftId?: string | null
    referenceId?: string | null
    createdAt?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    walletId?: StringFieldUpdateOperationsInput | string
    giftId?: NullableStringFieldUpdateOperationsInput | string | null
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GiftCreateInput = {
    id?: string
    name: string
    price: number
    icon: string
    animationUrl?: string | null
    transactions?: TransactionCreateNestedManyWithoutGiftInput
  }

  export type GiftUncheckedCreateInput = {
    id?: string
    name: string
    price: number
    icon: string
    animationUrl?: string | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutGiftInput
  }

  export type GiftUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    icon?: StringFieldUpdateOperationsInput | string
    animationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transactions?: TransactionUpdateManyWithoutGiftNestedInput
  }

  export type GiftUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    icon?: StringFieldUpdateOperationsInput | string
    animationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transactions?: TransactionUncheckedUpdateManyWithoutGiftNestedInput
  }

  export type GiftCreateManyInput = {
    id?: string
    name: string
    price: number
    icon: string
    animationUrl?: string | null
  }

  export type GiftUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    icon?: StringFieldUpdateOperationsInput | string
    animationUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GiftUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    icon?: StringFieldUpdateOperationsInput | string
    animationUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StreamCreateInput = {
    id?: string
    title: string
    thumbnail?: string | null
    isLive?: boolean
    category?: string | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutStreamInput
    messages?: MessageCreateNestedManyWithoutStreamInput
    liveRoom?: LiveRoomCreateNestedOneWithoutStreamInput
    battles1?: StreamBattleCreateNestedManyWithoutStream1Input
    battles2?: StreamBattleCreateNestedManyWithoutStream2Input
    reports?: ModerationReportCreateNestedManyWithoutStreamInput
  }

  export type StreamUncheckedCreateInput = {
    id?: string
    title: string
    thumbnail?: string | null
    isLive?: boolean
    category?: string | null
    userId: string
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutStreamInput
    liveRoom?: LiveRoomUncheckedCreateNestedOneWithoutStreamInput
    battles1?: StreamBattleUncheckedCreateNestedManyWithoutStream1Input
    battles2?: StreamBattleUncheckedCreateNestedManyWithoutStream2Input
    reports?: ModerationReportUncheckedCreateNestedManyWithoutStreamInput
  }

  export type StreamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    category?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutStreamNestedInput
    messages?: MessageUpdateManyWithoutStreamNestedInput
    liveRoom?: LiveRoomUpdateOneWithoutStreamNestedInput
    battles1?: StreamBattleUpdateManyWithoutStream1NestedInput
    battles2?: StreamBattleUpdateManyWithoutStream2NestedInput
    reports?: ModerationReportUpdateManyWithoutStreamNestedInput
  }

  export type StreamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    category?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutStreamNestedInput
    liveRoom?: LiveRoomUncheckedUpdateOneWithoutStreamNestedInput
    battles1?: StreamBattleUncheckedUpdateManyWithoutStream1NestedInput
    battles2?: StreamBattleUncheckedUpdateManyWithoutStream2NestedInput
    reports?: ModerationReportUncheckedUpdateManyWithoutStreamNestedInput
  }

  export type StreamCreateManyInput = {
    id?: string
    title: string
    thumbnail?: string | null
    isLive?: boolean
    category?: string | null
    userId: string
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StreamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    category?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    category?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiveRoomCreateInput = {
    id?: string
    activeViewers?: number
    totalViews?: number
    likes?: number
    stream: StreamCreateNestedOneWithoutLiveRoomInput
  }

  export type LiveRoomUncheckedCreateInput = {
    id?: string
    streamId: string
    activeViewers?: number
    totalViews?: number
    likes?: number
  }

  export type LiveRoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    activeViewers?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    likes?: IntFieldUpdateOperationsInput | number
    stream?: StreamUpdateOneRequiredWithoutLiveRoomNestedInput
  }

  export type LiveRoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    activeViewers?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type LiveRoomCreateManyInput = {
    id?: string
    streamId: string
    activeViewers?: number
    totalViews?: number
    likes?: number
  }

  export type LiveRoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    activeViewers?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type LiveRoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    activeViewers?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type MessageCreateInput = {
    id?: string
    content: string
    isGift?: boolean
    giftId?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMessagesInput
    stream: StreamCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    content: string
    userId: string
    streamId: string
    isGift?: boolean
    giftId?: string | null
    createdAt?: Date | string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isGift?: BoolFieldUpdateOperationsInput | boolean
    giftId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMessagesNestedInput
    stream?: StreamUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    isGift?: BoolFieldUpdateOperationsInput | boolean
    giftId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInput = {
    id?: string
    content: string
    userId: string
    streamId: string
    isGift?: boolean
    giftId?: string | null
    createdAt?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isGift?: BoolFieldUpdateOperationsInput | boolean
    giftId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    isGift?: BoolFieldUpdateOperationsInput | boolean
    giftId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowCreateInput = {
    id?: string
    createdAt?: Date | string
    follower: UserCreateNestedOneWithoutFollowingInput
    following: UserCreateNestedOneWithoutFollowersInput
  }

  export type FollowUncheckedCreateInput = {
    id?: string
    followerId: string
    followingId: string
    createdAt?: Date | string
  }

  export type FollowUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    follower?: UserUpdateOneRequiredWithoutFollowingNestedInput
    following?: UserUpdateOneRequiredWithoutFollowersNestedInput
  }

  export type FollowUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    followerId?: StringFieldUpdateOperationsInput | string
    followingId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowCreateManyInput = {
    id?: string
    followerId: string
    followingId: string
    createdAt?: Date | string
  }

  export type FollowUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    followerId?: StringFieldUpdateOperationsInput | string
    followingId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamBattleCreateInput = {
    id?: string
    points1?: number
    points2?: number
    winnerId?: string | null
    status?: $Enums.BattleStatus
    startTime?: Date | string | null
    endTime?: Date | string | null
    createdAt?: Date | string
    stream1: StreamCreateNestedOneWithoutBattles1Input
    stream2: StreamCreateNestedOneWithoutBattles2Input
  }

  export type StreamBattleUncheckedCreateInput = {
    id?: string
    stream1Id: string
    stream2Id: string
    points1?: number
    points2?: number
    winnerId?: string | null
    status?: $Enums.BattleStatus
    startTime?: Date | string | null
    endTime?: Date | string | null
    createdAt?: Date | string
  }

  export type StreamBattleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    points1?: IntFieldUpdateOperationsInput | number
    points2?: IntFieldUpdateOperationsInput | number
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBattleStatusFieldUpdateOperationsInput | $Enums.BattleStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream1?: StreamUpdateOneRequiredWithoutBattles1NestedInput
    stream2?: StreamUpdateOneRequiredWithoutBattles2NestedInput
  }

  export type StreamBattleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stream1Id?: StringFieldUpdateOperationsInput | string
    stream2Id?: StringFieldUpdateOperationsInput | string
    points1?: IntFieldUpdateOperationsInput | number
    points2?: IntFieldUpdateOperationsInput | number
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBattleStatusFieldUpdateOperationsInput | $Enums.BattleStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamBattleCreateManyInput = {
    id?: string
    stream1Id: string
    stream2Id: string
    points1?: number
    points2?: number
    winnerId?: string | null
    status?: $Enums.BattleStatus
    startTime?: Date | string | null
    endTime?: Date | string | null
    createdAt?: Date | string
  }

  export type StreamBattleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    points1?: IntFieldUpdateOperationsInput | number
    points2?: IntFieldUpdateOperationsInput | number
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBattleStatusFieldUpdateOperationsInput | $Enums.BattleStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamBattleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    stream1Id?: StringFieldUpdateOperationsInput | string
    stream2Id?: StringFieldUpdateOperationsInput | string
    points1?: IntFieldUpdateOperationsInput | number
    points2?: IntFieldUpdateOperationsInput | number
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBattleStatusFieldUpdateOperationsInput | $Enums.BattleStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    type: $Enums.NotificationType
    content: string
    isRead?: boolean
    link?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    userId: string
    type: $Enums.NotificationType
    content: string
    isRead?: boolean
    link?: string | null
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    link?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    link?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    userId: string
    type: $Enums.NotificationType
    content: string
    isRead?: boolean
    link?: string | null
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    link?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    link?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModerationReportCreateInput = {
    id?: string
    reason: string
    details?: string | null
    status?: $Enums.ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    reporter: UserCreateNestedOneWithoutReportsMadeInput
    reported: UserCreateNestedOneWithoutReportsInput
    stream?: StreamCreateNestedOneWithoutReportsInput
  }

  export type ModerationReportUncheckedCreateInput = {
    id?: string
    reporterId: string
    reportedId: string
    streamId?: string | null
    reason: string
    details?: string | null
    status?: $Enums.ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModerationReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reporter?: UserUpdateOneRequiredWithoutReportsMadeNestedInput
    reported?: UserUpdateOneRequiredWithoutReportsNestedInput
    stream?: StreamUpdateOneWithoutReportsNestedInput
  }

  export type ModerationReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reporterId?: StringFieldUpdateOperationsInput | string
    reportedId?: StringFieldUpdateOperationsInput | string
    streamId?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModerationReportCreateManyInput = {
    id?: string
    reporterId: string
    reportedId: string
    streamId?: string | null
    reason: string
    details?: string | null
    status?: $Enums.ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModerationReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModerationReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reporterId?: StringFieldUpdateOperationsInput | string
    reportedId?: StringFieldUpdateOperationsInput | string
    streamId?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StreamNullableScalarRelationFilter = {
    is?: StreamWhereInput | null
    isNot?: StreamWhereInput | null
  }

  export type WalletNullableScalarRelationFilter = {
    is?: WalletWhereInput | null
    isNot?: WalletWhereInput | null
  }

  export type PostListRelationFilter = {
    every?: PostWhereInput
    some?: PostWhereInput
    none?: PostWhereInput
  }

  export type FollowListRelationFilter = {
    every?: FollowWhereInput
    some?: FollowWhereInput
    none?: FollowWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type ModerationReportListRelationFilter = {
    every?: ModerationReportWhereInput
    some?: ModerationReportWhereInput
    none?: ModerationReportWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FollowOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ModerationReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    cover?: SortOrder
    tiktokActive?: SortOrder
    tiktokUrl?: SortOrder
    instagramActive?: SortOrder
    instagramUrl?: SortOrder
    youtubeActive?: SortOrder
    youtubeUrl?: SortOrder
    facebookActive?: SortOrder
    facebookUrl?: SortOrder
    isLive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    cover?: SortOrder
    tiktokActive?: SortOrder
    tiktokUrl?: SortOrder
    instagramActive?: SortOrder
    instagramUrl?: SortOrder
    youtubeActive?: SortOrder
    youtubeUrl?: SortOrder
    facebookActive?: SortOrder
    facebookUrl?: SortOrder
    isLive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    cover?: SortOrder
    tiktokActive?: SortOrder
    tiktokUrl?: SortOrder
    instagramActive?: SortOrder
    instagramUrl?: SortOrder
    youtubeActive?: SortOrder
    youtubeUrl?: SortOrder
    facebookActive?: SortOrder
    facebookUrl?: SortOrder
    isLive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumPostTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PostType | EnumPostTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PostType[] | ListEnumPostTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PostType[] | ListEnumPostTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPostTypeFilter<$PrismaModel> | $Enums.PostType
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    type?: SortOrder
    isPrivate?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    type?: SortOrder
    isPrivate?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    type?: SortOrder
    isPrivate?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumPostTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PostType | EnumPostTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PostType[] | ListEnumPostTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PostType[] | ListEnumPostTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPostTypeWithAggregatesFilter<$PrismaModel> | $Enums.PostType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPostTypeFilter<$PrismaModel>
    _max?: NestedEnumPostTypeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WalletCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletAvgOrderByAggregateInput = {
    balance?: SortOrder
  }

  export type WalletMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletSumOrderByAggregateInput = {
    balance?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type WalletScalarRelationFilter = {
    is?: WalletWhereInput
    isNot?: WalletWhereInput
  }

  export type GiftNullableScalarRelationFilter = {
    is?: GiftWhereInput | null
    isNot?: GiftWhereInput | null
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    walletId?: SortOrder
    giftId?: SortOrder
    referenceId?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    walletId?: SortOrder
    giftId?: SortOrder
    referenceId?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    walletId?: SortOrder
    giftId?: SortOrder
    referenceId?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type GiftCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    icon?: SortOrder
    animationUrl?: SortOrder
  }

  export type GiftAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type GiftMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    icon?: SortOrder
    animationUrl?: SortOrder
  }

  export type GiftMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    icon?: SortOrder
    animationUrl?: SortOrder
  }

  export type GiftSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type LiveRoomNullableScalarRelationFilter = {
    is?: LiveRoomWhereInput | null
    isNot?: LiveRoomWhereInput | null
  }

  export type StreamBattleListRelationFilter = {
    every?: StreamBattleWhereInput
    some?: StreamBattleWhereInput
    none?: StreamBattleWhereInput
  }

  export type StreamBattleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StreamCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    thumbnail?: SortOrder
    isLive?: SortOrder
    category?: SortOrder
    userId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StreamMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    thumbnail?: SortOrder
    isLive?: SortOrder
    category?: SortOrder
    userId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StreamMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    thumbnail?: SortOrder
    isLive?: SortOrder
    category?: SortOrder
    userId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StreamScalarRelationFilter = {
    is?: StreamWhereInput
    isNot?: StreamWhereInput
  }

  export type LiveRoomCountOrderByAggregateInput = {
    id?: SortOrder
    streamId?: SortOrder
    activeViewers?: SortOrder
    totalViews?: SortOrder
    likes?: SortOrder
  }

  export type LiveRoomAvgOrderByAggregateInput = {
    activeViewers?: SortOrder
    totalViews?: SortOrder
    likes?: SortOrder
  }

  export type LiveRoomMaxOrderByAggregateInput = {
    id?: SortOrder
    streamId?: SortOrder
    activeViewers?: SortOrder
    totalViews?: SortOrder
    likes?: SortOrder
  }

  export type LiveRoomMinOrderByAggregateInput = {
    id?: SortOrder
    streamId?: SortOrder
    activeViewers?: SortOrder
    totalViews?: SortOrder
    likes?: SortOrder
  }

  export type LiveRoomSumOrderByAggregateInput = {
    activeViewers?: SortOrder
    totalViews?: SortOrder
    likes?: SortOrder
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    userId?: SortOrder
    streamId?: SortOrder
    isGift?: SortOrder
    giftId?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    userId?: SortOrder
    streamId?: SortOrder
    isGift?: SortOrder
    giftId?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    userId?: SortOrder
    streamId?: SortOrder
    isGift?: SortOrder
    giftId?: SortOrder
    createdAt?: SortOrder
  }

  export type FollowFollowerIdFollowingIdCompoundUniqueInput = {
    followerId: string
    followingId: string
  }

  export type FollowCountOrderByAggregateInput = {
    id?: SortOrder
    followerId?: SortOrder
    followingId?: SortOrder
    createdAt?: SortOrder
  }

  export type FollowMaxOrderByAggregateInput = {
    id?: SortOrder
    followerId?: SortOrder
    followingId?: SortOrder
    createdAt?: SortOrder
  }

  export type FollowMinOrderByAggregateInput = {
    id?: SortOrder
    followerId?: SortOrder
    followingId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumBattleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BattleStatus | EnumBattleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BattleStatus[] | ListEnumBattleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BattleStatus[] | ListEnumBattleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBattleStatusFilter<$PrismaModel> | $Enums.BattleStatus
  }

  export type StreamBattleCountOrderByAggregateInput = {
    id?: SortOrder
    stream1Id?: SortOrder
    stream2Id?: SortOrder
    points1?: SortOrder
    points2?: SortOrder
    winnerId?: SortOrder
    status?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
  }

  export type StreamBattleAvgOrderByAggregateInput = {
    points1?: SortOrder
    points2?: SortOrder
  }

  export type StreamBattleMaxOrderByAggregateInput = {
    id?: SortOrder
    stream1Id?: SortOrder
    stream2Id?: SortOrder
    points1?: SortOrder
    points2?: SortOrder
    winnerId?: SortOrder
    status?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
  }

  export type StreamBattleMinOrderByAggregateInput = {
    id?: SortOrder
    stream1Id?: SortOrder
    stream2Id?: SortOrder
    points1?: SortOrder
    points2?: SortOrder
    winnerId?: SortOrder
    status?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
  }

  export type StreamBattleSumOrderByAggregateInput = {
    points1?: SortOrder
    points2?: SortOrder
  }

  export type EnumBattleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BattleStatus | EnumBattleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BattleStatus[] | ListEnumBattleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BattleStatus[] | ListEnumBattleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBattleStatusWithAggregatesFilter<$PrismaModel> | $Enums.BattleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBattleStatusFilter<$PrismaModel>
    _max?: NestedEnumBattleStatusFilter<$PrismaModel>
  }

  export type EnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    isRead?: SortOrder
    link?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    isRead?: SortOrder
    link?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    isRead?: SortOrder
    link?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type EnumReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusFilter<$PrismaModel> | $Enums.ReportStatus
  }

  export type ModerationReportCountOrderByAggregateInput = {
    id?: SortOrder
    reporterId?: SortOrder
    reportedId?: SortOrder
    streamId?: SortOrder
    reason?: SortOrder
    details?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ModerationReportMaxOrderByAggregateInput = {
    id?: SortOrder
    reporterId?: SortOrder
    reportedId?: SortOrder
    streamId?: SortOrder
    reason?: SortOrder
    details?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ModerationReportMinOrderByAggregateInput = {
    id?: SortOrder
    reporterId?: SortOrder
    reportedId?: SortOrder
    streamId?: SortOrder
    reason?: SortOrder
    details?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReportStatusFilter<$PrismaModel>
    _max?: NestedEnumReportStatusFilter<$PrismaModel>
  }

  export type StreamCreateNestedOneWithoutUserInput = {
    create?: XOR<StreamCreateWithoutUserInput, StreamUncheckedCreateWithoutUserInput>
    connectOrCreate?: StreamCreateOrConnectWithoutUserInput
    connect?: StreamWhereUniqueInput
  }

  export type WalletCreateNestedOneWithoutUserInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput
    connect?: WalletWhereUniqueInput
  }

  export type PostCreateNestedManyWithoutUserInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type FollowCreateNestedManyWithoutFollowerInput = {
    create?: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput> | FollowCreateWithoutFollowerInput[] | FollowUncheckedCreateWithoutFollowerInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowerInput | FollowCreateOrConnectWithoutFollowerInput[]
    createMany?: FollowCreateManyFollowerInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type FollowCreateNestedManyWithoutFollowingInput = {
    create?: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput> | FollowCreateWithoutFollowingInput[] | FollowUncheckedCreateWithoutFollowingInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowingInput | FollowCreateOrConnectWithoutFollowingInput[]
    createMany?: FollowCreateManyFollowingInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type ModerationReportCreateNestedManyWithoutReporterInput = {
    create?: XOR<ModerationReportCreateWithoutReporterInput, ModerationReportUncheckedCreateWithoutReporterInput> | ModerationReportCreateWithoutReporterInput[] | ModerationReportUncheckedCreateWithoutReporterInput[]
    connectOrCreate?: ModerationReportCreateOrConnectWithoutReporterInput | ModerationReportCreateOrConnectWithoutReporterInput[]
    createMany?: ModerationReportCreateManyReporterInputEnvelope
    connect?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
  }

  export type ModerationReportCreateNestedManyWithoutReportedInput = {
    create?: XOR<ModerationReportCreateWithoutReportedInput, ModerationReportUncheckedCreateWithoutReportedInput> | ModerationReportCreateWithoutReportedInput[] | ModerationReportUncheckedCreateWithoutReportedInput[]
    connectOrCreate?: ModerationReportCreateOrConnectWithoutReportedInput | ModerationReportCreateOrConnectWithoutReportedInput[]
    createMany?: ModerationReportCreateManyReportedInputEnvelope
    connect?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutUserInput = {
    create?: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput> | MessageCreateWithoutUserInput[] | MessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutUserInput | MessageCreateOrConnectWithoutUserInput[]
    createMany?: MessageCreateManyUserInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type StreamUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<StreamCreateWithoutUserInput, StreamUncheckedCreateWithoutUserInput>
    connectOrCreate?: StreamCreateOrConnectWithoutUserInput
    connect?: StreamWhereUniqueInput
  }

  export type WalletUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput
    connect?: WalletWhereUniqueInput
  }

  export type PostUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type FollowUncheckedCreateNestedManyWithoutFollowerInput = {
    create?: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput> | FollowCreateWithoutFollowerInput[] | FollowUncheckedCreateWithoutFollowerInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowerInput | FollowCreateOrConnectWithoutFollowerInput[]
    createMany?: FollowCreateManyFollowerInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type FollowUncheckedCreateNestedManyWithoutFollowingInput = {
    create?: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput> | FollowCreateWithoutFollowingInput[] | FollowUncheckedCreateWithoutFollowingInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowingInput | FollowCreateOrConnectWithoutFollowingInput[]
    createMany?: FollowCreateManyFollowingInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type ModerationReportUncheckedCreateNestedManyWithoutReporterInput = {
    create?: XOR<ModerationReportCreateWithoutReporterInput, ModerationReportUncheckedCreateWithoutReporterInput> | ModerationReportCreateWithoutReporterInput[] | ModerationReportUncheckedCreateWithoutReporterInput[]
    connectOrCreate?: ModerationReportCreateOrConnectWithoutReporterInput | ModerationReportCreateOrConnectWithoutReporterInput[]
    createMany?: ModerationReportCreateManyReporterInputEnvelope
    connect?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
  }

  export type ModerationReportUncheckedCreateNestedManyWithoutReportedInput = {
    create?: XOR<ModerationReportCreateWithoutReportedInput, ModerationReportUncheckedCreateWithoutReportedInput> | ModerationReportCreateWithoutReportedInput[] | ModerationReportUncheckedCreateWithoutReportedInput[]
    connectOrCreate?: ModerationReportCreateOrConnectWithoutReportedInput | ModerationReportCreateOrConnectWithoutReportedInput[]
    createMany?: ModerationReportCreateManyReportedInputEnvelope
    connect?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput> | MessageCreateWithoutUserInput[] | MessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutUserInput | MessageCreateOrConnectWithoutUserInput[]
    createMany?: MessageCreateManyUserInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StreamUpdateOneWithoutUserNestedInput = {
    create?: XOR<StreamCreateWithoutUserInput, StreamUncheckedCreateWithoutUserInput>
    connectOrCreate?: StreamCreateOrConnectWithoutUserInput
    upsert?: StreamUpsertWithoutUserInput
    disconnect?: StreamWhereInput | boolean
    delete?: StreamWhereInput | boolean
    connect?: StreamWhereUniqueInput
    update?: XOR<XOR<StreamUpdateToOneWithWhereWithoutUserInput, StreamUpdateWithoutUserInput>, StreamUncheckedUpdateWithoutUserInput>
  }

  export type WalletUpdateOneWithoutUserNestedInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput
    upsert?: WalletUpsertWithoutUserInput
    disconnect?: WalletWhereInput | boolean
    delete?: WalletWhereInput | boolean
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutUserInput, WalletUpdateWithoutUserInput>, WalletUncheckedUpdateWithoutUserInput>
  }

  export type PostUpdateManyWithoutUserNestedInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutUserInput | PostUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutUserInput | PostUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PostUpdateManyWithWhereWithoutUserInput | PostUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type FollowUpdateManyWithoutFollowerNestedInput = {
    create?: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput> | FollowCreateWithoutFollowerInput[] | FollowUncheckedCreateWithoutFollowerInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowerInput | FollowCreateOrConnectWithoutFollowerInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowerInput | FollowUpsertWithWhereUniqueWithoutFollowerInput[]
    createMany?: FollowCreateManyFollowerInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutFollowerInput | FollowUpdateWithWhereUniqueWithoutFollowerInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutFollowerInput | FollowUpdateManyWithWhereWithoutFollowerInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type FollowUpdateManyWithoutFollowingNestedInput = {
    create?: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput> | FollowCreateWithoutFollowingInput[] | FollowUncheckedCreateWithoutFollowingInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowingInput | FollowCreateOrConnectWithoutFollowingInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowingInput | FollowUpsertWithWhereUniqueWithoutFollowingInput[]
    createMany?: FollowCreateManyFollowingInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutFollowingInput | FollowUpdateWithWhereUniqueWithoutFollowingInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutFollowingInput | FollowUpdateManyWithWhereWithoutFollowingInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type ModerationReportUpdateManyWithoutReporterNestedInput = {
    create?: XOR<ModerationReportCreateWithoutReporterInput, ModerationReportUncheckedCreateWithoutReporterInput> | ModerationReportCreateWithoutReporterInput[] | ModerationReportUncheckedCreateWithoutReporterInput[]
    connectOrCreate?: ModerationReportCreateOrConnectWithoutReporterInput | ModerationReportCreateOrConnectWithoutReporterInput[]
    upsert?: ModerationReportUpsertWithWhereUniqueWithoutReporterInput | ModerationReportUpsertWithWhereUniqueWithoutReporterInput[]
    createMany?: ModerationReportCreateManyReporterInputEnvelope
    set?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    disconnect?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    delete?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    connect?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    update?: ModerationReportUpdateWithWhereUniqueWithoutReporterInput | ModerationReportUpdateWithWhereUniqueWithoutReporterInput[]
    updateMany?: ModerationReportUpdateManyWithWhereWithoutReporterInput | ModerationReportUpdateManyWithWhereWithoutReporterInput[]
    deleteMany?: ModerationReportScalarWhereInput | ModerationReportScalarWhereInput[]
  }

  export type ModerationReportUpdateManyWithoutReportedNestedInput = {
    create?: XOR<ModerationReportCreateWithoutReportedInput, ModerationReportUncheckedCreateWithoutReportedInput> | ModerationReportCreateWithoutReportedInput[] | ModerationReportUncheckedCreateWithoutReportedInput[]
    connectOrCreate?: ModerationReportCreateOrConnectWithoutReportedInput | ModerationReportCreateOrConnectWithoutReportedInput[]
    upsert?: ModerationReportUpsertWithWhereUniqueWithoutReportedInput | ModerationReportUpsertWithWhereUniqueWithoutReportedInput[]
    createMany?: ModerationReportCreateManyReportedInputEnvelope
    set?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    disconnect?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    delete?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    connect?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    update?: ModerationReportUpdateWithWhereUniqueWithoutReportedInput | ModerationReportUpdateWithWhereUniqueWithoutReportedInput[]
    updateMany?: ModerationReportUpdateManyWithWhereWithoutReportedInput | ModerationReportUpdateManyWithWhereWithoutReportedInput[]
    deleteMany?: ModerationReportScalarWhereInput | ModerationReportScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutUserNestedInput = {
    create?: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput> | MessageCreateWithoutUserInput[] | MessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutUserInput | MessageCreateOrConnectWithoutUserInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutUserInput | MessageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MessageCreateManyUserInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutUserInput | MessageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutUserInput | MessageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type StreamUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<StreamCreateWithoutUserInput, StreamUncheckedCreateWithoutUserInput>
    connectOrCreate?: StreamCreateOrConnectWithoutUserInput
    upsert?: StreamUpsertWithoutUserInput
    disconnect?: StreamWhereInput | boolean
    delete?: StreamWhereInput | boolean
    connect?: StreamWhereUniqueInput
    update?: XOR<XOR<StreamUpdateToOneWithWhereWithoutUserInput, StreamUpdateWithoutUserInput>, StreamUncheckedUpdateWithoutUserInput>
  }

  export type WalletUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput
    upsert?: WalletUpsertWithoutUserInput
    disconnect?: WalletWhereInput | boolean
    delete?: WalletWhereInput | boolean
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutUserInput, WalletUpdateWithoutUserInput>, WalletUncheckedUpdateWithoutUserInput>
  }

  export type PostUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutUserInput | PostUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutUserInput | PostUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PostUpdateManyWithWhereWithoutUserInput | PostUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type FollowUncheckedUpdateManyWithoutFollowerNestedInput = {
    create?: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput> | FollowCreateWithoutFollowerInput[] | FollowUncheckedCreateWithoutFollowerInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowerInput | FollowCreateOrConnectWithoutFollowerInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowerInput | FollowUpsertWithWhereUniqueWithoutFollowerInput[]
    createMany?: FollowCreateManyFollowerInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutFollowerInput | FollowUpdateWithWhereUniqueWithoutFollowerInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutFollowerInput | FollowUpdateManyWithWhereWithoutFollowerInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type FollowUncheckedUpdateManyWithoutFollowingNestedInput = {
    create?: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput> | FollowCreateWithoutFollowingInput[] | FollowUncheckedCreateWithoutFollowingInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowingInput | FollowCreateOrConnectWithoutFollowingInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowingInput | FollowUpsertWithWhereUniqueWithoutFollowingInput[]
    createMany?: FollowCreateManyFollowingInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutFollowingInput | FollowUpdateWithWhereUniqueWithoutFollowingInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutFollowingInput | FollowUpdateManyWithWhereWithoutFollowingInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type ModerationReportUncheckedUpdateManyWithoutReporterNestedInput = {
    create?: XOR<ModerationReportCreateWithoutReporterInput, ModerationReportUncheckedCreateWithoutReporterInput> | ModerationReportCreateWithoutReporterInput[] | ModerationReportUncheckedCreateWithoutReporterInput[]
    connectOrCreate?: ModerationReportCreateOrConnectWithoutReporterInput | ModerationReportCreateOrConnectWithoutReporterInput[]
    upsert?: ModerationReportUpsertWithWhereUniqueWithoutReporterInput | ModerationReportUpsertWithWhereUniqueWithoutReporterInput[]
    createMany?: ModerationReportCreateManyReporterInputEnvelope
    set?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    disconnect?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    delete?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    connect?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    update?: ModerationReportUpdateWithWhereUniqueWithoutReporterInput | ModerationReportUpdateWithWhereUniqueWithoutReporterInput[]
    updateMany?: ModerationReportUpdateManyWithWhereWithoutReporterInput | ModerationReportUpdateManyWithWhereWithoutReporterInput[]
    deleteMany?: ModerationReportScalarWhereInput | ModerationReportScalarWhereInput[]
  }

  export type ModerationReportUncheckedUpdateManyWithoutReportedNestedInput = {
    create?: XOR<ModerationReportCreateWithoutReportedInput, ModerationReportUncheckedCreateWithoutReportedInput> | ModerationReportCreateWithoutReportedInput[] | ModerationReportUncheckedCreateWithoutReportedInput[]
    connectOrCreate?: ModerationReportCreateOrConnectWithoutReportedInput | ModerationReportCreateOrConnectWithoutReportedInput[]
    upsert?: ModerationReportUpsertWithWhereUniqueWithoutReportedInput | ModerationReportUpsertWithWhereUniqueWithoutReportedInput[]
    createMany?: ModerationReportCreateManyReportedInputEnvelope
    set?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    disconnect?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    delete?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    connect?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    update?: ModerationReportUpdateWithWhereUniqueWithoutReportedInput | ModerationReportUpdateWithWhereUniqueWithoutReportedInput[]
    updateMany?: ModerationReportUpdateManyWithWhereWithoutReportedInput | ModerationReportUpdateManyWithWhereWithoutReportedInput[]
    deleteMany?: ModerationReportScalarWhereInput | ModerationReportScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput> | MessageCreateWithoutUserInput[] | MessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutUserInput | MessageCreateOrConnectWithoutUserInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutUserInput | MessageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MessageCreateManyUserInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutUserInput | MessageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutUserInput | MessageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPostsInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumPostTypeFieldUpdateOperationsInput = {
    set?: $Enums.PostType
  }

  export type UserUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    upsert?: UserUpsertWithoutPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPostsInput, UserUpdateWithoutPostsInput>, UserUncheckedUpdateWithoutPostsInput>
  }

  export type UserCreateNestedOneWithoutWalletInput = {
    create?: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletInput
    connect?: UserWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutWalletInput = {
    create?: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput> | TransactionCreateWithoutWalletInput[] | TransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWalletInput | TransactionCreateOrConnectWithoutWalletInput[]
    createMany?: TransactionCreateManyWalletInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutWalletInput = {
    create?: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput> | TransactionCreateWithoutWalletInput[] | TransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWalletInput | TransactionCreateOrConnectWithoutWalletInput[]
    createMany?: TransactionCreateManyWalletInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutWalletNestedInput = {
    create?: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletInput
    upsert?: UserUpsertWithoutWalletInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWalletInput, UserUpdateWithoutWalletInput>, UserUncheckedUpdateWithoutWalletInput>
  }

  export type TransactionUpdateManyWithoutWalletNestedInput = {
    create?: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput> | TransactionCreateWithoutWalletInput[] | TransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWalletInput | TransactionCreateOrConnectWithoutWalletInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutWalletInput | TransactionUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: TransactionCreateManyWalletInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutWalletInput | TransactionUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutWalletInput | TransactionUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput> | TransactionCreateWithoutWalletInput[] | TransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWalletInput | TransactionCreateOrConnectWithoutWalletInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutWalletInput | TransactionUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: TransactionCreateManyWalletInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutWalletInput | TransactionUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutWalletInput | TransactionUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type WalletCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: WalletCreateOrConnectWithoutTransactionsInput
    connect?: WalletWhereUniqueInput
  }

  export type GiftCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<GiftCreateWithoutTransactionsInput, GiftUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: GiftCreateOrConnectWithoutTransactionsInput
    connect?: GiftWhereUniqueInput
  }

  export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType
  }

  export type WalletUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: WalletCreateOrConnectWithoutTransactionsInput
    upsert?: WalletUpsertWithoutTransactionsInput
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutTransactionsInput, WalletUpdateWithoutTransactionsInput>, WalletUncheckedUpdateWithoutTransactionsInput>
  }

  export type GiftUpdateOneWithoutTransactionsNestedInput = {
    create?: XOR<GiftCreateWithoutTransactionsInput, GiftUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: GiftCreateOrConnectWithoutTransactionsInput
    upsert?: GiftUpsertWithoutTransactionsInput
    disconnect?: GiftWhereInput | boolean
    delete?: GiftWhereInput | boolean
    connect?: GiftWhereUniqueInput
    update?: XOR<XOR<GiftUpdateToOneWithWhereWithoutTransactionsInput, GiftUpdateWithoutTransactionsInput>, GiftUncheckedUpdateWithoutTransactionsInput>
  }

  export type TransactionCreateNestedManyWithoutGiftInput = {
    create?: XOR<TransactionCreateWithoutGiftInput, TransactionUncheckedCreateWithoutGiftInput> | TransactionCreateWithoutGiftInput[] | TransactionUncheckedCreateWithoutGiftInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutGiftInput | TransactionCreateOrConnectWithoutGiftInput[]
    createMany?: TransactionCreateManyGiftInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutGiftInput = {
    create?: XOR<TransactionCreateWithoutGiftInput, TransactionUncheckedCreateWithoutGiftInput> | TransactionCreateWithoutGiftInput[] | TransactionUncheckedCreateWithoutGiftInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutGiftInput | TransactionCreateOrConnectWithoutGiftInput[]
    createMany?: TransactionCreateManyGiftInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionUpdateManyWithoutGiftNestedInput = {
    create?: XOR<TransactionCreateWithoutGiftInput, TransactionUncheckedCreateWithoutGiftInput> | TransactionCreateWithoutGiftInput[] | TransactionUncheckedCreateWithoutGiftInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutGiftInput | TransactionCreateOrConnectWithoutGiftInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutGiftInput | TransactionUpsertWithWhereUniqueWithoutGiftInput[]
    createMany?: TransactionCreateManyGiftInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutGiftInput | TransactionUpdateWithWhereUniqueWithoutGiftInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutGiftInput | TransactionUpdateManyWithWhereWithoutGiftInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutGiftNestedInput = {
    create?: XOR<TransactionCreateWithoutGiftInput, TransactionUncheckedCreateWithoutGiftInput> | TransactionCreateWithoutGiftInput[] | TransactionUncheckedCreateWithoutGiftInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutGiftInput | TransactionCreateOrConnectWithoutGiftInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutGiftInput | TransactionUpsertWithWhereUniqueWithoutGiftInput[]
    createMany?: TransactionCreateManyGiftInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutGiftInput | TransactionUpdateWithWhereUniqueWithoutGiftInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutGiftInput | TransactionUpdateManyWithWhereWithoutGiftInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutStreamInput = {
    create?: XOR<UserCreateWithoutStreamInput, UserUncheckedCreateWithoutStreamInput>
    connectOrCreate?: UserCreateOrConnectWithoutStreamInput
    connect?: UserWhereUniqueInput
  }

  export type MessageCreateNestedManyWithoutStreamInput = {
    create?: XOR<MessageCreateWithoutStreamInput, MessageUncheckedCreateWithoutStreamInput> | MessageCreateWithoutStreamInput[] | MessageUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutStreamInput | MessageCreateOrConnectWithoutStreamInput[]
    createMany?: MessageCreateManyStreamInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type LiveRoomCreateNestedOneWithoutStreamInput = {
    create?: XOR<LiveRoomCreateWithoutStreamInput, LiveRoomUncheckedCreateWithoutStreamInput>
    connectOrCreate?: LiveRoomCreateOrConnectWithoutStreamInput
    connect?: LiveRoomWhereUniqueInput
  }

  export type StreamBattleCreateNestedManyWithoutStream1Input = {
    create?: XOR<StreamBattleCreateWithoutStream1Input, StreamBattleUncheckedCreateWithoutStream1Input> | StreamBattleCreateWithoutStream1Input[] | StreamBattleUncheckedCreateWithoutStream1Input[]
    connectOrCreate?: StreamBattleCreateOrConnectWithoutStream1Input | StreamBattleCreateOrConnectWithoutStream1Input[]
    createMany?: StreamBattleCreateManyStream1InputEnvelope
    connect?: StreamBattleWhereUniqueInput | StreamBattleWhereUniqueInput[]
  }

  export type StreamBattleCreateNestedManyWithoutStream2Input = {
    create?: XOR<StreamBattleCreateWithoutStream2Input, StreamBattleUncheckedCreateWithoutStream2Input> | StreamBattleCreateWithoutStream2Input[] | StreamBattleUncheckedCreateWithoutStream2Input[]
    connectOrCreate?: StreamBattleCreateOrConnectWithoutStream2Input | StreamBattleCreateOrConnectWithoutStream2Input[]
    createMany?: StreamBattleCreateManyStream2InputEnvelope
    connect?: StreamBattleWhereUniqueInput | StreamBattleWhereUniqueInput[]
  }

  export type ModerationReportCreateNestedManyWithoutStreamInput = {
    create?: XOR<ModerationReportCreateWithoutStreamInput, ModerationReportUncheckedCreateWithoutStreamInput> | ModerationReportCreateWithoutStreamInput[] | ModerationReportUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: ModerationReportCreateOrConnectWithoutStreamInput | ModerationReportCreateOrConnectWithoutStreamInput[]
    createMany?: ModerationReportCreateManyStreamInputEnvelope
    connect?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutStreamInput = {
    create?: XOR<MessageCreateWithoutStreamInput, MessageUncheckedCreateWithoutStreamInput> | MessageCreateWithoutStreamInput[] | MessageUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutStreamInput | MessageCreateOrConnectWithoutStreamInput[]
    createMany?: MessageCreateManyStreamInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type LiveRoomUncheckedCreateNestedOneWithoutStreamInput = {
    create?: XOR<LiveRoomCreateWithoutStreamInput, LiveRoomUncheckedCreateWithoutStreamInput>
    connectOrCreate?: LiveRoomCreateOrConnectWithoutStreamInput
    connect?: LiveRoomWhereUniqueInput
  }

  export type StreamBattleUncheckedCreateNestedManyWithoutStream1Input = {
    create?: XOR<StreamBattleCreateWithoutStream1Input, StreamBattleUncheckedCreateWithoutStream1Input> | StreamBattleCreateWithoutStream1Input[] | StreamBattleUncheckedCreateWithoutStream1Input[]
    connectOrCreate?: StreamBattleCreateOrConnectWithoutStream1Input | StreamBattleCreateOrConnectWithoutStream1Input[]
    createMany?: StreamBattleCreateManyStream1InputEnvelope
    connect?: StreamBattleWhereUniqueInput | StreamBattleWhereUniqueInput[]
  }

  export type StreamBattleUncheckedCreateNestedManyWithoutStream2Input = {
    create?: XOR<StreamBattleCreateWithoutStream2Input, StreamBattleUncheckedCreateWithoutStream2Input> | StreamBattleCreateWithoutStream2Input[] | StreamBattleUncheckedCreateWithoutStream2Input[]
    connectOrCreate?: StreamBattleCreateOrConnectWithoutStream2Input | StreamBattleCreateOrConnectWithoutStream2Input[]
    createMany?: StreamBattleCreateManyStream2InputEnvelope
    connect?: StreamBattleWhereUniqueInput | StreamBattleWhereUniqueInput[]
  }

  export type ModerationReportUncheckedCreateNestedManyWithoutStreamInput = {
    create?: XOR<ModerationReportCreateWithoutStreamInput, ModerationReportUncheckedCreateWithoutStreamInput> | ModerationReportCreateWithoutStreamInput[] | ModerationReportUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: ModerationReportCreateOrConnectWithoutStreamInput | ModerationReportCreateOrConnectWithoutStreamInput[]
    createMany?: ModerationReportCreateManyStreamInputEnvelope
    connect?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutStreamNestedInput = {
    create?: XOR<UserCreateWithoutStreamInput, UserUncheckedCreateWithoutStreamInput>
    connectOrCreate?: UserCreateOrConnectWithoutStreamInput
    upsert?: UserUpsertWithoutStreamInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStreamInput, UserUpdateWithoutStreamInput>, UserUncheckedUpdateWithoutStreamInput>
  }

  export type MessageUpdateManyWithoutStreamNestedInput = {
    create?: XOR<MessageCreateWithoutStreamInput, MessageUncheckedCreateWithoutStreamInput> | MessageCreateWithoutStreamInput[] | MessageUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutStreamInput | MessageCreateOrConnectWithoutStreamInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutStreamInput | MessageUpsertWithWhereUniqueWithoutStreamInput[]
    createMany?: MessageCreateManyStreamInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutStreamInput | MessageUpdateWithWhereUniqueWithoutStreamInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutStreamInput | MessageUpdateManyWithWhereWithoutStreamInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type LiveRoomUpdateOneWithoutStreamNestedInput = {
    create?: XOR<LiveRoomCreateWithoutStreamInput, LiveRoomUncheckedCreateWithoutStreamInput>
    connectOrCreate?: LiveRoomCreateOrConnectWithoutStreamInput
    upsert?: LiveRoomUpsertWithoutStreamInput
    disconnect?: LiveRoomWhereInput | boolean
    delete?: LiveRoomWhereInput | boolean
    connect?: LiveRoomWhereUniqueInput
    update?: XOR<XOR<LiveRoomUpdateToOneWithWhereWithoutStreamInput, LiveRoomUpdateWithoutStreamInput>, LiveRoomUncheckedUpdateWithoutStreamInput>
  }

  export type StreamBattleUpdateManyWithoutStream1NestedInput = {
    create?: XOR<StreamBattleCreateWithoutStream1Input, StreamBattleUncheckedCreateWithoutStream1Input> | StreamBattleCreateWithoutStream1Input[] | StreamBattleUncheckedCreateWithoutStream1Input[]
    connectOrCreate?: StreamBattleCreateOrConnectWithoutStream1Input | StreamBattleCreateOrConnectWithoutStream1Input[]
    upsert?: StreamBattleUpsertWithWhereUniqueWithoutStream1Input | StreamBattleUpsertWithWhereUniqueWithoutStream1Input[]
    createMany?: StreamBattleCreateManyStream1InputEnvelope
    set?: StreamBattleWhereUniqueInput | StreamBattleWhereUniqueInput[]
    disconnect?: StreamBattleWhereUniqueInput | StreamBattleWhereUniqueInput[]
    delete?: StreamBattleWhereUniqueInput | StreamBattleWhereUniqueInput[]
    connect?: StreamBattleWhereUniqueInput | StreamBattleWhereUniqueInput[]
    update?: StreamBattleUpdateWithWhereUniqueWithoutStream1Input | StreamBattleUpdateWithWhereUniqueWithoutStream1Input[]
    updateMany?: StreamBattleUpdateManyWithWhereWithoutStream1Input | StreamBattleUpdateManyWithWhereWithoutStream1Input[]
    deleteMany?: StreamBattleScalarWhereInput | StreamBattleScalarWhereInput[]
  }

  export type StreamBattleUpdateManyWithoutStream2NestedInput = {
    create?: XOR<StreamBattleCreateWithoutStream2Input, StreamBattleUncheckedCreateWithoutStream2Input> | StreamBattleCreateWithoutStream2Input[] | StreamBattleUncheckedCreateWithoutStream2Input[]
    connectOrCreate?: StreamBattleCreateOrConnectWithoutStream2Input | StreamBattleCreateOrConnectWithoutStream2Input[]
    upsert?: StreamBattleUpsertWithWhereUniqueWithoutStream2Input | StreamBattleUpsertWithWhereUniqueWithoutStream2Input[]
    createMany?: StreamBattleCreateManyStream2InputEnvelope
    set?: StreamBattleWhereUniqueInput | StreamBattleWhereUniqueInput[]
    disconnect?: StreamBattleWhereUniqueInput | StreamBattleWhereUniqueInput[]
    delete?: StreamBattleWhereUniqueInput | StreamBattleWhereUniqueInput[]
    connect?: StreamBattleWhereUniqueInput | StreamBattleWhereUniqueInput[]
    update?: StreamBattleUpdateWithWhereUniqueWithoutStream2Input | StreamBattleUpdateWithWhereUniqueWithoutStream2Input[]
    updateMany?: StreamBattleUpdateManyWithWhereWithoutStream2Input | StreamBattleUpdateManyWithWhereWithoutStream2Input[]
    deleteMany?: StreamBattleScalarWhereInput | StreamBattleScalarWhereInput[]
  }

  export type ModerationReportUpdateManyWithoutStreamNestedInput = {
    create?: XOR<ModerationReportCreateWithoutStreamInput, ModerationReportUncheckedCreateWithoutStreamInput> | ModerationReportCreateWithoutStreamInput[] | ModerationReportUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: ModerationReportCreateOrConnectWithoutStreamInput | ModerationReportCreateOrConnectWithoutStreamInput[]
    upsert?: ModerationReportUpsertWithWhereUniqueWithoutStreamInput | ModerationReportUpsertWithWhereUniqueWithoutStreamInput[]
    createMany?: ModerationReportCreateManyStreamInputEnvelope
    set?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    disconnect?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    delete?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    connect?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    update?: ModerationReportUpdateWithWhereUniqueWithoutStreamInput | ModerationReportUpdateWithWhereUniqueWithoutStreamInput[]
    updateMany?: ModerationReportUpdateManyWithWhereWithoutStreamInput | ModerationReportUpdateManyWithWhereWithoutStreamInput[]
    deleteMany?: ModerationReportScalarWhereInput | ModerationReportScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutStreamNestedInput = {
    create?: XOR<MessageCreateWithoutStreamInput, MessageUncheckedCreateWithoutStreamInput> | MessageCreateWithoutStreamInput[] | MessageUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutStreamInput | MessageCreateOrConnectWithoutStreamInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutStreamInput | MessageUpsertWithWhereUniqueWithoutStreamInput[]
    createMany?: MessageCreateManyStreamInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutStreamInput | MessageUpdateWithWhereUniqueWithoutStreamInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutStreamInput | MessageUpdateManyWithWhereWithoutStreamInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type LiveRoomUncheckedUpdateOneWithoutStreamNestedInput = {
    create?: XOR<LiveRoomCreateWithoutStreamInput, LiveRoomUncheckedCreateWithoutStreamInput>
    connectOrCreate?: LiveRoomCreateOrConnectWithoutStreamInput
    upsert?: LiveRoomUpsertWithoutStreamInput
    disconnect?: LiveRoomWhereInput | boolean
    delete?: LiveRoomWhereInput | boolean
    connect?: LiveRoomWhereUniqueInput
    update?: XOR<XOR<LiveRoomUpdateToOneWithWhereWithoutStreamInput, LiveRoomUpdateWithoutStreamInput>, LiveRoomUncheckedUpdateWithoutStreamInput>
  }

  export type StreamBattleUncheckedUpdateManyWithoutStream1NestedInput = {
    create?: XOR<StreamBattleCreateWithoutStream1Input, StreamBattleUncheckedCreateWithoutStream1Input> | StreamBattleCreateWithoutStream1Input[] | StreamBattleUncheckedCreateWithoutStream1Input[]
    connectOrCreate?: StreamBattleCreateOrConnectWithoutStream1Input | StreamBattleCreateOrConnectWithoutStream1Input[]
    upsert?: StreamBattleUpsertWithWhereUniqueWithoutStream1Input | StreamBattleUpsertWithWhereUniqueWithoutStream1Input[]
    createMany?: StreamBattleCreateManyStream1InputEnvelope
    set?: StreamBattleWhereUniqueInput | StreamBattleWhereUniqueInput[]
    disconnect?: StreamBattleWhereUniqueInput | StreamBattleWhereUniqueInput[]
    delete?: StreamBattleWhereUniqueInput | StreamBattleWhereUniqueInput[]
    connect?: StreamBattleWhereUniqueInput | StreamBattleWhereUniqueInput[]
    update?: StreamBattleUpdateWithWhereUniqueWithoutStream1Input | StreamBattleUpdateWithWhereUniqueWithoutStream1Input[]
    updateMany?: StreamBattleUpdateManyWithWhereWithoutStream1Input | StreamBattleUpdateManyWithWhereWithoutStream1Input[]
    deleteMany?: StreamBattleScalarWhereInput | StreamBattleScalarWhereInput[]
  }

  export type StreamBattleUncheckedUpdateManyWithoutStream2NestedInput = {
    create?: XOR<StreamBattleCreateWithoutStream2Input, StreamBattleUncheckedCreateWithoutStream2Input> | StreamBattleCreateWithoutStream2Input[] | StreamBattleUncheckedCreateWithoutStream2Input[]
    connectOrCreate?: StreamBattleCreateOrConnectWithoutStream2Input | StreamBattleCreateOrConnectWithoutStream2Input[]
    upsert?: StreamBattleUpsertWithWhereUniqueWithoutStream2Input | StreamBattleUpsertWithWhereUniqueWithoutStream2Input[]
    createMany?: StreamBattleCreateManyStream2InputEnvelope
    set?: StreamBattleWhereUniqueInput | StreamBattleWhereUniqueInput[]
    disconnect?: StreamBattleWhereUniqueInput | StreamBattleWhereUniqueInput[]
    delete?: StreamBattleWhereUniqueInput | StreamBattleWhereUniqueInput[]
    connect?: StreamBattleWhereUniqueInput | StreamBattleWhereUniqueInput[]
    update?: StreamBattleUpdateWithWhereUniqueWithoutStream2Input | StreamBattleUpdateWithWhereUniqueWithoutStream2Input[]
    updateMany?: StreamBattleUpdateManyWithWhereWithoutStream2Input | StreamBattleUpdateManyWithWhereWithoutStream2Input[]
    deleteMany?: StreamBattleScalarWhereInput | StreamBattleScalarWhereInput[]
  }

  export type ModerationReportUncheckedUpdateManyWithoutStreamNestedInput = {
    create?: XOR<ModerationReportCreateWithoutStreamInput, ModerationReportUncheckedCreateWithoutStreamInput> | ModerationReportCreateWithoutStreamInput[] | ModerationReportUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: ModerationReportCreateOrConnectWithoutStreamInput | ModerationReportCreateOrConnectWithoutStreamInput[]
    upsert?: ModerationReportUpsertWithWhereUniqueWithoutStreamInput | ModerationReportUpsertWithWhereUniqueWithoutStreamInput[]
    createMany?: ModerationReportCreateManyStreamInputEnvelope
    set?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    disconnect?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    delete?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    connect?: ModerationReportWhereUniqueInput | ModerationReportWhereUniqueInput[]
    update?: ModerationReportUpdateWithWhereUniqueWithoutStreamInput | ModerationReportUpdateWithWhereUniqueWithoutStreamInput[]
    updateMany?: ModerationReportUpdateManyWithWhereWithoutStreamInput | ModerationReportUpdateManyWithWhereWithoutStreamInput[]
    deleteMany?: ModerationReportScalarWhereInput | ModerationReportScalarWhereInput[]
  }

  export type StreamCreateNestedOneWithoutLiveRoomInput = {
    create?: XOR<StreamCreateWithoutLiveRoomInput, StreamUncheckedCreateWithoutLiveRoomInput>
    connectOrCreate?: StreamCreateOrConnectWithoutLiveRoomInput
    connect?: StreamWhereUniqueInput
  }

  export type StreamUpdateOneRequiredWithoutLiveRoomNestedInput = {
    create?: XOR<StreamCreateWithoutLiveRoomInput, StreamUncheckedCreateWithoutLiveRoomInput>
    connectOrCreate?: StreamCreateOrConnectWithoutLiveRoomInput
    upsert?: StreamUpsertWithoutLiveRoomInput
    connect?: StreamWhereUniqueInput
    update?: XOR<XOR<StreamUpdateToOneWithWhereWithoutLiveRoomInput, StreamUpdateWithoutLiveRoomInput>, StreamUncheckedUpdateWithoutLiveRoomInput>
  }

  export type UserCreateNestedOneWithoutMessagesInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type StreamCreateNestedOneWithoutMessagesInput = {
    create?: XOR<StreamCreateWithoutMessagesInput, StreamUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: StreamCreateOrConnectWithoutMessagesInput
    connect?: StreamWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    upsert?: UserUpsertWithoutMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMessagesInput, UserUpdateWithoutMessagesInput>, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type StreamUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<StreamCreateWithoutMessagesInput, StreamUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: StreamCreateOrConnectWithoutMessagesInput
    upsert?: StreamUpsertWithoutMessagesInput
    connect?: StreamWhereUniqueInput
    update?: XOR<XOR<StreamUpdateToOneWithWhereWithoutMessagesInput, StreamUpdateWithoutMessagesInput>, StreamUncheckedUpdateWithoutMessagesInput>
  }

  export type UserCreateNestedOneWithoutFollowingInput = {
    create?: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowingInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFollowersInput = {
    create?: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowersInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFollowingNestedInput = {
    create?: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowingInput
    upsert?: UserUpsertWithoutFollowingInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFollowingInput, UserUpdateWithoutFollowingInput>, UserUncheckedUpdateWithoutFollowingInput>
  }

  export type UserUpdateOneRequiredWithoutFollowersNestedInput = {
    create?: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowersInput
    upsert?: UserUpsertWithoutFollowersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFollowersInput, UserUpdateWithoutFollowersInput>, UserUncheckedUpdateWithoutFollowersInput>
  }

  export type StreamCreateNestedOneWithoutBattles1Input = {
    create?: XOR<StreamCreateWithoutBattles1Input, StreamUncheckedCreateWithoutBattles1Input>
    connectOrCreate?: StreamCreateOrConnectWithoutBattles1Input
    connect?: StreamWhereUniqueInput
  }

  export type StreamCreateNestedOneWithoutBattles2Input = {
    create?: XOR<StreamCreateWithoutBattles2Input, StreamUncheckedCreateWithoutBattles2Input>
    connectOrCreate?: StreamCreateOrConnectWithoutBattles2Input
    connect?: StreamWhereUniqueInput
  }

  export type EnumBattleStatusFieldUpdateOperationsInput = {
    set?: $Enums.BattleStatus
  }

  export type StreamUpdateOneRequiredWithoutBattles1NestedInput = {
    create?: XOR<StreamCreateWithoutBattles1Input, StreamUncheckedCreateWithoutBattles1Input>
    connectOrCreate?: StreamCreateOrConnectWithoutBattles1Input
    upsert?: StreamUpsertWithoutBattles1Input
    connect?: StreamWhereUniqueInput
    update?: XOR<XOR<StreamUpdateToOneWithWhereWithoutBattles1Input, StreamUpdateWithoutBattles1Input>, StreamUncheckedUpdateWithoutBattles1Input>
  }

  export type StreamUpdateOneRequiredWithoutBattles2NestedInput = {
    create?: XOR<StreamCreateWithoutBattles2Input, StreamUncheckedCreateWithoutBattles2Input>
    connectOrCreate?: StreamCreateOrConnectWithoutBattles2Input
    upsert?: StreamUpsertWithoutBattles2Input
    connect?: StreamWhereUniqueInput
    update?: XOR<XOR<StreamUpdateToOneWithWhereWithoutBattles2Input, StreamUpdateWithoutBattles2Input>, StreamUncheckedUpdateWithoutBattles2Input>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumNotificationTypeFieldUpdateOperationsInput = {
    set?: $Enums.NotificationType
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserCreateNestedOneWithoutReportsMadeInput = {
    create?: XOR<UserCreateWithoutReportsMadeInput, UserUncheckedCreateWithoutReportsMadeInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportsMadeInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReportsInput = {
    create?: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportsInput
    connect?: UserWhereUniqueInput
  }

  export type StreamCreateNestedOneWithoutReportsInput = {
    create?: XOR<StreamCreateWithoutReportsInput, StreamUncheckedCreateWithoutReportsInput>
    connectOrCreate?: StreamCreateOrConnectWithoutReportsInput
    connect?: StreamWhereUniqueInput
  }

  export type EnumReportStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReportStatus
  }

  export type UserUpdateOneRequiredWithoutReportsMadeNestedInput = {
    create?: XOR<UserCreateWithoutReportsMadeInput, UserUncheckedCreateWithoutReportsMadeInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportsMadeInput
    upsert?: UserUpsertWithoutReportsMadeInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReportsMadeInput, UserUpdateWithoutReportsMadeInput>, UserUncheckedUpdateWithoutReportsMadeInput>
  }

  export type UserUpdateOneRequiredWithoutReportsNestedInput = {
    create?: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportsInput
    upsert?: UserUpsertWithoutReportsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReportsInput, UserUpdateWithoutReportsInput>, UserUncheckedUpdateWithoutReportsInput>
  }

  export type StreamUpdateOneWithoutReportsNestedInput = {
    create?: XOR<StreamCreateWithoutReportsInput, StreamUncheckedCreateWithoutReportsInput>
    connectOrCreate?: StreamCreateOrConnectWithoutReportsInput
    upsert?: StreamUpsertWithoutReportsInput
    disconnect?: StreamWhereInput | boolean
    delete?: StreamWhereInput | boolean
    connect?: StreamWhereUniqueInput
    update?: XOR<XOR<StreamUpdateToOneWithWhereWithoutReportsInput, StreamUpdateWithoutReportsInput>, StreamUncheckedUpdateWithoutReportsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumPostTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PostType | EnumPostTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PostType[] | ListEnumPostTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PostType[] | ListEnumPostTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPostTypeFilter<$PrismaModel> | $Enums.PostType
  }

  export type NestedEnumPostTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PostType | EnumPostTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PostType[] | ListEnumPostTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PostType[] | ListEnumPostTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPostTypeWithAggregatesFilter<$PrismaModel> | $Enums.PostType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPostTypeFilter<$PrismaModel>
    _max?: NestedEnumPostTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumBattleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BattleStatus | EnumBattleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BattleStatus[] | ListEnumBattleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BattleStatus[] | ListEnumBattleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBattleStatusFilter<$PrismaModel> | $Enums.BattleStatus
  }

  export type NestedEnumBattleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BattleStatus | EnumBattleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BattleStatus[] | ListEnumBattleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BattleStatus[] | ListEnumBattleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBattleStatusWithAggregatesFilter<$PrismaModel> | $Enums.BattleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBattleStatusFilter<$PrismaModel>
    _max?: NestedEnumBattleStatusFilter<$PrismaModel>
  }

  export type NestedEnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type NestedEnumReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusFilter<$PrismaModel> | $Enums.ReportStatus
  }

  export type NestedEnumReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReportStatusFilter<$PrismaModel>
    _max?: NestedEnumReportStatusFilter<$PrismaModel>
  }

  export type StreamCreateWithoutUserInput = {
    id?: string
    title: string
    thumbnail?: string | null
    isLive?: boolean
    category?: string | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutStreamInput
    liveRoom?: LiveRoomCreateNestedOneWithoutStreamInput
    battles1?: StreamBattleCreateNestedManyWithoutStream1Input
    battles2?: StreamBattleCreateNestedManyWithoutStream2Input
    reports?: ModerationReportCreateNestedManyWithoutStreamInput
  }

  export type StreamUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    thumbnail?: string | null
    isLive?: boolean
    category?: string | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutStreamInput
    liveRoom?: LiveRoomUncheckedCreateNestedOneWithoutStreamInput
    battles1?: StreamBattleUncheckedCreateNestedManyWithoutStream1Input
    battles2?: StreamBattleUncheckedCreateNestedManyWithoutStream2Input
    reports?: ModerationReportUncheckedCreateNestedManyWithoutStreamInput
  }

  export type StreamCreateOrConnectWithoutUserInput = {
    where: StreamWhereUniqueInput
    create: XOR<StreamCreateWithoutUserInput, StreamUncheckedCreateWithoutUserInput>
  }

  export type WalletCreateWithoutUserInput = {
    id?: string
    balance?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionCreateNestedManyWithoutWalletInput
  }

  export type WalletUncheckedCreateWithoutUserInput = {
    id?: string
    balance?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutWalletInput
  }

  export type WalletCreateOrConnectWithoutUserInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
  }

  export type PostCreateWithoutUserInput = {
    id?: string
    title: string
    url: string
    type: $Enums.PostType
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    url: string
    type: $Enums.PostType
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostCreateOrConnectWithoutUserInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput>
  }

  export type PostCreateManyUserInputEnvelope = {
    data: PostCreateManyUserInput | PostCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FollowCreateWithoutFollowerInput = {
    id?: string
    createdAt?: Date | string
    following: UserCreateNestedOneWithoutFollowersInput
  }

  export type FollowUncheckedCreateWithoutFollowerInput = {
    id?: string
    followingId: string
    createdAt?: Date | string
  }

  export type FollowCreateOrConnectWithoutFollowerInput = {
    where: FollowWhereUniqueInput
    create: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput>
  }

  export type FollowCreateManyFollowerInputEnvelope = {
    data: FollowCreateManyFollowerInput | FollowCreateManyFollowerInput[]
    skipDuplicates?: boolean
  }

  export type FollowCreateWithoutFollowingInput = {
    id?: string
    createdAt?: Date | string
    follower: UserCreateNestedOneWithoutFollowingInput
  }

  export type FollowUncheckedCreateWithoutFollowingInput = {
    id?: string
    followerId: string
    createdAt?: Date | string
  }

  export type FollowCreateOrConnectWithoutFollowingInput = {
    where: FollowWhereUniqueInput
    create: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput>
  }

  export type FollowCreateManyFollowingInputEnvelope = {
    data: FollowCreateManyFollowingInput | FollowCreateManyFollowingInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    type: $Enums.NotificationType
    content: string
    isRead?: boolean
    link?: string | null
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    type: $Enums.NotificationType
    content: string
    isRead?: boolean
    link?: string | null
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ModerationReportCreateWithoutReporterInput = {
    id?: string
    reason: string
    details?: string | null
    status?: $Enums.ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    reported: UserCreateNestedOneWithoutReportsInput
    stream?: StreamCreateNestedOneWithoutReportsInput
  }

  export type ModerationReportUncheckedCreateWithoutReporterInput = {
    id?: string
    reportedId: string
    streamId?: string | null
    reason: string
    details?: string | null
    status?: $Enums.ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModerationReportCreateOrConnectWithoutReporterInput = {
    where: ModerationReportWhereUniqueInput
    create: XOR<ModerationReportCreateWithoutReporterInput, ModerationReportUncheckedCreateWithoutReporterInput>
  }

  export type ModerationReportCreateManyReporterInputEnvelope = {
    data: ModerationReportCreateManyReporterInput | ModerationReportCreateManyReporterInput[]
    skipDuplicates?: boolean
  }

  export type ModerationReportCreateWithoutReportedInput = {
    id?: string
    reason: string
    details?: string | null
    status?: $Enums.ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    reporter: UserCreateNestedOneWithoutReportsMadeInput
    stream?: StreamCreateNestedOneWithoutReportsInput
  }

  export type ModerationReportUncheckedCreateWithoutReportedInput = {
    id?: string
    reporterId: string
    streamId?: string | null
    reason: string
    details?: string | null
    status?: $Enums.ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModerationReportCreateOrConnectWithoutReportedInput = {
    where: ModerationReportWhereUniqueInput
    create: XOR<ModerationReportCreateWithoutReportedInput, ModerationReportUncheckedCreateWithoutReportedInput>
  }

  export type ModerationReportCreateManyReportedInputEnvelope = {
    data: ModerationReportCreateManyReportedInput | ModerationReportCreateManyReportedInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutUserInput = {
    id?: string
    content: string
    isGift?: boolean
    giftId?: string | null
    createdAt?: Date | string
    stream: StreamCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutUserInput = {
    id?: string
    content: string
    streamId: string
    isGift?: boolean
    giftId?: string | null
    createdAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutUserInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput>
  }

  export type MessageCreateManyUserInputEnvelope = {
    data: MessageCreateManyUserInput | MessageCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type StreamUpsertWithoutUserInput = {
    update: XOR<StreamUpdateWithoutUserInput, StreamUncheckedUpdateWithoutUserInput>
    create: XOR<StreamCreateWithoutUserInput, StreamUncheckedCreateWithoutUserInput>
    where?: StreamWhereInput
  }

  export type StreamUpdateToOneWithWhereWithoutUserInput = {
    where?: StreamWhereInput
    data: XOR<StreamUpdateWithoutUserInput, StreamUncheckedUpdateWithoutUserInput>
  }

  export type StreamUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    category?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutStreamNestedInput
    liveRoom?: LiveRoomUpdateOneWithoutStreamNestedInput
    battles1?: StreamBattleUpdateManyWithoutStream1NestedInput
    battles2?: StreamBattleUpdateManyWithoutStream2NestedInput
    reports?: ModerationReportUpdateManyWithoutStreamNestedInput
  }

  export type StreamUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    category?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutStreamNestedInput
    liveRoom?: LiveRoomUncheckedUpdateOneWithoutStreamNestedInput
    battles1?: StreamBattleUncheckedUpdateManyWithoutStream1NestedInput
    battles2?: StreamBattleUncheckedUpdateManyWithoutStream2NestedInput
    reports?: ModerationReportUncheckedUpdateManyWithoutStreamNestedInput
  }

  export type WalletUpsertWithoutUserInput = {
    update: XOR<WalletUpdateWithoutUserInput, WalletUncheckedUpdateWithoutUserInput>
    create: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
    where?: WalletWhereInput
  }

  export type WalletUpdateToOneWithWhereWithoutUserInput = {
    where?: WalletWhereInput
    data: XOR<WalletUpdateWithoutUserInput, WalletUncheckedUpdateWithoutUserInput>
  }

  export type WalletUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type PostUpsertWithWhereUniqueWithoutUserInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutUserInput, PostUncheckedUpdateWithoutUserInput>
    create: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput>
  }

  export type PostUpdateWithWhereUniqueWithoutUserInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutUserInput, PostUncheckedUpdateWithoutUserInput>
  }

  export type PostUpdateManyWithWhereWithoutUserInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutUserInput>
  }

  export type PostScalarWhereInput = {
    AND?: PostScalarWhereInput | PostScalarWhereInput[]
    OR?: PostScalarWhereInput[]
    NOT?: PostScalarWhereInput | PostScalarWhereInput[]
    id?: StringFilter<"Post"> | string
    title?: StringFilter<"Post"> | string
    url?: StringFilter<"Post"> | string
    type?: EnumPostTypeFilter<"Post"> | $Enums.PostType
    isPrivate?: BoolFilter<"Post"> | boolean
    userId?: StringFilter<"Post"> | string
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
  }

  export type FollowUpsertWithWhereUniqueWithoutFollowerInput = {
    where: FollowWhereUniqueInput
    update: XOR<FollowUpdateWithoutFollowerInput, FollowUncheckedUpdateWithoutFollowerInput>
    create: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput>
  }

  export type FollowUpdateWithWhereUniqueWithoutFollowerInput = {
    where: FollowWhereUniqueInput
    data: XOR<FollowUpdateWithoutFollowerInput, FollowUncheckedUpdateWithoutFollowerInput>
  }

  export type FollowUpdateManyWithWhereWithoutFollowerInput = {
    where: FollowScalarWhereInput
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyWithoutFollowerInput>
  }

  export type FollowScalarWhereInput = {
    AND?: FollowScalarWhereInput | FollowScalarWhereInput[]
    OR?: FollowScalarWhereInput[]
    NOT?: FollowScalarWhereInput | FollowScalarWhereInput[]
    id?: StringFilter<"Follow"> | string
    followerId?: StringFilter<"Follow"> | string
    followingId?: StringFilter<"Follow"> | string
    createdAt?: DateTimeFilter<"Follow"> | Date | string
  }

  export type FollowUpsertWithWhereUniqueWithoutFollowingInput = {
    where: FollowWhereUniqueInput
    update: XOR<FollowUpdateWithoutFollowingInput, FollowUncheckedUpdateWithoutFollowingInput>
    create: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput>
  }

  export type FollowUpdateWithWhereUniqueWithoutFollowingInput = {
    where: FollowWhereUniqueInput
    data: XOR<FollowUpdateWithoutFollowingInput, FollowUncheckedUpdateWithoutFollowingInput>
  }

  export type FollowUpdateManyWithWhereWithoutFollowingInput = {
    where: FollowScalarWhereInput
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyWithoutFollowingInput>
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    content?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    link?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type ModerationReportUpsertWithWhereUniqueWithoutReporterInput = {
    where: ModerationReportWhereUniqueInput
    update: XOR<ModerationReportUpdateWithoutReporterInput, ModerationReportUncheckedUpdateWithoutReporterInput>
    create: XOR<ModerationReportCreateWithoutReporterInput, ModerationReportUncheckedCreateWithoutReporterInput>
  }

  export type ModerationReportUpdateWithWhereUniqueWithoutReporterInput = {
    where: ModerationReportWhereUniqueInput
    data: XOR<ModerationReportUpdateWithoutReporterInput, ModerationReportUncheckedUpdateWithoutReporterInput>
  }

  export type ModerationReportUpdateManyWithWhereWithoutReporterInput = {
    where: ModerationReportScalarWhereInput
    data: XOR<ModerationReportUpdateManyMutationInput, ModerationReportUncheckedUpdateManyWithoutReporterInput>
  }

  export type ModerationReportScalarWhereInput = {
    AND?: ModerationReportScalarWhereInput | ModerationReportScalarWhereInput[]
    OR?: ModerationReportScalarWhereInput[]
    NOT?: ModerationReportScalarWhereInput | ModerationReportScalarWhereInput[]
    id?: StringFilter<"ModerationReport"> | string
    reporterId?: StringFilter<"ModerationReport"> | string
    reportedId?: StringFilter<"ModerationReport"> | string
    streamId?: StringNullableFilter<"ModerationReport"> | string | null
    reason?: StringFilter<"ModerationReport"> | string
    details?: StringNullableFilter<"ModerationReport"> | string | null
    status?: EnumReportStatusFilter<"ModerationReport"> | $Enums.ReportStatus
    createdAt?: DateTimeFilter<"ModerationReport"> | Date | string
    updatedAt?: DateTimeFilter<"ModerationReport"> | Date | string
  }

  export type ModerationReportUpsertWithWhereUniqueWithoutReportedInput = {
    where: ModerationReportWhereUniqueInput
    update: XOR<ModerationReportUpdateWithoutReportedInput, ModerationReportUncheckedUpdateWithoutReportedInput>
    create: XOR<ModerationReportCreateWithoutReportedInput, ModerationReportUncheckedCreateWithoutReportedInput>
  }

  export type ModerationReportUpdateWithWhereUniqueWithoutReportedInput = {
    where: ModerationReportWhereUniqueInput
    data: XOR<ModerationReportUpdateWithoutReportedInput, ModerationReportUncheckedUpdateWithoutReportedInput>
  }

  export type ModerationReportUpdateManyWithWhereWithoutReportedInput = {
    where: ModerationReportScalarWhereInput
    data: XOR<ModerationReportUpdateManyMutationInput, ModerationReportUncheckedUpdateManyWithoutReportedInput>
  }

  export type MessageUpsertWithWhereUniqueWithoutUserInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutUserInput, MessageUncheckedUpdateWithoutUserInput>
    create: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutUserInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutUserInput, MessageUncheckedUpdateWithoutUserInput>
  }

  export type MessageUpdateManyWithWhereWithoutUserInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutUserInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    userId?: StringFilter<"Message"> | string
    streamId?: StringFilter<"Message"> | string
    isGift?: BoolFilter<"Message"> | boolean
    giftId?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type UserCreateWithoutPostsInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    avatar?: string | null
    bio?: string | null
    cover?: string | null
    tiktokActive?: boolean
    tiktokUrl?: string | null
    instagramActive?: boolean
    instagramUrl?: string | null
    youtubeActive?: boolean
    youtubeUrl?: string | null
    facebookActive?: boolean
    facebookUrl?: string | null
    isLive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stream?: StreamCreateNestedOneWithoutUserInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    followers?: FollowCreateNestedManyWithoutFollowingInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    reportsMade?: ModerationReportCreateNestedManyWithoutReporterInput
    reports?: ModerationReportCreateNestedManyWithoutReportedInput
    messages?: MessageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPostsInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    avatar?: string | null
    bio?: string | null
    cover?: string | null
    tiktokActive?: boolean
    tiktokUrl?: string | null
    instagramActive?: boolean
    instagramUrl?: string | null
    youtubeActive?: boolean
    youtubeUrl?: string | null
    facebookActive?: boolean
    facebookUrl?: string | null
    isLive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stream?: StreamUncheckedCreateNestedOneWithoutUserInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    reportsMade?: ModerationReportUncheckedCreateNestedManyWithoutReporterInput
    reports?: ModerationReportUncheckedCreateNestedManyWithoutReportedInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
  }

  export type UserUpsertWithoutPostsInput = {
    update: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPostsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
  }

  export type UserUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokActive?: BoolFieldUpdateOperationsInput | boolean
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramActive?: BoolFieldUpdateOperationsInput | boolean
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeActive?: BoolFieldUpdateOperationsInput | boolean
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookActive?: BoolFieldUpdateOperationsInput | boolean
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUpdateOneWithoutUserNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    followers?: FollowUpdateManyWithoutFollowingNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    reportsMade?: ModerationReportUpdateManyWithoutReporterNestedInput
    reports?: ModerationReportUpdateManyWithoutReportedNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokActive?: BoolFieldUpdateOperationsInput | boolean
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramActive?: BoolFieldUpdateOperationsInput | boolean
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeActive?: BoolFieldUpdateOperationsInput | boolean
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookActive?: BoolFieldUpdateOperationsInput | boolean
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUncheckedUpdateOneWithoutUserNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    reportsMade?: ModerationReportUncheckedUpdateManyWithoutReporterNestedInput
    reports?: ModerationReportUncheckedUpdateManyWithoutReportedNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutWalletInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    avatar?: string | null
    bio?: string | null
    cover?: string | null
    tiktokActive?: boolean
    tiktokUrl?: string | null
    instagramActive?: boolean
    instagramUrl?: string | null
    youtubeActive?: boolean
    youtubeUrl?: string | null
    facebookActive?: boolean
    facebookUrl?: string | null
    isLive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stream?: StreamCreateNestedOneWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    followers?: FollowCreateNestedManyWithoutFollowingInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    reportsMade?: ModerationReportCreateNestedManyWithoutReporterInput
    reports?: ModerationReportCreateNestedManyWithoutReportedInput
    messages?: MessageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWalletInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    avatar?: string | null
    bio?: string | null
    cover?: string | null
    tiktokActive?: boolean
    tiktokUrl?: string | null
    instagramActive?: boolean
    instagramUrl?: string | null
    youtubeActive?: boolean
    youtubeUrl?: string | null
    facebookActive?: boolean
    facebookUrl?: string | null
    isLive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stream?: StreamUncheckedCreateNestedOneWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    reportsMade?: ModerationReportUncheckedCreateNestedManyWithoutReporterInput
    reports?: ModerationReportUncheckedCreateNestedManyWithoutReportedInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWalletInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
  }

  export type TransactionCreateWithoutWalletInput = {
    id?: string
    amount: number
    type: $Enums.TransactionType
    referenceId?: string | null
    createdAt?: Date | string
    gift?: GiftCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutWalletInput = {
    id?: string
    amount: number
    type: $Enums.TransactionType
    giftId?: string | null
    referenceId?: string | null
    createdAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutWalletInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput>
  }

  export type TransactionCreateManyWalletInputEnvelope = {
    data: TransactionCreateManyWalletInput | TransactionCreateManyWalletInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutWalletInput = {
    update: XOR<UserUpdateWithoutWalletInput, UserUncheckedUpdateWithoutWalletInput>
    create: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWalletInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWalletInput, UserUncheckedUpdateWithoutWalletInput>
  }

  export type UserUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokActive?: BoolFieldUpdateOperationsInput | boolean
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramActive?: BoolFieldUpdateOperationsInput | boolean
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeActive?: BoolFieldUpdateOperationsInput | boolean
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookActive?: BoolFieldUpdateOperationsInput | boolean
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUpdateOneWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    followers?: FollowUpdateManyWithoutFollowingNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    reportsMade?: ModerationReportUpdateManyWithoutReporterNestedInput
    reports?: ModerationReportUpdateManyWithoutReportedNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokActive?: BoolFieldUpdateOperationsInput | boolean
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramActive?: BoolFieldUpdateOperationsInput | boolean
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeActive?: BoolFieldUpdateOperationsInput | boolean
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookActive?: BoolFieldUpdateOperationsInput | boolean
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUncheckedUpdateOneWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    reportsMade?: ModerationReportUncheckedUpdateManyWithoutReporterNestedInput
    reports?: ModerationReportUncheckedUpdateManyWithoutReportedNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TransactionUpsertWithWhereUniqueWithoutWalletInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutWalletInput, TransactionUncheckedUpdateWithoutWalletInput>
    create: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutWalletInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutWalletInput, TransactionUncheckedUpdateWithoutWalletInput>
  }

  export type TransactionUpdateManyWithWhereWithoutWalletInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutWalletInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    amount?: IntFilter<"Transaction"> | number
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    walletId?: StringFilter<"Transaction"> | string
    giftId?: StringNullableFilter<"Transaction"> | string | null
    referenceId?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type WalletCreateWithoutTransactionsInput = {
    id?: string
    balance?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWalletInput
  }

  export type WalletUncheckedCreateWithoutTransactionsInput = {
    id?: string
    userId: string
    balance?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WalletCreateOrConnectWithoutTransactionsInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
  }

  export type GiftCreateWithoutTransactionsInput = {
    id?: string
    name: string
    price: number
    icon: string
    animationUrl?: string | null
  }

  export type GiftUncheckedCreateWithoutTransactionsInput = {
    id?: string
    name: string
    price: number
    icon: string
    animationUrl?: string | null
  }

  export type GiftCreateOrConnectWithoutTransactionsInput = {
    where: GiftWhereUniqueInput
    create: XOR<GiftCreateWithoutTransactionsInput, GiftUncheckedCreateWithoutTransactionsInput>
  }

  export type WalletUpsertWithoutTransactionsInput = {
    update: XOR<WalletUpdateWithoutTransactionsInput, WalletUncheckedUpdateWithoutTransactionsInput>
    create: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
    where?: WalletWhereInput
  }

  export type WalletUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: WalletWhereInput
    data: XOR<WalletUpdateWithoutTransactionsInput, WalletUncheckedUpdateWithoutTransactionsInput>
  }

  export type WalletUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GiftUpsertWithoutTransactionsInput = {
    update: XOR<GiftUpdateWithoutTransactionsInput, GiftUncheckedUpdateWithoutTransactionsInput>
    create: XOR<GiftCreateWithoutTransactionsInput, GiftUncheckedCreateWithoutTransactionsInput>
    where?: GiftWhereInput
  }

  export type GiftUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: GiftWhereInput
    data: XOR<GiftUpdateWithoutTransactionsInput, GiftUncheckedUpdateWithoutTransactionsInput>
  }

  export type GiftUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    icon?: StringFieldUpdateOperationsInput | string
    animationUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GiftUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    icon?: StringFieldUpdateOperationsInput | string
    animationUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransactionCreateWithoutGiftInput = {
    id?: string
    amount: number
    type: $Enums.TransactionType
    referenceId?: string | null
    createdAt?: Date | string
    wallet: WalletCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutGiftInput = {
    id?: string
    amount: number
    type: $Enums.TransactionType
    walletId: string
    referenceId?: string | null
    createdAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutGiftInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutGiftInput, TransactionUncheckedCreateWithoutGiftInput>
  }

  export type TransactionCreateManyGiftInputEnvelope = {
    data: TransactionCreateManyGiftInput | TransactionCreateManyGiftInput[]
    skipDuplicates?: boolean
  }

  export type TransactionUpsertWithWhereUniqueWithoutGiftInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutGiftInput, TransactionUncheckedUpdateWithoutGiftInput>
    create: XOR<TransactionCreateWithoutGiftInput, TransactionUncheckedCreateWithoutGiftInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutGiftInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutGiftInput, TransactionUncheckedUpdateWithoutGiftInput>
  }

  export type TransactionUpdateManyWithWhereWithoutGiftInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutGiftInput>
  }

  export type UserCreateWithoutStreamInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    avatar?: string | null
    bio?: string | null
    cover?: string | null
    tiktokActive?: boolean
    tiktokUrl?: string | null
    instagramActive?: boolean
    instagramUrl?: string | null
    youtubeActive?: boolean
    youtubeUrl?: string | null
    facebookActive?: boolean
    facebookUrl?: string | null
    isLive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    wallet?: WalletCreateNestedOneWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    followers?: FollowCreateNestedManyWithoutFollowingInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    reportsMade?: ModerationReportCreateNestedManyWithoutReporterInput
    reports?: ModerationReportCreateNestedManyWithoutReportedInput
    messages?: MessageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStreamInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    avatar?: string | null
    bio?: string | null
    cover?: string | null
    tiktokActive?: boolean
    tiktokUrl?: string | null
    instagramActive?: boolean
    instagramUrl?: string | null
    youtubeActive?: boolean
    youtubeUrl?: string | null
    facebookActive?: boolean
    facebookUrl?: string | null
    isLive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    reportsMade?: ModerationReportUncheckedCreateNestedManyWithoutReporterInput
    reports?: ModerationReportUncheckedCreateNestedManyWithoutReportedInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStreamInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStreamInput, UserUncheckedCreateWithoutStreamInput>
  }

  export type MessageCreateWithoutStreamInput = {
    id?: string
    content: string
    isGift?: boolean
    giftId?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutStreamInput = {
    id?: string
    content: string
    userId: string
    isGift?: boolean
    giftId?: string | null
    createdAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutStreamInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutStreamInput, MessageUncheckedCreateWithoutStreamInput>
  }

  export type MessageCreateManyStreamInputEnvelope = {
    data: MessageCreateManyStreamInput | MessageCreateManyStreamInput[]
    skipDuplicates?: boolean
  }

  export type LiveRoomCreateWithoutStreamInput = {
    id?: string
    activeViewers?: number
    totalViews?: number
    likes?: number
  }

  export type LiveRoomUncheckedCreateWithoutStreamInput = {
    id?: string
    activeViewers?: number
    totalViews?: number
    likes?: number
  }

  export type LiveRoomCreateOrConnectWithoutStreamInput = {
    where: LiveRoomWhereUniqueInput
    create: XOR<LiveRoomCreateWithoutStreamInput, LiveRoomUncheckedCreateWithoutStreamInput>
  }

  export type StreamBattleCreateWithoutStream1Input = {
    id?: string
    points1?: number
    points2?: number
    winnerId?: string | null
    status?: $Enums.BattleStatus
    startTime?: Date | string | null
    endTime?: Date | string | null
    createdAt?: Date | string
    stream2: StreamCreateNestedOneWithoutBattles2Input
  }

  export type StreamBattleUncheckedCreateWithoutStream1Input = {
    id?: string
    stream2Id: string
    points1?: number
    points2?: number
    winnerId?: string | null
    status?: $Enums.BattleStatus
    startTime?: Date | string | null
    endTime?: Date | string | null
    createdAt?: Date | string
  }

  export type StreamBattleCreateOrConnectWithoutStream1Input = {
    where: StreamBattleWhereUniqueInput
    create: XOR<StreamBattleCreateWithoutStream1Input, StreamBattleUncheckedCreateWithoutStream1Input>
  }

  export type StreamBattleCreateManyStream1InputEnvelope = {
    data: StreamBattleCreateManyStream1Input | StreamBattleCreateManyStream1Input[]
    skipDuplicates?: boolean
  }

  export type StreamBattleCreateWithoutStream2Input = {
    id?: string
    points1?: number
    points2?: number
    winnerId?: string | null
    status?: $Enums.BattleStatus
    startTime?: Date | string | null
    endTime?: Date | string | null
    createdAt?: Date | string
    stream1: StreamCreateNestedOneWithoutBattles1Input
  }

  export type StreamBattleUncheckedCreateWithoutStream2Input = {
    id?: string
    stream1Id: string
    points1?: number
    points2?: number
    winnerId?: string | null
    status?: $Enums.BattleStatus
    startTime?: Date | string | null
    endTime?: Date | string | null
    createdAt?: Date | string
  }

  export type StreamBattleCreateOrConnectWithoutStream2Input = {
    where: StreamBattleWhereUniqueInput
    create: XOR<StreamBattleCreateWithoutStream2Input, StreamBattleUncheckedCreateWithoutStream2Input>
  }

  export type StreamBattleCreateManyStream2InputEnvelope = {
    data: StreamBattleCreateManyStream2Input | StreamBattleCreateManyStream2Input[]
    skipDuplicates?: boolean
  }

  export type ModerationReportCreateWithoutStreamInput = {
    id?: string
    reason: string
    details?: string | null
    status?: $Enums.ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    reporter: UserCreateNestedOneWithoutReportsMadeInput
    reported: UserCreateNestedOneWithoutReportsInput
  }

  export type ModerationReportUncheckedCreateWithoutStreamInput = {
    id?: string
    reporterId: string
    reportedId: string
    reason: string
    details?: string | null
    status?: $Enums.ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModerationReportCreateOrConnectWithoutStreamInput = {
    where: ModerationReportWhereUniqueInput
    create: XOR<ModerationReportCreateWithoutStreamInput, ModerationReportUncheckedCreateWithoutStreamInput>
  }

  export type ModerationReportCreateManyStreamInputEnvelope = {
    data: ModerationReportCreateManyStreamInput | ModerationReportCreateManyStreamInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutStreamInput = {
    update: XOR<UserUpdateWithoutStreamInput, UserUncheckedUpdateWithoutStreamInput>
    create: XOR<UserCreateWithoutStreamInput, UserUncheckedCreateWithoutStreamInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStreamInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStreamInput, UserUncheckedUpdateWithoutStreamInput>
  }

  export type UserUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokActive?: BoolFieldUpdateOperationsInput | boolean
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramActive?: BoolFieldUpdateOperationsInput | boolean
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeActive?: BoolFieldUpdateOperationsInput | boolean
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookActive?: BoolFieldUpdateOperationsInput | boolean
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: WalletUpdateOneWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    followers?: FollowUpdateManyWithoutFollowingNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    reportsMade?: ModerationReportUpdateManyWithoutReporterNestedInput
    reports?: ModerationReportUpdateManyWithoutReportedNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokActive?: BoolFieldUpdateOperationsInput | boolean
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramActive?: BoolFieldUpdateOperationsInput | boolean
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeActive?: BoolFieldUpdateOperationsInput | boolean
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookActive?: BoolFieldUpdateOperationsInput | boolean
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    reportsMade?: ModerationReportUncheckedUpdateManyWithoutReporterNestedInput
    reports?: ModerationReportUncheckedUpdateManyWithoutReportedNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MessageUpsertWithWhereUniqueWithoutStreamInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutStreamInput, MessageUncheckedUpdateWithoutStreamInput>
    create: XOR<MessageCreateWithoutStreamInput, MessageUncheckedCreateWithoutStreamInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutStreamInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutStreamInput, MessageUncheckedUpdateWithoutStreamInput>
  }

  export type MessageUpdateManyWithWhereWithoutStreamInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutStreamInput>
  }

  export type LiveRoomUpsertWithoutStreamInput = {
    update: XOR<LiveRoomUpdateWithoutStreamInput, LiveRoomUncheckedUpdateWithoutStreamInput>
    create: XOR<LiveRoomCreateWithoutStreamInput, LiveRoomUncheckedCreateWithoutStreamInput>
    where?: LiveRoomWhereInput
  }

  export type LiveRoomUpdateToOneWithWhereWithoutStreamInput = {
    where?: LiveRoomWhereInput
    data: XOR<LiveRoomUpdateWithoutStreamInput, LiveRoomUncheckedUpdateWithoutStreamInput>
  }

  export type LiveRoomUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    activeViewers?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type LiveRoomUncheckedUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    activeViewers?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type StreamBattleUpsertWithWhereUniqueWithoutStream1Input = {
    where: StreamBattleWhereUniqueInput
    update: XOR<StreamBattleUpdateWithoutStream1Input, StreamBattleUncheckedUpdateWithoutStream1Input>
    create: XOR<StreamBattleCreateWithoutStream1Input, StreamBattleUncheckedCreateWithoutStream1Input>
  }

  export type StreamBattleUpdateWithWhereUniqueWithoutStream1Input = {
    where: StreamBattleWhereUniqueInput
    data: XOR<StreamBattleUpdateWithoutStream1Input, StreamBattleUncheckedUpdateWithoutStream1Input>
  }

  export type StreamBattleUpdateManyWithWhereWithoutStream1Input = {
    where: StreamBattleScalarWhereInput
    data: XOR<StreamBattleUpdateManyMutationInput, StreamBattleUncheckedUpdateManyWithoutStream1Input>
  }

  export type StreamBattleScalarWhereInput = {
    AND?: StreamBattleScalarWhereInput | StreamBattleScalarWhereInput[]
    OR?: StreamBattleScalarWhereInput[]
    NOT?: StreamBattleScalarWhereInput | StreamBattleScalarWhereInput[]
    id?: StringFilter<"StreamBattle"> | string
    stream1Id?: StringFilter<"StreamBattle"> | string
    stream2Id?: StringFilter<"StreamBattle"> | string
    points1?: IntFilter<"StreamBattle"> | number
    points2?: IntFilter<"StreamBattle"> | number
    winnerId?: StringNullableFilter<"StreamBattle"> | string | null
    status?: EnumBattleStatusFilter<"StreamBattle"> | $Enums.BattleStatus
    startTime?: DateTimeNullableFilter<"StreamBattle"> | Date | string | null
    endTime?: DateTimeNullableFilter<"StreamBattle"> | Date | string | null
    createdAt?: DateTimeFilter<"StreamBattle"> | Date | string
  }

  export type StreamBattleUpsertWithWhereUniqueWithoutStream2Input = {
    where: StreamBattleWhereUniqueInput
    update: XOR<StreamBattleUpdateWithoutStream2Input, StreamBattleUncheckedUpdateWithoutStream2Input>
    create: XOR<StreamBattleCreateWithoutStream2Input, StreamBattleUncheckedCreateWithoutStream2Input>
  }

  export type StreamBattleUpdateWithWhereUniqueWithoutStream2Input = {
    where: StreamBattleWhereUniqueInput
    data: XOR<StreamBattleUpdateWithoutStream2Input, StreamBattleUncheckedUpdateWithoutStream2Input>
  }

  export type StreamBattleUpdateManyWithWhereWithoutStream2Input = {
    where: StreamBattleScalarWhereInput
    data: XOR<StreamBattleUpdateManyMutationInput, StreamBattleUncheckedUpdateManyWithoutStream2Input>
  }

  export type ModerationReportUpsertWithWhereUniqueWithoutStreamInput = {
    where: ModerationReportWhereUniqueInput
    update: XOR<ModerationReportUpdateWithoutStreamInput, ModerationReportUncheckedUpdateWithoutStreamInput>
    create: XOR<ModerationReportCreateWithoutStreamInput, ModerationReportUncheckedCreateWithoutStreamInput>
  }

  export type ModerationReportUpdateWithWhereUniqueWithoutStreamInput = {
    where: ModerationReportWhereUniqueInput
    data: XOR<ModerationReportUpdateWithoutStreamInput, ModerationReportUncheckedUpdateWithoutStreamInput>
  }

  export type ModerationReportUpdateManyWithWhereWithoutStreamInput = {
    where: ModerationReportScalarWhereInput
    data: XOR<ModerationReportUpdateManyMutationInput, ModerationReportUncheckedUpdateManyWithoutStreamInput>
  }

  export type StreamCreateWithoutLiveRoomInput = {
    id?: string
    title: string
    thumbnail?: string | null
    isLive?: boolean
    category?: string | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutStreamInput
    messages?: MessageCreateNestedManyWithoutStreamInput
    battles1?: StreamBattleCreateNestedManyWithoutStream1Input
    battles2?: StreamBattleCreateNestedManyWithoutStream2Input
    reports?: ModerationReportCreateNestedManyWithoutStreamInput
  }

  export type StreamUncheckedCreateWithoutLiveRoomInput = {
    id?: string
    title: string
    thumbnail?: string | null
    isLive?: boolean
    category?: string | null
    userId: string
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutStreamInput
    battles1?: StreamBattleUncheckedCreateNestedManyWithoutStream1Input
    battles2?: StreamBattleUncheckedCreateNestedManyWithoutStream2Input
    reports?: ModerationReportUncheckedCreateNestedManyWithoutStreamInput
  }

  export type StreamCreateOrConnectWithoutLiveRoomInput = {
    where: StreamWhereUniqueInput
    create: XOR<StreamCreateWithoutLiveRoomInput, StreamUncheckedCreateWithoutLiveRoomInput>
  }

  export type StreamUpsertWithoutLiveRoomInput = {
    update: XOR<StreamUpdateWithoutLiveRoomInput, StreamUncheckedUpdateWithoutLiveRoomInput>
    create: XOR<StreamCreateWithoutLiveRoomInput, StreamUncheckedCreateWithoutLiveRoomInput>
    where?: StreamWhereInput
  }

  export type StreamUpdateToOneWithWhereWithoutLiveRoomInput = {
    where?: StreamWhereInput
    data: XOR<StreamUpdateWithoutLiveRoomInput, StreamUncheckedUpdateWithoutLiveRoomInput>
  }

  export type StreamUpdateWithoutLiveRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    category?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutStreamNestedInput
    messages?: MessageUpdateManyWithoutStreamNestedInput
    battles1?: StreamBattleUpdateManyWithoutStream1NestedInput
    battles2?: StreamBattleUpdateManyWithoutStream2NestedInput
    reports?: ModerationReportUpdateManyWithoutStreamNestedInput
  }

  export type StreamUncheckedUpdateWithoutLiveRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    category?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutStreamNestedInput
    battles1?: StreamBattleUncheckedUpdateManyWithoutStream1NestedInput
    battles2?: StreamBattleUncheckedUpdateManyWithoutStream2NestedInput
    reports?: ModerationReportUncheckedUpdateManyWithoutStreamNestedInput
  }

  export type UserCreateWithoutMessagesInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    avatar?: string | null
    bio?: string | null
    cover?: string | null
    tiktokActive?: boolean
    tiktokUrl?: string | null
    instagramActive?: boolean
    instagramUrl?: string | null
    youtubeActive?: boolean
    youtubeUrl?: string | null
    facebookActive?: boolean
    facebookUrl?: string | null
    isLive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stream?: StreamCreateNestedOneWithoutUserInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    followers?: FollowCreateNestedManyWithoutFollowingInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    reportsMade?: ModerationReportCreateNestedManyWithoutReporterInput
    reports?: ModerationReportCreateNestedManyWithoutReportedInput
  }

  export type UserUncheckedCreateWithoutMessagesInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    avatar?: string | null
    bio?: string | null
    cover?: string | null
    tiktokActive?: boolean
    tiktokUrl?: string | null
    instagramActive?: boolean
    instagramUrl?: string | null
    youtubeActive?: boolean
    youtubeUrl?: string | null
    facebookActive?: boolean
    facebookUrl?: string | null
    isLive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stream?: StreamUncheckedCreateNestedOneWithoutUserInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    reportsMade?: ModerationReportUncheckedCreateNestedManyWithoutReporterInput
    reports?: ModerationReportUncheckedCreateNestedManyWithoutReportedInput
  }

  export type UserCreateOrConnectWithoutMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
  }

  export type StreamCreateWithoutMessagesInput = {
    id?: string
    title: string
    thumbnail?: string | null
    isLive?: boolean
    category?: string | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutStreamInput
    liveRoom?: LiveRoomCreateNestedOneWithoutStreamInput
    battles1?: StreamBattleCreateNestedManyWithoutStream1Input
    battles2?: StreamBattleCreateNestedManyWithoutStream2Input
    reports?: ModerationReportCreateNestedManyWithoutStreamInput
  }

  export type StreamUncheckedCreateWithoutMessagesInput = {
    id?: string
    title: string
    thumbnail?: string | null
    isLive?: boolean
    category?: string | null
    userId: string
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    liveRoom?: LiveRoomUncheckedCreateNestedOneWithoutStreamInput
    battles1?: StreamBattleUncheckedCreateNestedManyWithoutStream1Input
    battles2?: StreamBattleUncheckedCreateNestedManyWithoutStream2Input
    reports?: ModerationReportUncheckedCreateNestedManyWithoutStreamInput
  }

  export type StreamCreateOrConnectWithoutMessagesInput = {
    where: StreamWhereUniqueInput
    create: XOR<StreamCreateWithoutMessagesInput, StreamUncheckedCreateWithoutMessagesInput>
  }

  export type UserUpsertWithoutMessagesInput = {
    update: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokActive?: BoolFieldUpdateOperationsInput | boolean
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramActive?: BoolFieldUpdateOperationsInput | boolean
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeActive?: BoolFieldUpdateOperationsInput | boolean
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookActive?: BoolFieldUpdateOperationsInput | boolean
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUpdateOneWithoutUserNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    followers?: FollowUpdateManyWithoutFollowingNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    reportsMade?: ModerationReportUpdateManyWithoutReporterNestedInput
    reports?: ModerationReportUpdateManyWithoutReportedNestedInput
  }

  export type UserUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokActive?: BoolFieldUpdateOperationsInput | boolean
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramActive?: BoolFieldUpdateOperationsInput | boolean
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeActive?: BoolFieldUpdateOperationsInput | boolean
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookActive?: BoolFieldUpdateOperationsInput | boolean
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUncheckedUpdateOneWithoutUserNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    reportsMade?: ModerationReportUncheckedUpdateManyWithoutReporterNestedInput
    reports?: ModerationReportUncheckedUpdateManyWithoutReportedNestedInput
  }

  export type StreamUpsertWithoutMessagesInput = {
    update: XOR<StreamUpdateWithoutMessagesInput, StreamUncheckedUpdateWithoutMessagesInput>
    create: XOR<StreamCreateWithoutMessagesInput, StreamUncheckedCreateWithoutMessagesInput>
    where?: StreamWhereInput
  }

  export type StreamUpdateToOneWithWhereWithoutMessagesInput = {
    where?: StreamWhereInput
    data: XOR<StreamUpdateWithoutMessagesInput, StreamUncheckedUpdateWithoutMessagesInput>
  }

  export type StreamUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    category?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutStreamNestedInput
    liveRoom?: LiveRoomUpdateOneWithoutStreamNestedInput
    battles1?: StreamBattleUpdateManyWithoutStream1NestedInput
    battles2?: StreamBattleUpdateManyWithoutStream2NestedInput
    reports?: ModerationReportUpdateManyWithoutStreamNestedInput
  }

  export type StreamUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    category?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    liveRoom?: LiveRoomUncheckedUpdateOneWithoutStreamNestedInput
    battles1?: StreamBattleUncheckedUpdateManyWithoutStream1NestedInput
    battles2?: StreamBattleUncheckedUpdateManyWithoutStream2NestedInput
    reports?: ModerationReportUncheckedUpdateManyWithoutStreamNestedInput
  }

  export type UserCreateWithoutFollowingInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    avatar?: string | null
    bio?: string | null
    cover?: string | null
    tiktokActive?: boolean
    tiktokUrl?: string | null
    instagramActive?: boolean
    instagramUrl?: string | null
    youtubeActive?: boolean
    youtubeUrl?: string | null
    facebookActive?: boolean
    facebookUrl?: string | null
    isLive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stream?: StreamCreateNestedOneWithoutUserInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    followers?: FollowCreateNestedManyWithoutFollowingInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    reportsMade?: ModerationReportCreateNestedManyWithoutReporterInput
    reports?: ModerationReportCreateNestedManyWithoutReportedInput
    messages?: MessageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFollowingInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    avatar?: string | null
    bio?: string | null
    cover?: string | null
    tiktokActive?: boolean
    tiktokUrl?: string | null
    instagramActive?: boolean
    instagramUrl?: string | null
    youtubeActive?: boolean
    youtubeUrl?: string | null
    facebookActive?: boolean
    facebookUrl?: string | null
    isLive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stream?: StreamUncheckedCreateNestedOneWithoutUserInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    reportsMade?: ModerationReportUncheckedCreateNestedManyWithoutReporterInput
    reports?: ModerationReportUncheckedCreateNestedManyWithoutReportedInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFollowingInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
  }

  export type UserCreateWithoutFollowersInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    avatar?: string | null
    bio?: string | null
    cover?: string | null
    tiktokActive?: boolean
    tiktokUrl?: string | null
    instagramActive?: boolean
    instagramUrl?: string | null
    youtubeActive?: boolean
    youtubeUrl?: string | null
    facebookActive?: boolean
    facebookUrl?: string | null
    isLive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stream?: StreamCreateNestedOneWithoutUserInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    reportsMade?: ModerationReportCreateNestedManyWithoutReporterInput
    reports?: ModerationReportCreateNestedManyWithoutReportedInput
    messages?: MessageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFollowersInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    avatar?: string | null
    bio?: string | null
    cover?: string | null
    tiktokActive?: boolean
    tiktokUrl?: string | null
    instagramActive?: boolean
    instagramUrl?: string | null
    youtubeActive?: boolean
    youtubeUrl?: string | null
    facebookActive?: boolean
    facebookUrl?: string | null
    isLive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stream?: StreamUncheckedCreateNestedOneWithoutUserInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    reportsMade?: ModerationReportUncheckedCreateNestedManyWithoutReporterInput
    reports?: ModerationReportUncheckedCreateNestedManyWithoutReportedInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFollowersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
  }

  export type UserUpsertWithoutFollowingInput = {
    update: XOR<UserUpdateWithoutFollowingInput, UserUncheckedUpdateWithoutFollowingInput>
    create: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFollowingInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFollowingInput, UserUncheckedUpdateWithoutFollowingInput>
  }

  export type UserUpdateWithoutFollowingInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokActive?: BoolFieldUpdateOperationsInput | boolean
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramActive?: BoolFieldUpdateOperationsInput | boolean
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeActive?: BoolFieldUpdateOperationsInput | boolean
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookActive?: BoolFieldUpdateOperationsInput | boolean
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUpdateOneWithoutUserNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    followers?: FollowUpdateManyWithoutFollowingNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    reportsMade?: ModerationReportUpdateManyWithoutReporterNestedInput
    reports?: ModerationReportUpdateManyWithoutReportedNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFollowingInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokActive?: BoolFieldUpdateOperationsInput | boolean
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramActive?: BoolFieldUpdateOperationsInput | boolean
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeActive?: BoolFieldUpdateOperationsInput | boolean
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookActive?: BoolFieldUpdateOperationsInput | boolean
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUncheckedUpdateOneWithoutUserNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    reportsMade?: ModerationReportUncheckedUpdateManyWithoutReporterNestedInput
    reports?: ModerationReportUncheckedUpdateManyWithoutReportedNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutFollowersInput = {
    update: XOR<UserUpdateWithoutFollowersInput, UserUncheckedUpdateWithoutFollowersInput>
    create: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFollowersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFollowersInput, UserUncheckedUpdateWithoutFollowersInput>
  }

  export type UserUpdateWithoutFollowersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokActive?: BoolFieldUpdateOperationsInput | boolean
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramActive?: BoolFieldUpdateOperationsInput | boolean
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeActive?: BoolFieldUpdateOperationsInput | boolean
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookActive?: BoolFieldUpdateOperationsInput | boolean
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUpdateOneWithoutUserNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    reportsMade?: ModerationReportUpdateManyWithoutReporterNestedInput
    reports?: ModerationReportUpdateManyWithoutReportedNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFollowersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokActive?: BoolFieldUpdateOperationsInput | boolean
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramActive?: BoolFieldUpdateOperationsInput | boolean
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeActive?: BoolFieldUpdateOperationsInput | boolean
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookActive?: BoolFieldUpdateOperationsInput | boolean
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUncheckedUpdateOneWithoutUserNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    reportsMade?: ModerationReportUncheckedUpdateManyWithoutReporterNestedInput
    reports?: ModerationReportUncheckedUpdateManyWithoutReportedNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type StreamCreateWithoutBattles1Input = {
    id?: string
    title: string
    thumbnail?: string | null
    isLive?: boolean
    category?: string | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutStreamInput
    messages?: MessageCreateNestedManyWithoutStreamInput
    liveRoom?: LiveRoomCreateNestedOneWithoutStreamInput
    battles2?: StreamBattleCreateNestedManyWithoutStream2Input
    reports?: ModerationReportCreateNestedManyWithoutStreamInput
  }

  export type StreamUncheckedCreateWithoutBattles1Input = {
    id?: string
    title: string
    thumbnail?: string | null
    isLive?: boolean
    category?: string | null
    userId: string
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutStreamInput
    liveRoom?: LiveRoomUncheckedCreateNestedOneWithoutStreamInput
    battles2?: StreamBattleUncheckedCreateNestedManyWithoutStream2Input
    reports?: ModerationReportUncheckedCreateNestedManyWithoutStreamInput
  }

  export type StreamCreateOrConnectWithoutBattles1Input = {
    where: StreamWhereUniqueInput
    create: XOR<StreamCreateWithoutBattles1Input, StreamUncheckedCreateWithoutBattles1Input>
  }

  export type StreamCreateWithoutBattles2Input = {
    id?: string
    title: string
    thumbnail?: string | null
    isLive?: boolean
    category?: string | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutStreamInput
    messages?: MessageCreateNestedManyWithoutStreamInput
    liveRoom?: LiveRoomCreateNestedOneWithoutStreamInput
    battles1?: StreamBattleCreateNestedManyWithoutStream1Input
    reports?: ModerationReportCreateNestedManyWithoutStreamInput
  }

  export type StreamUncheckedCreateWithoutBattles2Input = {
    id?: string
    title: string
    thumbnail?: string | null
    isLive?: boolean
    category?: string | null
    userId: string
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutStreamInput
    liveRoom?: LiveRoomUncheckedCreateNestedOneWithoutStreamInput
    battles1?: StreamBattleUncheckedCreateNestedManyWithoutStream1Input
    reports?: ModerationReportUncheckedCreateNestedManyWithoutStreamInput
  }

  export type StreamCreateOrConnectWithoutBattles2Input = {
    where: StreamWhereUniqueInput
    create: XOR<StreamCreateWithoutBattles2Input, StreamUncheckedCreateWithoutBattles2Input>
  }

  export type StreamUpsertWithoutBattles1Input = {
    update: XOR<StreamUpdateWithoutBattles1Input, StreamUncheckedUpdateWithoutBattles1Input>
    create: XOR<StreamCreateWithoutBattles1Input, StreamUncheckedCreateWithoutBattles1Input>
    where?: StreamWhereInput
  }

  export type StreamUpdateToOneWithWhereWithoutBattles1Input = {
    where?: StreamWhereInput
    data: XOR<StreamUpdateWithoutBattles1Input, StreamUncheckedUpdateWithoutBattles1Input>
  }

  export type StreamUpdateWithoutBattles1Input = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    category?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutStreamNestedInput
    messages?: MessageUpdateManyWithoutStreamNestedInput
    liveRoom?: LiveRoomUpdateOneWithoutStreamNestedInput
    battles2?: StreamBattleUpdateManyWithoutStream2NestedInput
    reports?: ModerationReportUpdateManyWithoutStreamNestedInput
  }

  export type StreamUncheckedUpdateWithoutBattles1Input = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    category?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutStreamNestedInput
    liveRoom?: LiveRoomUncheckedUpdateOneWithoutStreamNestedInput
    battles2?: StreamBattleUncheckedUpdateManyWithoutStream2NestedInput
    reports?: ModerationReportUncheckedUpdateManyWithoutStreamNestedInput
  }

  export type StreamUpsertWithoutBattles2Input = {
    update: XOR<StreamUpdateWithoutBattles2Input, StreamUncheckedUpdateWithoutBattles2Input>
    create: XOR<StreamCreateWithoutBattles2Input, StreamUncheckedCreateWithoutBattles2Input>
    where?: StreamWhereInput
  }

  export type StreamUpdateToOneWithWhereWithoutBattles2Input = {
    where?: StreamWhereInput
    data: XOR<StreamUpdateWithoutBattles2Input, StreamUncheckedUpdateWithoutBattles2Input>
  }

  export type StreamUpdateWithoutBattles2Input = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    category?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutStreamNestedInput
    messages?: MessageUpdateManyWithoutStreamNestedInput
    liveRoom?: LiveRoomUpdateOneWithoutStreamNestedInput
    battles1?: StreamBattleUpdateManyWithoutStream1NestedInput
    reports?: ModerationReportUpdateManyWithoutStreamNestedInput
  }

  export type StreamUncheckedUpdateWithoutBattles2Input = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    category?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutStreamNestedInput
    liveRoom?: LiveRoomUncheckedUpdateOneWithoutStreamNestedInput
    battles1?: StreamBattleUncheckedUpdateManyWithoutStream1NestedInput
    reports?: ModerationReportUncheckedUpdateManyWithoutStreamNestedInput
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    avatar?: string | null
    bio?: string | null
    cover?: string | null
    tiktokActive?: boolean
    tiktokUrl?: string | null
    instagramActive?: boolean
    instagramUrl?: string | null
    youtubeActive?: boolean
    youtubeUrl?: string | null
    facebookActive?: boolean
    facebookUrl?: string | null
    isLive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stream?: StreamCreateNestedOneWithoutUserInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    followers?: FollowCreateNestedManyWithoutFollowingInput
    reportsMade?: ModerationReportCreateNestedManyWithoutReporterInput
    reports?: ModerationReportCreateNestedManyWithoutReportedInput
    messages?: MessageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    avatar?: string | null
    bio?: string | null
    cover?: string | null
    tiktokActive?: boolean
    tiktokUrl?: string | null
    instagramActive?: boolean
    instagramUrl?: string | null
    youtubeActive?: boolean
    youtubeUrl?: string | null
    facebookActive?: boolean
    facebookUrl?: string | null
    isLive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stream?: StreamUncheckedCreateNestedOneWithoutUserInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    reportsMade?: ModerationReportUncheckedCreateNestedManyWithoutReporterInput
    reports?: ModerationReportUncheckedCreateNestedManyWithoutReportedInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokActive?: BoolFieldUpdateOperationsInput | boolean
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramActive?: BoolFieldUpdateOperationsInput | boolean
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeActive?: BoolFieldUpdateOperationsInput | boolean
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookActive?: BoolFieldUpdateOperationsInput | boolean
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUpdateOneWithoutUserNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    followers?: FollowUpdateManyWithoutFollowingNestedInput
    reportsMade?: ModerationReportUpdateManyWithoutReporterNestedInput
    reports?: ModerationReportUpdateManyWithoutReportedNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokActive?: BoolFieldUpdateOperationsInput | boolean
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramActive?: BoolFieldUpdateOperationsInput | boolean
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeActive?: BoolFieldUpdateOperationsInput | boolean
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookActive?: BoolFieldUpdateOperationsInput | boolean
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUncheckedUpdateOneWithoutUserNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    reportsMade?: ModerationReportUncheckedUpdateManyWithoutReporterNestedInput
    reports?: ModerationReportUncheckedUpdateManyWithoutReportedNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutReportsMadeInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    avatar?: string | null
    bio?: string | null
    cover?: string | null
    tiktokActive?: boolean
    tiktokUrl?: string | null
    instagramActive?: boolean
    instagramUrl?: string | null
    youtubeActive?: boolean
    youtubeUrl?: string | null
    facebookActive?: boolean
    facebookUrl?: string | null
    isLive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stream?: StreamCreateNestedOneWithoutUserInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    followers?: FollowCreateNestedManyWithoutFollowingInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    reports?: ModerationReportCreateNestedManyWithoutReportedInput
    messages?: MessageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReportsMadeInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    avatar?: string | null
    bio?: string | null
    cover?: string | null
    tiktokActive?: boolean
    tiktokUrl?: string | null
    instagramActive?: boolean
    instagramUrl?: string | null
    youtubeActive?: boolean
    youtubeUrl?: string | null
    facebookActive?: boolean
    facebookUrl?: string | null
    isLive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stream?: StreamUncheckedCreateNestedOneWithoutUserInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    reports?: ModerationReportUncheckedCreateNestedManyWithoutReportedInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReportsMadeInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReportsMadeInput, UserUncheckedCreateWithoutReportsMadeInput>
  }

  export type UserCreateWithoutReportsInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    avatar?: string | null
    bio?: string | null
    cover?: string | null
    tiktokActive?: boolean
    tiktokUrl?: string | null
    instagramActive?: boolean
    instagramUrl?: string | null
    youtubeActive?: boolean
    youtubeUrl?: string | null
    facebookActive?: boolean
    facebookUrl?: string | null
    isLive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stream?: StreamCreateNestedOneWithoutUserInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    followers?: FollowCreateNestedManyWithoutFollowingInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    reportsMade?: ModerationReportCreateNestedManyWithoutReporterInput
    messages?: MessageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReportsInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    avatar?: string | null
    bio?: string | null
    cover?: string | null
    tiktokActive?: boolean
    tiktokUrl?: string | null
    instagramActive?: boolean
    instagramUrl?: string | null
    youtubeActive?: boolean
    youtubeUrl?: string | null
    facebookActive?: boolean
    facebookUrl?: string | null
    isLive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stream?: StreamUncheckedCreateNestedOneWithoutUserInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    reportsMade?: ModerationReportUncheckedCreateNestedManyWithoutReporterInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReportsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
  }

  export type StreamCreateWithoutReportsInput = {
    id?: string
    title: string
    thumbnail?: string | null
    isLive?: boolean
    category?: string | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutStreamInput
    messages?: MessageCreateNestedManyWithoutStreamInput
    liveRoom?: LiveRoomCreateNestedOneWithoutStreamInput
    battles1?: StreamBattleCreateNestedManyWithoutStream1Input
    battles2?: StreamBattleCreateNestedManyWithoutStream2Input
  }

  export type StreamUncheckedCreateWithoutReportsInput = {
    id?: string
    title: string
    thumbnail?: string | null
    isLive?: boolean
    category?: string | null
    userId: string
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutStreamInput
    liveRoom?: LiveRoomUncheckedCreateNestedOneWithoutStreamInput
    battles1?: StreamBattleUncheckedCreateNestedManyWithoutStream1Input
    battles2?: StreamBattleUncheckedCreateNestedManyWithoutStream2Input
  }

  export type StreamCreateOrConnectWithoutReportsInput = {
    where: StreamWhereUniqueInput
    create: XOR<StreamCreateWithoutReportsInput, StreamUncheckedCreateWithoutReportsInput>
  }

  export type UserUpsertWithoutReportsMadeInput = {
    update: XOR<UserUpdateWithoutReportsMadeInput, UserUncheckedUpdateWithoutReportsMadeInput>
    create: XOR<UserCreateWithoutReportsMadeInput, UserUncheckedCreateWithoutReportsMadeInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReportsMadeInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReportsMadeInput, UserUncheckedUpdateWithoutReportsMadeInput>
  }

  export type UserUpdateWithoutReportsMadeInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokActive?: BoolFieldUpdateOperationsInput | boolean
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramActive?: BoolFieldUpdateOperationsInput | boolean
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeActive?: BoolFieldUpdateOperationsInput | boolean
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookActive?: BoolFieldUpdateOperationsInput | boolean
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUpdateOneWithoutUserNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    followers?: FollowUpdateManyWithoutFollowingNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    reports?: ModerationReportUpdateManyWithoutReportedNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReportsMadeInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokActive?: BoolFieldUpdateOperationsInput | boolean
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramActive?: BoolFieldUpdateOperationsInput | boolean
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeActive?: BoolFieldUpdateOperationsInput | boolean
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookActive?: BoolFieldUpdateOperationsInput | boolean
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUncheckedUpdateOneWithoutUserNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    reports?: ModerationReportUncheckedUpdateManyWithoutReportedNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutReportsInput = {
    update: XOR<UserUpdateWithoutReportsInput, UserUncheckedUpdateWithoutReportsInput>
    create: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReportsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReportsInput, UserUncheckedUpdateWithoutReportsInput>
  }

  export type UserUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokActive?: BoolFieldUpdateOperationsInput | boolean
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramActive?: BoolFieldUpdateOperationsInput | boolean
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeActive?: BoolFieldUpdateOperationsInput | boolean
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookActive?: BoolFieldUpdateOperationsInput | boolean
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUpdateOneWithoutUserNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    followers?: FollowUpdateManyWithoutFollowingNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    reportsMade?: ModerationReportUpdateManyWithoutReporterNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokActive?: BoolFieldUpdateOperationsInput | boolean
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramActive?: BoolFieldUpdateOperationsInput | boolean
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeActive?: BoolFieldUpdateOperationsInput | boolean
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookActive?: BoolFieldUpdateOperationsInput | boolean
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUncheckedUpdateOneWithoutUserNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    reportsMade?: ModerationReportUncheckedUpdateManyWithoutReporterNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type StreamUpsertWithoutReportsInput = {
    update: XOR<StreamUpdateWithoutReportsInput, StreamUncheckedUpdateWithoutReportsInput>
    create: XOR<StreamCreateWithoutReportsInput, StreamUncheckedCreateWithoutReportsInput>
    where?: StreamWhereInput
  }

  export type StreamUpdateToOneWithWhereWithoutReportsInput = {
    where?: StreamWhereInput
    data: XOR<StreamUpdateWithoutReportsInput, StreamUncheckedUpdateWithoutReportsInput>
  }

  export type StreamUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    category?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutStreamNestedInput
    messages?: MessageUpdateManyWithoutStreamNestedInput
    liveRoom?: LiveRoomUpdateOneWithoutStreamNestedInput
    battles1?: StreamBattleUpdateManyWithoutStream1NestedInput
    battles2?: StreamBattleUpdateManyWithoutStream2NestedInput
  }

  export type StreamUncheckedUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    isLive?: BoolFieldUpdateOperationsInput | boolean
    category?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutStreamNestedInput
    liveRoom?: LiveRoomUncheckedUpdateOneWithoutStreamNestedInput
    battles1?: StreamBattleUncheckedUpdateManyWithoutStream1NestedInput
    battles2?: StreamBattleUncheckedUpdateManyWithoutStream2NestedInput
  }

  export type PostCreateManyUserInput = {
    id?: string
    title: string
    url: string
    type: $Enums.PostType
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FollowCreateManyFollowerInput = {
    id?: string
    followingId: string
    createdAt?: Date | string
  }

  export type FollowCreateManyFollowingInput = {
    id?: string
    followerId: string
    createdAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    type: $Enums.NotificationType
    content: string
    isRead?: boolean
    link?: string | null
    createdAt?: Date | string
  }

  export type ModerationReportCreateManyReporterInput = {
    id?: string
    reportedId: string
    streamId?: string | null
    reason: string
    details?: string | null
    status?: $Enums.ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModerationReportCreateManyReportedInput = {
    id?: string
    reporterId: string
    streamId?: string | null
    reason: string
    details?: string | null
    status?: $Enums.ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageCreateManyUserInput = {
    id?: string
    content: string
    streamId: string
    isGift?: boolean
    giftId?: string | null
    createdAt?: Date | string
  }

  export type PostUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumPostTypeFieldUpdateOperationsInput | $Enums.PostType
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumPostTypeFieldUpdateOperationsInput | $Enums.PostType
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumPostTypeFieldUpdateOperationsInput | $Enums.PostType
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUpdateWithoutFollowerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    following?: UserUpdateOneRequiredWithoutFollowersNestedInput
  }

  export type FollowUncheckedUpdateWithoutFollowerInput = {
    id?: StringFieldUpdateOperationsInput | string
    followingId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUncheckedUpdateManyWithoutFollowerInput = {
    id?: StringFieldUpdateOperationsInput | string
    followingId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUpdateWithoutFollowingInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    follower?: UserUpdateOneRequiredWithoutFollowingNestedInput
  }

  export type FollowUncheckedUpdateWithoutFollowingInput = {
    id?: StringFieldUpdateOperationsInput | string
    followerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUncheckedUpdateManyWithoutFollowingInput = {
    id?: StringFieldUpdateOperationsInput | string
    followerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    link?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    link?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    link?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModerationReportUpdateWithoutReporterInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reported?: UserUpdateOneRequiredWithoutReportsNestedInput
    stream?: StreamUpdateOneWithoutReportsNestedInput
  }

  export type ModerationReportUncheckedUpdateWithoutReporterInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportedId?: StringFieldUpdateOperationsInput | string
    streamId?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModerationReportUncheckedUpdateManyWithoutReporterInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportedId?: StringFieldUpdateOperationsInput | string
    streamId?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModerationReportUpdateWithoutReportedInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reporter?: UserUpdateOneRequiredWithoutReportsMadeNestedInput
    stream?: StreamUpdateOneWithoutReportsNestedInput
  }

  export type ModerationReportUncheckedUpdateWithoutReportedInput = {
    id?: StringFieldUpdateOperationsInput | string
    reporterId?: StringFieldUpdateOperationsInput | string
    streamId?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModerationReportUncheckedUpdateManyWithoutReportedInput = {
    id?: StringFieldUpdateOperationsInput | string
    reporterId?: StringFieldUpdateOperationsInput | string
    streamId?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isGift?: BoolFieldUpdateOperationsInput | boolean
    giftId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    isGift?: BoolFieldUpdateOperationsInput | boolean
    giftId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    isGift?: BoolFieldUpdateOperationsInput | boolean
    giftId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyWalletInput = {
    id?: string
    amount: number
    type: $Enums.TransactionType
    giftId?: string | null
    referenceId?: string | null
    createdAt?: Date | string
  }

  export type TransactionUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gift?: GiftUpdateOneWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    giftId?: NullableStringFieldUpdateOperationsInput | string | null
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    giftId?: NullableStringFieldUpdateOperationsInput | string | null
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyGiftInput = {
    id?: string
    amount: number
    type: $Enums.TransactionType
    walletId: string
    referenceId?: string | null
    createdAt?: Date | string
  }

  export type TransactionUpdateWithoutGiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: WalletUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutGiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    walletId?: StringFieldUpdateOperationsInput | string
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutGiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    walletId?: StringFieldUpdateOperationsInput | string
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyStreamInput = {
    id?: string
    content: string
    userId: string
    isGift?: boolean
    giftId?: string | null
    createdAt?: Date | string
  }

  export type StreamBattleCreateManyStream1Input = {
    id?: string
    stream2Id: string
    points1?: number
    points2?: number
    winnerId?: string | null
    status?: $Enums.BattleStatus
    startTime?: Date | string | null
    endTime?: Date | string | null
    createdAt?: Date | string
  }

  export type StreamBattleCreateManyStream2Input = {
    id?: string
    stream1Id: string
    points1?: number
    points2?: number
    winnerId?: string | null
    status?: $Enums.BattleStatus
    startTime?: Date | string | null
    endTime?: Date | string | null
    createdAt?: Date | string
  }

  export type ModerationReportCreateManyStreamInput = {
    id?: string
    reporterId: string
    reportedId: string
    reason: string
    details?: string | null
    status?: $Enums.ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isGift?: BoolFieldUpdateOperationsInput | boolean
    giftId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isGift?: BoolFieldUpdateOperationsInput | boolean
    giftId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isGift?: BoolFieldUpdateOperationsInput | boolean
    giftId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamBattleUpdateWithoutStream1Input = {
    id?: StringFieldUpdateOperationsInput | string
    points1?: IntFieldUpdateOperationsInput | number
    points2?: IntFieldUpdateOperationsInput | number
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBattleStatusFieldUpdateOperationsInput | $Enums.BattleStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream2?: StreamUpdateOneRequiredWithoutBattles2NestedInput
  }

  export type StreamBattleUncheckedUpdateWithoutStream1Input = {
    id?: StringFieldUpdateOperationsInput | string
    stream2Id?: StringFieldUpdateOperationsInput | string
    points1?: IntFieldUpdateOperationsInput | number
    points2?: IntFieldUpdateOperationsInput | number
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBattleStatusFieldUpdateOperationsInput | $Enums.BattleStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamBattleUncheckedUpdateManyWithoutStream1Input = {
    id?: StringFieldUpdateOperationsInput | string
    stream2Id?: StringFieldUpdateOperationsInput | string
    points1?: IntFieldUpdateOperationsInput | number
    points2?: IntFieldUpdateOperationsInput | number
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBattleStatusFieldUpdateOperationsInput | $Enums.BattleStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamBattleUpdateWithoutStream2Input = {
    id?: StringFieldUpdateOperationsInput | string
    points1?: IntFieldUpdateOperationsInput | number
    points2?: IntFieldUpdateOperationsInput | number
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBattleStatusFieldUpdateOperationsInput | $Enums.BattleStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream1?: StreamUpdateOneRequiredWithoutBattles1NestedInput
  }

  export type StreamBattleUncheckedUpdateWithoutStream2Input = {
    id?: StringFieldUpdateOperationsInput | string
    stream1Id?: StringFieldUpdateOperationsInput | string
    points1?: IntFieldUpdateOperationsInput | number
    points2?: IntFieldUpdateOperationsInput | number
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBattleStatusFieldUpdateOperationsInput | $Enums.BattleStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamBattleUncheckedUpdateManyWithoutStream2Input = {
    id?: StringFieldUpdateOperationsInput | string
    stream1Id?: StringFieldUpdateOperationsInput | string
    points1?: IntFieldUpdateOperationsInput | number
    points2?: IntFieldUpdateOperationsInput | number
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBattleStatusFieldUpdateOperationsInput | $Enums.BattleStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModerationReportUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reporter?: UserUpdateOneRequiredWithoutReportsMadeNestedInput
    reported?: UserUpdateOneRequiredWithoutReportsNestedInput
  }

  export type ModerationReportUncheckedUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    reporterId?: StringFieldUpdateOperationsInput | string
    reportedId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModerationReportUncheckedUpdateManyWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    reporterId?: StringFieldUpdateOperationsInput | string
    reportedId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}