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

### The Code

[Source code and raw simulation outputs.](https://github.com/VestOfHolding/SuperMarioPartyDice)

### What's Changed

Previously, I believed that tens of billions of simulations was necessary due to the high number of possible board states that are possible. Even if the number of board states is not the true number I should be chasing, it always seemed like the numbers were slightly in flux. Though I never really did a mathematical test to prove what number of simulations was necessary.

Today, I have used this project as my first project where I truly tested how well Claude could really handle a project that requires a lot of context and fiddly bits to try and find successful (and actually correct) improvements. Opus 4.8 is the first model that actually succeeded at this to my satisfaction, including finding a number of bugs in my previous simulations, including a very subtle bug that was the true root cause of the number never seeming to fully settle. All of the bugs and fixes it proposed were verified by me, and I applied the actual code changes myself so that I could maintain a full understanding of the state of the code.

### The New State of the Simulations

Let's at least attempt to have math back up how many simulations we should expect to need. To do that, let's look at the equation for standard error, or the amount of variability we would expect to see in a certain data set.

@@ \text{SE} = \frac{\sigma}{\sqrt{n}} @@

@\sigma@ is the standard deviation of the data, and @\n@ is the size of the population of the data. Because it's in a square root, that means multiplying the number of simulations by 1,000 only divides the standard error of the data by about 32.

While this isn't the only measure, let's take the possible final place of the player in a given game as an example: The player can end up in 1st through 4th place. The standard deviation for those four values is about 1.1. At 5 million simulations, we get:

@@ \text{SE} = \frac{1.1}{\sqrt{5{,}000{,}000}} \approx 0.0005 @@

Getting the variability of the data down to the fourth decimal place is very reasonable in my mind, so now, at minimum, we can be very comfortable knowing that this study doesn't need a simulation count in the billions.

With all of the bugs that Claude helped me find, this is also now true in practice. Doing two full runs for all characters gives us data that falls within that expected range, which you can see in the output files in the Github repo linked above.

  {{< smp-fig name="board-explorer" board="WDR" metric="distance" >}}
  {{< smp-fig name="board-scatter" board="MFP" metric="distance" >}}
  {{< smp-fig name="normal-dice-rank" >}}

