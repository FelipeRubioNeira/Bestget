/**
 * type that represents the query params for the request on firebase
 */

import { DateInterval } from "./DateInterval";

type QueryParams = {
    userId: string,
} & DateInterval

export type {
    QueryParams
}