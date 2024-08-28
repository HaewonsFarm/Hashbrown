/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/screens/Scan` | `/(tabs)/screens/SignUp` | `/Scan` | `/_sitemap` | `/addDocument` | `/documentViewer` | `/screens/Scan` | `/screens/SignUp`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
