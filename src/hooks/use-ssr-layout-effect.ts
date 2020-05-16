import { useEffect, useLayoutEffect } from "react";

export const useSSRLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;
