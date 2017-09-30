import { IVisibilityMap, IPosition } from './types';

export const Levels: number = 3;//zero indexedDB
export let PositionMAp: IVisibilityMap[] = [ //Used to define profile distribution
    { NoOfProfiles: 2, Position: { level: 0, quadrant: null } },
    { NoOfProfiles: 4, Position: { level: 1, quadrant: 1 } },
    { NoOfProfiles: 3, Position: { level: 1, quadrant: 2 } },
    { NoOfProfiles: 4, Position: { level: 1, quadrant: 3 } },
    { NoOfProfiles: 5, Position: { level: 1, quadrant: 4 } }
];

export const ZoomsSupported:number=5;//How many times pinch and zoom supported?