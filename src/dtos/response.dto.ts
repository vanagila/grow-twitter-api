/**
 * Wrapper for the body of an http request
 *
 *
 *
 *
 * @typeParam T - data type returned in the "data" property
 *
 *
 *
 *
 */

export interface ResponseDTO {
  code: number;
  ok: boolean;
  message: string;
  data?: any;
}
