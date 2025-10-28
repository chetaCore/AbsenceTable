declare module "humps" {
  export function camelizeKeys<T = any>(object: any, options?: any): T;
  export function pascalizeKeys<T = any>(object: any, options?: any): T;
  export function decamelizeKeys<T = any>(object: any, options?: any): T;
  export function camelize(str: string): string;
  export function pascalize(str: string): string;
  export function decamelize(str: string): string;
}
