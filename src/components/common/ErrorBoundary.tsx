import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, ChevronDown, ChevronUp, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
  componentName?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

/**
 * Robust React Error Boundary that isolates rendering & lifecycle errors
 * in subcomponents (like ActivityTimeline, View components, etc.) and
 * renders an Arabic fallback interface with recovery options.
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
      showDetails: false
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    // Log to console for debugging
    console.error(
      `[ErrorBoundary] Caught error in ${this.props.componentName || 'Component'}:`,
      error,
      errorInfo
    );
  }

  private handleReset = () => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    });
  };

  private toggleDetails = () => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }));
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="bg-slate-900/95 border border-amber-500/30 rounded-2xl p-5 text-right my-2 shadow-lg animate-in fade-in duration-200"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{this.props.fallbackTitle || 'تعذر تحميل هذا القسم بشكل مؤقت'}</span>
                  {this.props.componentName && (
                    <span className="text-[10px] font-mono bg-slate-800 text-amber-400 px-1.5 py-0.5 rounded border border-slate-700">
                      {this.props.componentName}
                    </span>
                  )}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  {this.props.fallbackMessage ||
                    'حدث خطأ أثناء معالجة هذا العنصر. يمكنك محاولة التحديث أو الاستمرار في تصفح باقي أقسام المنظومة التعليمية.'}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <button
                type="button"
                onClick={this.handleReset}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>إعادة المحاولة</span>
              </button>
            </div>
          </div>

          {/* Optional Technical Details for Troubleshooting */}
          {this.state.error && (
            <div className="mt-3 pt-2 border-t border-slate-800 text-xs">
              <button
                type="button"
                onClick={this.toggleDetails}
                className="text-[11px] text-slate-400 hover:text-amber-400 font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>{this.state.showDetails ? 'إخفاء التفاصيل التقنية' : 'عرض التفاصيل الفنية للخطأ'}</span>
                {this.state.showDetails ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
              </button>

              {this.state.showDetails && (
                <div className="mt-2 p-3 bg-slate-950/80 rounded-xl border border-slate-800 font-mono text-[11px] text-rose-300 text-left dir-ltr overflow-x-auto max-h-40">
                  <p className="font-bold">{this.state.error.name}: {this.state.error.message}</p>
                  {this.state.error.stack && (
                    <pre className="text-[10px] text-slate-400 mt-1 whitespace-pre-wrap">
                      {this.state.error.stack.slice(0, 500)}
                    </pre>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
