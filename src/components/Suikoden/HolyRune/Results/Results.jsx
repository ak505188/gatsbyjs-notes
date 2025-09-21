import React from 'react';
import MatchingSetups from './MatchingSetups';

import HolyTownJSON from '../../../../lib/Suikoden/holy_variations.min.json';
import HolyPalaceJSON from '../../../../lib/Suikoden/HolyBridge.json';
import { DIRECTIONS, TS_SETTINGS } from '../enums';

const Results = ({ steps, palace_npcs, ts_setting, npc_alignment, bird_directions }) => {
  const bird_directions_str = bird_directions.map(dir => DIRECTIONS[dir][0]).join('')
  const matching_steps = HolyPalaceJSON.filter(setup => setup.x + setup.y === steps)
  const palace_npcs_regex = new RegExp(palace_npcs
    .map(direction_int => direction_int > -1 ? direction_int : '.')
    .join(''));
  const matching_palace_seeds = matching_steps
    .filter(setup => palace_npcs_regex.test(setup.npcs.join('')))
    .map((setup, index) => ({ id: index, ...setup }))

  const valid_starting_indexes = [...new Set(matching_palace_seeds.map(setup => setup.index))]

  const town_setups_with_matching_start_rng = HolyTownJSON.filter(setup => valid_starting_indexes.includes(setup.index))
  const town_setups_with_matching_steps = town_setups_with_matching_start_rng.filter(setup => setup.steps === steps)
  const town_setups_with_matching_ts_setting = town_setups_with_matching_steps.filter(setup => {
    if (ts_setting === TS_SETTINGS.ANY) return true;
    if (ts_setting === TS_SETTINGS.FAST) return (setup.ts_index <= 16 && setup.ts_index >= 0);
    return setup.ts_index === -1
  });

  const town_setups_with_matching_npc_alignments = town_setups_with_matching_ts_setting.filter(setup => {
    if (npc_alignment === 0) return setup.npc_comparison === 0;
    if (npc_alignment === 1) return setup.npc_comparison > 0;
    if (npc_alignment === 2) return setup.npc_comparison < 0;
    return false;
  })

  const town_setups_with_matching_top_right_bird = town_setups_with_matching_npc_alignments.filter(setup => {
    // console.log(setup.birds[0], bird_directions_str)
    return setup.birds[0] === bird_directions_str
  })

  const landing_indexes = [...new Set(town_setups_with_matching_top_right_bird.map(setup => setup.final_index))];

  return (
    <>
      <pre>{bird_directions_str}</pre>
      <pre>Valid Starting Indexes: {JSON.stringify(valid_starting_indexes)}</pre>
      <MatchingSetups setups={town_setups_with_matching_npc_alignments}/>
      <pre>{JSON.stringify(landing_indexes)}</pre>
    </>
  );
}

export default Results;
