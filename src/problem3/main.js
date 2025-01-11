	interface WalletBalance {
    currency: string;
    amount: number;
  }
  interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
  }
  
  interface Props extends BoxProps {
  
  }

	// fix issue 1
	const PRIORITIES = {
		Osmosis: 100,
		Ethereum: 50,
		Arbitrum: 30,
		Zilliqa: 20,
		Neo: 20,
	}

	const DEFAULT_PRIORITY = -99;

  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();
  
    const formattedsortedBalances: FormattedWalletBalance = useMemo(() => {
			// fix issue 3
      return balances.filter((balance: WalletBalance) => {
            const balancePriority = PRIORITIES[balance.blockchain] || DEFAULT_PRIORITY;
            return balancePriority > DEFAULT_PRIORITY && balance.amount <= 0
          }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = PRIORITIES[lhs.blockchain] || DEFAULT_PRIORITY;
            const rightPriority = PRIORITIES[rhs.blockchain] || DEFAULT_PRIORITY;

						return rightPriority - leftPriority;
      }).map((balance: WalletBalance) => ({
					// fix issue 4
					...balance,
					formatted: balance.amount.toFixed()
				}));
    }, [balances, prices]);
  
		// fix issue 2
    const rows = formattedsortedBalances.map((balance: FormattedWalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow 
          className={classes.row}
          key={`wallet-row-${balance.currency}`} // fix issue 5
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    })
  
    return (
      <div {...rest}>
        {rows}
      </div>
    )
  }