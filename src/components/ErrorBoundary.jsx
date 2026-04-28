// FILE: src/components/ErrorBoundary.jsx
import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] px-6 text-white">
          <div className="w-full max-w-xl rounded-[28px] border border-white/10 bg-white/[0.04] p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#ff9ba4]">FlashAid Recovery</p>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight">The interface hit an unexpected issue.</h1>
            <p className="mt-4 text-base leading-7 text-[#a0a0b0]">
              The app has been safely contained so the screen does not go blank. Return home and continue the demo.
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex rounded-full bg-[#e63946] px-6 py-3 text-sm font-semibold text-white transition-default hover:scale-[1.02]"
            >
              Go To Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
