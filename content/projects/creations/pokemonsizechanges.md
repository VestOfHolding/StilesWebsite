{
    "title":"Most Extreme Size Changes When Pokemon Evolve",
    "link":"",
    "date": "2025-02-05T15:00:28.528Z",
    "image":"/images/pokemon_sizes/SizeChangeThumbnail.webp",
    "description":"Showcasing the most extreme height/weight changes when Pokemon evolve.",
    "tags":["Data Vizualization", "R", "Research", "Pokemon"],
    "fact":"Showcasing the most extreme height/weight changes when Pokemon evolve.",
    "featured": false
}

- [The Data](#the-data)
    - [Weight](#weight)
    - [Height vs Length](#height-vs-length)
    - [BMI](#bmi)
- [Top Size Increases](#top-size-increases)
- [Top Size Decreases](#top-size-decreases)
    - [Wailord Math](#wailord-math)
- [Infographic](#infographic)

This project analyzes the most extreme size changes that Pokemon undergo when they evolve, with the main visualizations created in R.

Because this project looked at these size changes as a percentage difference, the most noticable result is that the evolutions lines of the game mascots of Pokemon Sun & Moon dominate the results. 

The idea seems to be that Cosmog is a small cloud Pokemon meant to resemble a nebula, and when it evolves into Cosmoem it becomes something similar to a passive black hole, making it both the smallest and heaviest Pokemon on record. Though thankfully for the Pokemon world, it only absorbs starlight and dust. Then Cosmoem evolves into more reasonably sized box legendary Pokemon (which are still rather massive): Solgaleo or Lunala. Combining the extreme changes with the branched evolution leads to this evolution line having a lot of representation on these graphs.

This is why I chose to show the top 15 results for each graph instead of a more typical top 10, so we could still see more results outside of this line.

## The Data

### Weight

Out of the three stats I track, this one is pretty straight-forward. I just use the listed weight in pounds for each Pokemon. Why pounds instead of kilograms? Well, since this project looks at percentage changes, and the weight is given in the same amount of precision for both units, I might as well use the unit gives me slightly more precise numbers out of the two.

### Height vs Length

While this stat in the games is always labeled as "height", we run into a problem with Pokemon like Dragonair and Gyarados where this stat is really clearly referencing their length. Because of this, I decided to try and label this stat more generically.

In good news, it's not just me and confirmed by the creators of Pokemon themselves! While making this project, Gamefreak had a massive data leak which included a [huge list](https://www.reddit.com/r/PokeLeaks/comments/1ghw9v3/leaked_documents_that_explain_how_pok%C3%A9mon_heights/) of how Pokemon heights are measured up through generation 7 (and another expanded list [here](https://www.reddit.com/r/PokeLeaks/comments/1gj2a7l/height_measurement_guide_updated_for_usum/)), which confirms that this measurement does indeed not just apply to "height". It seems to be more whatever is the longest way to measure them as whatever feels right for each body type a Pokemon has. 

### BMI

Ok, yes, on the surface this one seems odd. Why try and track a Pokemon's BMI? As you can imagine, no, I don't care about trying to figure out if a Pokemon is supposed to be obese or not. All I'm doing here is using the BMI equation (kg/m^2) to try and see if there's another interesting way to look at Pokemon size changes, with a known way of quantifying both their weight and height together in one number.

## Top Size Increases

![Weight Increases](/images/pkmn_sizes/weight_increases.webp "Top Weight Increases on Pokemon Evolution")
{width=1000}

While every one of these graphs are going to have surprising results, there are two that catch my attention the most on this graph. 

The first is the gaseous ghost Pokemon, Haunter, apparently becoming somewhat corporeal when evolving to Gengar, leading to a massive percentage weight increase.

The second is how apparently both versions of Diglett do much more than triple in weight when evolving into Dugtrio, which makes me wonder what on earth is going on beneath the surface.

![Height Increases](/images/pkmn_sizes/height_increases.webp "Top Height Increases on Pokemon Evolution")
{width=1000}

If anything I'm just surprised Magikarp isn't higher on this list, which makes me start questioning how tiny other Pokemon like Natu are, lol.

![BMI Increases](/images/pkmn_sizes/bmi_increases.webp "Top BMI Increases on Pokemon Evolution")
{width=1000}

I am really glad I did this because of the pretty different Pokemon lineup we're seeing. It makes sense to see evolutions like Dragonair to Dragonite pop up, and interesting to see who comes along with them.

## Top Size Decreases

![Weight Decreases](/images/pkmn_sizes/weight_decreases.webp "Top Weight Decreases on Pokemon Evolution")
{width=1000}

I'm surprised by a lot of these. I'm not as familiar with the new generation, but it looks suspiciously like the new ghost-dog does a reverse Gengar by dying and becoming more of a spirit? Well then, lol. Also funny to see that Kadabra has some thicc cake that Alakazam loses, while Grimer apparently becomes less dense when it evolves? Maybe some new pockets of toxic gas?

![Height Decreases](/images/pkmn_sizes/height_decreases.webp "Top Height Decreases on Pokemon Evolution")
{width=1000}

I didn't realize Bellossom is so much shorter than Gloom, and I could've sworn Gengar was taller than Haunter, but I guess not. Though more surprising is just how many Pokemon don't grow at all on evolution.

![BMI Decreases](/images/pkmn_sizes/bmi_decreases.webp "Top BMI Decreases on Pokemon Evolution")
{width=1000}

Wow, was not expecting so many Pokemon to be over 80% on this graph. However, the one that creates probably the most questions is Wailord.

### Wailord Math

Let's take this side-view of a 3D model of Wailord I have able to find on Sketchfab:

![Wailord Side View](/images/pkmn_sizes/wailord.png "Side view of a 3D model of Wailord")
{width=600}

If we further crop the image doesn to where the vast majority of its bulk is (aka removing the tall tail section), we get an image that's about 760x285. Doing some quick math gives us an estimate of about 5.4-5.5 meters for the height of its main body. We follow this logic again for a front view, and we get a depth of a little over 6.2 meters.

Some more back-of-the-envelope estimatation later, and we get a density of between 1-2 @kg/m^{3}@ for Wailord. Really it's on the lower end of that, but if we fudge the numbers as favorable as possible, 2 @kg/m^{3}@ is the best we can do.

In order to successfully swim, real world whales have evolved to be close to the density of water, which is, unfortunately for Wailord, nearly 1000x larger at 1000 @kg/m^{3}@. At our most generous estimates, Wailord would be 
shot out of the water with such force that it's actually more relevant to talk about whether or not it would float in the air itself.

The answer is: It honestly might. Plenty of our estimates put Wailord's density below the density of air at 1.2 @kg/m^{3}@. So Wailord isn't a whale. It's a blimp.

### We're Not Done

But...wait...I brought up the fact that Wailord would shoot out of the water at high speeds. But what would that speed be?

According to the equation for buoyant force combined with Wailord's weight down leads to the conclusion that Wailord would experience over 2.5 million Newtons of force upwards. Toss that into Newton's 2nd Law and we get an acceleration of about 6350 @m/s^{2}@ if Wailord were to just appear somewhere underwater.

We may as well stop there, because needless to say, any creature suddenly experiencing 635 g's of force is in for a very bad time. Dare I say, liquification.

Some quick kinematics says that this results in ejecting out of the water at hundreds of meters per second. Yes, drag forces and needing to push the water out of the way probably slows this down a lot, but that is beyond my expertise.

So if you find yourself starting a Pokemon battle underwater and sending out your Wailord, prepare for a sudden Aqua Jet and just... the worst kind of rain, lol.

## Infographic

![Size Increases](/images/pkmn_sizes/SizeIncreases.webp "Top Size Increases on Pokemon Evolution")
{width=500} 
![Size Decreases](/images/pkmn_sizes/SizeDecreases.webp "Top Size Decreases on Pokemon Evolution")
{width=500}