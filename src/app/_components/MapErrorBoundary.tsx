"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class MapErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Check if this is the leaflet map initialization error (React 18 Strict Mode issue)
    if (error.message?.includes("Map container already initialized")) {
      // This is a known React 18 Strict Mode issue with react-leaflet, not a real error
      return { hasError: false };
    }
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Suppress the leaflet map initialization warning in development
    if (!error.message?.includes("Map container already initialized")) {
      console.error("Map error:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-[520px] w-full rounded-2xl shadow bg-red-50 flex items-center justify-center">
          <p className="text-red-600">Error loading map</p>
        </div>
      );
    }

    return this.props.children;
  }
}
