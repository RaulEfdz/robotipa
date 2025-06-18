import { useEffect } from "react";

export function useTrackVisit(section: string) {
  useEffect(() => {
    fetch("/api/track-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section }),
    });
  }, [section]);
}
