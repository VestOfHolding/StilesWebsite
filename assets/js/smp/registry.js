import BoardScatter from "./figures/BoardScatter.jsx";
import BoardExplorer from "./figures/BoardExplorer.jsx";
import NormalDiceRank from "./figures/NormalDiceRank.jsx";
import CorrelationMatrix from "./figures/CorrelationMatrix.jsx";
import RealTierList from "./figures/RealTierList.jsx";
import AllyEffect from "./figures/AllyEffect.jsx";

export const REGISTRY = {
  "board-scatter": BoardScatter,
  "board-explorer": BoardExplorer,
  "normal-dice-rank": NormalDiceRank,
  "correlation-matrix": CorrelationMatrix,
  "real-tiers": RealTierList,
  "ally-effect": AllyEffect,
};
