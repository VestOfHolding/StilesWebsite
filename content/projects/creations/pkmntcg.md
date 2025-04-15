{
    "title":"Power Creep in the Pokemon TCG",
    "link":"",
    "date": "2025-04-10T15:00:28.528Z",
    "image":"/images/pkmn_tcg/power_creep_thumbnail.webp",
    "description":"Analyzing power creep in the Pokemon TCG.",
    "tags":["Data Vizualization", "Java", "Research", "Pokemon", "Vega-Lite"],
    "fact":"Analyzing power creep in the Pokemon TCG.",
    "featured": true
}

- [The Data](#the-data)
- [Methodology](#methodology)
- [HP Power Creep](#hp-power-creep)
- [Attack Damage Power Creep](#attack-damage-power-creep)
- [Infographic](#infographic)

The Pokemon Trading Card Game has been around in the US since 1999, and long time players will tell you that there has been some very noticable power creep in the game, meaning that newer cards have been getting more powerful than older cards.

## The Data

### Sources

This data was retrieved from this unofficial, fan-run [Pokemon TCG API](https://pokemontcg.io/) and the [JSON backup on Github](https://github.com/PokemonTCG/pokemon-tcg-data), retrieved in early April of 2025. The JSON backup appears to lag behind the live API a little, but for this study it wasn't too important if I didn't have the most recent couple of sets since I would still have 25 years of data.

### Subtypes

There are various subtypes of cards that differ wildly in power from each other, so we need to split them apart in order to more accurately show the trajectory of the data. The subtypes I've chosen to split out are as follows:

- **Baby**: Pre-evolution Pokemon that are generally very weak.
- **Basic**: The base form of Pokemon that players initially place on the field.
- **Stage 1**: The evolved form of a Basic Pokemon.
- **Stage 2**: The evolved form of a Stage 1 Pokemon.
- **Special (1 prize card)**: A group of Pokemon card subtypes with other traits that the player gets 1 prize card for defeating. These are: Ancient, BREAK, Fusion Strike, Future, Level-Up, Prime, Prism Star, Radiant, Rapid Strike, Restored, SP, Star, Tera, Team Plasma, Single Strike, and Ultra Beast.
- **Special (2 prize cards)**: A group of strong Pokemon card subtypes with other traits that the player gets 2 prize cards for defeating. These are: EX, ex, -ex (yes, these are different), GX, MEGA, LEGEND, V, and VSTAR.
- **Special (3 prize cards)**: A group of very strong Pokemon card subtypes with other traits that the player gets 3 prize cards for defeating. These are: TAG TEAM, V-UNION, VMAX.

If a card has multiple special subtypes, then the trait with the maximum number of prize cards is what determines the prize card reward.

## Methodology

Pokemon cards come in groups called sets. Generally 3-5 sets are released per year. The stats we looked at are averaged across each subtype in each set. These averages per subtype per set make up the data points on the graphs.

## HP Power Creep

![HP Power Creep](/images/pkmn_tcg/hp_creep.webp "HP Power Creep")
{width=1000}

This is pretty straight-forward. Each Pokemon has an HP stat and these values are averaged as described in [Methodology](#methodology). What surprises me about this data is that, other than the 1 prize card specials that are noticably varied, our other subtypes are very cleanly delinated in their HP values.

It's interesting that apparently all Baby Pokemon cards have 30 HP.

## Attack Damage Power Creep

![Attack Power Creep](/images/pkmn_tcg/atk_creep.webp "Attack Power Creep")
{width=1000}

This one gets more complicated. Average damage per card was calculated, then average across each set like the HP.  Though any attack that deals 0 listed damage was ignored.

Many of the effects outside of raw damage were not calculated, but I did enough that the graph was no longer moving between each iteration. The secondary effects I did calculate are: Doing additional or multiplied damage based on coin flips, and doing additional or multiplied damage if some condition is true (assumed the player fulfills the condition once for these attacks). I did not include recoil damage or damage dealt to bench Pokemon.

Because of all this, just the damage an attack does to the main opposing card isn't the whole story, but I believe I got enough of the data that this is a valuable graph still.

If you're curious what those two huge spikes in the 2 prize special cards are: In 2010, the first HGSS set released, and it looks like there are only four 2 prize cards, and they have attacks that either do 100 or 200 damage, leading to the average of 150. In May 2014, the XY Flashfire set released that includes a handful of Mega cards that had very powerful damage, though they did have some drawbacks such as recoil damage or discarding cards.


## Infographic

![TCG Power Creep](/images/pkmn_tcg/power_creep.webp "TCG Power Creep")
{width=500} 

## Vega Lite Code

```
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Line chart of HP over time with different series for each card stage.",
  "data": {
    "values": [
      {"Date":"2022/11/11","Set":"Silver Tempest","Subtype":"Special (3 prize cards)","HP":320}
      ...
    ]
  },
  "resolve": {
    "axis": {
      "y": "independent"
    }
  },
  "title": {
    "text": "Pokemon TCG HP Over Time",
    "fontSize": 30,
     "offset": 20
  },
  "config": {
    "axis": {
      "titleFontSize": 20
    },
    "legend": {
      "symbolType": "square",
      "symbolStrokeWidth": 10,
      "titleFontSize": 20,
      "labelFontSize": 16,

    }
  },
  "width": 800,
  "height": 600,
  "transform": [
    {
      "calculate": "toDate(datum.Date)",
      "as": "parsedDate"
    }
  ],
  "layer": [
    {
      "mark": {
        "type": "line",
        "opacity": 0.2
      },
      "encoding": {
        "x": {
          "field": "parsedDate",
          "type": "temporal",
          "title": "Release Date"
        },
        "y": {
          "field": "HP",
          "type": "quantitative",
          "title": "Avg HP"
        },
        "color": {
          "field": "Subtype",
          "type": "nominal",
          "title": "Subtype",
          "legend": {
            "symbolOpacity": 1
          }
        }
      }
    },
    {
      "transform": [
        {
          "regression": "HP",
          "on": "parsedDate",
          "groupby": ["Subtype"],
          "as": ["parsedDate", "HP"]
        }
      ],
      "mark": {
        "type": "line",
        "strokeDash": [4, 4]
      },
      "encoding": {
        "x": {
          "field": "parsedDate",
          "type": "temporal",
          "title": "Release Date"
        },
        "y": {
          "field": "HP",
          "type": "quantitative",
          "title": "Avg HP"
        },
        "color": {
          "field": "Subtype",
          "type": "nominal",
          "title": "Subtype",
          "scale": {
            "range": ["#E69F00", "#56B4E9", "#D55E00", "#CC79A7", "#009E73", "#F0E442", "#0072B2"],
            "domain": ["Baby", "Basic", "Stage 1", "Stage 2", "Special (1 prize card)", "Special (2 prize cards)", "Special (3 prize cards)"]
          }
        }
      }
    },
    {
      "mark": {
        "type": "line",
        "opacity": 0
      },
      "encoding": {
        "y": {
          "field": "HP",
          "type": "quantitative",
          "axis": {
            "orient": "right",
            "title": ""
          }
        }
      }
    }
  ]
}
```