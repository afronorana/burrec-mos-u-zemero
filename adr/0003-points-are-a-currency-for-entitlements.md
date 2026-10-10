# Points are a spendable currency that buys Entitlements; existing Members keep nothing

Players earn **Points** (games, Captures, pawns home, wins, Referrals, a daily Streak; later ads and payments) and **Buy** earned-tier items with them, which grants the same **Entitlement** that a special-item Claim or a future premium grant does. We chose a spendable balance over a cumulative level ladder (items opening at lifetime-point thresholds) because it lets players choose what they want next, and because ads and payments can simply top the balance up — with a ladder, a payment could only skip rungs. Titles cover the "lifetime progress" need instead, from play counters, never from Points.

When locking goes live, the catalog that was entirely free for Members becomes free (4 Props + 4 Finishers) / earned / special / premium. Existing Members are **not** grandfathered: anything they wore that is now locked falls back to the default. Instead every existing Member receives the Welcome bonus once, the same Points a new Member gets on registering (enough to buy one Prop). We preferred this to granting Entitlements for current picks because it keeps one rule for everyone and makes Points meaningful from day one.

## Consequences

- Every Points change is recorded with its source (game, referral, welcome, streak, ad, purchase, admin), so ads, payments and refunds plug in without a new model.
- Guests earn Points but can spend them only after becoming Members (linking keeps the user id, so the balance carries over — see adr/0001).
- Deleting an account deletes its Points with its Entitlements.
