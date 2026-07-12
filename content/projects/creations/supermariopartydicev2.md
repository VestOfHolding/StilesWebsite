{
    "title":"Super Mario Party Dice, Revisited",
    "link":"https://github.com/VestOfHolding/SuperMarioPartyDice",
    "date": "2026-07-10T15:00:28.528Z",
    "image":"/images/MarioPartyOutput.webp",
    "description":"A deeper, interactive re-analysis of Super Mario Party dice across four boards, with correlation and significance testing.",
    "tags":["Java", "Data Vizualization", "Statistics", "Monte Carlo", "React", "Research", "Mario Party"],
    "fact":"A deeper, interactive re-analysis of which Super Mario Party dice perform best, board by board.",
    "featured": false
}

## The Code

[Source code and raw simulation outputs.](https://github.com/VestOfHolding/SuperMarioPartyDice)

## What's Changed

Previously, I believed that tens of billions of simulations was necessary due to the high number of possible board states that are possible. Even if the number of board states is not the true number I should be chasing, it always seemed like the numbers were slightly in flux. Though I never really did a mathematical test to prove what number of simulations was necessary.

Today, I have used this project as my first project where I truly tested how well Claude could really handle a project that requires a lot of context and fiddly bits to try and find successful (and actually correct) improvements. Opus 4.8 is the first model that actually succeeded at this to my satisfaction, including finding a number of bugs in my previous simulations, including a very subtle bug that was the true root cause of the number never seeming to fully settle. All of the bugs and fixes it proposed were verified by me, and I applied the actual code changes myself so that I could maintain a full understanding of the state of the code.

### The New State of the Simulations

@@ \text{SE} = \frac{\sigma}{\sqrt{n}} @@

@@ \text{SE} = \frac{1.1}{\sqrt{5{,}000{,}000}} \approx 0.0005 @@

So five million games pins each die's average place to about @\pm 0.001@. The dice we care about are separated by tenths of a place — Daisy's best-in-class 2.03 on Kamek's Tantalizing Tower versus a normal die's 2.25, say — so an error of a thousandth is nowhere near large enough to reshuffle anything.

  {{< smp-fig name="board-explorer" board="WDR" metric="distance" >}}
  {{< smp-fig name="board-scatter" board="MFP" metric="distance" >}}
  {{< smp-fig name="normal-dice-rank" >}}

