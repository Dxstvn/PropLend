import { toast } from 'sonner';
import confetti from 'canvas-confetti';

/**
 * Format currency for display
 */
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Trigger confetti animation
 */
function triggerConfetti() {
  const duration = 2000;
  const animationEnd = Date.now() + duration;
  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 9999,
  };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Gold confetti from left
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#F4CE50', '#D4AF37', '#B8860B'],
    });

    // Gold confetti from right
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#F4CE50', '#D4AF37', '#B8860B'],
    });
  }, 250);
}

/**
 * Show earnings celebration toast with confetti
 */
export function showEarningsCelebration(amount: number, message?: string) {
  triggerConfetti();

  return toast.success(
    <div className="flex flex-col gap-1">
      <div className="text-base font-bold text-gold-600 dark:text-gold-400">
        {formatCurrency(amount)}
      </div>
      <div className="text-sm font-medium">
        {message || 'Earnings Received! 🎉'}
      </div>
    </div>,
    {
      duration: 5000,
      className:
        'border-2 border-gold-300 bg-gradient-to-r from-gold-50 to-yellow-50 dark:from-gold-900/30 dark:to-yellow-900/30 shadow-gold-glow',
    }
  );
}

/**
 * Show deposit success toast
 */
export function showDepositSuccess(amount: number, tranche: 'senior' | 'junior') {
  const trancheColor = tranche === 'senior' ? 'navy' : 'junior';
  const trancheName = tranche === 'senior' ? 'Senior SAFE' : 'Junior YIELD';

  return toast.success(
    <div className="flex flex-col gap-1">
      <div className="text-base font-semibold">Deposit Successful!</div>
      <div className="text-sm">
        {formatCurrency(amount)} invested in {trancheName}
      </div>
    </div>,
    {
      duration: 4000,
      className:
        tranche === 'senior'
          ? 'border-navy-200 bg-navy-50 dark:bg-navy-900/20'
          : 'border-junior-200 bg-junior-50 dark:bg-junior-900/20',
    }
  );
}

/**
 * Show withdrawal success toast
 */
export function showWithdrawalSuccess(amount: number) {
  return toast.success(
    <div className="flex flex-col gap-1">
      <div className="text-base font-semibold">Withdrawal Initiated</div>
      <div className="text-sm">
        {formatCurrency(amount)} will be sent to your wallet
      </div>
    </div>,
    {
      duration: 4000,
    }
  );
}

/**
 * Show transaction pending toast
 */
export function showTransactionPending(txHash?: string) {
  return toast.loading(
    <div className="flex flex-col gap-1">
      <div className="text-base font-semibold">Transaction Pending</div>
      <div className="text-sm">
        {txHash ? (
          <a
            href={`https://polygonscan.com/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy-600 hover:underline dark:text-navy-400"
          >
            View on Polygonscan →
          </a>
        ) : (
          'Confirming on blockchain...'
        )}
      </div>
    </div>,
    {
      duration: Infinity, // Keep showing until dismissed
    }
  );
}

/**
 * Show transaction error toast
 */
export function showTransactionError(error: string) {
  return toast.error(
    <div className="flex flex-col gap-1">
      <div className="text-base font-semibold">Transaction Failed</div>
      <div className="text-sm">{error}</div>
    </div>,
    {
      duration: 6000,
    }
  );
}

/**
 * Show wallet connection toast
 */
export function showWalletConnected(address: string) {
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return toast.success(
    <div className="flex flex-col gap-1">
      <div className="text-base font-semibold">Wallet Connected</div>
      <div className="font-mono text-sm">{shortAddress}</div>
    </div>,
    {
      duration: 3000,
    }
  );
}

/**
 * Show wallet disconnection toast
 */
export function showWalletDisconnected() {
  return toast.info('Wallet disconnected', {
    duration: 2000,
  });
}

/**
 * Show achievement unlocked toast
 */
export function showAchievementUnlocked(title: string, description: string) {
  triggerConfetti();

  return toast.success(
    <div className="flex flex-col gap-1">
      <div className="text-base font-bold">🏆 Achievement Unlocked!</div>
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>,
    {
      duration: 6000,
      className:
        'border-2 border-gold-300 bg-gradient-to-r from-gold-50 to-yellow-50 dark:from-gold-900/30 dark:to-yellow-900/30 shadow-gold-glow',
    }
  );
}

/**
 * Show milestone reached toast
 */
export function showMilestoneReached(milestone: string, value: string) {
  return toast.success(
    <div className="flex flex-col gap-1">
      <div className="text-base font-semibold">🎯 Milestone Reached!</div>
      <div className="text-sm font-medium">{milestone}</div>
      <div className="text-xs text-muted-foreground">{value}</div>
    </div>,
    {
      duration: 5000,
      className: 'border-info-200 bg-info-50 dark:bg-info-900/20',
    }
  );
}

/**
 * Show KYC status update toast
 */
export function showKYCUpdate(
  status: 'pending' | 'approved' | 'rejected',
  message?: string
) {
  const statusConfig = {
    pending: {
      title: 'KYC Under Review',
      description: message || 'Your verification is being processed',
    },
    approved: {
      title: 'KYC Approved ✓',
      description: message || 'You can now deposit any amount',
    },
    rejected: {
      title: 'KYC Verification Failed',
      description: message || 'Please contact support for assistance',
    },
  };

  const config = statusConfig[status];

  const content = (
    <div className="flex flex-col gap-1">
      <div className="text-base font-semibold">{config.title}</div>
      <div className="text-sm">{config.description}</div>
    </div>
  );

  const options = { duration: 5000 };

  if (status === 'approved') {
    return toast.success(content, options);
  } else if (status === 'rejected') {
    return toast.error(content, options);
  } else {
    return toast(content, options);
  }
}

/**
 * Show loan status update toast
 */
export function showLoanUpdate(
  status: 'approved' | 'funded' | 'repaid' | 'defaulted',
  message?: string
) {
  const statusConfig = {
    approved: {
      title: 'Loan Approved! 🎉',
      description: message || 'Your loan application has been approved',
    },
    funded: {
      title: 'Loan Funded',
      description: message || 'Funds have been sent to your wallet',
    },
    repaid: {
      title: 'Loan Repaid ✓',
      description: message || 'Thank you for your payment',
    },
    defaulted: {
      title: 'Payment Overdue',
      description: message || 'Please make a payment to avoid default',
    },
  };

  const config = statusConfig[status];

  const content = (
    <div className="flex flex-col gap-1">
      <div className="text-base font-semibold">{config.title}</div>
      <div className="text-sm">{config.description}</div>
    </div>
  );

  const options = { duration: 6000 };

  if (status === 'defaulted') {
    return toast.error(content, options);
  } else {
    return toast.success(content, options);
  }
}
