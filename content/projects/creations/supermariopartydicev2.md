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

### What Is This?

[Source code and raw simulation outputs.](https://github.com/VestOfHolding/SuperMarioPartyDice)

The link above also contains a write-up of what this project is, but the short version is that I want to try and use math to find if there are tier lists we can make for the characters in the video game, Super Mario Party, and if those tier lists change from board to board.

The major thing to note is that we are currently studying how the character dice perform on their own, while in normal gameplay players can choose on every turn whether they use the character die or a normal six-sided die.

### What's Changed

Previously, I believed that tens of billions of simulations was necessary due to the high number of possible board states that are possible. Even if the number of board states is not the true number I should be chasing, it always seemed like the numbers were slightly in flux. Though I never really did a mathematical test to prove what number of simulations was necessary.

Today, I have used this project as my first project where I truly tested how well Claude could really handle a project that requires a lot of context and fiddly bits to try and find successful (and actually correct) improvements. Opus 4.8 is the first model that actually succeeded at this to my satisfaction, including finding a number of bugs in my previous simulations, including a very subtle bug that was the true root cause of the number never seeming to fully settle. All of the bugs and fixes it proposed were verified by me, and I applied the actual code changes myself so that I could maintain a full understanding of the state of the code.

### The New State of the Simulations

Let's at least attempt to have math back up how many simulations we should expect to need. To do that, let's look at the equation for standard error, or how much we should expect the averages of our results to shift from run to run.

@@ \text{SE} = \frac{\sigma}{\sqrt{n}} @@

@\sigma@ is the standard deviation of the data, and "n" is the size of the population of the data. Because it's in a square root, that means multiplying the number of simulations by 1,000 only divides the standard error of the data by about 32.

While this isn't the only measure, let's take the possible final place of the player in a given game as an example: The player can end up in 1st through 4th place. The standard deviation for those four values is about 1.1. At 5 million simulations, we get:

@@ \text{SE} = \frac{1.1}{\sqrt{5{,}000{,}000}} \approx 0.0005 @@

Getting the variability of the data down to the fourth decimal place is very reasonable in my mind, so now, at minimum, we can be very comfortable knowing that this study doesn't need a simulation count in the billions.

With all of the bugs that Claude helped me find, this is also now true in practice. Doing two full runs for all characters gives us data that falls within that expected range, which you can see in the output files in the Github repo linked above.

### The Game Boards

The four boards that players can play on are: [Whomp's Domino Ruins](https://www.mariowiki.com/Whomp%27s_Domino_Ruins) (WDR), [King Bob-omb's Powderkeg Mine](https://www.mariowiki.com/King_Bob-omb%27s_Powderkeg_Mine) (KBPM), [Megafruit Paradise](https://www.mariowiki.com/Megafruit_Paradise) (MFP), and [Kamek's Tantalizing Tower](https://www.mariowiki.com/Kamek%27s_Tantalizing_Tower) (KTT). What we need to know is if the different boards change which dice are good.

When we look at our outputs, one of the first general questions we can answer is if certain strategies, such as getting more coins or trying to roll the highest numbers on the die, actually correlate to getting the highest placement at the end of the game. Before we get to that, it's worth noting that when we talk about coins, we're talking specifically about coins gained in the board, not any minigame coins. This correlates with the number of coins used for the coin bonus star.

So, across the 21 possible dice (20 characters plus the normal d6 as a control), what correlations arise?

  {{< smp-fig name="correlation-matrix" >}}

The correlation value, "r", is basically what it says on the tin: How strongly do the two variables correlate with each other, and in which direction (positive or negative)? The p-values in the second table are admittedly a more precise way of saying the same thing, but removes direction. It's still helpful to see both to really prove the results.

**For the mathier folks**: The r-value was gained using the "CORREL" function in Excel which uses a Pearson correlation, and the p-value uses the "T.DIST.2T" function. Both looked to me like they work fine for this project.

To the actual results:

**Whomp's Domino Ruins** emerges as the clear distance board. The board seems to supply just enough coins that the player should focus on rolling the highest numbers they can to get to the stars the fastest, and you'll be able to buy them. At least compared to the dice that favor gaining more coins over going the furthest. Donkey Kong reigns supreme here. 

Given that these simulations reward minigame coins randomly in order to remove player skill, I have to imagine that a good minigame player can focus that much more on just maximizing their die rolls.

**King Bob-omb's Powderkeg Mine** is the board that makes the most intuitive sense to me where you have to balance distance and coins, and getting both will get you the win, though coins determine the winner more often. Hammer Bro ends up being the character that is best able to thread that needle.

**Megafruit Paradise** is the strange one in multiple ways. Although the Stars & Place column is just a sanity checking column, and the correlation is still strong, the number is noticably lower than the other boards. Looking into the raw outputs, it looks like this board is noticably star-starved in the results, so it's more often that the place is determined by tie-breakers. In addition, we have our only significant negative correlation in the game: Maximizing distance actually decreases the average number of coins you'll get, but you'll still get stars. The problem is you still need to make sure to get coins because of how often coins will determine who wins in tie-breakers. We see this in the results where high distance characters such as Donkey Kong and Bowser are in the bottom tiers for this board.

**Kamek's Tantalizing Tower** is a fascinating one to me, because instinctually I would assume that distance would be king on this board, since you want to make it up to the star at the end of the path as much as possible would get you the most stars. However, the correlation results show that patience is required. It's better to take your time to make sure you have more coins to buy more than one star at a time no matter the price (since you can buy more than one star at once on this board), which makes sense in hindsight since each loop takes a noticable number of turns. Daisy and Mario are the top two characters that are best able to strike that balance.

### The Characters

While the above gives us the general ideas of what types of characters are going to succeed or fail more at different boards, it's time to look at the exact results, with the normal d6 as a control:

  {{< smp-fig name="real-tiers" >}}

If there is a TL;DR to be had in this post, this image is it. This is the ultimate answer to which characters you should pick on each board, but there's still more to this story to tell.

One big component to this game is the ally system. Land on the right spot, and you'll gain an ally, up to a maximum of 4, that will give you a 0-2 bonus each to your die rolls. In the long run this can have a dramatic effect on how each character performs.

To test how strong this effect is, I compared the above results to a more "normalized" result set and analyzed the difference. Specifically, in the real results the rates that different characters end up with different ally counts by the end of the game can obviously vary, such as on WDR, Wario will end the game with 1 ally roughly 23% of the time while that will happen to Bowser Jr roughly 31% of the time. So what if we adjust those frequencies to pretend that all characters gain the same number of allies at the same frequencies per board? Looking at the difference between those two sets of data can tell us how strongly allies affect different characters' performance.

  {{< smp-fig name="ally-effect" >}}

The story this graph tells is simple: The larger the orange bar, the more important it is that you gain allies in order to achieve the results seen in the previous graph. The larger the blue bar, the more you want to avoid gaining allies as much as possible and you will do better than others might expect.

As a bonus, you can use the below graph to look at more of the granular results:

  {{< smp-fig name="board-explorer" board="WDR" metric="distance" >}}

