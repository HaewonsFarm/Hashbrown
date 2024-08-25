/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/navigation/tabs` | `/(tabs)/screens` | `/(tabs)/screens/Home` | `/(tabs)/screens/Scan` | `/(tabs)/screens/SignUp` | `/_sitemap` | `/navigation/tabs` | `/screens` | `/screens/Home` | `/screens/Scan` | `/screens/SignUp`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
