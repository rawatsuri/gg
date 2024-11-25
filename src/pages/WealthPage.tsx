import React from 'react';
import { Wallet, TrendingUp, CreditCard, PiggyBank, DollarSign, BookOpen, BellDot } from 'lucide-react';
import { WealthOverview } from '../components/wealth/WealthOverview';
import { ExpenseTracker } from '../components/wealth/ExpenseTracker';
import { InvestmentPortfolio } from '../components/wealth/InvestmentPortfolio';
import { SavingsGoals } from '../components/wealth/SavingsGoals';
import { BillTracker } from '../components/wealth/BillTracker';
import { CreditScore } from '../components/wealth/CreditScore';
import { IncomeStreams } from '../components/wealth/IncomeStreams';

export function WealthPage() {
  return (
    <div className="pb-20">
      <header className="bg-wealth-500 text-white py-6">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Wealth Dashboard</h1>
              <div className="flex items-center mt-2 text-wealth-50">
                <Wallet className="w-5 h-5 mr-2" />
                <span>Your financial overview</span>
              </div>
            </div>
            <button className="p-2 bg-wealth-600 rounded-full">
              <BellDot className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 py-6">
        <WealthOverview />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Left Column */}
          <div className="space-y-6">
            <ExpenseTracker />
            <InvestmentPortfolio />
            <BillTracker />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <SavingsGoals />
            <CreditScore />
            <IncomeStreams />
          </div>
        </div>
      </main>
    </div>
  );
}