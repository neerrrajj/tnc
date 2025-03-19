import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Eye,
  AlertTriangle,
  RefreshCw,
  ArrowRight,
  Lock,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Landing: React.FC = () => {
  const { signInWithGoogle, user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-white/10 dark:border-white/5 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-semibold tracking-tight">
              Watchdog
            </span>
          </div>

          {user ? (
            <Link to="/">
              <Button>
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button onClick={signInWithGoogle}>
              <Lock className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
          )}
        </div>
      </header>

      {/* Hero section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-16 w-16 mx-auto text-primary mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 max-w-4xl mx-auto">
            Don't blindly accept Terms &amp; Conditions again
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Watchdog uses AI to analyze EULAs and Terms of Service, highlighting
            important clauses and potential concerns in seconds.
          </p>

          {user ? (
            <Link to="/">
              <Button size="lg" className="text-lg px-8 py-6">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Button
              size="lg"
              onClick={signInWithGoogle}
              className="text-lg px-8 py-6"
            >
              Get Started with Google
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold tracking-tight text-center mb-12">
            How Watchdog Protects You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg border shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Red Flag Detection</h3>
              <p className="text-muted-foreground">
                Instantly identify clauses that may compromise privacy, impose
                hidden charges, or limit your legal rights.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Privacy Alerts</h3>
              <p className="text-muted-foreground">
                Get detailed alerts about sections where companies may track,
                share, or sell your personal data.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">
                Subscription Tracking
              </h3>
              <p className="text-muted-foreground">
                Flags auto-renewal clauses and identifies potential cancellation
                difficulties before you commit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold tracking-tight text-center mb-4">
            See Watchdog in Action
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Quick, clear analysis of complex legal documents, helping you make
            informed decisions.
          </p>

          <div className="border rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
            <div className="bg-secondary/30 p-4 border-b flex items-center">
              <Shield className="h-5 w-5 text-primary mr-2" />
              <span className="font-medium">Sample Analysis Result</span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="col-span-1 bg-card p-4 rounded-lg border">
                  <h3 className="font-medium mb-2">Risk Score</h3>
                  <div className="flex items-center">
                    <div className="w-full bg-secondary rounded-full h-4 mr-2">
                      <div
                        className="bg-amber-500 h-4 rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                    <span className="font-bold">65</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Moderate risk level detected
                  </p>
                </div>

                <div className="col-span-1 md:col-span-2 bg-card p-4 rounded-lg border">
                  <h3 className="font-medium mb-2">Privacy Concerns</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mr-2 mt-0.5">
                        <Eye className="h-3 w-3 text-red-500 dark:text-red-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Data Sharing with Third Parties
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Your personal data may be shared with partners
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mr-2 mt-0.5">
                        <Eye className="h-3 w-3 text-amber-500 dark:text-amber-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Location Tracking</p>
                        <p className="text-xs text-muted-foreground">
                          Your location data may be collected when using the
                          service
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border mb-4">
                <div className="flex items-center text-red-600 dark:text-red-400 mb-2">
                  <AlertTriangle className="h-4 w-4 mr-1.5" />
                  <h3 className="font-medium">Major Red Flag</h3>
                </div>
                <p className="text-sm mb-3">
                  Binding arbitration clause limits your right to sue in court
                </p>
                <div className="bg-secondary/50 text-xs p-3 rounded italic text-muted-foreground">
                  "By using our service, you agree to resolve any disputes
                  through binding arbitration and waive your right to
                  participate in class actions..."
                </div>
              </div>

              <Button
                variant="outline"
                disabled
                className="w-full justify-center opacity-70"
              >
                <Lock className="mr-2 h-4 w-4" />
                Sign in to see full analysis
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-5 w-5 text-primary mr-2" />
            <span className="font-display text-lg font-semibold tracking-tight">
              Watchdog
            </span>
          </div>
          <p>
            © {new Date().getFullYear()} Watchdog. AI-powered Terms &
            Conditions analyzer.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
